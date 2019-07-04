import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import LottieView from 'lottie-react-native';
import progress_bar from '../src/Assets/lottie/progress_bar.json';
import MainApp from '../src/Navigation/StackNavigator';
import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';
import type { Notification, NotificationOpen} from 'react-native-firebase';
import {
  infoDevice
} from './Components';
export class App extends Component {
  componentDidMount() {
    // this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
      this.firebaseGetPermission();
      this.notificationAppSetting();
      this.performNotificationOperations();
      console.log(infoDevice.deviceModel);
    }

    componentWillUnmount() {
      // this is where you unsubscribe
      this.unsubscribeFromNotificationListener();
    }

    firebaseGetPermission = () => {
      firebase.messaging().hasPermission()
        .then(enabled => {
            if (enabled) {
              firebase.messaging().getToken().then(token => {
                console.log("LOG: ", token);
              })
            } else {
              firebase.messaging().requestPermission()
                  .then(() => {
                  alert("User Now Has Permission")
                  })
                  .catch(error => {
                    alert("Error", error) 
                  });
            }
        });
    }

    notificationAppSetting = async() => {
      const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
      firebase.notifications().android.createChannel(channel);
      
      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const {
          body,
          data,
          notificationId,
          sound,
          subtitle,
          title
        } = notification;
        const notif = 'notif'
        console.log("LOG data dan notif: ", data, notif)
        console.log("LOG notifikasi: ", notification)
  
        const notificationApp = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('test-channel')
        // .android.setSmallIcon('ic_notification')
        .android.setPriority(firebase.notifications.Android.Priority.High);
  
        firebase.notifications().displayNotification(notificationApp).then((success)=>{
          console.log('success');
        }).catch((err) => {
          console.log("Error On Message asdasd", err)
        }); 

        console.log('hh')
      });

      // Triggered when a particular notification has been displayed
      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log("NOTIFICATION DISPLAYED", notification)
      });

      // notification open listener 
      //jika aplikasi di foreground atau background
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        console.log('listener notification : ', action);
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log('notification : ', notification);
      });

      //notification open listener 
      //jika aplikasi close
      firebase.notifications().getInitialNotification()
        .then((notificationOpen: NotificationOpen) => {
          if (notificationOpen) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;  
          }
        });
    }

    performNotificationOperations(){ 
      // Build a channel
      const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');

      const notification = new firebase.notifications.Notification();
      //Subscribe to topic
      firebase.messaging().subscribeToTopic('myOffice');
      // Create the channel
      firebase.notifications().android.createChannel(channel);

      this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        console.log("Message",message);
        alert("Notification Message Arrived");
        const notification = new firebase.notifications.Notification({
                                sound: 'default',
                                show_in_foreground: true,
                          })
                          .setNotificationId(message.messageId)
                          .setTitle(message.data.title)
                          .setBody(message.data.body)
                          .setData(message.data)
                          .android.setColor(message.data.color)
                          .android.setChannelId('test-channel')
                          .android.setPriority(firebase.notifications.Android.Priority.High)
                        //  .android.setSmallIcon('ic_pdf')
                        //  .android.setClickAction('https://makeappicon.com/download/6b475032be05403db050223ad735467b')

        if(message.data.bigPicture != ''){
          notification.android.setBigPicture(message.data.bigPicture)
        }
        if(message.data.Text != ''){
          notification.android.setBigText(message.data.Text,message.data.title, message.data.summary)
        }
        if(message.data.usingAction == 'true'){
          console.log(message.data.usingAction);
          const action = new firebase.notifications.Android.Action('test','default','Lewati');
          const action2 = new firebase.notifications.Android.Action('test','default','Proses');
          const remoteInput = new firebase.notifications.Android.RemoteInput('inputText').setLabel('Type Your Comment');
          
          action.addRemoteInput(remoteInput);
          notification.android.addAction(action);
          notification.android.addAction(action2);
        }
        
        firebase.notifications().displayNotification(notification).then((success)=>{
          console.log('success');
        }).catch((err) => {
          console.log("Error On Message", err)
        }); 
      });

      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        console.log(notificationOpen,"Opened listener");
        console.log(notificationOpen.notification._data.type,"notificationOpen");
        this.props.navigation.navigate(notificationOpen.notification.data.route);
        firebase.notifications().removeDeliveredNotification(notificationOpen.notification._notificationId)
      });

      firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          alert('Initial Notification');
          console.log(notificationOpen,"notificationOpen");
          console.log(notificationOpen.notification._data.type,"notificationOpen");
          firebase.notifications().removeDeliveredNotification(notificationOpen.notification._notificationId)
        }
      });

        // const channel = new firebase.notifications.Android.Channel(
        //   'channelId',
        //   'Channel Name',
        //   firebase.notifications.Android.Importance.Max
        // ).setDescription('A natural description of the channel');

        // this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
        //   if (Platform.OS === 'android') {
    
        //     const localNotification = new firebase.notifications.Notification({
        //         sound: 'default',
        //         show_in_foreground: true,
        //       })
        //       .setNotificationId(notification.notificationId)
        //       .setTitle(notification.title)
        //       .setSubtitle(notification.subtitle)
        //       .setBody(notification.body)
        //       .setData(notification.data)
        //       .android.setChannelId('channelId') // e.g. the id you chose above
        //       // .android.setSmallIcon('ic_stat_notification') // create this icon in Android Studio
        //       .android.setColor('#000000') // you can set a color here
        //       .android.setPriority(firebase.notifications.Android.Priority.High);
    
        //     firebase.notifications()
        //       .displayNotification(localNotification)
        //       .catch(err => console.error(err));
    
        //   } else if (Platform.OS === 'ios') {
    
        //     const localNotification = new firebase.notifications.Notification()
        //       .setNotificationId(notification.notificationId)
        //       .setTitle(notification.title)
        //       .setSubtitle(notification.subtitle)
        //       .setBody(notification.body)
        //       .setData(notification.data)
        //       .ios.setBadge(notification.ios.badge);
    
        //     firebase.notifications()
        //       .displayNotification(localNotification)
        //       .catch(err => console.error(err));
    
        //   }
        // });
    }

    render() {
        return (
          // <LottieView
          //   ref={animation => {
          //     this.animation = animation;
          //   }}
          //   source={require('../src/Assets/lottie/progress_bar.json')}
          // />
          <MainApp/>
        );
      }
    
      takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
        }
      };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });
  
export default App
