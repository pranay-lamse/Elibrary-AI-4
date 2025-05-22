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

export const fetchResourceCategory =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        const admin = true;
        let url = "/resources-category";
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
                        type: "FETCH_RESOURCES_CATEGORY",
                        payload: response.data.data,
                    });
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

export const addResourceCategory = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post("/resources-category", data)
        .then((response) => {
            if (response) {
                dispatch(fetchResourceCategory());
                dispatch(
                    addToast({
                        text: "Resources Category added successfully.",
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

export const editResourceCategory = (id, genre) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .put("/resources-category/" + id, genre)
        .then((response) => {
            if (response) {
                dispatch(
                    addToast({
                        text: "Resource Category Edited Successfully.",
                    })
                );
                dispatch(fetchResourceCategory());
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

export const deleteResourceCategory = (id, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete("/resources-category/" + id)
        .then((response) => {
            if (response) {
                dispatch(fetchResourceCategory());
                dispatch(
                    addToast({
                        text: "Resource Category Deleted Successfully",
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
