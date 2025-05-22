import { currentMembershipDetails, memberActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../constants";

export const fetchCurrentPlanDetails = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get(`membership-details`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: currentMembershipDetails.FETCH_CURRENT_MEMBERSHIPDETAILS,
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
