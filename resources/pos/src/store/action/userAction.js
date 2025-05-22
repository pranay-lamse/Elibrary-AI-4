import apiConfig from "../../config/apiConfig";
import { apiBaseURL, userActionType, toastType } from "../../constants";
import requestParam from "../../shared/lms-requestParam";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";

export const fetchUsers =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.USERS;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter);
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: userActionType.FETCH_USERS,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
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

export const fetchUser =
    (userId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        apiConfig
            .get(apiBaseURL.USERS + "/" + userId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: userActionType.FETCH_USER,
                        payload: response.data.data,
                    });
                }
                dispatch(setLoading(false));
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

export const addUser = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.USERS, users)
        .then((response) => {
            if (response) {
                dispatch({
                    type: userActionType.ADD_USER,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "user.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/users");
                dispatch(addInToTotalRecord(1));
                dispatch(setSavingButton(false));
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(setSavingButton(false));
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            }
        });
};

export const editUser = (userId, users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.USERS + "/" + userId, users)
        .then((response) => {
            if (response) {
                dispatch({
                    type: userActionType.EDIT_USER,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage("user.success.edit.message"),
                    })
                );
                navigate("/admin/pos/users");
                dispatch(setSavingButton(false));
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(setSavingButton(false));
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            }
        });
};

export const deleteUser = (userId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.USERS + "/" + userId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({ type: userActionType.DELETE_USER, payload: userId });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.delete.message"),
                })
            );
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
