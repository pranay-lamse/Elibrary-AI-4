
export default (state = 0, action) => {
    switch (action.type) {
        case "FETCH_TOTAL_ESUB":
            return action.payload;
        default:
            return state;
    }
}
