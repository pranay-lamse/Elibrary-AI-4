import apiConfig from "../../config/apiConfig";
import { apiBaseURL, currencyActionType, toastType } from "../../constants";
import requestParam from "../../shared/lms-requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const getOrSetCurrency = (currency) => {
    return { type: constants.GET_SET_CURRENCY, payload: currency };
};

export const fetchCurrencies =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.CURRENCY;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter);
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: currencyActionType.FETCH_CURRENCIES,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
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

export const fetchCurrency = (currencyId) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.CURRENCY + "/" + currencyId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: currencyActionType.FETCH_CURRENCY,
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

export const addCurrency = (currency) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.CURRENCY, currency)
        .then((response) => {
            if (response) {
                dispatch({
                    type: currencyActionType.ADD_CURRENCY,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "currency.success.create.message"
                        ),
                    })
                );
                dispatch(addInToTotalRecord(1));
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

export const editCurrency =
    (currencyId, currency, handleClose) => async (dispatch) => {
        apiConfig
            .put(apiBaseURL.CURRENCY + "/" + currencyId, currency)
            .then((response) => {
                if (response) {
                    dispatch(setLoading(false));
                    dispatch({
                        type: currencyActionType.EDIT_CURRENCY,
                        payload: response.data.data,
                    });
                    handleClose(false);
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "currency.success.edit.message"
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
                    dispatch(setLoading(false));
                }
            });
    };

export const deleteCurrency = (currencyId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.CURRENCY + "/" + currencyId)
        .then((response) => {
            if (response) {
                dispatch(setLoading(false));
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: currencyActionType.DELETE_CURRENCY,
                    payload: currencyId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "currency.success.delete.message"
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
                dispatch(setLoading(false));
            }
        });
};
