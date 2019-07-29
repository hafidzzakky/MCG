import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {
    Content,
    Form,
    Textarea,
    Item,
    Input,
    Icon,
    Label,
    Radio,
    ListItem,
    Left,
    Right
} from 'native-base';
import {
    HeaderSub
} from '../../../Components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
export class AddNewOKKAN extends Component {
    constructor(props){
        super(props);
        this.state = {
            Supervisor: [],
            Location: [],
            CorrectiveAction:[],
            timePickerOKKAN: false,
            chosenTimeOKKAN: '',
            datePickerOKKAN: false,
            chosenDateOKKAN: '',
            ObservationConducted1: '',
            ObservationConducted2: '',
            ObservationConducted3: '',
            ProcedureReviewed: 3,
            ProcedureUnderstood: 3,
            ProcedureFollowed: 3,
            HaulRoadConstructedSafely: 3,
            ManeuveringAndDumpingSafely: 3,
            SignageObeyed: 3,
            UnauthorizedPeopleCleared: 3,
            DustSuppresionSpraySafelyApplied: 3,
            SafeVehicleInteraction:3,
            BermHeightActivelyMaintained: 3,
            WorkingWithSufficientLight: 3,
            ManeuveringAndLoadingSafely: 3,
            EquipmentVehicleParked: 3,
            EquipmentUsedinSafeCondition: 3,
            PreStartCheckCondictedCorrectly: 3,
            UseSuitableTools: 3,         
            listDepartment: [],
            listSection: [],
            DepartmentObserved: '',
            Section: '',
            ObservingDepartment: '',
            Shift: '' 
        };
    }

    async componentDidMount(){
        try{
            await AsyncStorage.removeItem('isEdit');
            const value = await AsyncStorage.getItem('ListCompany');
            const Department = await AsyncStorage.getItem('ListDepartment');
            const Section = await AsyncStorage.getItem('ListSection');
            if(value !== null || Department !== null || Section !== null) {
                let data = JSON.parse(value);
                let listDepartment = JSON.parse(Department);
                let listSection = JSON.parse(Section);
                console.log('ddata : ', JSON.parse(value));
                this.setState({
                    ListCompany: data,
                    listDepartment: listDepartment,
                    listSection: listSection
                })
            }
        }catch(exception){
            return false;
        }
    }

