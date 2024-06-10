import PushNotification, {Importance} from 'react-native-push-notification';

function createChannel() {
  PushNotification.createChannel(
    {
      channelId: 'mylo-app', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`),
  );
}

function showNotification(title, message) {
  PushNotification.localNotification({
    channelId: 'mylo-app',
    title: title,
    message: message,
  });
}

function handleCancelNotification() {
  PushNotification.cancelAllLocalNotifications();
}

export {createChannel, showNotification, handleCancelNotification};
