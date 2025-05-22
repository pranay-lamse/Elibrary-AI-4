import apiConfig from "../../config/apiConfig";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../constants";
import { apiBaseURL, Routes } from "../../../constants";
import { getFormattedMessage } from "../../../shared/sharedMethod";

export const createOfflinePayment =
    (formValue, navigate) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .post(
                apiBaseURL.CREATE_OFFLINE_PAYMENT + `/${formValue.plan_id}`,
                formValue
            )
            .then((response) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "offline-payment.success.message"
                            ),
                        })
                    );
                    // toggleModal();
                    dispatch(setLoading(false));
                    navigate("/admin/pos/subscriptions");
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
