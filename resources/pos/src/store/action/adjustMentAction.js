import apiConfig from "../../config/apiConfig";
import { apiBaseURL, adjustMentActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import requestParam from "../../shared/lms-requestParam";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { callSaleApi } from "./saleApiAction";
import { setSavingButton } from "./saveButtonAction";

export const fetchAdjustments =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        const admin = true;
        let url = apiBaseURL.ADJUSTMENTS;
        if (
            !_.isEmpty(filter) &&
            (filter.page || filter.pageSize || filter.search || filter.pageSize)
        ) {
            url += requestParam(filter, admin);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: adjustMentActionType.FETCH_ADJUSTMENTS,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
                    dispatch(callSaleApi(false));
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

export const fetchAdjustment =
    (adjustmentId, singleAdjustment, isLoading = true) =>
    async (dispatch) => {
        await apiConfig
            .get(
                apiBaseURL.ADJUSTMENTS + "/" + adjustmentId + "/edit",
                singleAdjustment
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: adjustMentActionType.FETCH_ADJUSTMENT,
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

export const addAdjustment = (adjustment, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.ADJUSTMENTS, adjustment)
        .then((response) => {
            if (response) {
                dispatch({
                    type: adjustMentActionType.ADD_ADJUSTMENTS,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "Adjustment.success.create.message"
                        ),
                    })
                );
                dispatch(addInToTotalRecord(1));
                navigate("/admin/pos/adjustments");
                dispatch(setSavingButton(false));
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
            }
        });
};

export const editAdjustment =
    (adjustmentId, adjustment, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        await apiConfig
            .patch(apiBaseURL.ADJUSTMENTS + "/" + adjustmentId, adjustment)
            .then((response) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "Adjustment.success.edit.message"
                            ),
                        })
                    );
                    navigate("/admin/pos/adjustments");
                    dispatch({
                        type: adjustMentActionType.EDIT_ADJUSTMENTS,
                        payload: response.data.data,
                    });
                    dispatch(setSavingButton(false));
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
                    dispatch(setSavingButton(false));
                }
            });
    };

export const deleteAdjustment = (userId) => async (dispatch) => {
    await apiConfig
        .delete(apiBaseURL.ADJUSTMENTS + "/" + userId)
        .then(() => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: adjustMentActionType.DELETE_ADJUSTMENT,
                payload: userId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "Adjustment.success.delete.message"
                    ),
                })
            );
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
