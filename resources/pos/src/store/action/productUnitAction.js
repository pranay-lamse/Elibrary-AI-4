import { toastType, productUnitActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "./toastAction";

export const productUnitDropdown = (base_unit_value) => async (dispatch) => {
    apiConfig
        .get(`units?filter[base_unit]=${base_unit_value}`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: productUnitActionType.PRODUCT_UNITS,
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
