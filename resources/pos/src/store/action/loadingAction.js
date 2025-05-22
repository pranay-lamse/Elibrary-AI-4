import { constants } from "../../constants";

export const setLoading = (isLoad) => {
    console.log({ isLoad });
    return { type: constants.IS_LOADING, payload: isLoad };
};
