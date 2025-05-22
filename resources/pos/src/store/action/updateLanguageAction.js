import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    toastType,
    languageActionType,
    Tokens,
} from "../../constants";
import { addToast } from "./toastAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setLoading } from "./loadingAction";

export const updateLanguage = (language) => async (dispatch) => {
    apiConfig
        .post(apiBaseURL.CHANGE_LANGUAGE, language)
        .then((response) => {
            if (response) {
                if (language.language) {
                    window.location.reload();
                }
                localStorage.setItem(
                    Tokens.UPDATED_LANGUAGE,
                    response.data.data
                );
                dispatch({
                    type: languageActionType.UPDATE_LANGUAGE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "change-language.update.success.message"
                        ),
                    })
                );
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
