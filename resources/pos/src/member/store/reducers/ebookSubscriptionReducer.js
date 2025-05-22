import { bookRequestActionType } from "../../constants/index";
export default (state = [], action) => {
    switch (action.type) {
        case bookRequestActionType.FETCH_EBOOK_SUBSCRIPTION:
            return [...action.payload];
        default:
            return state;
    }
};
