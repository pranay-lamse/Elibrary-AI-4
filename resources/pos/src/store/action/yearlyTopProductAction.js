import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    toastType,
    yearTopProductActionType,
} from "../../constants";
import { addToast } from "./toastAction";
import { setLoading } from "./loadingAction";

export const yearlyTopProduct = () => async (dispatch) => {
    dispatch(setLoading(true));

    apiConfig
        .get(apiBaseURL.YEAR_TOP_PRODUCT)
        .then((response) => {
            if (response) {
                dispatch({
                    type: yearTopProductActionType.YEAR_TOP_PRODUCT,
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
