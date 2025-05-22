export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_LATEST_BOOKS":
            return [...action.payload];
        default:
            return state;
    }
};
