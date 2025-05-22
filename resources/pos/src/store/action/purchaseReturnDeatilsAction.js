import { setLoading } from "./loadingAction";
import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    purchaseReturnActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";

export const fetchPurchaseReturnDetails =
    (purchaseId, singlePurchase, isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get(
                apiBaseURL.PURCHASES_RETURN_DETAILS + "/" + purchaseId,
                singlePurchase
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: purchaseReturnActionType.PURCHASES_RETURN_DETAILS,
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
