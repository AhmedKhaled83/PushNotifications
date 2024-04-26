import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, ToastAndroid} from 'react-native';
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFMCToken();
  }
}

async function GetFMCToken() {
  let fmctoken = await AsyncStorage.getItem('fmctoken');
  if (!fmctoken) {
    try {
      fmctoken = await messaging().getToken();
      if (fmctoken) {
        AsyncStorage.setItem('fmctoken', fmctoken);
        console.log('fmctoken=>', fmctoken);
      }
    } catch (error) {
      console.log('error in mctoken=> ', error);
    }
  } else {
    console.log('fcToken in else', fmctoken);
  }
}

const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'onNotificationOpenedApp: When the application is running, but in the background.',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage) {
          console.log(
            'getInitialNotification: When the application is opened from a quit state',
            remoteMessage.notification,
          );
        }
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification in forground state.....', remoteMessage);
  });
};

export {requestUserPermission, NotificationListner};
