import { toastType, transactionsActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { apiBaseURL } from "../../constants/index";

export const fetchTransactions =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        let url = apiBaseURL.MEMBER_TRANSACTIONS;
        if (
            !_.isEmpty(filter) &&
            (filter.limit || filter.order_By || filter.search)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: transactionsActionType.FETCH_MEMBER_TRANSACTIONS,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.totalRecords));
                }
                isLoading ? dispatch(setLoading(false)) : null;
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
                isLoading ? dispatch(setLoading(false)) : null;
            });
    };
