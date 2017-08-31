import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';
import registerForNotifications from './services/pushNotifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      if (notification.origin === 'received' && notification.data.text) {
        Alert.alert(
          'New Push Notification',
          notification.data.text,
          [{ text: 'OK' }]
        )
      }
    })
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: {
        screen: WelcomeScreen
      },
      auth: {
        screen: AuthScreen
      },
      main: {
        screen: TabNavigator({
          map: {
            screen: MapScreen
          },
          deck: {
            screen: DeckScreen
          },
          review: {
            screen: StackNavigator({
              review: {
                screen: ReviewScreen
              },
              settings: {
                screen: SettingsScreen
              }
            })
          }
        },
        {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: {
              fontSize: 12
            }
          }
        })
      }
    },
    {
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
