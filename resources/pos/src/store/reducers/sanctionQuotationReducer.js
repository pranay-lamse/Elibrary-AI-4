export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_SANCTION_QUOTATION":
            return action.payload;
        case "ADD_SANCTION_QUOTATION":
            return action.payload;
        case "EDIT_SANCTION_QUOTATION":
            return state.map((item) =>
                item.id === +action.payload.id ? action.payload : item
            );
        case "DELETE_SANCTION_QUOTATION":
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
};
