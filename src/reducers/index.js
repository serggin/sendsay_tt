import { combineReducers } from 'redux';

import {screenReducer} from './router';
import {apiReducer} from './api';
import {requestHistoryReducer} from "./requestHistory";

const appReducer = combineReducers({
  screen: screenReducer,
  api: apiReducer,
  requestHistory: requestHistoryReducer
});

export default appReducer;
