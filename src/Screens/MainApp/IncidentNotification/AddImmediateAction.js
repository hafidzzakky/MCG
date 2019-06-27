import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
    HeaderSub
} from '../../../Components'
import { Content, Form, Textarea } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export class AddImmediateAction extends Component {
    constructor(props){
        super(props);
        this.state = {
           ImmediateAction: 'aksi penyelamatan',
           Description: 'deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan ',
           ActionTakenBy: ''
        };
        
        console.log('state ku : ', this.state)
    }

    _storeData = async () => {
        let data = {
            ActionTakenBy : this.state.ActionTakenBy,
            ImmediateAction: this.state.ImmediateAction,
            Description: this.state.Description
        }
        console.log('store data : ', data);
        try {
          await AsyncStorage.setItem('dataImmediateAction', JSON.stringify(data));
          this.props.navigation.state.params.onGoBack();
          this.props.navigation.goBack();
        } catch (error) {
          console.log('error : ', error);
        }
    };

    getDataReportedBy = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          console.log('re : ', value)
          if(value !== null) {
            this.setState({
                ActionTakenBy: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    render() {
        let data = [{
            value: 'PT. Bumi Suksesindo',
          }, {
            value: 'PT. Bumi Suksesindo',
          }, {
            value: 'PT. Bumi Suksesindo',
        }];
        return (
            <HeaderSub title='Add Immediate Action' navigation={this.props.navigation}>
                <Content>
                    <View style={{padding: 10, marginTop: -10}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ReportedBy', {
                                onGoBack: () => this.getDataReportedBy(),
                                page: 'Action Taken By'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Immediate Action Taken By </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ActionTakenBy.nama}</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop: 20, marginBottom: 5, fontWeight: 'bold'}}>Immediate Action</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Immediate Action" />
                        </Form>
                        <Text style={{marginTop: 20, marginBottom: 5, fontWeight: 'bold'}}>Description</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Description" />
                        </Form>
                    </View>
                </Content>
                <TouchableOpacity onPress={() => this._storeData()} style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#42436A'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Tambah</Text>
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}

export default AddImmediateAction
