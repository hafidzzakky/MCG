import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {
  HeaderSub
} from '../../../Components';
import {
  Form,
  Textarea
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';

export class AddAdditionalImmediateActionRequired extends Component {
  constructor(props){
    super(props);
    this.state = {
        isDateTimePickerVisible: false,
        chosenDate: '',
        ResponsibleDepartment: 'Kemananan',
        AssignTo: 'John Doe',
        PriorityCategory: 'Temporary',
        Priority:'A1',
        ImmediateAction: 'aksi aksi aksi'
    };
    
    console.log('state ku : ', this.state)
  }

  // modal date picker
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
    
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
    
  handleDatePicked = date => {
    let chosenDate = moment(date).format('ddd, D MMM YYYY')
    console.log(date)
    console.log(chosenDate)
    this.setState({
        chosenDate: chosenDate,
        isDateTimePickerVisible: false
    })
  };

  onChangeText(data) {
    ['ResponsibleDepartment', 'AssignTo', 'PriorityCategory', 'ImmediateAction']
      .map((name) => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        console.log('name : ', name)
        this.setState({ [name]: text });
      });
    console.log(data)
    // console.log('isi State : ', this.state.ImmediateAction);
  }

  _storeData = async () => {
    let data = {
      ResponsibleDepartment: this.state.ResponsibleDepartment,
      AssignTo: this.state.AssignTo,
      PriorityCategory: this.state.PriorityCategory,
      Priority: this.state.Priority,
      ImmediateAction: this.state.ImmediateAction,
      chosenDate: this.state.chosenDate
    }
    console.log('store data : ', data);
    try {
      await AsyncStorage.setItem('dataAction', JSON.stringify(data));
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    } catch (error) {
      console.log('error : ', error);
    }
  };

  getDataReportedBy = async () => {
    try {
      const value = await AsyncStorage.getItem('dataReportedBy')
      if(value !== null) {
        this.setState({
          AssignTo: JSON.parse(value)
        })
      }
    } catch(e) {
      console.log(object)
    }
  }

  render() {
    let data = [{
      value: 'PT. Bumi Suksesindo',
      id: 3
    }, {
      value: 'PT. Bumi Suksesindo',
      id: 2
    }, {
      value: 'PT. Bumi Suksesindo',
      id: 1
    }];

    return (
      <HeaderSub title='Additional Immediate Action Required' navigation={this.props.navigation}>
        <View style={{padding: 10, marginTop: -10}}>
          <Dropdown
              ref={this.ResponsibleDepartmentRef}
              label='Responsible Department'
              data={data}
              value={this.state.ResponsibleDepartment}
              onChangeText={this.onChangeText}
          />
          <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('ReportedBy', {
                  onGoBack: () => this.getDataReportedBy(),
                  page: 'Assign To'
              })}
              style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
              <Text style={{fontSize: 16, color: '#939393'}}>Assign To </Text>
              <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.AssignTo.nama}</Text>
          </TouchableOpacity>
          <Dropdown
              ref={this.PriorityCategoryRef}
              label='Priority Category'
              data={data}
              value={this.state.PriorityCategory}
              onChangeText={this.onChangeText}
          />
          <Dropdown
              ref={this.PriorityRef}
              label='Priority'
              data={data}
              value={this.state.Priority}
              onChangeText={this.onChangeText}
          />
          <TouchableOpacity onPress={() => this.showDateTimePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 20}}>
              <Text style={{fontSize: 16, color: '#939393'}}>Due Date </Text>
              <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenDate}</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 20, marginBottom: 5, fontWeight: 'bold'}}>Immediate Action Required</Text>
          <Form>
              <Textarea rowSpan={5} bordered placeholder="Immediate Action Required" />
          </Form>
      </View>
  {/* datepicker additional immediate action */}
  <DateTimePicker
      isVisible={this.state.isDateTimePickerVisible}
      onConfirm={this.handleDatePicked}
      onCancel={this.hideDateTimePicker}
      mode={'date'}
  />
  <TouchableOpacity 
    onPress={() => this._storeData()}
    // onPress={() => this.props.navigation.navigate('addReportIncident')} 
    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#42436A'}}>
      <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Tambah</Text>
  </TouchableOpacity>
      </HeaderSub>
    )
  }
}

export default AddAdditionalImmediateActionRequired
