import apiConfig from "../../config/apiConfig";
import { appSettingActionType } from "../../constants";
import { addToast } from "./toastAction";
import { toastType } from "../../constants";

export const fetchAppSetting = () => async (dispatch) => {
    await apiConfig
        .get("library-details")
        .then((response) => {
            if (response) {
                dispatch({
                    type: appSettingActionType.FETCH_APP_SETTING,
                    payload: response.data.data,
                });
            }
            // console.log({ response });
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
            // console.log({ response });
        });
};

export const editAppSetting = (appSetting) => {
    return { type: appSettingActionType.EDIT_APP_SETTING, payload: appSetting };
};
