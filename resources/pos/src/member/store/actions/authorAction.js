import { authorActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWithoutToken from "../../config/apiConfigwithoutTokenWithRoot";
import { addToast } from "../../../store/action/toastAction";
import { setLoading } from "../../../store/action/progressBarAction";
import { apiBaseURL } from "../../../constants";
import _ from "lodash";
import requestParam from "../../../shared/lms-requestParam";

export const fetchAuthors = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get(apiBaseURL.AUTHOR)
        .then((response) => {
            if (response) {
                dispatch({
                    type: authorActionType.FETCH_AUTHORS,
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

export const fetchAuthorsWithoutToken =
    (filter = { order_By: "first_name", direction: "asc", search: "" }) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.AUTHOR;
        if (
            !_.isEmpty(filter) &&
            (filter.limit || filter.order_By || filter.search)
        ) {
            url += requestParam(filter);
        }
        await apiConfigWithoutToken
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: authorActionType.FETCH_AUTHORS,
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
