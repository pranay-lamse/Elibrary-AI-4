import { bookActionType } from "../../constants";

export default (state = [], action) => {
    switch (action.type) {
        case "NEW_BOOK_SEARCH":
            return [...action.payload];
        default:
            return state;
    }
};
