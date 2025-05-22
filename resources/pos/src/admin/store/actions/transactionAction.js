import { transcationActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";



export const fetchTransactions =
    (filter = {}, isLoading = false) =>
        async (dispatch) => {
            let url = apiBaseURL.TRANSACTION_GET;

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
                            type: transcationActionType.FETCH_TRANSCATION,
                            payload: response.data.data,
                        });
                        dispatch(setTotalRecord(response.data.totalRecords));
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
