import {SET_SCREEN, SET_SENDSAY} from "./actionTypes";
import {ADD_REQUEST} from "./actionTypes";

export const setScreen = (screen) => {
  return {
    type: SET_SCREEN,
    screen
  }
}

export const setSendsay = (sendsay) => {
  return {
    type: SET_SENDSAY,
    sendsay
  }
}

export const addRequest = (request, hasError) => {
  return {
    type: ADD_REQUEST,
    request,
    hasError
  }
}
