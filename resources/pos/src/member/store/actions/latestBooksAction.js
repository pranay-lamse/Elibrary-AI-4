import { toastType } from "../../constants";
import apiConfigWithoutToken from "../../config/apiConfigwithoutTokenWithRoot";
import { addToast } from "../../../store/action/toastAction";

export const fetchLatestBooks = () => async (dispatch) => {
    await apiConfigWithoutToken
        .get("/less-books")
        .then((response) => {
            if (response) {
                dispatch({
                    type: "FETCH_LATEST_BOOKS",
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
