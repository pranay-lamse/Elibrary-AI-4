export default (state = {}, action) => {
    switch (action.type) {
        case "CUSTOM_SINGLE_PURCHASE_ORDER":
            // console.log({ payload: action.payload, action: action.type });
            return action.payload[0];
        default:
            return state;
    }
};
