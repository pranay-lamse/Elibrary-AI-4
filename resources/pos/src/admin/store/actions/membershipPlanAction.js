import { membershipPlanActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfig2 from "../../config/apiConfig2";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";

export const fetchMembershipPlans =
    (isLoading = false) =>
        async (dispatch) => {
            dispatch(setLoading(true));
            await apiConfig
                .get(apiBaseURL.MEMBER_PLAN)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: membershipPlanActionType.FETCH_MEMBERSHIP_PLANS,
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

export const addMembershipPlan = (membershipPlan) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.MEMBER_PLAN, membershipPlan)
        .then((response) => {
            if (response) {
                dispatch({
                    type: membershipPlanActionType.ADD_MEMBERSHIP_PLAN,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "membership-plans.success.create.message"
                        ),
                    })
                );
                dispatch(toggleModal());
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

export const createMembershipPaymentSessionBackend2 =
    (plan_id, cardCheckboxValues, pdfFile, libraryIdNew, memberId, navigate) =>
        async (dispatch) => {
            dispatch(setLoading(true));

            const formData = new FormData();
            formData.append("pdf_preview_file", pdfFile);
            formData.append("libraryIdNew", libraryIdNew);
            formData.append("memberId", memberId);

            try {
                const response = await apiConfig2.post(
                    apiBaseURL.CREATE_MEMBERSHIP_PAYMENT_BACKEND_SESSION2 + `/${plan_id}`,
                    formData
                );


                dispatch({
                    type: membershipPlanActionType.ADD_MEMBERSHIP_UPDATE_PLAN,
                    payload: response.data.data,
                });
                dispatch(addToast({ text: "Subscription Deleted Successfully" }));
                dispatch(setLoading(false));
                navigate("/admin/pos/members");
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
export const createMembershipPaymentSessionBackendDeleteSubscription =
    (planId, navigate) =>
        async (dispatch) => {
            dispatch(setLoading(true));



            try {
                const response = await apiConfig.delete(
                    apiBaseURL.DELETE_MEMBERSHIP_SUBSCRIPTION + `/${planId}`
                );


                dispatch({
                    type: membershipPlanActionType.DELETE_MEMBERSHIP_PLAN,
                    payload: response.data.data,
                });
                dispatch(addToast({ text: "Subscription Deleted Successfully" }));
                dispatch(setLoading(false));
                navigate("/admin/pos/members");
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
export const editMembershipPlan =
    (membershipPlanId, membershipPlan) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .put(
                apiBaseURL.MEMBER_PLAN + "/" + membershipPlanId,
                membershipPlan
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: membershipPlanActionType.EDIT_MEMBERSHIP_PLAN,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "membership-plans.success.edit.message"
                            ),
                        })
                    );
                    dispatch(toggleModal());
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

export const deleteMembershipPlan = (membershipPlanId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete(apiBaseURL.MEMBER_PLAN + "/" + membershipPlanId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: membershipPlanActionType.DELETE_MEMBERSHIP_PLAN,
                    payload: membershipPlanId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "membership-plans.success.delete.message"
                        ),
                    })
                );
                dispatch(toggleModal());
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
