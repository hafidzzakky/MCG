import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import {
    Content,
    Form,
    Textarea,
    Icon
} from 'native-base';
import {
    HeaderSub
} from '../../../Components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import ImageView from 'react-native-image-view';
import camera2 from '../../../Assets/image/camera2.png'
import ImagePicker from 'react-native-image-picker';
import { SwipeListView } from 'react-native-swipe-list-view';
export class AddTahanReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            ReportedBy: [],
            Location: [],
            CorrectiveAction:[],
            timePickerTahan: false,
            chosenTimeTahan: '',
            datePickerTahan: false,
            chosenDateTahan: '',
            ImageSource: '',
            ButtonVisible: false,
            ModalVisible : false,

        };
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
            const value = await AsyncStorage.getItem('dataCorrectiveAction')
            if(value !== null) {
                console.log('value : ', value)
                let data = this.state.CorrectiveAction;
                data.push(JSON.parse(value));
                console.log('ddata : ', data)
              this.setState({
                CorrectiveAction: data,
                ModalVisible: false
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

    viewModal = () => {
        this.setState({ModalVisible: true})
    }

    //time picker
    showTimePicker = () => {
        this.setState({ timePickerTahan: true });
    };
    
    hideTimePicker = () => {
        this.setState({ timePickerTahan: false });
    };

    handleTimePickedTahan = time => {
        let chosenTime = moment(time).format('HH:MM:SS')
        console.log('coba ', chosenTime);
        this.setState({
            chosenTimeTahan: chosenTime,
            timePickerTahan: false
        })
    }
    
    //date picker
    showDatePicker = () => {
        this.setState({ datePickerTahan: true });
    };
    
    hideDatePicker = () => {
        this.setState({ datePickerTahan: false });
    };

    handleDatePickedTahan = date => {
        let chosenDate = moment(date).format('ddd, D MMM YYYY')
        console.log(chosenDate);
        this.setState({
            chosenDateTahan: chosenDate,
            datePickerTahan: false
        })
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
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>TAHAN Report Information</Text>
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
                            data={data}
                        />
                        <Dropdown
                            label='Reporting Section'
                            data={data}
                        />
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Location', {
                                onGoBack: () => this.getDataLocation(),
                                page: 'Location'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>TAHAN Location </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Location.nama}</Text>
                        </TouchableOpacity>
                        <Dropdown
                            label='TAHAN Type'
                            data={data}
                        />
                        <Dropdown
                            label='TAHAN Category'
                            data={data}
                        />
                        <TouchableOpacity onPress={() => this.showDatePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Observation Date </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenDateTahan}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showTimePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Observation Time </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenTimeTahan}</Text>
                        </TouchableOpacity>
                        <Dropdown
                            label='Responsible Department'
                            data={data}
                        />
                    </View>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Detail of TAHAN</Text>
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
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Evidence</Text>
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
                    </View>
                    <View style={{height: 50, padding: 10, backgroundColor: '#ecf0f1', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#63666A'}}>Correction Action</Text>
                    </View>
                    <View style={{padding: 10, marginBottom: 30}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('AddCorrectionAction', {
                                onGoBack: () => this.getDataCorrectiveAction(),
                                page: 'Add Corrective Action'
                            })}
                            style={{padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B3A369', marginBottom: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>Add Correction Action</Text>
                        </TouchableOpacity>
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
                                        <TouchableOpacity onPress={() => console.log('hidden item : ', data.item.AssignTo)} style={{backgroundColor: '#e74c3c', justifyContent: 'center', alignItems: 'center', width: 75}}>
                                            <Icon active style={{color: '#fff'}} name="trash" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                rightOpenValue={-75}
                            />
                        }
                    </View>
                </Content>
                {/* datepicker Incident Informataion */}
                <DateTimePicker
                    isVisible={this.state.datePickerTahan}
                    onConfirm={this.handleDatePickedTahan}
                    onCancel={this.hideDatePicker}
                    mode={'date'}
                />
                {/* timepicker additional immediate action */}
                <DateTimePicker
                    isVisible={this.state.timePickerTahan}
                    onConfirm={this.handleTimePickedTahan}
                    onCancel={this.hideTimePicker}
                    mode={'time'}
                />
                {/* Image View */}
                <ImageView
                    images={images}
                    imageIndex={0}
                    isVisible={this.state.ModalVisible}
                />
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
    }
}

export default AddTahanReport
