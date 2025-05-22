import { genreActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigwithoutTokenWithRoot from "../../../member/config/apiConfigwithoutTokenWithRoot";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";

export const fetchGenresWithout =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.GENRE;

        if (
            !_.isEmpty(filter) &&
            (filter.limit || filter.order_By || filter.search)
        ) {
            url += requestParam(filter);
        }

        await apiConfigwithoutTokenWithRoot
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: genreActionType.FETCH_GENRES,
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
                    dispatch(setLoading(false));
                }
            });
    };
export const fetchGenres =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.GENRE;

        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.pageSize ||
                filter.order_By ||
                filter.search)
        ) {
            url += requestParam(filter);
        }

        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: genreActionType.FETCH_GENRES,
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
                    dispatch(setLoading(false));
                }
            });
    };

export const addGenre = (genre, filterObj) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.GENRE, genre)
        .then((response) => {
            if (response) {
                dispatch({
                    type: genreActionType.ADD_GENRE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "genres.success.create.message"
                        ),
                    })
                );
                dispatch(toggleModal());
                dispatch(fetchGenres(filterObj));
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

export const editGenre = (genreId, genre) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .put(apiBaseURL.GENRE + "/" + genreId, genre)
        .then((response) => {
            if (response) {
                dispatch({
                    type: genreActionType.EDIT_GENRE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "genres.success.edit.message"
                        ),
                    })
                );
                dispatch(toggleModal());
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

export const deleteGenre =
    (genreId, filterObj = {}, totalRecord) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .delete(apiBaseURL.GENRE + "/" + genreId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: genreActionType.DELETE_GENRE,
                        payload: genreId,
                    });
                    dispatch(setTotalRecord(totalRecord - 1));
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "genres.success.delete.message"
                            ),
                        })
                    );
                    dispatch(toggleModal());
                    // dispatch(fetchGenres(filterObj));
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
