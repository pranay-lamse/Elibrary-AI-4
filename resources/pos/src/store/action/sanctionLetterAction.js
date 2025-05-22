import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType, customerActionType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";

export const fetchSanctionLetters =
    (filter = {}, navigate, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.SANCTION_LETTER;
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.direction)
        ) {
            url +=
                "?direction=" +
                filter.direction +
                "&pageSize=" +
                filter.pageSize +
                "&search=" +
                filter.search;
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "FETCH_BOOK_REQUEST_LETTERS",
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
export const fetchSanctionLetter =
    (id, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        apiConfig
            .get(apiBaseURL.SANCTION_LETTER + "/" + id)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: "FETCH_BOOK_REQUEST_LETTERS",
                        payload: response.data.data,
                    });
                    dispatch({
                        type: "SET_INITIALVALUES",
                        payload: response.data.data[0],
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
export const fetchSanctionLetter2 =
    (id, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        apiConfig
            .get(apiBaseURL.SANCTION_LETTER2 + "/" + id)
            .then((response) => {
                if (response) {
                    console.log("responsesacneteletter2 ", response);
                    dispatch({
                        type: "FETCH_RESOURCES",
                        payload: response.data,
                    });
                    dispatch({
                        type: "SET_INITIALVALUES",
                        payload: response.data,
                    });
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };
export const addSanctionLetter = (data, navigate) => async (dispatch) => {
    // console.log({ data });
    // return 0;
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.SANCTION_LETTER2, data)
        .then((response) => {
            if (response) {
                dispatch(
                    addToast({
                        text: "Sanction Letter added successfully",
                    })
                );
                navigate(-1);
                dispatch(setLoading(false));
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(setSavingButton(false));
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

export const addSanctionLetter2 = (id, data, navigate) => async (dispatch) => {
    // console.log({ data });
    // return 0;

    dispatch(setLoading(true));
    await apiConfig
        .post(
            apiBaseURL.SANCTION_LETTER_UPDATE2 + "/" + id,

            data
        )
        .then((response) => {
            if (response) {
                dispatch(
                    addToast({
                        text: "Resource Updated successfully",
                    })
                );
                navigate(-1);
                dispatch(setLoading(false));
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(setSavingButton(false));
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

export const addSanctionLetterItem = (data, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post("/add-letter-item", data)
        .then((response) => {
            if (response) {
                dispatch(
                    addToast({
                        text: "Sanction Letter Items Added successfully.",
                    })
                );
                // navigate(-1);
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

export const deleteLetter =
    (id, filterObj = {}) =>
    async (dispatch) => {
        await apiConfig
            .delete(apiBaseURL.SANCTION_LETTER + "/" + id)
            .then(() => {
                dispatch(fetchSanctionLetters());
                dispatch(
                    addToast({
                        text: "Letter Deleted Successfully.",
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

export const deleteLetterItem = (data) => async (dispatch) => {
    await apiConfig
        .delete("/delete-letter-item/" + data.id)
        .then(() => {
            dispatch(fetchSanctionLetter(data.letter_id));
            dispatch(
                addToast({
                    text: "Letter Item Deleted Successfully.",
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

export const updateSanctionLetterItem =
    (data, navigate) => async (dispatch) => {
        // console.log({ data });
        // return 0;
        dispatch(setLoading(true));
        await apiConfig
            .post("/edit-letter-item", data)
            .then((response) => {
                if (response) {
                    dispatch(fetchSanctionLetter(data.letter_id));
                    dispatch(
                        addToast({
                            text: "Sanction Letter Updated successfully",
                        })
                    );
                    navigate(-1);
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(setSavingButton(false));
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
