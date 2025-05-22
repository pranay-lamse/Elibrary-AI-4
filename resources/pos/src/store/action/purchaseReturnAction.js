import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    purchaseReturnActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import requestParam from "../../shared/lms-requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";

export const fetchPurchasesReturn =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        let url = apiBaseURL.PURCHASES_RETURN;
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
                        type: purchaseReturnActionType.FETCH_PURCHASES_RETURN,
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

export const fetchPurchaseReturn =
    (purchaseId, singlePurchase, isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get(
                apiBaseURL.PURCHASES_RETURN + "/" + purchaseId + "/edit",
                singlePurchase
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: purchaseReturnActionType.FETCH_PURCHASE_RETURN,
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

export const addPurchaseReturn = (purchase, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.PURCHASES_RETURN, purchase)
        .then((response) => {
            if (response) {
                dispatch({
                    type: purchaseReturnActionType.ADD_PURCHASE_RETURN,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "purchase.return.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/purchase-return");
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
                dispatch(setLoading(false));
            }
        });
};

export const editPurchaseReturn =
    (purchaseId, purchase, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .put(apiBaseURL.PURCHASES_RETURN + "/" + purchaseId, purchase)
            .then((response) => {
                if (response) {
                    navigate("/admin/pos/purchase-return");
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "purchase.return.success.edit.message"
                            ),
                        })
                    );
                    dispatch({
                        type: purchaseReturnActionType.EDIT_PURCHASE_RETURN,
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

export const deletePurchaseReturn = (purchaseId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.PURCHASES_RETURN + "/" + purchaseId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: purchaseReturnActionType.DELETE_PURCHASE_RETURN,
                    payload: purchaseId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "purchase.return.success.delete.message"
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
