import { eBookActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfigwithoutTokenWithRoot";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import requestParam from "../../../shared/requestParam";
import _ from "lodash";

export const fetchSubscriptionLimit =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        let url = "subscription-limit";
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.pageSize)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "FETCH_SUBSCRIPTION_LIMIT",
                        payload: response.data.data,
                    });
                    // dispatch(setTotalRecord(response.data.totalRecords));
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
