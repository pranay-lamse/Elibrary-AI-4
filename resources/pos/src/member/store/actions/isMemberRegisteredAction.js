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
import libraryStatus from "../../../components/newMemberApp/libraryStatus.json";

export const fetchMemberStatus = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get("/is-member-registered/" + id)
        .then((response) => {
            if (response) {
                dispatch({
                    type: "IS_MEMBER_REGISTERED",
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

export const registerMemberToLibrary =
    (member, library_id, navigate) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfigWthFormData
            .post("/register-member-to-library/" + library_id)
            .then((response) => {
                if (response) {
                    dispatch(fetchMemberStatus(member.id));
                    // dispatch({
                    //     type: memberActionType.EDIT_MEMBER,
                    //     payload: response.data.data,
                    // });
                    dispatch(
                        addToast({
                            text: `You are Successfully Registered to ${
                                libraryStatus.find(
                                    (status) => status.id == library_id
                                ).name
                            } with same email and passworld is Pass@123 .`,
                        })
                    );
                    dispatch(setLoading(false));
                    // dispatch(
                    //     setUserProfile(LocalStorageKey.MEMBER, response.data.data)
                    // );
                    // navigate(-1);
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
