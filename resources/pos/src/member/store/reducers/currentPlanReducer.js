import {currentMembershipDetails} from '../../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case currentMembershipDetails.FETCH_CURRENT_MEMBERSHIPDETAILS:
            return {...action.payload};
        default:
            return state;
    }
}
