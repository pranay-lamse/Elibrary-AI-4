export default (state = {}, action) => {
    switch (action.type) {
        case "SET_INITIALVALUES":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
