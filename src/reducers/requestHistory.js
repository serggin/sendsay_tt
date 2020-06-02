import {ADD_REQUEST, REMOVE_REQUEST, CLEAR_HISTORY, REORDER_HISTORY, SET_SCREEN} from "../actions/actionTypes";

const hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

export const requestHistoryReducer = (state = {asc: true, history: []}, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      //console.log("%%% requestHistoryReducer BEFORE state=", state);
      const {asc, history} = state;
      const json = JSON.stringify(action.request);
      const hash = hashCode(json);
      //const index = history.findIndex(item => !json.localeCompare(item.request));
      const index = history.findIndex(item => {
        //console.log("??? json=", json);
        //console.log("??? item.request=", item.request);
        //return !json.localeCompare(item.request)
        return hash === item.hash;
      });
      //console.log("^^^ requestHistoryReducer index=", index);
      const current = {request: json, hasError: action.hasError, hash};
      const addInitial = (asc && index >= 0) || (!asc && index === -1);
      let newHistory = history.reduce((acc, cur, idx) => {
        if (index !== idx) {
          acc.push(cur);
        }
        return acc;
      }, addInitial ? [current] : []);
      //console.log("###- requestHistoryReducer newHistory=", newHistory);
      if (!addInitial) {
        //console.log('BEFOREPUSH');
        newHistory.push(current);
      }
      //console.log("### requestHistoryReducer newHistory=", newHistory);
      return {asc, history: newHistory};
    default:
      return state;
  }
}
