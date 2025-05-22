import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    productCategoriesActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    setTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import requestParam from "../../shared/lms-requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchProductCategories =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.PRODUCTS_CATEGORIES;
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
                        type: productCategoriesActionType.FETCH_PRODUCTS_CATEGORIES,
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

export const fetchProductCategory =
    (productId, singleProduct) => async (dispatch) => {
        apiConfig
            .get(
                apiBaseURL.PRODUCTS_CATEGORIES + "/" + productId,
                singleProduct
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: productCategoriesActionType.FETCH_PRODUCT_CATEGORIES,
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

export const addProductCategory = (products) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.PRODUCTS_CATEGORIES, products)
        .then((response) => {
            if (response) {
                dispatch({
                    type: productCategoriesActionType.ADD_PRODUCT_CATEGORIES,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "product-category.success.create.message"
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

export const editProductCategory =
    (productId, products, handleClose) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.PRODUCTS_CATEGORIES + "/" + productId, products)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: productCategoriesActionType.EDIT_PRODUCT_CATEGORIES,
                        payload: response.data.data,
                    });
                    handleClose(false);
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "product-category.success.edit.message"
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

export const deleteProductCategory = (productId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.PRODUCTS_CATEGORIES + "/" + productId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: productCategoriesActionType.DELETE_PRODUCT_CATEGORIES,
                    payload: productId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "product-category.success.delete.message"
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

export const fetchAllProductCategories = () => async (dispatch) => {
    apiConfig
        .get(`product-categories?page[size]=0`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: productCategoriesActionType.FETCH_ALL_PRODUCTS_CATEGORIES,
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
