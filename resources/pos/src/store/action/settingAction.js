import { apiBaseURL, settingActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import apiConfig from "../../config/apiConfig";
import { addToast } from "./toastAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { fetchConfig } from "./configAction";
import { setDateFormat } from "./dateFormatAction";
import { setDefaultCountry } from "../defaultCountryAction";

export const fetchSetting =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        let url = apiBaseURL.SETTINGS;
        if (!_.isEmpty(filter) && (filter.page || filter.pageSize)) {
            url += requestParam(filter);
        }
        apiConfig
            .get(url)
            .then((response) => {
                dispatch(setLoading(false));
                if (response) {
                    dispatch({
                        type: settingActionType.FETCH_SETTING,
                        payload: response.data.data,
                    });
                    dispatch(
                        setDateFormat(response.data.data.attributes.date_format)
                    );

                    dispatch(
                        setDefaultCountry({
                            countries: response.data.data.attributes.countries,
                            country: response.data.data.attributes.country,
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

export const editSetting =
    (setting, isLoading = true, setDefaultDate) =>
    async (dispatch) => {
        apiConfig
            .post(apiBaseURL.SETTINGS, setting)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: settingActionType.EDIT_SETTINGS,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "settings.success.edit.message"
                            ),
                        })
                    );
                    dispatch(fetchConfig());
                    dispatch(
                        setDateFormat(response.data.data.attributes.date_format)
                    );

                    dispatch(
                        setDefaultCountry({
                            countries: response.data.data.attributes.countries,
                            country: response.data.data.attributes.country,
                        })
                    );
                    dispatch(fetchSetting());
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

export const fetchCacheClear = () => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.CACHE_CLEAR)
        .then((response) => {
            if (response) {
                dispatch({
                    type: settingActionType.FETCH_CACHE_CLEAR,
                    payload: response.data.message,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "settings.clear-cache.success.message"
                        ),
                    })
                );
                window.location.reload();
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

export const fetchState = (id) => async (dispatch) => {
    apiConfig
        .get("/states/" + id)
        .then((response) => {
            if (response) {
                dispatch({
                    type: "FETCH_STATE_DATA",
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
