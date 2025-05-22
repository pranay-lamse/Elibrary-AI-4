import {transactionsActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case transactionsActionType.FETCH_MEMBER_TRANSACTIONS:
            return action.payload;
        default:
            return state;
    }
}
