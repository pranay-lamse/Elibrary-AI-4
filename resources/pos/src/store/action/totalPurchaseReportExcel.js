import apiConfig from "../../config/apiConfig";
import { setLoading } from "./loadingAction";
import { addToast } from "./toastAction";

export const totalPurchaseReportExcel =
    (dates, filter = {}, isLoading = true, setIsWarehouseValue) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        await apiConfig
            .get(
                `total-purchase-report-excel?start_date=${
                    dates.start_date ? dates.start_date : null
                }&end_date=${dates.end_date ? dates.end_date : null}`
            )
            .then((response) => {
                if (response) {
                    window.open(
                        response.data.data.total_purchase_excel_url,
                        "_blank"
                    );
                    setIsWarehouseValue(false);
                    dispatch(setLoading(false));
                }
            })
            .catch((response) => {
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
