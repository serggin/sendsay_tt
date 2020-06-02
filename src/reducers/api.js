import {SET_SENDSAY} from "../actions/actionTypes";

export const apiReducer = (state = false, action) => {
  switch (action.type) {
    case SET_SENDSAY:
      //console.log("screenReducer: ", action.screen);
      return action.sendsay;
    default:
      return state;
  }
}
