export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_BOOK_REQUEST_LETTERS":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
