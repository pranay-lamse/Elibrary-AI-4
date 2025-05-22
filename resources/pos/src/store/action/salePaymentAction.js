import { setLoading } from "./loadingAction";
import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    purchaseActionType,
    saleActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";
import { callSaleApi } from "./saleApiAction";

export const createSalePayment =
    (salePayment, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .post(
                apiBaseURL.SALES +
                    "/" +
                    salePayment.sale_id +
                    "/capture-payment",
                salePayment
            )
            .then((response) => {
                if (response) {
                    dispatch(setLoading(false));
                    dispatch(callSaleApi(true));
                    dispatch(
                        addToast({ text: "Sale payment created successfully" })
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
                }
            });
    };

export const fetchSalePayments =
    (sale_id, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.SALES + "/" + sale_id + "/payments")
            .then((response) => {
                if (response) {
                    dispatch({
                        type: saleActionType.FETCH_SALE_PAYMENT,
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
                }
            });
    };

export const editSalePayment =
    (details, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        apiConfig
            .post(
                apiBaseURL.SALES + "/" + details.payment_id + "/payment",
                details
            )
            .then((response) => {
                if (response) {
                    dispatch(
                        addToast({ text: "Sale payment updated successfully" })
                    );
                    const data = response.data.data.attributes;
                    const newData = Object.assign(data, {
                        id: response.data.data.id,
                    });
                    newData &&
                        dispatch({
                            type: saleActionType.EDIT_SALE_PAYMENT,
                            payload: newData,
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
                }
            });
    };

export const deleteSalePayment =
    (paymentId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .delete(apiBaseURL.SALES + "/" + paymentId + "/payment")
            .then((response) => {
                if (response) {
                    dispatch({
                        type: saleActionType.DELETE_SALE_PAYMENT,
                        payload: paymentId,
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
                }
            });
    };
