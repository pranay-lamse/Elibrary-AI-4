import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    brandsActionType,
    emailTemplatesActionType,
    smsTemplatesActionType,
    toastType,
} from "../../constants";
import requestParam from "../../shared/lms-requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    setTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchEmailTemplates =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.EMAIL_TEMPLATES;
        if (
            !_.isEmpty(filter) &&
            (filter.page || filter.pageSize || filter.search || filter.order_By)
        ) {
            url += requestParam(filter, false, false, true);
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: emailTemplatesActionType.FETCH_EMAIL_TEMPLATES,
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
                }
            });
    };

export const fetchEmailTemplate = (Id) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.EMAIL_TEMPLATES + "/" + Id + "/edit")
        .then((response) => {
            if (response) {
                dispatch({
                    type: emailTemplatesActionType.FETCH_EMAIL_TEMPLATE,
                    payload: response.data.data,
                });
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

export const UpdateEmailTemplate =
    (Id, emailTemplate, navigate) => async (dispatch) => {
        apiConfig
            .put(apiBaseURL.EMAIL_TEMPLATES + "/" + Id, emailTemplate)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: emailTemplatesActionType.EDIT_EMAIL_TEMPLATE,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "email-template.success.edit.message"
                            ),
                        })
                    );
                    navigate("/admin/pos/email-templates");
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

export const activeInactiveEmail = (Id) => async (dispatch) => {
    apiConfig
        .post(apiBaseURL.EMAIL_TEMPLATES_STATUS + "/" + Id)
        .then((response) => {
            if (response) {
                dispatch({
                    type: emailTemplatesActionType.SET_ACTIVE_DE_ACTIVE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "email.status.edit.success.message"
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
