import { authActionType, toastType } from "../../constants/index";
import apiConfig from "../../config/apiConfigWithoutToken";
import apiConfigWithRoot from "../../config/apiConfigwithoutTokenWithRoot";
import { addToast } from "../../../store/action/toastAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import {
    apiBaseURL,
    LocalStorageKey,
    loggedConstant,
    Routes,
    Tokens,
} from "../../constants/index";
import { setUserProfile } from "../../../store/action/localStorageAction";
import { getLocalStorageDataByEncryptKey } from "../../../shared/sharedMethod";
import { setLoading } from "../../../store/action/progressBarAction";

export const login = (user, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    localStorage.setItem("isMemberLogout", false);
    const { email, password } = user;
    await apiConfig
        .post(apiBaseURL.MEMBER_LOGIN, { email, password })
        .then((response) => {
            if (response) {
                // console.log(localStorage.getItem("isReset"));
                if (!response.data.data.user.membership_plan_name) {
                    if (JSON.parse(localStorage.getItem("isReset")) == true) {
                        navigate("/");
                    } else {
                        navigate(Routes.MEMBER_PLAN);
                    }
                } else {
                    if (JSON.parse(localStorage.getItem("isReset")) == false) {
                        navigate(-1);
                    } else {
                        navigate("/");
                    }
                }
                dispatch(setLoading(false));
            }
            if (user.remember_me) {
                localStorage.setItem(
                    "currentMember",
                    btoa(JSON.stringify(user))
                );
            } else {
                if (getLocalStorageDataByEncryptKey("currentMember")) {
                    localStorage.removeItem("currentMember");
                }
            }
            localStorage.setItem(Tokens.MEMBER, response.data.data.token);
            localStorage.removeItem(loggedConstant.IS_MEMBER_LOGOUT);
            dispatch(
                setUserProfile(LocalStorageKey.MEMBER, response.data.data.user)
            );
            dispatch({
                type: authActionType.LOGIN,
                payload: response.data.data,
            });
            // dispatch(
            //     addToast({
            //         text: getFormattedMessage("login.success.logged.message"),
            //     })
            // );
            localStorage.setItem("isReset", false);
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

export const forgotPassword = (user) => async (dispatch) => {
    await apiConfigWithRoot
        .post(apiBaseURL.MEMBER_FORGOT_PASSWORD, user)
        .then((response) => {
            if (response) {
                dispatch({
                    type: authActionType.FORGOT_PASSWORD,
                    payload: true,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "forgot-password.success.message"
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
            }
        });
};

export const resetPassword = (user, navigate) => async (dispatch) => {
    await apiConfigWithRoot
        .post(apiBaseURL.MEMBER_RESET_PASSWORD, user)
        .then((response) => {
            if (response) {
                localStorage.setItem("isReset", true);
                dispatch({
                    type: authActionType.RESET_PASSWORD,
                    payload: user,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "reset-password.success.message"
                        ),
                    })
                );
            }
            navigate(Routes.MEMBER_LOGIN);
        })
        .catch(({ response }) => {
            if (response) {
                // console.log({ response });
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            }
        });
};

/**
 * This method used for register a member
 * @param user
 * @param navigate
 * @returns {Function}
 */
export const registration = (user, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    const { email, password, first_name, last_name, phone, confirm_password } =
        user;
    await apiConfig
        .post(apiBaseURL.MEMBER_REGISTRATION, {
            email,
            password,
            first_name,
            last_name,
            phone,
            confirm_password,
        })
        .then((response) => {
            if (response) {
                navigate(Routes.MEMBER_LOGIN);
                dispatch({
                    type: authActionType.REGISTRATION,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: "Account registered successfully. Request email has been sent for approval",
                    })
                );
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
