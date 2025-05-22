import { apiBaseURL, rolesActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/lms-requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchRoles =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        const admin = true;
        let url = apiBaseURL.ROLES;
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
                        type: rolesActionType.FETCH_ROLES,
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

export const fetchRole =
    (rolesId, singleRole, isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get(apiBaseURL.ROLES + "/" + rolesId, singleRole)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: rolesActionType.FETCH_ROLE,
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

export const addRole = (roles, navigate) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.ROLES, roles)
        .then((response) => {
            if (response) {
                dispatch({
                    type: rolesActionType.ADD_ROLES,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "role.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/roles");
                dispatch(addInToTotalRecord(1));
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

export const editRole = (rolesId, role, navigate) => async (dispatch) => {
    await apiConfig
        .patch(apiBaseURL.ROLES + "/" + rolesId, role)
        .then((response) => {
            if (response) {
                dispatch({
                    type: rolesActionType.EDIT_ROLES,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage("role.success.edit.message"),
                    })
                );
                navigate("/admin/pos/roles");
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

export const deleteRole = (rolesId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.ROLES + "/" + rolesId)
        .then((response) => {
            if (response) {
                dispatch(fetchRoles());
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: rolesActionType.DELETE_ROLES,
                    payload: rolesId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "role.success.delete.message"
                        ),
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

export const fetchAllRoles = () => async (dispatch) => {
    apiConfig
        .get(`roles?page[size]=0`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: rolesActionType.FETCH_ALL_ROLES,
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
