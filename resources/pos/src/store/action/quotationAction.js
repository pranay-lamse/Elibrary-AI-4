import apiConfig from "../../config/apiConfig";
import { apiBaseURL, quotationActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import requestParam from "../../shared/requestParam";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { callSaleApi } from "./saleApiAction";
import { setSavingButton } from "./saveButtonAction";

export const fetchQuotations =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        const admin = true;
        let url = apiBaseURL.QUOTATIONS;
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
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: quotationActionType.FETCH_QUOTATIONS,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
                    dispatch(callSaleApi(false));
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

export const fetchQuotation =
    (quotationId, singleQuotation, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(
                apiBaseURL.QUOTATIONS + "/" + quotationId + "/edit",
                singleQuotation
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: quotationActionType.FETCH_QUOTATION,
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

export const addQuotation = (quotation, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.QUOTATIONS, quotation)
        .then((response) => {
            if (response) {
                dispatch({
                    type: quotationActionType.ADD_QUOTATION,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "quotation.success.create.message"
                        ),
                    })
                );
                dispatch(addInToTotalRecord(1));
                navigate("/admin/pos/quotations");
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

export const editQuotation =
    (quotationId, quotation, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        await apiConfig
            .patch(apiBaseURL.QUOTATIONS + "/" + quotationId, quotation)
            .then((response) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "quotation.success.edit.message"
                            ),
                        })
                    );
                    navigate("/admin/pos/quotations");
                    dispatch({
                        type: quotationActionType.EDIT_QUOTATION,
                        payload: response.data.data,
                    });
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

export const deleteQuotation = (userId) => async (dispatch) => {
    await apiConfig
        .delete(apiBaseURL.QUOTATIONS + "/" + userId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: quotationActionType.DELETE_QUOTATION,
                    payload: userId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "quotation.success.delete.message"
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
