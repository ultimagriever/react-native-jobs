import { combineReducers } from 'redux';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "../actions/types";

export default combineReducers({
  token(state = null, action) {
    switch (action.type) {
      case FACEBOOK_LOGIN_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  }
})
