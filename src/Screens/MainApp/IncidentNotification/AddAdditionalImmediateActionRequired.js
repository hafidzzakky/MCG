import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import {
  HeaderSub
} from '../../../Components';
import {
  Form,
  Textarea,
  Container,
  Button,
  Icon,
  Content
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
        AssignTo: '',
        PriorityCategory: 'Temporary',
        Priority:'A1',
        ImmediateAction: 'aksi aksi aksi',
        isEdit: false,
        idEdit: '',
        EditAssignTo:[],
        EditChosenDate:'',
        listDepartment: [],
        ResponsibleDepartment: ''
    };
  }

  async componentDidMount(){
    try {
        await AsyncStorage.removeItem('dataReportedBy')
        const value = await AsyncStorage.getItem('isEdit');
        const Department = await AsyncStorage.getItem('ListDepartment');
        if(value !== null) {
          this.setState({
              isEdit: JSON.parse(value)
          })
          this.editData()
        }
        if(Department !== null){
          this.setState({
              listDepartment: JSON.parse(Department)
          })
        }
      } catch(e) {
        console.log(e)
      }
  }

  IDGenerator() {
    this.length = 8;
    this.timestamp = +new Date;
    
    var _getRandomInt = function( min, max ) {
       return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
    var ts = this.timestamp.toString();
    var parts = ts.split( "" ).reverse();
    var id = "";
    
    for( var i = 0; i < this.length; ++i ) {
        var index = _getRandomInt( 0, parts.length - 1 );
        id += parts[index];	 
    }
    return id;        
  }

  editData = async () => {
    try {
        const value = await AsyncStorage.getItem('dataEditAdditionalAction')
        if(value !== null) {
            const data = JSON.parse(value);
            this.setState({
                isEdit: true,
                EditAssignTo: data.AssignTo,
                EditChosenDate: data.chosenDate,
                idEdit: data.id
            })
            console.log('dataku : ', data)
        }
        } catch(e) {
            console.log(e)
    }
  }

  _storeEditData = async () => {
    let data = {
        id: this.state.idEdit,
        AssignTo : this.state.EditAssignTo,
        chosenDate: this.state.EditChosenDate,
        Priority : 'A2',
        ResponsibleDepartment: this.state.ResponsibleDepartment,
        PriorityCategory: this.state.PriorityCategory,
        ImmediateAction: this.state.ImmediateAction
    }
    console.log('-', data)
    
    try {
        await AsyncStorage.removeItem('isEdit');
        await AsyncStorage.setItem('dataEditAdditionalAction', JSON.stringify(data));
        this.setState({
            isEdit: false
        })
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
      } catch (error) {
        console.log('error : ', error);
    }
  };


  // modal date picker
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
    
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
    
  handleDatePicked = date => {
    let chosenDate = moment(date).format('ddd, D MMM YYYY')
    if(this.state.isEdit){
        this.setState({
            EditChosenDate: chosenDate,
            datePickerCorrectiveAction: false
        })
    }else{
        this.setState({
            chosenDate: chosenDate,
            datePickerCorrectiveAction: false
        })
    }
  };

  onChangeText(data) {
    ['ResponsibleDepartment', 'AssignTo', 'PriorityCategory', 'ImmediateAction']
      .map((name) => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        console.log('name : ', name)
        this.setState({ [name]: text });
      });
  }

  _storeData = async () => {
    const generator = this.IDGenerator();
    let data = {
      ResponsibleDepartment: this.state.ResponsibleDepartment,
      AssignTo: this.state.AssignTo,
      PriorityCategory: this.state.PriorityCategory,
      Priority: this.state.Priority,
      ImmediateAction: this.state.ImmediateAction,
      chosenDate: this.state.chosenDate,
      id: generator
    }

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
        if(this.state.isEdit){
            this.setState({
                EditAssignTo: JSON.parse(value)
            })
        }else{
            this.setState({
                AssignTo: JSON.parse(value)
            })
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  removeIsEdit = async () =>{
    try {
        await AsyncStorage.removeItem('isEdit');
        this.props.navigation.goBack();
    } catch (error) {
        console.log('error : ', error);
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
    const { navigation } = this.props;
    const page = navigation.getParam('page', 'Page not found');
    console.log('page : ', page)

    return (
      <Container>   
        <View style={styles.viewStyle}>
            <Button transparent style={{alignItems:'center', marginTop: Platform.OS=='ios'?0:3}} onPress={()=>this.removeIsEdit()}>
                <Icon style={{fontSize: 20, color: '#63666A'}} name='arrow-back' />
            </Button>
            <Text style={styles.textStyle}>{page}</Text>
        </View>       
        <Content>
          <View style={{padding: 10, marginTop: -10}}>
            <Dropdown
                label='Responsible Department'
                data={this.state.listDepartment}
                valueExtractor={({ Name }) => Name}
                onChangeText={(text) => this.setState({ResponsibleDepartment : text})}
            />
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('ReportedBy', {
                    onGoBack: () => this.getDataReportedBy(),
                    page: 'Assign To'
                })}
                style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                <Text style={{fontSize: 16, color: '#939393'}}>Assign To </Text>
                <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.isEdit ? this.state.EditAssignTo.nama : this.state.AssignTo.nama}</Text>
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
                <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.isEdit ? this.state.EditChosenDate : this.state.chosenDate}</Text>
            </TouchableOpacity>
            <Text style={{marginTop: 20, marginBottom: 5, fontWeight: 'bold'}}>Immediate Action Required</Text>
            <Form>
                <Textarea rowSpan={5} bordered placeholder="Immediate Action Required" />
            </Form>
          </View>
        </Content>
        {/* datepicker additional immediate action */}
        <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            mode={'date'}
        />
        <TouchableOpacity 
          onPress={this.state.isEdit ? () => this._storeEditData() : () => this._storeData()}
          style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
            <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}

const styles = {
  viewStyle : {
      marginLeft: -10,
      backgroundColor : "#fff",
      flexDirection : 'row',
      padding: Platform.OS=='ios'?10:0,
      paddingLeft: Platform.OS=='ios'?0:10,
      height : Platform.OS=='ios'?60:50,
      borderBottomColor : 'rgba(191,191,191, 0.2)',
      borderBottomWidth: 2,
      marginTop: Platform.OS == 'android' ? 0 : 20,
      alignItems:'center'
  },
  textStyle : {
      marginTop: Platform.OS=='ios'?5:0,
      // marginTop: 5,
      marginLeft: 5,
      fontSize : 16,
      alignSelf:'center',
      fontWeight: 'bold',
      color:'#63666A'
  },
}

export default AddAdditionalImmediateActionRequired
