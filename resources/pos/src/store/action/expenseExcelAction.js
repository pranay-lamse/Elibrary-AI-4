import apiConfig from "../../config/apiConfig";
import { toastType } from "../../constants";
import { addToast } from "./toastAction";
import { setLoading } from "./loadingAction";

export const expenseExcelAction =
    (warehouse, setIsWarehouseValue, filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(`expense-report-excel?warehouse_id=${warehouse}`)
            .then((response) => {
                if (response) {
                    window.open(response.data.data.expense_excel_url, "_blank");
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
                    dispatch(setLoading(false));
                }
            });
    };
