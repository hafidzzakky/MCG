/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// import firebase from 'react-native-firebase';
// import type { RemoteMessage } from 'react-native-firebase';
// import type { Notification, NotificationOpen} from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount(){
    // this.firebaseGetPermission();
  }

  // firebaseGetPermission = () => {
  //   firebase.messaging().hasPermission()
  //     .then(enabled => {
  //         if (enabled) {
  //           firebase.messaging().getToken().then(token => {
  //             console.log("LOG: ", token);
  //           })
  //         } else {
  //           firebase.messaging().requestPermission()
  //               .then(() => {
  //               alert("User Now Has Permission")
  //               })
  //               .catch(error => {
  //                 alert("Error", error) 
  //               });
  //         }
  //     });
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
