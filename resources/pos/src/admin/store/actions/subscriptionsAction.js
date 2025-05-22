import { setLoading } from "../../../store/action/progressBarAction";
import { apiBaseURL } from "../../../constants";
import requestParam from "../../../shared/lms-requestParam";
import apiConfig from "../../config/apiConfig";
import { subscriptionsActionType, toastType } from "../../constants";
import { setTotalRecord } from "./totalRecordAction";
import { addToast } from "../../../store/action/toastAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { toggleModal } from "../../../store/action/modalAction";
import "../../components/members/Members.scss";

export const fetchSubscriptions =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        let url = apiBaseURL.SUBSCRIPTION;
        if (
            filter.limit ||
            filter.order_By ||
            filter.search ||
            filter.pageSize
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: subscriptionsActionType.FETCH_SUBSCRIPTIONS,
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

export const editSubscription =
    (subsId, formValue, subscription) => async (dispatch) => {
        await apiConfig
            .post(apiBaseURL.UPDATE_SUBSCRIPTION + "/" + subsId, formValue)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: subscriptionsActionType.EDIT_SUBSCRIPTION,
                        payload: {
                            ...subscription,
                            end_date: formValue.end_date,
                        },
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "subscription.edit.success.message"
                            ),
                        })
                    );
                    dispatch(toggleModal());
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

export const setActiveInactiveSubs =
    (subsId, status, isActive, subscription) => async (dispatch) => {
        await apiConfig
            .post(apiBaseURL.UPDATE_SUBSCRIPTION + "/" + subsId, status)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: subscriptionsActionType.SET_ACTIVE_DE_ACTIVE,
                        payload: { ...subscription, status: isActive },
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                !isActive
                                    ? "subscription.status.inactive.success.message"
                                    : "subscription.status.active.success.message"
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
