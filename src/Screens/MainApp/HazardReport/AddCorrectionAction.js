import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform} from 'react-native';
import {
    HeaderSub
} from '../../../Components';
import { Dropdown } from 'react-native-material-dropdown';
import { 
    Content, 
    Icon,
    Textarea, 
    Form,
    Container,
    Button
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from 'react-native-image-view';
import moment from 'moment';
import HazardPriority from '../../../Assets/image/hazard_priority_level.png';
export class AddCorrectionAction extends Component {
    constructor(props){
        super(props);
        this.state = {
            AssignTo: [],
            datePickerCorrectiveAction: false,
            chosenDateCorrectiveAction: '',
            isEdit: false,
            idEdit: '',
            EditAssignTo: [],
            editChosenDateCorrectiveAction: '',
            ModalRiskVisible: false
        };
    }

    async componentDidMount(){
        try {
            const value = await AsyncStorage.getItem('isEdit')
            if(value !== null) {
                this.setState({
                    isEdit: JSON.parse(value)
                })
                this.editData()
            }
          } catch(e) {
            console.log(e)
          }
    }

    viewImageRisk = (visible) => {
        this.setState({ModalRiskVisible: visible})
    }

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

    showDatePicker = () => {
        this.setState({ datePickerCorrectiveAction: true });
    };
    
    hideDatePicker = () => {
        this.setState({ datePickerCorrectiveAction: false });
    };

    handleDatePickedCorrectiveAction = date => {
        let chosenDate = moment(date).format('ddd, D MMM YYYY')
        if(this.state.isEdit){
            this.setState({
                editChosenDateCorrectiveAction: chosenDate,
                datePickerCorrectiveAction: false
            })
        }else{
            this.setState({
                chosenDateCorrectiveAction: chosenDate,
                datePickerCorrectiveAction: false
            })
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
            const value = await AsyncStorage.getItem('dataEditCorrectiveAction')
            if(value !== null) {
                const data = JSON.parse(value);
                this.setState({
                    isEdit: true,
                    EditAssignTo: data.AssignTo,
                    editChosenDateCorrectiveAction: data.chosenDateCorrectiveAction,
                    idEdit: data.id
                })
            }
            } catch(e) {
                console.log(e)
        }
    }

    _storeData = async () => {
        const generator = this.IDGenerator();

        let data = {
            id: generator,
            AssignTo : this.state.AssignTo,
            chosenDateCorrectiveAction: this.state.chosenDateCorrectiveAction,
            Priority : 'A2'
        }
        try {
          await AsyncStorage.setItem('dataCorrectiveAction', JSON.stringify(data));
          this.props.navigation.state.params.onGoBack();
          this.props.navigation.goBack();
        } catch (error) {
          console.log('error : ', error);
        }
    };

    _storeEditData = async () => {
        let data = {
            id: this.state.idEdit,
            AssignTo : this.state.EditAssignTo,
            chosenDateCorrectiveAction: this.state.editChosenDateCorrectiveAction,
            Priority : 'A2'
        }
        
        try {
            await AsyncStorage.removeItem('isEdit');
            await AsyncStorage.setItem('dataEditCorrectiveAction', JSON.stringify(data));
            this.setState({
                isEdit: false
            })
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
          } catch (error) {
            console.log('error : ', error);
        }
    };

    removeIsEdit = async () =>{
        try {
            await AsyncStorage.removeItem('isEdit');
            this.props.navigation.goBack();
        } catch (error) {
            console.log('error : ', error);
        }
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

        const imageHazardPriority = [
            {
                source: HazardPriority,
                width: 991,
                height: 345,
            }
        ];

        return (
            <Container>
                <View style={styles.viewStyle}>
                    <Button transparent style={{alignItems:'center', marginTop: Platform.OS=='ios'?0:3}} onPress={()=>this.removeIsEdit()}>
                        <Icon style={{fontSize: 20, color: '#63666A'}} name='arrow-back' />
                    </Button>
                    <Text style={styles.textStyle}>{page}</Text>
                    <TouchableOpacity onPress={() => this.viewImageRisk(!this.state.ModalRiskVisible)} style={{position: 'absolute', right: 10, top: 10, marginTop: 5}}>
                        <Icons name='help-circle' style={{marginTop: 0}} size={20} color='#B3A369' />
                    </TouchableOpacity>
                </View>
                <Content>
                    <View style={{padding: 10}}>
                        <Dropdown
                            label='Responsible Department'
                            data={data}
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
                            label='Priority Category'
                            data={data}
                            style={{width: '80%'}}
                        />
                        <TouchableOpacity onPress={() => this.showDatePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Due Date </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.isEdit ? this.state.editChosenDateCorrectiveAction : this.state.chosenDateCorrectiveAction}</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop: 20, marginBottom: 5, fontWeight: 'bold'}}>Immediate Action Required</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Edit here" />
                        </Form>
                    </View>
                    
                </Content>
                {/* datepicker Incident Informataion */}
                <DateTimePicker
                    isVisible={this.state.datePickerCorrectiveAction}
                    onConfirm={this.handleDatePickedCorrectiveAction}
                    onCancel={this.hideDatePicker}
                    mode={'date'}
                />
                {/* Hazard Priority */}
                <ImageView
                    images={imageHazardPriority}
                    imageIndex={0}
                    isVisible={this.state.ModalRiskVisible}
                />
                <TouchableOpacity 
                    onPress={this.state.isEdit ? () => this._storeEditData() : () => this._storeData()}
                    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>{this.state.isEdit ? 'Edit' : 'Submit'}</Text>
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

export default AddCorrectionAction
