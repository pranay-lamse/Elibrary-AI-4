import { transcationActionType } from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case transcationActionType.FETCH_TRANSCATION:
            return action.payload;
        default:
            return state;
    }
}
