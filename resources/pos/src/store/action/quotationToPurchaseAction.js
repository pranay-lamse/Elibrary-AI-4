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

export const fetchQuotationPurchases =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        const admin = true;
        let url = "/quotation-to-purchase";
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
                        type: "FETCH_QUOTATION_TO_PURCHASE_DATA",
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

export const fetchQuotationPurchase =
    (quotationId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get("/quotation-to-purchase/" + quotationId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "CUSTOM_SINGLE_PURCHASE_ORDER",
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

export const editQuotationPurchase =
    (quotationId, quotationPurchase, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        dispatch(setLoading(true));
        await apiConfig
            .patch("/quotation-to-purchase/" + quotationId, quotationPurchase)
            .then((response) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: "Purchase Updated Successfully.",
                        })
                    );
                    fetchQuotationPurchases();
                    navigate("/admin/pos/purchases");
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

export const deleteQuotationToPurchase = (id) => async (dispatch) => {
    await apiConfig
        .delete("/quotation-to-purchase/" + id)
        .then((response) => {
            if (response) {
                dispatch(fetchQuotationPurchases());
                dispatch(
                    addToast({
                        text: "Purchase Deleted Successfully",
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

export const convertQuotationToPurchase =
    (quotation, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        await apiConfig
            .post("/quotation-to-purchase", quotation)
            .then((response) => {
                if (response) {
                    // dispatch({
                    //     type: quotationActionType.ADD_QUOTATION,
                    //     payload: response.data.data,
                    // });
                    dispatch(
                        addToast({
                            text: "Purchase Created Successfully",
                        })
                    );
                    navigate("/admin/pos/purchases");
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

export const deleteQuotationToPurchaseItems = (id) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .delete("/delete-quotation-item/" + id)
        .then((response) => {
            if (response) {
                // dispatch(fetchQuotationPurchase(id));
                dispatch(
                    addToast({
                        text: "Purchase Item Deleted Successfully",
                    })
                );
                dispatch(setSavingButton(false));
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
