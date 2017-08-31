import { combineReducers } from 'redux';
import auth from './authReducer';
import jobs from './jobsReducer';

export default combineReducers({
  auth,
  jobs
});
