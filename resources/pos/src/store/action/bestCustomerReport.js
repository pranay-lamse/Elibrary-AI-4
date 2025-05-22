import { setLoading } from "./loadingAction";
import { apiBaseURL, bestCustomerActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setTotalRecord } from "./totalRecordAction";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";

export const bestCustomerReportAction =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        let url = apiBaseURL.BEST_CUSTOMERS_REPORT;
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
                        type: bestCustomerActionType.FETCH_BEST_CUSTOMER_REPORT,
                        payload: response.data,
                    });
                    dispatch(setTotalRecord(response.data.total_records));
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

export const bestCustomerPdfAction =
    (isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get(apiBaseURL.BEST_CUSTOMERS_REPORT_PDF)
            .then((response) => {
                if (response) {
                    window.open(
                        response.data.data.best_customers_pdf_url,
                        "_blank"
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
