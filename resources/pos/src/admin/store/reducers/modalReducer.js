import { constants } from "../../constants";

export default (state = false, action) => {
    switch (action.type) {
        case constants.TOGGLE_ACTION:
            console.log("toggle reducer");
            return !state;
        default:
            return state;
    }
};
