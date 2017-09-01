import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const request = axios.create({
  baseURL: 'https://limitless-river-62462.herokuapp.com/notification'
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
  await request.post('/register', { token });
  await AsyncStorage.setItem('pushtoken', token);
}
