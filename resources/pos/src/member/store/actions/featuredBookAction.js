import { toastType } from "../../constants";
import apiConfigWithoutToken from "../../config/apiConfigwithoutTokenWithRoot";
import { addToast } from "../../../store/action/toastAction";

export const fetchFeaturedBooks = () => async (dispatch) => {
    await apiConfigWithoutToken
        .get("/less-books-2")
        .then((response) => {
            if (response) {
                dispatch({
                    type: "FETCH_FEATURED_BOOKS",
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
