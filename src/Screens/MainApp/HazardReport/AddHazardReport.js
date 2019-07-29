import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import {
    HeaderSub
} from '../../../Components';
import { Dropdown } from 'react-native-material-dropdown';
import { 
    Content, 
    Icon,
    Textarea, 
    Form,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from 'react-native-image-view';
import camera2 from '../../../Assets/image/camera2.png'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import risk_level_detail from '../../../Assets/image/risk_level_detail.png';
import risk1 from '../../../Assets/image/risk1.png';
import consequence from '../../../Assets/image/consequence.png';

export class AddHazardReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            ReportedBy: [],
            Location: [],
            CorrectiveAction: [],
            datePickerHazard: false,
            chosenDateHazard: '',
            timePickerHazard: false,
            chosenTimeHazard: '',
            ImageSource: '',
            ButtonVisible: false,
            ModalVisible : false,
            listDepartment: [],
            listSection: [],
            ReportingDepartment: '',
            ReportingSection: '',
            ResponsibleDepartment: '',
            ModalRiskVisible: false

        };
    }

    async componentDidMount(){
        try{
            await AsyncStorage.removeItem('isEdit');
            const Department = await AsyncStorage.getItem('ListDepartment');
            const Section = await AsyncStorage.getItem('ListSection');
            if(Department !== null || Section !== null) {
                let listDepartment = JSON.parse(Department);
                let listSection = JSON.parse(Section);
                this.setState({
                    listDepartment: listDepartment,
                    listSection: listSection
                })
            }
        }catch(exception){
            return false;
        }
    }

    viewImageRisk = (visible) => {
        this.setState({ModalRiskVisible: visible})
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

    getDataCorrectiveAction = async () => {
        try {
            await AsyncStorage.removeItem('isEdit');
            const value = await AsyncStorage.getItem('dataCorrectiveAction')
            if(value !== null) {
                console.log('value : ', value)
                let data = this.state.CorrectiveAction;
                data.push(JSON.parse(value));
                console.log('ddata : ', data)
              this.setState({
                CorrectiveAction: data
              })
            }
          } catch(e) {
            console.log(e)
        }
        console.log(this.state.CorrectiveAction)
    }

    selectPhotoTapped() {
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
          else {
            let source = { uri: response.uri };
            this.setState({
              ImageSource: source,
              ButtonVisible: true,
              ModalVisible: false
            });
          }
        });
    }

    //time picker
    showTimePicker = () => {
        this.setState({ timePickerHazard: true });
    };
    
    hideTimePicker = () => {
        this.setState({ timePickerHazard: false });
    };

    handleTimePickedHazard = time => {
        let chosenTime = moment(time).format('HH:MM:SS')
        console.log('coba ', chosenTime);
        this.setState({
            chosenTimeHazard: chosenTime,
            timePickerHazard: false
        })
    }
    
    //date picker
    showDatePicker = () => {
        this.setState({ datePickerHazard: true });
    };
    
    hideDatePicker = () => {
        this.setState({ datePickerHazard: false });
    };

    handleDatePickedHazard = date => {
        let chosenDate = moment(date).format('ddd, D MMM YYYY')
        console.log(chosenDate);
        this.setState({
            chosenDateHazard: chosenDate,
            datePickerHazard: false
        })
    }
    
    viewModal = () => {
        this.setState({ModalVisible: true})
    }

    removeItem(id) {
        let data = this.state.CorrectiveAction
        data = data.filter((item) => item.id !== id)
        console.log('id item : ', id)
        console.log('remove item : ', data)
        this.setState({ CorrectiveAction: data })
    }

    editData = async (data) => {
        try {
            await AsyncStorage.setItem('dataEditCorrectiveAction', JSON.stringify(data));
            await AsyncStorage.setItem('isEdit', JSON.stringify(true));
            this.props.navigation.navigate('AddCorrectionAction', {
                onGoBack: () => this.getDataEdit(),
                page: 'Edit Corrective Action'
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
            const value = await AsyncStorage.getItem('dataEditCorrectiveAction')
            if(value !== null) {
                const editdata = JSON.parse(value);
                const data = [...this.state.CorrectiveAction];
                const getIndex = this.findWithAttr(data, 'id', editdata.id);
                if(getIndex !== -1){
                    data[getIndex] = editdata;
                    this.setState({
                        CorrectiveAction: data
                    })
                }
            }
          } catch(e) {
            console.log(e)
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
        const images = [
            {
                source: this.state.ImageSource == '' ? camera2 : this.state.ImageSource,
                title: 'Paris',
                width: 806,
                height: 720,
            }
        ];

        const imagesRiskLevel = [
            {
                source: consequence,
                width: 806,
                height: 720,
            },
            {
                source: risk_level_detail,
                width: 806,
                height: 720,
            },
            {
                source: risk1,
                width: 450,
                height: 250,
            }
        ];
        
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Hazard Report Information</Text>
                    </View>
                    <View style={{padding: 10, paddingTop: 0}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ReportedBy', {
                                onGoBack: () => this.getDataReportedBy(),
                                page: 'Reported By'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Reported By </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ReportedBy.nama}</Text>
                        </TouchableOpacity>
                        <Dropdown
                            label='Reporting Department'
                            data={this.state.listDepartment}
                            valueExtractor={({ Name }) => Name}
                            onChangeText={(text) => this.setState({ReportingDepartment : text})}
                        />
                        <Dropdown
                            label='Reporting Section'
                            data={this.state.listSection}
                            valueExtractor={({ Name }) => Name}
                            onChangeText={(text) => this.setState({ReportingSection : text})}
                        />
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Location', {
                                onGoBack: () => this.getDataLocation(),
                                page: 'Location'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Hazard Location </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Location.nama}</Text>
                        </TouchableOpacity>
                        <Dropdown
                            label='Hazard Type'
                            data={data}
                        />
                        <Dropdown
                            label='Hazard Category'
                            data={data}
                        />
                        <TouchableOpacity onPress={() => this.showDatePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Observation Date </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenDateHazard}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showTimePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Observation Time </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenTimeHazard}</Text>
                        </TouchableOpacity>
                        <Dropdown
                            label='Responsible Department'
                            data={this.state.listDepartment}
                            valueExtractor={({ Name }) => Name}
                            onChangeText={(text) => this.setState({ResponsibleDepartment : text})}
                        />
                    </View>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Detail of Hazard</Text>
                    </View>
                    <View style={{padding: 10}}>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                        </Form>
                    </View>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Immediate Action Taken</Text>
                    </View>
                    <View style={{padding: 10}}>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                        </Form>
                    </View>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1',alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Evidence & Actual Risk Level</Text>
                            <TouchableOpacity onPress={() => this.viewImageRisk(!this.state.ModalRiskVisible)}>
                                <Icons name='help-circle' style={{marginTop: 0}} size={20} color='#B3A369' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{padding: 10}}>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped()} style={styles.cardPhotoIncident}>
                            <View>
                            { this.state.ImageSource === '' ? 
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={styles.ImageContainerCamera} source={camera2} />
                                    <Text style={{fontSize: 12, color: '#666666'}}>Select a Photo</Text> 
                                </View>
                                 :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                            }
                            </View>
                        </TouchableOpacity>
                        {this.state.ButtonVisible ?
                        <View style={{padding: 10}}>
                            <TouchableOpacity onPress={() => this.viewModal()} style={{backgroundColor: '#B3A369', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                                <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>View Image</Text>
                            </TouchableOpacity>
                        </View>
                        : 
                        false}
                        <Dropdown
                            label='Actual Likelihood'
                            data={data}
                        />
                        <Dropdown
                            label='Actual Consequence'
                            data={data}
                        />
                        <Dropdown
                            label='Actual Risk Level'
                            data={data}
                        />
                    </View>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Correction Action</Text>
                    </View>
                    <View style={{backgroundColor: '#fff', flex: 1}}>
                        <View style={{padding: 10}}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('AddCorrectionAction', {
                                    onGoBack: () => this.getDataCorrectiveAction(),
                                    page: 'Add Corrective Action'
                                })}
                                style={{padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B3A369', marginBottom: 10}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>Add Correction Action</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.CorrectiveAction.length == 0 ? false : 
                            <SwipeListView
                                useFlatList
                                data={this.state.CorrectiveAction}
                                renderItem={ (data, rowMap) => (
                                    <View style={{
                                        borderRadius: 0, 
                                        padding: 10, 
                                        borderBottomColor: '#dbdbdb', 
                                        borderBottomWidth: 1, 
                                        flex: 1, backgroundColor: '#fff'}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>{data.item.AssignTo.nama}</Text>
                                        <Text style={{fontSize: 13, textAlign: 'justify'}}>{data.item.AssignTo.posisi}</Text>
                                        <View style={{position: 'absolute',borderRadius:20, top: 10, right: 10}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>{data.item.chosenDateCorrectiveAction}</Text>
                                            <View style={{borderRadius:20, backgroundColor: '#e74c3c', padding: 5, width: 60, marginTop: 3, marginLeft: 25}}>
                                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>{data.item.Priority}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                renderHiddenItem={ (data, rowMap) => (
                                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                        <TouchableOpacity onPress={() => this.editData(data.item)} style={{backgroundColor: '#B3A369', justifyContent: 'center', alignItems: 'center', width: 50}}>
                                            <Icons name='pencil' style={{marginTop: 0}} size={20} color='#fff' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.removeItem(data.item.id)} style={{backgroundColor: '#e74c3c', justifyContent: 'center', alignItems: 'center', width: 50}}>
                                            <Icon active style={{color: '#fff', fontSize: 20}} name="trash" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                rightOpenValue={-100}
                            />
                        }
                    </View>
                    <View style={{marginBottom: 50}}/> 
                </Content>
                {/* datepicker Incident Informataion */}
                <DateTimePicker
                    isVisible={this.state.datePickerHazard}
                    onConfirm={this.handleDatePickedHazard}
                    onCancel={this.hideDatePicker}
                    mode={'date'}
                />
                {/* timepicker additional immediate action */}
                <DateTimePicker
                    isVisible={this.state.timePickerHazard}
                    onConfirm={this.handleTimePickedHazard}
                    onCancel={this.hideTimePicker}
                    mode={'time'}
                />
                {/* Image View */}
                <ImageView
                    images={images}
                    imageIndex={0}
                    isVisible={this.state.ModalVisible}
                />
                {/* actual risk */}
                <ImageView
                    images={imagesRiskLevel}
                    imageIndex={0}
                    isVisible={this.state.ModalRiskVisible}
                />
                <TouchableOpacity 
                    onPress={() => this.props.navigation.goBack()}
                    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Submit</Text>
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}

const styles = {
    cardPhotoIncident:{
        height: 200,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 5,
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
    ImageContainer: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
}
export default AddHazardReport
