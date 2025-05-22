import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType, customerActionType } from "../../constants";
import requestParam from "../../shared/lms-requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";

export const fetchCustomers =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.CUSTOMERS;
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
                        type: customerActionType.FETCH_CUSTOMERS,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
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

export const fetchCustomer =
    (customerId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.CUSTOMERS + "/" + customerId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: customerActionType.FETCH_CUSTOMER,
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

export const addCustomer = (supplier, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.CUSTOMERS, supplier)
        .then((response) => {
            if (response) {
                dispatch({
                    type: customerActionType.ADD_CUSTOMER,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "customer.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/customers");
                dispatch(addInToTotalRecord(1));
                dispatch(setSavingButton(false));
                dispatch(setLoading(false));
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
                dispatch(setLoading(false));
            }
        });
};

export const editCustomer =
    (customerId, supplier, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .patch(apiBaseURL.CUSTOMERS + "/" + customerId, supplier)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: customerActionType.EDIT_CUSTOMER,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "customer.success.edit.message"
                            ),
                        })
                    );
                    navigate("/admin/pos/customers");
                    dispatch(setSavingButton(false));
                    dispatch(setLoading(false));
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
                    dispatch(setLoading(false));
                }
            });
    };

export const deleteCustomer = (customerId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.CUSTOMERS + "/" + customerId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: customerActionType.DELETE_CUSTOMER,
                    payload: customerId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "customer.success.delete.message"
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

export const fetchAllCustomer = () => async (dispatch) => {
    apiConfig
        .get(`customers?page[size]=0`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: customerActionType.FETCH_ALL_CUSTOMER,
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
