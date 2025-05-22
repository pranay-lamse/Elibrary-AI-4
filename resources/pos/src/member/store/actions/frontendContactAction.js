import apiConfig from "../../config/apiConfig";
import { apiBaseURL, currencyActionType, toastType } from "../../../constants";
import requestParam from "../../../shared/requestParam";
import { addToast } from "../../../store/action/toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "../../../store/action/totalRecordAction";
import { setLoading } from "../../../store/action/loadingAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";

export const fetchContacts =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        let url = apiBaseURL.CONTACT;
        if (filter.limit || filter.order_By || filter.search) {
            url += requestParam(filter);
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch(setTotalRecord(response.data.data.length));
                    dispatch({
                        type: "FETCH_CONTACT",
                        payload: response.data.data,
                    });
                }
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const addContact = (data, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.CONTACT, data)
        .then((response) => {
            dispatch({
                type: "ADD_CONTACT",
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: "You successfully contacted us.",
                })
            );
            dispatch(setLoading(false));
            navigate("/");
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
            dispatch(setLoading(false));
        });
};

export const deleteContact = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete(apiBaseURL.CONTACT + "/" + id)
        .then((response) => {
            if (response) {
                // dispatch(fetchContacts());
                dispatch(
                    addToast({
                        text: "Contact Deleted Successfully.",
                    })
                );
                dispatch(setLoading(false));
            }
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
            dispatch(setLoading(false));
        });
};
