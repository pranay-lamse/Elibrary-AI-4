import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    toastType,
    weekSalePurchasesActionType,
} from "../../constants";
import { addToast } from "./toastAction";
import { setLoading } from "./loadingAction";

export const weekSalePurchases = () => async (dispatch) => {
    dispatch(setLoading(true));

    apiConfig
        .get(apiBaseURL.WEEK_SALE_PURCHASES_API)
        .then((response) => {
            if (response) {
                dispatch({
                    type: weekSalePurchasesActionType.WEEK_SALE_PURCHASES,
                    payload: response.data.data,
                });
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
