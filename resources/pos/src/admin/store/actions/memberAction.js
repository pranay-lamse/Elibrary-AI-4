import { memberActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL, Routes } from "../../../constants";

export const fetchMembers =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        let url = apiBaseURL.MEMBER;
        if (
            filter.limit ||
            filter.pageSize ||
            filter.order_By ||
            filter.search
        ) {
            url += requestParam(filter);
        }

        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: memberActionType.FETCH_MEMBERS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                }
                dispatch(setLoading(false));
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
                dispatch(setLoading(false));
            });
    };

export const fetchMember =
    (memberId, isLoading = false) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        await apiConfig
            .get(apiBaseURL.MEMBER + "/" + memberId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: memberActionType.FETCH_MEMBER,
                        payload: response.data.data,
                    });
                }
                dispatch(setLoading(false));
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
                dispatch(setLoading(false));
            });
    };

export const addMember = (member, navigate) => async (dispatch) => {
    await apiConfigWthFormData
        .post(apiBaseURL.MEMBER, member)
        .then((response) => {
            if (response) {
                // fetchMembers();
                // dispatch({
                //     type: memberActionType.ADD_MEMBER,
                //     payload: response.data.data,
                // });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "members.success.create.message"
                        ),
                    })
                );
                navigate(-1);
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

export const editMember = (memberId, member, navigate) => async (dispatch) => {
    await apiConfigWthFormData
        .post(apiBaseURL.MEMBER + "/" + memberId, member)
        .then((response) => {
            if (response) {
                // dispatch({
                //     type: memberActionType.EDIT_MEMBER,
                //     payload: response.data.data,
                // });
                dispatch(addToast({ text: response.data.message }));
                navigate(-1);
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

export const deleteMember = (memberId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete(apiBaseURL.MEMBER + "/" + memberId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: memberActionType.DELETE_MEMBER,
                    payload: memberId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "members.success.delete.message"
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

export const activeInactiveMember =
    (memberId, isActive) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(apiBaseURL.MEMBER + "/" + memberId + "/update-status")
            .then((response) => {
                if (response) {
                    dispatch({
                        type: memberActionType.SET_ACTIVE_DE_ACTIVE,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                !isActive
                                    ? "members.success.active-account.message"
                                    : "members.success.inactive-account.message"
                            ),
                        })
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

export const activeInactiveMemberLibraryStatus =
    (memberId, isActive) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(apiBaseURL.MEMBER + "/" + memberId + "/update-status")
            .then((response) => {
                if (response) {
                    dispatch({
                        type: memberActionType.SET_ACTIVE_DE_ACTIVE,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                !isActive
                                    ? "members.success.active-account.message"
                                    : "members.success.inactive-account.message"
                            ),
                        })
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

export const activeInactiveMemberEbookStatus =
    (memberId, isActive) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(apiBaseURL.MEMBER + "/" + memberId + "/update-status")
            .then((response) => {
                if (response) {
                    dispatch({
                        type: memberActionType.SET_ACTIVE_DE_ACTIVE,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                !isActive
                                    ? "members.success.active-account.message"
                                    : "members.success.inactive-account.message"
                            ),
                        })
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

export const activeInactiveMemberBookStatus =
    (memberId, isActive) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(apiBaseURL.MEMBER + "/" + memberId + "/update-status")
            .then((response) => {
                if (response) {
                    dispatch({
                        type: memberActionType.SET_ACTIVE_DE_ACTIVE,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                !isActive
                                    ? "members.success.active-account.message"
                                    : "members.success.inactive-account.message"
                            ),
                        })
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

export const meberSendMail = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.MEMBER + "/" + id + "/re-activation")
        .then((response) => {
            if (response) {
                dispatch(addToast({ text: response.data.message }));
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

export const exportMembers =
    (cb, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = "members-export";
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    // dispatch({
                    //     type: bookActionType.EXPORT_BOOK,
                    //     payload: response.data.data,
                    // });
                    dispatch(addToast({ text: response.data.message }));
                    cb({ url: response.data.data });
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

export const exportUserCard =
    (cb, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = "generate-userid";
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    // dispatch({
                    //     type: bookActionType.EXPORT_BOOK,
                    //     payload: response.data.data,
                    // });
                    // dispatch(addToast({ text: response.data.message }));
                    // cb({ url: response.data.data });
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
