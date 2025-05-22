import apiConfig from "../../config/apiConfig";
import { apiBaseURL, adjustMentActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";
import { setLoading } from "./loadingAction";

export const getAdjustmentDetails =
    (adjustmentid, isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get(apiBaseURL.ADJUSTMENTS + "/" + adjustmentid)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: adjustMentActionType.ADJUSTMENT_DETAILS,
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
