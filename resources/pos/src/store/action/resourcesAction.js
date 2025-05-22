import { apiBaseURL, rolesActionType, toastType } from "../../constants";
import apiConfig from "../../member/config/apiConfigWithoutToken";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/lms-requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchResources =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        const admin = true;
        let url = "/resources";
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter, admin);
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "FETCH_RESOURCES",
                        payload: response.data.data,
                    });

                    dispatch(
                        setTotalRecord(response.data.total)
                    );
                    dispatch(setLoading(false));
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
                    dispatch(setLoading(false));
                }
            });
    };

export const addResources = (data, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post("/resources", data)
        .then((response) => {
            if (response) {
                dispatch(
                    addToast({
                        text: "Resources added successfully.",
                    })
                );
                dispatch(setLoading(false));
                navigate(-1);
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
                dispatch(setLoading(false));
            }
        });
};

export const deleteResource = (id, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete("/resources/" + id)
        .then((response) => {
            if (response) {
                dispatch(fetchResources());
                dispatch(
                    addToast({
                        text: "Resource Deleted Successfully",
                    })
                );
                dispatch(setLoading(false));
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
                dispatch(setLoading(false));
            }
        });
};

export const resourceExcelAction = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get(`resource-export/${id}`)
        .then((response) => {
            if (response) {
                window.open(response.data.data, "_blank");
                dispatch(setLoading(false));
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
                dispatch(setLoading(false));
            }
        });
};
