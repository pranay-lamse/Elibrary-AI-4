export default (state = false, action) => {
    switch (action.type) {
        case "EDIT_SANCTION_LETTER":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
