import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType, supplierActionType } from "../../constants";
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

export const fetchSuppliers =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.SUPPLIERS;
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
                        type: supplierActionType.FETCH_SUPPLIERS,
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

export const fetchSupplier =
    (supplierId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        apiConfig
            .get(apiBaseURL.SUPPLIERS + "/" + supplierId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: supplierActionType.FETCH_SUPPLIER,
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

export const addSupplier = (supplier, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.SUPPLIERS, supplier)
        .then((response) => {
            if (response) {
                dispatch({
                    type: supplierActionType.ADD_SUPPLIER,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "supplier.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/suppliers");
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

export const editSupplier =
    (supplierId, supplier, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .patch(apiBaseURL.SUPPLIERS + "/" + supplierId, supplier)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: supplierActionType.EDIT_SUPPLIER,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "supplier.success.edit.message"
                            ),
                        })
                    );
                    navigate("/admin/pos/suppliers");
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

export const deleteSupplier = (supplierId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.SUPPLIERS + "/" + supplierId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: supplierActionType.DELETE_SUPPLIER,
                    payload: supplierId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "supplier.success.delete.message"
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

export const fetchAllSuppliers = () => async (dispatch) => {
    apiConfig
        .get(`suppliers?page[size]=0`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: supplierActionType.FETCH_ALL_SUPPLIERS,
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
