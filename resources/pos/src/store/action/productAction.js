import apiConfig from "../../config/apiConfigWthFormData";
import {
    apiBaseURL,
    Filters,
    productActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import requestParam from "../../shared/lms-requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";
import { callImportProductApi } from "./importProductApiAction";

export const fetchProducts =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        let url = apiBaseURL.PRODUCTS;
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
                        type: productActionType.FETCH_PRODUCTS,
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

export const fetchProduct =
    (productId, singleProduct, isLoading = true) =>
    async (dispatch) => {
        apiConfig
            .get(apiBaseURL.PRODUCTS + "/" + productId, singleProduct)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: productActionType.FETCH_PRODUCT,
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

export const addProduct = (product, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.PRODUCTS, product)
        .then((response) => {
            if (response) {
                dispatch({
                    type: productActionType.ADD_PRODUCT,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "product.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/products");
                dispatch(addInToTotalRecord(1));
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

export const editProduct =
    (productId, product, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .post(apiBaseURL.PRODUCTS + "/" + productId, product)
            .then((response) => {
                if (response) {
                    navigate("/admin/pos/products");
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "product.success.edit.message"
                            ),
                        })
                    );
                    dispatch({
                        type: productActionType.EDIT_PRODUCT,
                        payload: response.data.data,
                    });
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

export const deleteProduct = (productId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.PRODUCTS + "/" + productId)
        .then((response) => {
            if (response) {
                dispatch(removeFromTotalRecord(1));
                dispatch({
                    type: productActionType.DELETE_PRODUCT,
                    payload: productId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "product.success.delete.message"
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

export const fetchAllProducts = () => async (dispatch) => {
    apiConfig
        .get(`products?page[size]=0`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: productActionType.FETCH_ALL_PRODUCTS,
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

export const fetchProductsByWarehouse = (id) => async (dispatch) => {
    apiConfig
        .get(`products?page[size]=0&warehouse_id=${id}`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: productActionType.FETCH_PRODUCTS_BY_WAREHOUSE,
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

export const addImportProduct = (importProduct) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.IMPORT_PRODUCT, importProduct)
        .then((response) => {
            if (response) {
                dispatch(fetchProducts());
                dispatch(setLoading(false));
                dispatch(callImportProductApi(true));
                // dispatch({type: productActionType.ADD_IMPORT_PRODUCT, payload: response.data.data});
                dispatch(addToast({ text: "Product Import Create Success " }));
                dispatch(addInToTotalRecord(1));
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(fetchProducts());
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            }
        });
};
