import apiConfig from "../../config/apiConfig";
import { apiBaseURL, currencyActionType, toastType } from "../../constants";
import requestParam from "../../shared/lms-requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchSiteCounter =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get("/site-visits")
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "FETCH_SITE_COUNTER",
                        payload: response.data.data,
                    });
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
            });
    };

export const addCount = (count) => async (dispatch) => {
    await apiConfig
        .post("/site-visits", { count: count })
        .then((response) => {
            if (response) {
                return;
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            }
        });
};
