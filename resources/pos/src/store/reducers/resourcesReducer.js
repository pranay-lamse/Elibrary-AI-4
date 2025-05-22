import { saleReturnActionType } from "../../constants";

export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_RESOURCES":
            return action.payload;
        default:
            return state;
    }
};
