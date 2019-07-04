import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {
    HeaderSub
} from '../../../Components';
import AsyncStorage from '@react-native-community/async-storage';
import { Content } from 'native-base';
export class AddObserver extends Component {
    constructor(props){
        super(props);
        this.state = {
            Observer: '',
            Location: ''
        };
    }

    getDataObserver = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          console.log('re : ', value)
          if(value !== null) {
            this.setState({
                Observer: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataLocation = async () => {
        try {
          const value = await AsyncStorage.getItem('dataLocation')
          console.log('loc : ', value)
          if(value !== null) {
            this.setState({
                Location: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    _storeData = async () => {
        let data = {
            Location : this.state.Location,
            Observer: this.state.Observer,
            // Location : 'ACHR Topsoil Stockpile',
            // Observer: 'Ahmad'
        }
        console.log('store data : ', data);
        try {
          await AsyncStorage.setItem('dataObserver', JSON.stringify(data));
          this.props.navigation.state.params.onGoBack();
          this.props.navigation.goBack();
        } catch (error) {
          console.log('error : ', error);
        }
    }

    render() {
        return (
            <HeaderSub title='Add Observer' navigation={this.props.navigation}>
                <Content>
                    <View style={{padding: 10}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Location', {
                                onGoBack: () => this.getDataLocation(),
                                page: 'Location'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Location </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Location.nama}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ReportedBy', {
                                onGoBack: () => this.getDataObserver(),
                                page: 'Observer'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Observer </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Observer.nama}</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
                <TouchableOpacity 
                    onPress={() => this._storeData()}
                    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Kirim</Text>
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}

export default AddObserver
