import apiConfig from "../../config/apiConfig";
import { apiBaseURL, brandsActionType, toastType } from "../../constants";
import requestParam from "../../shared/lms-requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    setTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { callUpdateBrandApi } from "./updateBrand";

export const fetchBrands =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        let url = apiBaseURL.BRANDS;
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
                        type: brandsActionType.FETCH_BRANDS,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
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

export const fetchBrand = (brandsId, singleUser) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.BRANDS + "/" + brandsId, singleUser)
        .then((response) => {
            if (response) {
                dispatch({
                    type: brandsActionType.FETCH_BRAND,
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

export const addBrand = (brands) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.BRANDS, brands)
        .then((response) => {
            if (response) {
                dispatch({
                    type: brandsActionType.ADD_BRANDS,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "brand.success.create.message"
                        ),
                    })
                );
                dispatch(addInToTotalRecord(1));
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

export const editBrand =
    (brandsId, brands, handleClose) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.BRANDS + "/" + brandsId, brands)
            .then((response) => {
                if (response) {
                    dispatch(callUpdateBrandApi(true));
                    // dispatch({type: productActionType.ADD_IMPORT_PRODUCT, payload: response.data.data});
                    handleClose(false);
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "brand.success.edit.message"
                            ),
                        })
                    );
                    dispatch(addInToTotalRecord(1));
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

export const deleteBrand = (brandsId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.BRANDS + "/" + brandsId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: brandsActionType.DELETE_BRANDS,
                    payload: brandsId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "brand.success.delete.message"
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

export const fetchAllBrands = () => async (dispatch) => {
    apiConfig
        .get(`brands?page[size]=0`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: brandsActionType.FETCH_ALL_BRANDS,
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
