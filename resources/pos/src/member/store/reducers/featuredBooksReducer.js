export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_FEATURED_BOOKS":
            return [...action.payload];
        default:
            return state;
    }
};
