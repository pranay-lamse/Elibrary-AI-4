import { configActionType } from "../../constants";

export default (state = 0, action) => {
    switch (action.type) {
        case "FETCH_SITE_COUNTER":
            return action.payload;
        default:
            return state;
    }
};
