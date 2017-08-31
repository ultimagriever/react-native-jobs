import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const request = axios.create({
  baseURL: 'http://rallycoding.herokuapp.com/api/tokens'
});

export default async () => {
  const previousToken = await AsyncStorage.getItem('pushtoken');

  if (previousToken) {
    return;
  }

  const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  if (status !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  await request.post('', { token: { token }});
  await AsyncStorage.setItem('pushtoken', token);
}
