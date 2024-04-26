import React, {useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {
  NotificationListner,
  requestUserPermission,
} from './src/utilies/NotifeeNotifications';
import {PermissionsAndroid} from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

const App = () => {
    useEffect(()=>{
      // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
  requestUserPermission()
  NotificationListner()
    },[])

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    // await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      sound: 'default',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        // pressAction: {
        //   id: 'default',
        // },
      },
    });

  }
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000'}}>push notifications</Text>
        <Button
          title="Display Notification"
          onPress={() => onDisplayNotification()}></Button>
      </View>
    </>
  );
};

export default App;
