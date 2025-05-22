import { publisherActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";
import apiConfigwithoutTokenWithRoot from "../../../member/config/apiConfigwithoutTokenWithRoot";

export const fetchPublishers =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.PUBLISHER;

        if (
            (!_.isEmpty(filter) && filter.limit) ||
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
                        type: publisherActionType.FETCH_PUBLISHERS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
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
                }
                isLoading ? dispatch(setLoading(false)) : null;
            });
    };

export const fetchPublishersWithout =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        let url = apiBaseURL.PUBLISHER;

        if (
            (!_.isEmpty(filter) && filter.limit) ||
            filter.order_By ||
            filter.search
        ) {
            url += requestParam(filter);
        }

        await apiConfigwithoutTokenWithRoot
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: publisherActionType.FETCH_PUBLISHERS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
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

export const addPublisher = (Publisher, filterObj) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.PUBLISHER, Publisher)
        .then((response) => {
            if (response) {
                dispatch({
                    type: publisherActionType.ADD_PUBLISHER,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "publishers.success.create.message"
                        ),
                    })
                );
                dispatch(toggleModal());
                dispatch(fetchPublishers(filterObj));
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

export const editPublisher = (publisherId, publisher) => async (dispatch) => {
    await apiConfig
        .put(apiBaseURL.PUBLISHER + "/" + publisherId, publisher)
        .then((response) => {
            if (response) {
                dispatch({
                    type: publisherActionType.EDIT_PUBLISHER,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "publishers.success.edit.message"
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

export const deletePublisher = (publisherId) => async (dispatch) => {
    await apiConfig
        .delete(apiBaseURL.PUBLISHER + "/" + publisherId)
        .then(() => {
            dispatch({
                type: publisherActionType.DELETE_PUBLISHER,
                payload: publisherId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "publishers.success.delete.message"
                    ),
                })
            );
            dispatch(toggleModal());
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
