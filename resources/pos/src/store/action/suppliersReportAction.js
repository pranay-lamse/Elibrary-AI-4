import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType, supplierActionType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import { setTotalRecord } from "./totalRecordAction";
import { setLoading } from "./loadingAction";

export const fetchSuppliersReport =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.SUPPLIERS_REPORT;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at ||
                filter.warehouse_id)
        ) {
            url += requestParam(filter);
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: supplierActionType.FETCH_SUPPLIERS_REPORT,
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
