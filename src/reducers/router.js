import {SET_SCREEN} from "../actions/actionTypes";

export const screenReducer = (state = 'LOGIN', action) => {
    switch (action.type) {
        case SET_SCREEN:
            return action.screen;
        default:
            return state;
    }
}
