import { availableBookActionType } from "../../constants";

export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_AVAILABLE_BOOKS_BY_BOOK_ID":
            return [...action.payload];
        default:
            return state;
    }
};
