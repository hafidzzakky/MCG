import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {
    Content,
    Icon
} from 'native-base';
import {
    HeaderSub
} from '../../../Components';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
export class AddReportInspection extends Component {
    constructor(props){
        super(props);
        this.state = {
            Observer: [],
            datePickerInspection: false,
            chosenDateInspection: '',
        };
    }

    getDataObserver = async () => {
        try {
            const value = await AsyncStorage.getItem('dataObserver')
            if(value !== null) {
                console.log('value : ', value)
                let data = this.state.Observer;
                data.push(JSON.parse(value));
                console.log('ddata : ', data)
              this.setState({
                Observer: data
              })
            }
          } catch(e) {
            console.log(e)
        }
        console.log(this.state.Observer)
    }

    //date picker
    showDatePicker = () => {
        this.setState({ datePickerInspection: true });
    };
    
    hideDatePicker = () => {
        this.setState({ datePickerInspection: false });
    };

    handleDatePickedInspection = date => {
        let chosenDate = moment(date).format('ddd, D MMM YYYY')
        console.log(chosenDate);
        this.setState({
            chosenDateInspection: chosenDate,
            datePickerInspection: false
        })
    }

    removeItem(id) {
        let data = this.state.Observer
        data = data.filter((item) => item.id !== id)
        this.setState({ Observer: data })
    }

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        let data = [{
            value: 'PT. Bumi Suksesindo',
          }, {
            value: 'PT. Bumi Suksesindo',
          }, {
            value: 'PT. Bumi Suksesindo',
        }];
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Inspection Information</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Dropdown
                            label='Inspection Type'
                            data={data}
                        />
                        <TouchableOpacity onPress={() => this.showDatePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Inspection Date </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenDateInspection}</Text>
                        </TouchableOpacity>
                        <Dropdown
                            label='Company'
                            data={data}
                        />
                        <Dropdown
                            label='Department'
                            data={data}
                        />
                        <Dropdown
                            label='Section'
                            data={data}
                        />
                    </View>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Observer</Text>
                    </View>
                    <View style={{padding: 10, marginBottom: 30}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('AddObserver', {
                                onGoBack: () => this.getDataObserver(),
                            })}
                            style={{padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B3A369'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>Add Observer</Text>
                        </TouchableOpacity>
                        {console.log('data state observer : ', this.state.Observer)}
                        {this.state.Observer.length == 0 ? false : 
                            <SwipeListView
                                useFlatList
                                data={this.state.Observer}
                                renderItem={ (data, rowMap) => (
                                    <View style={{borderRadius: 0, padding: 10, borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginTop: 0, backgroundColor: '#fff'}}>
                                        {console.log('asd', data)}
                                        <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>{data.item.Observer.nama}</Text>
                                        <Text style={{fontSize: 13, textAlign: 'justify'}}>{data.item.Observer.nik}</Text>
                                        <Text style={{fontSize: 13, textAlign: 'justify'}}>{data.item.Location.nama}</Text>
                                    </View>
                                )}
                                renderHiddenItem={ (data, rowMap) => (
                                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                        <TouchableOpacity onPress={() => console.log('hidden item : ', data.item.Observer)} style={{backgroundColor: '#e74c3c', justifyContent: 'center', alignItems: 'center', width: 75}}>
                                            <Icon active style={{color: '#fff'}} name="trash" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                rightOpenValue={-75}
                            />
                        }
                    </View>
                </Content>
                {/* //datepicker */}
                <DateTimePicker
                    isVisible={this.state.datePickerInspection}
                    onConfirm={this.handleDatePickedInspection}
                    onCancel={this.hideDatePicker}
                    mode={'date'}
                />
                <TouchableOpacity 
                    // onPress={() => this._storeData()}
                    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Kirim</Text>
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}

export default AddReportInspection
