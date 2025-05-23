import { setLoading } from "./loadingAction";
import {
    apiBaseURL,
    stockReportActionType,
    supplierReportActionType,
    toastType,
} from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setTotalRecord } from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";

export const fetchSupplierPurchaseReport =
    (id, filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.SUPPLIER_PURCHASE_REPORT + "/" + id;
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
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: supplierReportActionType.FETCH_SUPPLIER_PURCHASE_REPORT,
                        payload: response.data.data.data,
                    });
                    dispatch(setTotalRecord(response.data.data.total));
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

export const fetchSupplierPurchaseReturnReport =
    (id, filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.SUPPLIER_PURCHASE_RETURN_REPORT + "/" + id;
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
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: supplierReportActionType.FETCH_SUPPLIER_PURCHASE_RETURN,
                        payload: response.data.data.data,
                    });
                    dispatch(setTotalRecord(response.data.data.total));
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
