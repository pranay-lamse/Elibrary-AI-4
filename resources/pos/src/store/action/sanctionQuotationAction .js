import apiConfig from "../../config/apiConfig";
import { apiBaseURL, quotationActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import requestParam from "../../shared/lms-requestParam";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { callSaleApi } from "./saleApiAction";
import { setSavingButton } from "./saveButtonAction";

export const fetchSanctionQuotations =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        const admin = true;
        let url = apiBaseURL.SANCTION_QUOTATIONS;
        if (
            !_.isEmpty(filter) &&
            (filter.page || filter.pageSize || filter.search || filter.order_By)
        ) {
            url += requestParam(filter, admin);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "FETCH_SANCTION_QUOTATION",
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

export const fetchSanctionQuotation =
    (quotationId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(apiBaseURL.SANCTION_QUOTATIONS + "/" + quotationId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "FETCH_SINGLE_SANCTION_QUOTATION",
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

export const addSanctionQuotation =
    (quotation, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        dispatch(setLoading(true));
        await apiConfig
            .post(apiBaseURL.SANCTION_QUOTATIONS, quotation)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "ADD_SANCTION_QUOTATION",
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "quotation.success.create.message"
                            ),
                        })
                    );
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
        dispatch(setLoading(true));
        dispatch(setSavingButton(true));
        await apiConfig
            .post("/sanction-quotation-edit" + "/" + quotationId, quotation)
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
                    fetchSanctionQuotations();
                    // dispatch({
                    //     type: quotationActionType.EDIT_QUOTATION,
                    //     payload: response.data.data,
                    // });
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
        .delete(apiBaseURL.SANCTION_QUOTATIONS + "/" + userId)
        .then((response) => {
            if (response) {
                dispatch(setLoading(false));
                dispatch(removeFromTotalRecord(1));
                fetchSanctionQuotations();
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "quotation.success.delete.message"
                        ),
                    })
                );
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
