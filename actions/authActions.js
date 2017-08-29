import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

export const facebookLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch action saying login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up login process
    await doFacebookLogin(dispatch);
  }
};

async function doFacebookLogin(dispatch) {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('113196862729601', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
}
