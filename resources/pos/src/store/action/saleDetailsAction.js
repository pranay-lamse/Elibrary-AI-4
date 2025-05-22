import { setLoading } from "./loadingAction";
import apiConfig from "../../config/apiConfig";
import { apiBaseURL, saleActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";

export const saleDetailsAction =
    (saleId, singleSale, isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get(apiBaseURL.SALE_DETAILS + "/" + saleId, singleSale)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: saleActionType.SALE_DETAILS,
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
