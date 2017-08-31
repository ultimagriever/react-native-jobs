import { combineReducers } from 'redux';
import { FETCH_JOBS } from '../actions/types';

export default combineReducers({
  results(state = [], action) {
    switch (action.type) {
      case FETCH_JOBS:
        return action.payload.results;
      default:
        return state;
    }
  }
});
