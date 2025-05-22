import { memberActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../constants";
import { setUserProfile } from "../../../store/action/localStorageAction";
import { LocalStorageKey } from "../../../constants";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { Navigate } from "react-router";

export const fetchMember = () => async (dispatch) => {
    await apiConfig
        .get("/member-details")
        .then((response) => {
            if (response) {
                dispatch({
                    type: memberActionType.FETCH_MEMBER,
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

export const editMember = (member, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData
        .post("/update-member-profile", member)
        .then((response) => {
            if (response) {
                dispatch({
                    type: memberActionType.EDIT_MEMBER,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "profile.success.update.message"
                        ),
                    })
                );
                dispatch(setLoading(false));
                dispatch(
                    setUserProfile(LocalStorageKey.MEMBER, response.data.data)
                );
                dispatch(fetchMember());
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
