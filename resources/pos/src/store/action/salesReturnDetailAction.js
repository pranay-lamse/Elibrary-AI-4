import { setLoading } from "./loadingAction";
import apiConfig from "../../config/apiConfig";
import { apiBaseURL, saleReturnActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";

export const fetchSaleReturnDetails =
    (saleId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.SALE_RETURN_DETAILS + "/" + saleId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: saleReturnActionType.FETCH_SALE_RETURN_DETAILS,
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