    getDataLocation = async () => {
        try {
          const value = await AsyncStorage.getItem('dataLocation')
          if(value !== null) {
            this.setState({
                Location: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataReportedBy = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          if(value !== null) {
            this.setState({
                Supervisor: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataConducted1 = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          if(value !== null) {
            this.setState({
                ObservationConducted1: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataConducted2 = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          if(value !== null) {
            this.setState({
                ObservationConducted2: JSON.parse(value)
            })
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataConducted3 = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          if(value !== null) {
            this.setState({
                ObservationConducted3: JSON.parse(value)
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
                let data = this.state.CorrectiveAction;
                data.push(JSON.parse(value));
              this.setState({
                CorrectiveAction: data
              })
            }
          } catch(e) {
            console.log(e)
        }
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

    //time picker
    showTimePicker = () => {
        this.setState({ timePickerOKKAN: true });
    };
    
    hideTimePicker = () => {
        this.setState({ timePickerOKKAN: false });
    };

    handleTimePickedOKKAN = time => {
        let chosenTime = moment(time).format('HH:MM:SS')
        console.log('coba ', chosenTime);
        this.setState({
            chosenTimeOKKAN: chosenTime,
            timePickerOKKAN: false
        })
    }
    
    //date picker
    showDatePicker = () => {
        this.setState({ datePickerOKKAN: true });
    };
    
    hideDatePicker = () => {
        this.setState({ datePickerOKKAN: false });
    };

    handleDatePickedOKKAN = date => {
        let chosenDate = moment(date).format('ddd, D MMM YYYY')
        console.log(chosenDate);
        this.setState({
            chosenDateOKKAN: chosenDate,
            datePickerOKKAN: false
        })
    }

    removeItem(id) {
        let data = this.state.CorrectiveAction
        data = data.filter((item) => item.id !== id)
        console.log('id item : ', id)
        console.log('remove item : ', data)
        this.setState({ CorrectiveAction: data })
    }

    renderRow(item) {
        console.log('datum', item)
        return (
            <View key={'datum-'+item.id} style={{flexDirection: 'row', backgroundColor: '#fff', borderColor: '#63666A', borderWidth: 1}}>
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>{item.AssignTo.nama}</Text>
                    </View>
                    <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>{item.AssignTo.posisi}</Text>
                    </View> 
                    <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>{item.Priority}</Text>
                    </View> 
                    <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>{item.chosenDateCorrectiveAction}</Text>
                    </View> 
                    <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                    <View style={[styles.bodyTable]}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
                            <TouchableOpacity 
                            onPress={() => this.editData(item)}
                            style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Icons name='pencil' style={{marginTop: 0}} size={25} color='#B3A369' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.removeItem(item.id)} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Icons name='delete' style={{marginTop: 0}} size={25} color='#B3A369' />
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
            
        );
    }

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        let data = [{
            value: 'Day',
          }, {
            value: 'Night',
          }];
        
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>OK-KAN Report Type</Text>
                </View>
                <View style={styles.containerForm}>
                    <Dropdown
                        label=' OK-KAN Type'
                        data={data}
                    />
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Department Observed</Text>
                </View>
                <View style={styles.containerForm}>
                    <Dropdown
                        label='Department Observed'
                        data={this.state.listDepartment}
                        valueExtractor={({ Name }) => Name}
                        onChangeText={(text) => this.setState({DepartmentObserved : text})}
                    />
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Location Observed</Text>
                </View>
                <View style={styles.containerForm}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Location', {
                            onGoBack: () => this.getDataLocation(),
                            page: 'Location'
                        })}
                        style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                        <Text style={{fontSize: 16, color: '#939393'}}>Location Observed</Text>
                        <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Location.nama}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Description of Activity/task observed</Text>
                </View>
                <View style={[styles.containerForm, {paddingTop: 10}]}>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                    </Form>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>No of People Observed</Text>
                </View>
                <View style={styles.containerForm}>
                    <Form>
                        <Item floatingLabel style={{marginLeft: 0}}>
                        <Label style={{fontSize: 13}}>Phone No.</Label>
                            <Input />
                        </Item>
                    </Form>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Supervisor Name</Text>
                </View>
                <View style={styles.containerForm}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Location', {
                            onGoBack: () => this.getDataReportedBy(),
                            page: 'Supervisor Name'
                        })}
                        style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                        <Text style={{fontSize: 16, color: '#939393'}}>Supervisor Name</Text>
                        <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Supervisor.nama}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Section</Text>
                </View>
                <View style={styles.containerForm}>
                    <Dropdown
                        label='Section'
                        data={this.state.listSection}
                        valueExtractor={({ Name }) => Name}
                        onChangeText={(text) => this.setState({listSection : text})}
                    />
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Date of Observation</Text>
                </View>
                <View style={styles.containerForm}>
                    <TouchableOpacity onPress={() => this.showDatePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                        {this.state.chosenDateOKKAN == '' ? 
                            <Text style={{fontSize: 16, color: '#939393'}}>Click Here </Text> :
                            <Text style={{fontSize: 16, color: '#939393'}}>{this.state.chosenDateOKKAN}</Text>   
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Time of Observation</Text>
                </View>
                <View style={styles.containerForm}>
                    <TouchableOpacity onPress={() => this.showTimePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                        {this.state.chosenTimeOKKAN == '' ? 
                            <Text style={{fontSize: 16, color: '#939393'}}>Click Here </Text> :
                            <Text style={{fontSize: 16, color: '#939393'}}>{this.state.chosenTimeOKKAN}</Text>   
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Observing Department</Text>
                </View>
                <View style={styles.containerForm}>
                    <Dropdown
                        label='Observing Department'
                        data={this.state.listDepartment}
                        valueExtractor={({ Name }) => Name}
                        onChangeText={(text) => this.setState({ObservingDepartment : text})}
                    />
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Observation Conducted by 1</Text>
                </View>
                <View style={styles.containerForm}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Location', {
                            onGoBack: () => this.getDataConducted1(),
                            page: 'Observation Conducted 1'
                        })}
                        style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                        <Text style={{fontSize: 16, color: '#939393'}}>Click Here</Text>
                        <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ObservationConducted1.nama}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Observation Conducted by 2</Text>
                </View>
                <View style={styles.containerForm}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Location', {
                            onGoBack: () => this.getDataConducted2(),
                            page: 'Observation Conducted 2'
                        })}
                        style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                        <Text style={{fontSize: 16, color: '#939393'}}>Click Here</Text>
                        <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ObservationConducted2.nama}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Observation Conducted by 3</Text>
                </View>
                <View style={styles.containerForm}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Location', {
                            onGoBack: () => this.getDataConducted3(),
                            page: 'Observation Conducted 3'
                        })}
                        style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                        <Text style={{fontSize: 16, color: '#939393'}}>Click Here</Text>
                        <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ObservationConducted3.nama}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Other Observer / Contractor</Text>
                </View>
                <View style={[styles.containerForm, {paddingTop: 10}]}>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Other Name" />
                    </Form>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Shift</Text>
                </View>
                <View style={styles.containerForm}>
                    <Dropdown
                        label='Shift'
                        data={data}
                        onChangeText={(text) => this.setState({Shift : text})}
                    />
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Unsafe Act / Condition</Text>
                </View>
                <View style={[styles.containerForm, {paddingTop: 10}]}>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                    </Form>
                </View>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Agreed Control / Action To Be Taken</Text>
                </View>
                <View style={[styles.containerForm, {paddingTop: 10}]}>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                    </Form>
                </View>
                <View style={styles.separator}/>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Planning Implementation</Text>
                </View>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>JSEA/WI/Procedure reviewed and communicated</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureReviewed: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureReviewed == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureReviewed: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureReviewed == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureReviewed: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureReviewed == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>JSEA/WI/Procedure understood</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureUnderstood: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureUnderstood == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureUnderstood: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureUnderstood == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureUnderstood: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureUnderstood == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>JSEA/WI/Procedure followed</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureFollowed: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureFollowed == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureFollowed: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureFollowed == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({ProcedureFollowed: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ProcedureFollowed == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Work Environment</Text>
                </View>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Haul road consructed safely</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({HaulRoadConstructedSafely: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.HaulRoadConstructedSafely == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({HaulRoadConstructedSafely: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.HaulRoadConstructedSafely == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({HaulRoadConstructedSafely: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.HaulRoadConstructedSafely == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Maneuvering and dumping safely</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({ManeuveringAndDumpingSafely: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ManeuveringAndDumpingSafely == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({ManeuveringAndDumpingSafely: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ManeuveringAndDumpingSafely == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({ManeuveringAndDumpingSafely: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ManeuveringAndDumpingSafely == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Signage obeyed</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({SignageObeyed: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.SignageObeyed == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({SignageObeyed: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.SignageObeyed == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({SignageObeyed: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.SignageObeyed == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Unauthorized people cleared</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({UnauthorizedPeopleCleared: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.UnauthorizedPeopleCleared == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({UnauthorizedPeopleCleared: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.UnauthorizedPeopleCleared == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({UnauthorizedPeopleCleared: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.UnauthorizedPeopleCleared == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Dust suppresion spray safely applied</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({DustSuppresionSpraySafelyApplied: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.DustSuppresionSpraySafelyApplied == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({DustSuppresionSpraySafelyApplied: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.DustSuppresionSpraySafelyApplied == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({DustSuppresionSpraySafelyApplied: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.DustSuppresionSpraySafelyApplied == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Safe vehicle interaction / distance maintained</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({SafeVehicleInteraction: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.SafeVehicleInteraction == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({SafeVehicleInteraction: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.SafeVehicleInteraction == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({SafeVehicleInteraction: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.SafeVehicleInteraction == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Berm height actively maintained</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({BermHeightActivelyMaintained: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.BermHeightActivelyMaintained == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({BermHeightActivelyMaintained: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.BermHeightActivelyMaintained == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({BermHeightActivelyMaintained: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.BermHeightActivelyMaintained == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Working with sufficient light</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({WorkingWithSufficientLight: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.WorkingWithSufficientLight == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({WorkingWithSufficientLight: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.WorkingWithSufficientLight == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({WorkingWithSufficientLight: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.WorkingWithSufficientLight == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Maneuvering and loading safely</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({ManeuveringAndLoadingSafely: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ManeuveringAndLoadingSafely == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({ManeuveringAndLoadingSafely: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ManeuveringAndLoadingSafely == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({ManeuveringAndLoadingSafely: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.ManeuveringAndLoadingSafely == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Equipment/vehicle parked at designated area</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentVehicleParked: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentVehicleParked == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentVehicleParked: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentVehicleParked == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentVehicleParked: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentVehicleParked == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>Tools & Equipment</Text>
                </View>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Equipment used in safe condition</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Pre Start check condicted correctly</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({PreStartCheckCondictedCorrectly: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.PreStartCheckCondictedCorrectly == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({PreStartCheckCondictedCorrectly: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.PreStartCheckCondictedCorrectly == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({PreStartCheckCondictedCorrectly: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.PreStartCheckCondictedCorrectly == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Use suitable tools/equipment</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({UseSuitableTools: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.UseSuitableTools == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({UseSuitableTools: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.UseSuitableTools == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({UseSuitableTools: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.UseSuitableTools == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>People</Text>
                </View>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Fit for work and sufficient sleep</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Operating equipment/vehicle with proper license</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Safe position of people (hit/pinched/struck/fall/slip)</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Access/egress to worl area or equipment safely</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Not rushing/speeding on the job</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Drive to condition</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Correct approach to mobile equipment</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>PPE used correctly</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <ListItem selected={true} style={{marginLeft: 0}}>
                    <Left style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Safe reversing and parking practice</Text>
                    </Left>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerRadioButton}>
                            <Text style={{fontWeight: 'bold'}}>Y</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 1})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 1}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 2})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 2}
                            />
                        </View>
                        <View style={[styles.containerRadioButton, {marginLeft: 20}]}>
                            <Text style={{fontWeight: 'bold'}}>N/A</Text>
                            <Radio
                                onPress={() => this.setState({EquipmentUsedinSafeCondition: 3})}
                                color={"#B3A369"}
                                selectedColor={"#B3A369"}
                                selected={this.state.EquipmentUsedinSafeCondition == 3}
                            />
                        </View>
                    </View>
                </ListItem>
                <View style={styles.separator}/>
                <View style={styles.containerHeaderItem}>
                    <Text style={styles.titleHeaderStyle}>OK-KAN Report Type</Text>
                </View>
                <View style={styles.bodyCardContainer}>
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
                <TouchableOpacity 
                    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Kirim</Text>
                </TouchableOpacity>
                {/* datepicker Incident Informataion */}
                <DateTimePicker
                    isVisible={this.state.datePickerOKKAN}
                    onConfirm={this.handleDatePickedOKKAN}
                    onCancel={this.hideDatePicker}
                    mode={'date'}
                />
                {/* timepicker additional immediate action */}
                <DateTimePicker
                    isVisible={this.state.timePickerOKKAN}
                    onConfirm={this.handleTimePickedOKKAN}
                    onCancel={this.hideTimePicker}
                    mode={'time'}
                />
            </HeaderSub>
        )
    }
}

const styles = {
    cardContainer : {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 10
    },
    titleContainer:{
        backgroundColor: '#99552B',
        padding: 5,
        marginTop: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    bodyCardContainer:{
        backgroundColor: '#fff',
        flex: 1,
    },
    grid:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    titleContainerGrid:{
        width: '49%',
    },
    headerTable:{
        flex: 1, 
        alignSelf: 'stretch', 
        padding: 10
    },
    fontStyle:{
        fontWeight: 'bold', 
        color: '#fff'
    },
    bodyTable:{
        flex: 1, 
        alignSelf: 'stretch', 
        padding: 10,
        justifyContent: 'center'
    },
    fontBodyStyle:{
        fontSize: 13
    },

    containerHeaderItem:{
        height: 50, 
        padding: 10, 
        backgroundColor: '#ecf0f1', 
        justifyContent: 'center'
    },
    titleHeaderStyle:{
        fontWeight: 'bold', 
        fontSize: 15, 
        color: '#63666A'
    },
    containerForm:{
        padding: 10, 
        paddingTop: 0
    },
    separator:{
        height: 8, 
        backgroundColor: '#d4d8d8',
        marginBottom: 10
    },
    containerRadioButton:{
        justifyContent: 'center', 
        alignItems: 'center'
    }
}
export default AddNewOKKAN
