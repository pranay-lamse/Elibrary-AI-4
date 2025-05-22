import apiConfig from "../../config/apiConfig";
import { apiBaseURL, unitsActionType, toastType } from "../../constants";
import requestParam from "../../shared/lms-requestParam";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchUnits =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        let url = apiBaseURL.UNITS;
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
                        type: unitsActionType.FETCH_UNITS,
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

export const fetchUnit = (unitId, singleUnit) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.UNITS + "/" + unitId, singleUnit)
        .then((response) => {
            if (response) {
                dispatch({
                    type: unitsActionType.FETCH_UNIT,
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

export const addUnit = (units) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.UNITS, units)
        .then((response) => {
            if (response) {
                dispatch({
                    type: unitsActionType.ADD_UNIT,
                    payload: response.data.data,
                });
                dispatch(fetchUnits());
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "unit.success.create.message"
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

export const editUnit = (unitId, units, handleClose) => async (dispatch) => {
    apiConfig
        .patch(apiBaseURL.UNITS + "/" + unitId, units)
        .then((response) => {
            if (response) {
                dispatch({
                    type: unitsActionType.EDIT_UNIT,
                    payload: response.data.data,
                });
                handleClose(false);
                dispatch(
                    addToast({
                        text: getFormattedMessage("unit.success.edit.message"),
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

export const deleteUnit = (unitId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.UNITS + "/" + unitId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: unitsActionType.DELETE_UNIT,
                    payload: unitId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "unit.success.delete.message"
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
