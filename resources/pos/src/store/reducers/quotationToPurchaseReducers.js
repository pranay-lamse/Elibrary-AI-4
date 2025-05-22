import { unitsActionType } from "../../constants";

export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_QUOTATION_TO_PURCHASE_DATA":
            return action.payload;
        default:
            return state;
    }
};
