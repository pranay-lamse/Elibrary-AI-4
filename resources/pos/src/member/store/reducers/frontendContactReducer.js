export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_CONTACT":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
