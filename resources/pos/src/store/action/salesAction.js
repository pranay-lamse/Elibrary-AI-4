import apiConfig from "../../config/apiConfig";
import { apiBaseURL, saleActionType, toastType } from "../../constants";
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

export const fetchSales =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        const admin = true;
        let url = apiBaseURL.SALES;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at ||
                filter.customer_id)
        ) {
            url += requestParam(filter, admin);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: saleActionType.FETCH_SALES,
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

export const fetchSale =
    (saleId, singleSale, isLoading = true) =>
    async (dispatch) => {
        await apiConfig
            .get(apiBaseURL.SALES + "/" + saleId + "/edit", singleSale)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: saleActionType.FETCH_SALE,
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

export const addSale = (sale, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.SALES, sale)
        .then((response) => {
            if (response) {
                dispatch({
                    type: saleActionType.ADD_SALE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "sale.success.create.message"
                        ),
                    })
                );
                dispatch(addInToTotalRecord(1));
                navigate("/admin/pos/sales");
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

export const editSale = (saleId, sale, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .patch(apiBaseURL.SALES + "/" + saleId, sale)
        .then((response) => {
            if (response) {
                dispatch(
                    addToast({
                        text: getFormattedMessage("sale.success.edit.message"),
                    })
                );
                navigate("/admin/pos/sales");
                dispatch({
                    type: saleActionType.EDIT_SALE,
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

export const deleteSale = (userId) => async (dispatch) => {
    await apiConfig
        .delete(apiBaseURL.SALES + "/" + userId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({ type: saleActionType.DELETE_SALE, payload: userId });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "sale.success.delete.message"
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
