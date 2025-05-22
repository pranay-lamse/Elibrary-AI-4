import { toastType, bookRequestActionType } from "../../constants/index";
import apiConfig from "../../config/apiConfig";
import apiConfigwithoutTokenWithRoot from "../../config/apiConfigwithoutTokenWithRoot";

import { addToast } from "../../../store/action/toastAction";
import { apiBaseURL } from "../../constants/index";

import { setLoading } from "../../../store/action/progressBarAction";

export const fetchEbookSubscription = (id) => async (dispatch) => {
    await apiConfigwithoutTokenWithRoot
        .get(apiBaseURL.EBOOK_SUBSCRIPTION + "/" + id)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookRequestActionType.FETCH_EBOOK_SUBSCRIPTION,
                    payload: response.data.data,
                });
                dispatch({
                    type: "FETCH_TOTAL_ESUB",
                    payload: response.data.totalAmount,
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

export const ebookSubscribe = (data, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    const {
        issued_on,
        library_id,
        returned_on,
        ebook_id,
        member_id,
        razorpay_payment_id,
        renew,
        amount,
    } = data;
    await apiConfig
        .post(apiBaseURL.EBOOK_SUBSCRIPTION, {
            issued_on,
            returned_on,
            ebook_id,
            member_id,
            library_id,
            razorpay_payment_id,
            renew,
            amount,
        })
        .then((response) => {
            if (response) {
                dispatch(
                    addToast({
                        text: response.data.message,
                    })
                );
                dispatch(setLoading(false));
            }
            setTimeout(() => navigate("/lms/e-books"), 3000);
            // dispatch({
            //     type: bookRequestActionType.FETCH_EBOOK_SUBSCRIPTION,
            //     payload: response.data.data,
            // });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
            dispatch(setLoading(false));
        });
};
