import { membershipPlanActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../constants";
import { apiBaseURL } from "../../../constants";
import { setUserProfile } from "../../../store/action/localStorageAction";

export const createMembershipPaymentSession =
    (plan_id, cardCheckboxValues, plan_amount, libraryIdNew, navigate) =>
        async (dispatch) => {
            const { checkbox1, checkbox2, checkbox3 } = cardCheckboxValues;

            dispatch(setLoading(true));
            await apiConfig
                .post(
                    apiBaseURL.CREATE_MEMBERSHIP_PAYMENT_SESSION + `/${plan_id}`,
                    { checkbox1, checkbox2, checkbox3, plan_amount, libraryIdNew }
                )
                .then((response) => {
                    if (response) {
                        localStorage.setItem(
                            "member",
                            btoa(JSON.stringify(response.data.message.user))
                        );
                        dispatch({
                            type: membershipPlanActionType.FETCH_SESSION_ID,
                            payload: response.data.message.sessionId,
                        });
                        dispatch(
                            addToast({
                                text: "Subscription Created Successfully",
                            })
                        );
                        dispatch(setLoading(false));
                        navigate("/");
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


export const createMembershipPaymentSessionBillDesk =
    (plan_id, cardCheckboxValues, plan_amount, libraryIdNew, navigate) =>
        async (dispatch) => {
            const { checkbox1, checkbox2, checkbox3 } = cardCheckboxValues;

            dispatch(setLoading(true));
            await apiConfig
                .post(
                    apiBaseURL.CREATE_MEMBERSHIP_PAYMENT_SESSION_BILL_DESK + `/${plan_id}`,
                    { checkbox1, checkbox2, checkbox3, plan_amount, libraryIdNew }
                )
                .then((response) => {
                    if (response) {
                        localStorage.setItem(
                            "member",
                            btoa(JSON.stringify(response.data.message.user))
                        );
                        dispatch({
                            type: membershipPlanActionType.FETCH_SESSION_ID,
                            payload: response.data.message.sessionId,
                        });
                        dispatch(
                            addToast({
                                text: "Subscription Created Successfully",
                            })
                        );
                        dispatch(setLoading(false));
                        navigate("/");
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




export const createMembershipPaymentSession2 =
    (plan_id, cardCheckboxValues, pdfFile, libraryIdNew, navigate) =>
        async (dispatch) => {
            dispatch(setLoading(true));

            const formData = new FormData();
            formData.append("pdf_preview_file", pdfFile);
            formData.append("libraryIdNew", libraryIdNew);

            try {
                const response = await apiConfig.post(
                    apiBaseURL.CREATE_MEMBERSHIP_PAYMENT_SESSION2 + `/${plan_id}`,
                    formData
                );

                localStorage.setItem(
                    "member",
                    btoa(JSON.stringify(response.data.message.user))
                );
                dispatch({
                    type: membershipPlanActionType.FETCH_SESSION_ID,
                    payload: response.data.message.sessionId,
                });
                dispatch(addToast({ text: "Subscription Created Successfully" }));
                dispatch(setLoading(false));
                navigate("/");
            } catch (error) {
                if (error.response) {
                    dispatch(
                        addToast({
                            text: error.response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
                dispatch(setLoading(false));
            }
        };




export const createMembershipPaymentSession3 =
    (
        plan_id,
        cardCheckboxValues,
        memberOne,
        memberTwo,
        memberThree,
        plan_amount,
        libraryIdNew,
        navigate
    ) =>
        async (dispatch) => {
            dispatch(setLoading(true));
            const { checkbox1, checkbox2, checkbox3 } = cardCheckboxValues;

            const formData = new FormData();
            formData.append("memberOne", memberOne);
            formData.append("memberTwo", memberTwo);
            formData.append("memberThree", memberThree);
            formData.append("checkbox1", checkbox1);
            formData.append("checkbox2", checkbox2);
            formData.append("checkbox3", checkbox3);
            formData.append("libraryIdNew", libraryIdNew);
            formData.append("plan_amount", plan_amount);

            try {
                const response = await apiConfig.post(
                    apiBaseURL.CREATE_MEMBERSHIP_PAYMENT_SESSION3 + `/${plan_id}`,
                    formData
                );

                localStorage.setItem(
                    "member",
                    btoa(JSON.stringify(response.data.message.user))
                );
                dispatch({
                    type: membershipPlanActionType.FETCH_SESSION_ID,
                    payload: response.data.message.sessionId,
                });
                dispatch(addToast({ text: "Subscription Created Successfully" }));
                dispatch(setLoading(false));
                navigate("/");
            } catch (error) {
                if (error.response) {
                    dispatch(
                        addToast({
                            text: error.response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
                dispatch(setLoading(false));
            }
        };

export const createMembershipPaymentSession4 =
    (plan_id, cardCheckboxValues, plan_amount, subscription_id, navigate) =>
        async (dispatch) => {
            const { checkbox1, checkbox2, checkbox3 } = cardCheckboxValues;

            dispatch(setLoading(true));
            await apiConfig
                .post(
                    apiBaseURL.CREATE_MEMBERSHIP_PAYMENT_SESSION4 + `/${plan_id}`,
                    {
                        checkbox1,
                        checkbox2,
                        checkbox3,
                        plan_amount,
                        subscription_id,
                    }
                )
                .then((response) => {
                    if (response) {
                        localStorage.setItem(
                            "member",
                            btoa(JSON.stringify(response.data.message.user))
                        );
                        dispatch({
                            type: membershipPlanActionType.FETCH_SESSION_ID,
                            payload: response.data.message.sessionId,
                        });
                        dispatch(
                            addToast({
                                text: "Subscription Created Successfully",
                            })
                        );
                        dispatch(setLoading(false));
                        navigate("/");
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
