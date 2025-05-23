import { setLoading } from "./loadingAction";
import apiConfig from "../../config/apiConfig";
import { toastType } from "../../constants";
import { addToast } from "./toastAction";

export const saleExcelAction =
    (warehouse, setIsWarehouseValue, filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        await apiConfig
            .get(`sales-report-excel?warehouse_id=${warehouse}`)
            .then((response) => {
                if (response) {
                    window.open(response.data.data.sale_excel_url, "_blank");
                    setIsWarehouseValue(false);
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
