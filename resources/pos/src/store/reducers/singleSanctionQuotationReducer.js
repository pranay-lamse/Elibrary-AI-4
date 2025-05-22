export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_SINGLE_SANCTION_QUOTATION":
            return action.payload[0];
        default:
            return state;
    }
};
