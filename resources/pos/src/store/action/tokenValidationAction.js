import apiConfig from "../../config/apiConfig";
import { apiBaseURL, tokenValidationActionType } from "../../constants";

export const tokenValidation = (token) => async (dispatch) => {
    apiConfig
        .post(apiBaseURL.VALIDATE_AUTH_TOKEN)
        .then((response) => {
            if (response) {
                dispatch({
                    type: tokenValidationActionType.FETCH_VALIDATION,
                    payload: response.data,
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
