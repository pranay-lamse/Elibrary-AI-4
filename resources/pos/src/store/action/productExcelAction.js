import { setLoading } from "./loadingAction";
import apiConfig from "../../config/apiConfig";
import { toastType } from "../../constants";
import { addToast } from "./toastAction";

export const productExcelAction =
    (setIsWarehouseValue, isLoading = true, id) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        await apiConfig
            .get(`products-export-excel` + `${id ? "?id=" + id : ""}`)
            .then((response) => {
                if (response) {
                    window.open(response.data.data.product_excel_url, "_blank");
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
