export default (state = [], action) => {
    switch (action.type) {
        case "IS_MEMBER_REGISTERED":
            return action.payload;
        default:
            return state;
    }
};
