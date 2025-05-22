import { constants } from "../../constants";

export default (state = false, action) => {
    switch (action.type) {
        case constants.PDF_ACTION_MODAL:
            return !state;
        default:
            return state;
    }
};
