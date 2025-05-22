import {membershipPlanActionType} from '../../constants';

export default (state = "", action) => {
    switch (action.type) {
        case membershipPlanActionType.FETCH_SESSION_ID:
            return action.payload;
        default:
            return state;
    }
}
