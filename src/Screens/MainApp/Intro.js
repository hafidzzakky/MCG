import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')
import user from '../../Assets/image/avatar.png';

export class Intro extends Component {
    render() {
        return (
            <View>
            <Text>coba</Text>
            <Swiper style={styles.wrapper} showsButtons={true} showsPagination={true}>
                <View style={styles.slide1}>
                <Text style={styles.text}>Merdeka Safety</Text>
                </View>
                <View style={styles.slide2}>
                <Text style={styles.text}>Features</Text>
                <Text style={styles.text}>Monitoring Safety report from mining industries</Text>
                </View>
                <View style={styles.slide3}>
                <Text style={styles.text}>Easy To Use</Text>
                </View>
            </Swiper>
            </View>
        )
    }
}


const styles = {
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
  }

export default Intro
