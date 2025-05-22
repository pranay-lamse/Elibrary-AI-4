import {constants} from '../../constants';

const initialState = {
    sidebarShow: true,
}

const sidebarReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case constants.SET :
            return { ...state, ...rest }
        default:
            return state
    }
}

export default sidebarReducer;
