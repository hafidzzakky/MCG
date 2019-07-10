import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import {
    HeaderSub
} from '../../../Components';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { 
    Content, 
    ListItem, 
    Left,  
    Right, 
    Radio, 
    CheckBox , 
    Body,
    Button,
    Icon,
    Textarea, 
    Form,
    SwipeRow
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from 'react-native-image-view';
import Modal from 'react-native-modalbox';
import camera from '../../../Assets/image/camera.png'
import camera2 from '../../../Assets/image/camera2.png'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
const primaryincidentData = [{id: 1, nama: 'Injury/Illness'}, {id: 2, nama: 'Property Damage'}, {id: 3, nama: 'Environmental'}, {id: 4, nama: 'Production Loss'}, {id: 5, nama: 'Community'}, {id: 6, nama: 'Security'}, {id: 7, nama: 'Financial Loss'}, {id: 8, nama: 'Non Reportable'}, {id: 9, nama: 'Near Miss'}];
const secondaryincidentData = [{id: 1, nama: 'Community'}, {id: 2, nama: 'Injury/Illness'}, {id: 3, nama: 'Production Loss'}, {id: 4, nama: 'Plant/Property Damage'}, {id: 5, nama: 'Environtment Harm'}];

export class AddReportIncident extends Component {
    constructor(props){
        super(props);
        this.state = {
            ReportedBy: 'John Doe',
            Location: '',
            ImageSource1: null,
            ImageSource2: null,
            ImageSource3: null,
            PrimaryIncidentType : '',
            SecondaryIncidentType : [],
            SPI: '',
            StatutoryReport: '',
            ButtonVisible: false,
            ModalVisible : false,
            isDateTimePickerVisible: false,
            chosenDate: '',
            datePickerIncident: false,
            chosenDateIncident: '',
            timePickerIncident: false,
            chosenTimeIncident: '',
            DataImmediateAction : [],
            DataAdditionalImmediateAction: []
        };
    }

    getDataImmediateAction = async () => {
        try {
          const value = await AsyncStorage.getItem('dataImmediateAction')
          if(value !== null) {
              let data = this.state.DataImmediateAction;
              data.push(JSON.parse(value));
              console.log('ddata : ', data)
            this.setState({
                DataImmediateAction: data
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataAdditionalImmediateAction = async () => {
        try {
          const value = await AsyncStorage.getItem('dataAction')
          if(value !== null) {
            let data = this.state.DataAdditionalImmediateAction;
            data.push(JSON.parse(value));
            console.log('data : ', data)
            this.setState({
                DataAdditionalImmediateAction: data
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataReportedBy = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          console.log('re : ', value)
          if(value !== null) {
            this.setState({
                ReportedBy: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
        console.log('reported : ', this.state.ReportedBy);
    }

    getDataLocation = async () => {
        try {
            const value = await AsyncStorage.getItem('dataLocation')
            console.log('re : ', value)
            if(value !== null) {
              this.setState({
                  Location: JSON.parse(value)
              })
            }
        } catch(e) {
            console.log(object)
        }
        console.log('Location : ', this.state.Location);
    }

    //immediate action
    removeItemImmediateAction(id) {
        let data = this.state.DataImmediateAction
        data = data.filter((item) => item.id !== id)
        this.setState({ DataImmediateAction: data })
    }

    editDataImmediateAction = async (data) => {        
        try {
            await AsyncStorage.setItem('dataEditImmediateAction', JSON.stringify(data));
            await AsyncStorage.setItem('isEdit', JSON.stringify(true));
            this.props.navigation.navigate('AddImmediateAction', {
                onGoBack: () => this.getDataEditImmediateAction(),
                page: 'Edit Immediate Action Required'
            })
          } catch (error) {
            console.log('error : ', error);
        }
    }

    getDataEditImmediateAction = async () => {
        try {
            const value = await AsyncStorage.getItem('dataEditImmediateAction')
            if(value !== null) {
                const editdata = JSON.parse(value);
                const data = [...this.state.DataImmediateAction];
                const getIndex = this.findWithAttr(data, 'id', editdata.id);
                console.log('edit data : ', editdata, ' -', data, ' -', getIndex)
                if(getIndex !== -1){
                    data[getIndex] = editdata;
                    this.setState({
                        DataImmediateAction: data
                    })
                }
            }
          } catch(e) {
            console.log(e)
        }
    }

    // additional 
    removeItemAdditional(id) {
        let data = this.state.DataAdditionalImmediateAction
        data = data.filter((item) => item.id !== id)
        this.setState({ DataAdditionalImmediateAction: data })
    }

    editDataAdditional = async (data) => {        
        try {
            await AsyncStorage.setItem('dataEditAdditionalAction', JSON.stringify(data));
            await AsyncStorage.setItem('isEdit', JSON.stringify(true));
            this.props.navigation.navigate('AddAdditionalImmediateActionRequired', {
                onGoBack: () => this.getDataEdit(),
                page: 'Edit Additional Immediate Action Required'
            })
          } catch (error) {
            console.log('error : ', error);
        }
    }

    findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    getDataEdit = async () => {
        try {
            const value = await AsyncStorage.getItem('dataEditAdditionalAction')
            if(value !== null) {
                const editdata = JSON.parse(value);
                const data = [...this.state.DataAdditionalImmediateAction];
                const getIndex = this.findWithAttr(data, 'id', editdata.id);
                console.log('edit data : ', editdata, ' -', data, ' -', getIndex)
                if(getIndex !== -1){
                    data[getIndex] = editdata;
                    this.setState({
                        DataAdditionalImmediateAction: data
                    })
                }
            }
          } catch(e) {
            console.log(e)
        }
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

    //time picker
    showTimePicker = () => {
        this.setState({ timePickerIncident: true });
    };
    
    hideTimePicker = () => {
        this.setState({ timePickerIncident: false });
    };

    handleTimePickedIncident = time => {
        let chosenTime = moment(time).format('HH:MM:SS')
        console.log('coba ', chosenTime);
        this.setState({
            chosenTimeIncident: chosenTime,
            timePickerIncident: false
        })
    }
    
    //date picker
    showDatePicker = () => {
        this.setState({ datePickerIncident: true });
    };
    
    hideDatePicker = () => {
        this.setState({ datePickerIncident: false });
    };

    handleDatePickedIncident = date => {
        let chosenDate = moment(date).format('ddd, D MMM YYYY')
        console.log(chosenDate);
        this.setState({
            chosenDateIncident: chosenDate,
            datePickerIncident: false
        })
    }


    selectPhotoTapped(params) {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else if (params == 1) {
            let source = { uri: response.uri };
            this.setState({
              ImageSource1: source,
              ButtonVisible: true,
              ModalVisible: false
            });
          }
          else if (params == 2) {
            let source = { uri: response.uri };
            this.setState({
              ImageSource2: source,
              ButtonVisible: true,
              ModalVisible: false
            });
          }
          else {
            let source = { uri: response.uri };
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              ImageSource3: source,
              ButtonVisible: true,
              ModalVisible: false
            });
          }
        });
    }

    radioButtonPrimaryIncidentType = (data) => {
        this.setState({
            PrimaryIncidentType: data
        })
    }

    checkboxSecondaryIncidentType = (data) => {
        let tmp = this.state.SecondaryIncidentType;
        console.log('temp : ', tmp);
        console.log('data : ', data);
        if(tmp.includes(data)){
            tmp.splice(tmp.indexOf(data), 1);
        }else{
            tmp.push(data);
        }
        
        console.log('te : ', tmp)
        this.setState({
            SecondaryIncidentType : tmp
        })
    }

    viewModal = () => {
        this.setState({ModalVisible: true})
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
        const images = [
            {
                source: this.state.ImageSource1 == null ? camera2 : this.state.ImageSource1,
                title: 'Paris',
                width: 806,
                height: 720,
            },
            {
                source: this.state.ImageSource2 == null ? camera2 : this.state.ImageSource2,
                title: 'Paris',
                width: 806,
                height: 720,
            },
            {
                source: this.state.ImageSource3 == null ? camera2 : this.state.ImageSource3,
                title: 'Paris',
                width: 806,
                height: 720,
            },
        ];

        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Incident Information</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Dropdown
                            label='Employment'
                            data={data}
                        />
                        <Dropdown
                            label='Contractor'
                            data={data}
                        />
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ReportedBy', {
                                onGoBack: () => this.getDataReportedBy(),
                                page: 'Reported By'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Reported By </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ReportedBy.nama}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showDatePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Incident Date </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenDateIncident}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showTimePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Incident Time </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenTimeIncident}</Text>
                        </TouchableOpacity>
                        <Dropdown
                            label='Incident Category'
                            data={data}
                        />
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Incident Title</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <TextField
                            tintColor='#666666'
                            label='Title'
                            value={this.state.phone}
                            onChangeText={ (phone) => this.setState({ phone : phone }) }
                        />
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Incident Type</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 15}}>Primary Incident Type</Text>
                        {/* <FlatList 
                            keyExtractor={(item, index) => item.id}
                            data = {secondaryincidentData}
                            renderItem={({item}) => {
                                return(
                                <ListItem style={{marginLeft: 0}}>
                                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.checkboxSecondaryIncidentType(item.id)}>
                                        <CheckBox color='#B3A369' checked={this.state.SecondaryIncidentType.includes(item.id) ? true : false} />
                                        <View style={{marginLeft: 10}}>
                                            <Text>{item.nama}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ListItem>
                                );
                            }}
                        /> */}
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Injury / Illness</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Injury')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Injury'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Property Damage</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Property Damage')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Property Damage'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Environmental</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Environmental')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Environmental'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Production Loss</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Production Loss')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Production Loss'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Community</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Community')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Community'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Security</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Security')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Security'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Financial Loss</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Financial Loss')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Financial Loss'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Non Reportable</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Non Reportable')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Non Reportable'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Near Miss</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.radioButtonPrimaryIncidentType('Near Miss')}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.PrimaryIncidentType == 'Near Miss'}
                                />
                            </Right>
                        </ListItem>
                        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 20}}>Secondary Incident Type</Text>
                        <FlatList 
                            extraData={this.state}
                            keyExtractor={(item, index) => 'checklist-'+item.id}
                            data = {secondaryincidentData}
                            renderItem={({item}) => {
                                return(
                                <ListItem style={{marginLeft: 0}}>
                                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.checkboxSecondaryIncidentType(item.id)}>
                                        <CheckBox onPress={() => this.checkboxSecondaryIncidentType(item.id)} color='#B3A369' checked={this.state.SecondaryIncidentType.includes(item.id) ? true : false} />
                                        <View style={{marginLeft: 10}}>
                                            <Text>{item.nama}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ListItem>
                                );
                            }}
                        />
                    </View>
                    <View style={[styles.containerHeaderItem, {alignItems: 'center', flexDirection: 'row'}]}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Risk Level</Text>
                            <TouchableOpacity>
                                <Icons name='help-circle' style={{marginTop: 0}} size={20} color='#B3A369' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 20}}>Actual</Text>
                        <Dropdown
                            label='Likehood'
                            data={data}
                        />
                        <Dropdown
                            label='Consequence'
                            data={data}
                        />
                        <View style={{flexDirection: 'row',  marginTop: 20, alignItems: 'center'}}>
                            <View style={{width: 100}}>
                                <Text style={{fontWeight: 'bold', fontSize: 13,}}>Risk Level</Text>
                            </View>
                            <View style={{marginLeft: 10, justifyContent: 'center', alignItems:'center', backgroundColor: '#e74c3c', padding: 6, borderRadius: 20, height: 26}}>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#fff'}}>Status</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',  marginTop: 20, alignItems: 'center'}}>
                            <View style={{width: 100}}>
                                <Text style={{fontWeight: 'bold', fontSize: 13,}}>Incident Class</Text>
                            </View>
                            <View style={{marginLeft: 10, justifyContent: 'center', alignItems:'center', backgroundColor: '#1abc9c', padding: 6, borderRadius: 20, height: 26}}>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#fff'}}>Minor</Text>
                            </View>
                        </View>
                        {/* <View style={{marginTop: 20, height: 0.5, backgroundColor: '#95a5a6'}}/> */}
                        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 30}}>Potential</Text>
                        <Dropdown
                            label='Likehood'
                            data={data}
                        />
                        <Dropdown
                            label='Consequence'
                            data={data}
                        />
                        <View style={{flexDirection: 'row',  marginTop: 20, alignItems: 'center'}}>
                            <View style={{width: 100}}>
                                <Text style={{fontWeight: 'bold', fontSize: 13,}}>Risk Level</Text>
                            </View>
                            <View style={{marginLeft: 10, justifyContent: 'center', alignItems:'center', backgroundColor: '#e74c3c', padding: 6, borderRadius: 20, height: 26}}>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#fff'}}>Status</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',  marginTop: 20, alignItems: 'center'}}>
                            <View style={{width: 100}}>
                                <Text style={{fontWeight: 'bold', fontSize: 13,}}>Incident Class</Text>
                            </View>
                            <View style={{marginLeft: 10, justifyContent: 'center', alignItems:'center', backgroundColor: '#1abc9c', padding: 6, borderRadius: 20, height: 26}}>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#fff'}}>Minor</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>SPI (Serious Petential Incident) / Significant Incident</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 20}}>Is SPI (Serious Potential Incident) / Significant Incident ?</Text>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Yes</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.setState({SPI : 'Yes'})}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.SPI == 'Yes'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>No</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.setState({SPI : 'No'})}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.SPI == 'No'}
                                />
                            </Right>
                        </ListItem>
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Statutory Report Required</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 20}}>Is Statutory Report Reequired ?</Text>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>Yes</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.setState({StatutoryReport : 'Yes'})}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.StatutoryReport == 'Yes'}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true} style={{marginLeft: 0}}>
                            <Left>
                                <Text>No</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.setState({StatutoryReport : 'No'})}
                                    color={"#B3A369"}
                                    selectedColor={"#B3A369"}
                                    selected={this.state.StatutoryReport == 'No'}
                                />
                            </Right>
                        </ListItem>
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Location Of Incident</Text>
                    </View>
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
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Responsible Departement</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Dropdown
                            label='Responsible Department'
                            data={data}
                        />
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Responsible Section</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <Dropdown
                            label='Reporting Section'
                            data={data}
                        />
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Incident Upload</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped(1)} style={styles.cardPhotoIncident}>
                            <View>
                            { this.state.ImageSource1 === null ? 
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={styles.ImageContainerCamera} source={camera2} />
                                    <Text style={{fontSize: 12, color: '#666666'}}>Select a Photo</Text> 
                                </View>
                                 :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource1} />
                            }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped(2)} style={styles.cardPhotoIncident}>
                            <View>
                            { this.state.ImageSource2 === null ? 
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={styles.ImageContainerCamera} source={camera2} />
                                    <Text style={{fontSize: 12, color: '#666666'}}>Select a Photo</Text> 
                                </View>
                                :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource2} />
                            }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped(3)} style={styles.cardPhotoIncident}>
                            <View>
                            { this.state.ImageSource3 === null ? 
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={styles.ImageContainerCamera} source={camera2} />
                                    <Text style={{fontSize: 12, color: '#666666'}}>Select a Photo</Text> 
                                </View>
                                :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource3} />
                            }
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.state.ButtonVisible ?
                    <View style={{padding: 10}}>
                        <TouchableOpacity onPress={() => this.viewModal()} style={{backgroundColor: '#B3A369', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                            <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>View Image</Text>
                        </TouchableOpacity>
                    </View>
                    : 
                    false}
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Immediate Action</Text>
                    </View>
                    <View>
                        <View style={{padding: 10}}>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('AddImmediateAction', {
                                onGoBack: () => this.getDataImmediateAction(),
                                page: 'Add Immediate Action'
                            })}
                            style={{padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B3A369'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>Add Immediate Action</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {this.state.DataImmediateAction.length == 0 ? false : 
                                <SwipeListView
                                    useFlatList
                                    data={this.state.DataImmediateAction}
                                    renderItem={ (data, rowMap) => (
                                        <View key={data.item.ActionTakenBy.id+'-'+data.index} style={{borderRadius: 0, padding: 10, borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginTop: 0, backgroundColor: '#fff'}}>
                                            {console.log('asd', data)}
                                            <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>{data.item.ActionTakenBy.nama}</Text>
                                            <Text style={{fontSize: 13, textAlign: 'justify'}}>{data.item.ImmediateAction}</Text>
                                            <Text style={{fontSize: 13, textAlign: 'justify'}}>{data.item.Description}</Text>
                                        </View>
                                    )}
                                    renderHiddenItem={ (data, rowMap) => (
                                        <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                            <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                                <TouchableOpacity onPress={() => this.editDataImmediateAction(data.item)} style={{backgroundColor: '#B3A369', justifyContent: 'center', alignItems: 'center', width: 50}}>
                                                    <Icons name='pencil' style={{marginTop: 0}} size={20} color='#fff' />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.removeItemImmediateAction(data.item.id)} style={{backgroundColor: '#e74c3c', justifyContent: 'center', alignItems: 'center', width: 50}}>
                                                    <Icon active style={{color: '#fff', fontSize: 20}} name="trash" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                    rightOpenValue={-100}W
                                />
                            }
                        </View>
                    </View>
                    <View style={styles.containerHeaderItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Immediate Action Required</Text>
                    </View>
                    <View style={{marginBottom: 50}}>
                        <View style={{padding: 10, }}>
                            <TouchableOpacity  
                            onPress={() => this.props.navigation.navigate('AddAdditionalImmediateActionRequired', {
                                onGoBack: () => this.getDataAdditionalImmediateAction(),
                                page: 'Add Additional Immediate Action Required'
                            })} 
                            style={{padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B3A369'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>Add Additional Immediate Action</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {this.state.DataAdditionalImmediateAction.length == 0 ? false : 
                                <SwipeListView
                                    useFlatList
                                    data={this.state.DataAdditionalImmediateAction}
                                    renderItem={ (data, rowMap) => (
                                        <View style={{
                                            borderRadius: 0, 
                                            padding: 10, 
                                            borderBottomColor: '#dbdbdb', 
                                            borderBottomWidth: 1, 
                                            flex: 1, backgroundColor: '#fff'}}>

                                            <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>{data.item.AssignTo.nama}</Text>
                                            <Text style={{fontSize: 13, textAlign: 'justify'}}>{data.item.ResponsibleDepartment}</Text>
                                            <View style={{position: 'absolute',borderRadius:20, top: 10, right: 10}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>{data.item.chosenDate}</Text>
                                                <View style={{borderRadius:20, backgroundColor: '#e74c3c', padding: 5, width: 60, marginTop: 3, marginLeft: 25}}>
                                                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>{data.item.Priority}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    renderHiddenItem={ (data, rowMap) => (
                                        <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                            <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                                <TouchableOpacity onPress={() => this.editDataAdditional(data.item)} style={{backgroundColor: '#B3A369', justifyContent: 'center', alignItems: 'center', width: 50}}>
                                                    <Icons name='pencil' style={{marginTop: 0}} size={20} color='#fff' />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.removeItemAdditional(data.item.id)} style={{backgroundColor: '#e74c3c', justifyContent: 'center', alignItems: 'center', width: 50}}>
                                                    <Icon active style={{color: '#fff', fontSize: 20}} name="trash" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                    rightOpenValue={-100}
                                />
                            }
                        </View>
                    </View>
                </Content>
                {/* datepicker Incident Informataion */}
                <DateTimePicker
                    isVisible={this.state.datePickerIncident}
                    onConfirm={this.handleDatePickedIncident}
                    onCancel={this.hideDatePicker}
                    mode={'date'}
                />
                {/* timepicker additional immediate action */}
                <DateTimePicker
                    isVisible={this.state.timePickerIncident}
                    onConfirm={this.handleTimePickedIncident}
                    onCancel={this.hideTimePicker}
                    mode={'time'}
                />
                <ImageView
                    images={images}
                    imageIndex={0}
                    isVisible={this.state.ModalVisible}
                />
                <TouchableOpacity 
                    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Kirim</Text>
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}


const styles = { 
    cardPhotoIncident:{
        height: 100,
        width: 100,
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageContainer: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageContainerCamera: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        flex: 1
    },
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
        color:'#666666'
    },
    containerHeaderItem:{
        height: 50, 
        padding: 10, 
        backgroundColor: '#ecf0f1', 
        justifyContent: 'center'
    }
}
export default AddReportIncident
