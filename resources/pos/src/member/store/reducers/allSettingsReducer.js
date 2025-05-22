import {settingActionType} from '../../constants';
import _ from 'lodash';

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case settingActionType.FETCH_ALL_SETTINGS:
        // case settingsActionsType.POST_SETTINGS:
            return { ..._.mapKeys(payload, 'key') };
        // case settingsActionsType.POST_LOGO:
        // case settingsActionsType.POST_FAVICON:
        //     return { ...state, [action.payload.key]: action.payload };
        default:
            return state;
    }
}
