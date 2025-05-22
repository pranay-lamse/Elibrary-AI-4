import {subscriptionsActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case subscriptionsActionType.FETCH_SUBSCRIPTIONS:
            return action.payload;
        case subscriptionsActionType.EDIT_SUBSCRIPTION:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case subscriptionsActionType.SET_ACTIVE_DE_ACTIVE:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        default:
            return state;
    }
}
