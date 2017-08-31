import { combineReducers } from 'redux';
import _ from 'lodash';
import { FETCH_JOBS, LIKE_JOB } from '../actions/types';

export default combineReducers({
  results(state = [], action) {
    switch (action.type) {
      case FETCH_JOBS:
        return action.payload.results;
      default:
        return state;
    }
  },
  likedJobs(state = [], action) {
    switch (action.type) {
      case LIKE_JOB:
        return _.uniqBy([action.payload, ...state], 'jobkey');
      default:
        return state;
    }
  }
});
