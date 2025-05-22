import { toastType, testimonialActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/requestParam";
import { setTotalRecord } from "./totalRecordAction";
import { apiBaseURL } from "../../../constants";
import { getFormattedMessage } from "../../../shared/sharedMethod";

export const fetchTestimonials =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        let url = apiBaseURL.TESTIMONIAL;
        if (filter.limit || filter.order_By || filter.search) {
            url += requestParam(filter);
        }

        await apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: testimonialActionType.FETCH_TESTIMONIALS,
                    payload: response.data.data,
                });
                dispatch(setTotalRecord(response.data.totalRecords));
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

export const fetchTestimonial = (testimonialId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get(apiBaseURL.TESTIMONIAL + "/" + testimonialId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: testimonialActionType.FETCH_TESTIMONIAL,
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

export const addTestimonial = (testimonial, filterObj) => async (dispatch) => {
    await apiConfigWthFormData
        .post(apiBaseURL.TESTIMONIAL, testimonial)
        .then((response) => {
            if (response) {
                dispatch({
                    type: testimonialActionType.ADD_TESTIMONIAL,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "testimonials.success.create.message"
                        ),
                    })
                );
                dispatch(toggleModal());
                dispatch(fetchTestimonials(filterObj));
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

export const editTestimonial =
    (testimonialId, testimonial) => async (dispatch) => {
        await apiConfigWthFormData
            .post(apiBaseURL.TESTIMONIAL + "/" + testimonialId, testimonial)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: testimonialActionType.EDIT_TESTIMONIAL,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "testimonials.success.edit.message"
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

export const deleteTestimonial =
    (testimonialId, totalRecord) => async (dispatch) => {
        await apiConfig
            .delete(apiBaseURL.TESTIMONIAL + "/" + testimonialId)
            .then(() => {
                if (response) {
                    dispatch({
                        type: testimonialActionType.DELETE_TESTIMONIAL,
                        payload: testimonialId,
                    });
                    dispatch(setTotalRecord(totalRecord - 1));
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "testimonials.success.delete.message"
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
