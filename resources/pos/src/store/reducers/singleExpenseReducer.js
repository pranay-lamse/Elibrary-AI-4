export default (state = {}, action) => {
    switch (action.type) {
        case "CUSTOM_SINGLE_EXPENSE":
            // console.log({ payload: action.payload, action: action.type });
            return action.payload;
        default:
            return state;
    }
};
