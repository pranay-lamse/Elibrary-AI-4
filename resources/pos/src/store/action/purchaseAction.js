import apiConfig from "../../config/apiConfig";
import { apiBaseURL, purchaseActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";

export const fetchPurchases =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.PURCHASES;
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
                        type: purchaseActionType.FETCH_PURCHASES,
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

export const fetchPurchase =
    (purchaseId, singlePurchase, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        apiConfig
            .get(
                apiBaseURL.PURCHASES + "/" + purchaseId + "/edit",
                singlePurchase
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: purchaseActionType.FETCH_PURCHASE,
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

export const addPurchase = (purchase, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.PURCHASES, purchase)
        .then((response) => {
            if (response) {
                dispatch({
                    type: purchaseActionType.ADD_PURCHASE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "purchase.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/purchases");
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

export const editPurchase =
    (purchaseId, purchase, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .put(apiBaseURL.PURCHASES + "/" + purchaseId, purchase)
            .then((response) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "purchase.success.edit.message"
                            ),
                        })
                    );
                    navigate("/admin/pos/purchases");
                    dispatch({
                        type: purchaseActionType.EDIT_PURCHASE,
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

export const deletePurchase = (purchaseId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.PURCHASES + "/" + purchaseId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: purchaseActionType.DELETE_PURCHASE,
                    payload: purchaseId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "purchase.success.delete.message"
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
