import { bookRequestActionType } from "../../constants/index";
export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_SUBSCRIPTION_LIMIT":
            return [...action.payload];
        default:
            return state;
    }
};
