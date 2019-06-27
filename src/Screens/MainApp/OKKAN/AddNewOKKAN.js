import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import {
    Content,
    Form,
    Textarea,
    Item,
    Input,
    Icon,
    Radio
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
import bgImg from '../../../Assets/image/bgImg.jpg'
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
            EquipmentVehicleParked: 3                
        };
    }

    async componentDidMount(){
        try{
            await AsyncStorage.removeItem('isEdit');
            return true;
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

    renderTable = () => {
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{flexDirection: 'row', backgroundColor: '#B3A369', borderColor: '#63666A', borderWidth: 2}}>
                <View style={styles.headerTable}>
                    <Text style={styles.fontStyle}>Assign To</Text>
                </View>
                <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                <View style={styles.headerTable}>
                    <Text style={styles.fontStyle}>Resp. Department</Text>
                </View> 
                <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                <View style={styles.headerTable}>
                    <Text style={styles.fontStyle}>Priority</Text>
                </View> 
                <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                <View style={styles.headerTable}>
                    <Text style={styles.fontStyle}>Due Date</Text>
                </View> 
                <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                <View style={styles.headerTable}>
                    <Text style={styles.fontStyle}>Action</Text>
                </View>
            </View>
            {this.state.CorrectiveAction.length == 0 ?
                <View style={{flexDirection: 'row', backgroundColor: '#fff', borderColor: '#63666A', borderWidth: 1, flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text>tidak ada data</Text>
                </View>
                :
                this.state.CorrectiveAction.map((datum) => { 
                    return this.renderRow(datum);
                })
            }
        </View>
    }

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        let data = [{
            value: 'PT. Bumi Suksesindo 1',
          }, {
            value: 'PT. Bumi Suksesindo 2',
          }, {
            value: 'PT. Bumi Suksesindo 3',
        }];
        
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <ImageBackground source={bgImg} style={{
                            flex: 1,
                            resizeMode: 'cover'
                    }}>
                    <View style={{backgroundColor: 'rgba(255, 255, 255,0.9)', flex: 1}}>
                        <Content style={{padding: 10}}>
                            <View style={styles.cardContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.titleText}>OK-KAN REPORT TYPE</Text>
                                </View>
                                <View style={styles.bodyCardContainer}>
                                    <View style={{flex: 1, marginTop: -20}}>
                                        <Dropdown
                                            label='Select OK-KAN Type'
                                            data={data}
                                            onChangeText = {(value => console.log(value))}
                                        />
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Department Observed</Text>
                                        </View>
                                        <View>
                                            <Dropdown
                                                label='Select Department Observed'
                                                data={data}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Location Observed</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity 
                                                onPress={() => this.props.navigation.navigate('Location', {
                                                    onGoBack: () => this.getDataLocation(),
                                                    page: 'Location'
                                                })}
                                                style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                                                {this.state.Location.nama == null ? 
                                                    <Text style={{fontSize: 16, color: '#939393'}}>Location Observed </Text> :
                                                    <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Location.nama}</Text>    
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Description of Activity/task observed</Text>
                                        </View>
                                        <View>
                                            <View style={{padding: 10}}>
                                                <Form>
                                                    <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                                                </Form>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>No of People Observed</Text>
                                        </View>
                                        <View>
                                            <View style={{padding: 5, paddingLeft: 0, flex: 1}}>
                                                <Form>
                                                    <Item>
                                                        <Input placeholder="No. of people Observed" />
                                                    </Item>
                                                </Form>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Supervisor Name</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity 
                                                onPress={() => this.props.navigation.navigate('ReportedBy', {
                                                    onGoBack: () => this.getDataReportedBy(),
                                                    page: 'Supervisor Name'
                                                })}
                                                style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                                                {this.state.Supervisor.nama == null ? 
                                                    <Text style={{fontSize: 16, color: '#939393'}}>Supervisor Name </Text> :
                                                    <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.Supervisor.nama}</Text>   
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Section</Text>
                                        </View>
                                        <View>
                                            <Dropdown
                                                label='Select Section'
                                                data={data}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Date of Observation</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => this.showDatePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                                                {this.state.chosenDateOKKAN == '' ? 
                                                    <Text style={{fontSize: 16, color: '#939393'}}>Click Here </Text> :
                                                    <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenDateOKKAN}</Text>   
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Time of Observation</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => this.showTimePicker()} style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                                                {this.state.chosenTimeOKKAN == '' ? 
                                                    <Text style={{fontSize: 16, color: '#939393'}}>Click Here </Text> :
                                                    <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.chosenTimeOKKAN}</Text>   
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Observing Department</Text>
                                        </View>
                                        <View>
                                            <Dropdown
                                                label='Select Observing Department'
                                                data={data}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Observation Conducted 1</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity 
                                                onPress={() => this.props.navigation.navigate('ReportedBy', {
                                                    onGoBack: () => this.getDataConducted1(),
                                                    page: 'Observation Conducted 1'
                                                })}
                                                style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                                                {this.state.ObservationConducted1.nama == null ? 
                                                    <Text style={{fontSize: 16, color: '#939393'}}>Click Here </Text> :
                                                    <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ObservationConducted1.nama}</Text>   
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Observation Conducted 2</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity 
                                                onPress={() => this.props.navigation.navigate('ReportedBy', {
                                                    onGoBack: () => this.getDataConducted2(),
                                                    page: 'Observation Conducted 2'
                                                })}
                                                style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                                                {this.state.ObservationConducted2.nama == null ? 
                                                    <Text style={{fontSize: 16, color: '#939393'}}>Click Here </Text> :
                                                    <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ObservationConducted2.nama}</Text>   
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Observation Conducted 3</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity 
                                                onPress={() => this.props.navigation.navigate('ReportedBy', {
                                                    onGoBack: () => this.getDataConducted3(),
                                                    page: 'Observation Conducted 3'
                                                })}
                                                style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                                                {this.state.ObservationConducted3.nama == null ? 
                                                    <Text style={{fontSize: 16, color: '#939393'}}>Click Here </Text> :
                                                    <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.ObservationConducted3.nama}</Text>   
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.titleText}>Other Observer / Contractor</Text>
                                </View>
                                <View style={styles.bodyCardContainer}>
                                    <View style={{padding: 5, paddingLeft: 0, flex: 1, marginTop: -10}}>
                                        <Form>
                                            <Item>
                                                <Input placeholder="Other Observer / Contractor" />
                                            </Item>
                                        </Form>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Shift</Text>
                                        </View>
                                        <View>
                                            <Dropdown
                                                label='Select Shift'
                                                data={data}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Unsafe Act / Condition</Text>
                                        </View>
                                        <View>
                                            <Form>
                                                <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                                            </Form>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Agreed Control / Action To Be Taken</Text>
                                        </View>
                                        <View>
                                            <Form>
                                                <Textarea rowSpan={5} bordered placeholder="Edit Here" />
                                            </Form>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Planning Implementation</Text>
                                        </View>
                                        {/* Procedure reviewed */}
                                        <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureReviewed: 1})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureReviewed == 1}
                                                />
                                            </View>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>N</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureReviewed: 2})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureReviewed == 2}
                                                />
                                            </View>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureReviewed: 3})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureReviewed == 3}
                                                />
                                            </View>
                                            <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>JSEA/WI/Procedure reviewed and communicated</Text>
                                            </View>
                                        </View>
                                        {/* Procedure Understood */}
                                        <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureUnderstood: 1})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureUnderstood == 1}
                                                />
                                            </View>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>N</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureUnderstood: 2})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureUnderstood == 2}
                                                />
                                            </View>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureUnderstood: 3})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureUnderstood == 3}
                                                />
                                            </View>
                                            <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>JSEA/WI/Procedure understood</Text>
                                            </View>
                                        </View>
                                        {/* Procedure Followed */}
                                        <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureFollowed: 1})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureFollowed == 1}
                                                />
                                            </View>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>N</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureFollowed: 2})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureFollowed == 2}
                                                />
                                            </View>
                                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                <Radio
                                                    onPress={() => this.setState({ProcedureFollowed: 3})}
                                                    color={"#B3A369"}
                                                    selectedColor={"#B3A369"}
                                                    selected={this.state.ProcedureFollowed == 3}
                                                />
                                            </View>
                                            <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>JSEA/WI/Procedure followed</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Work Environment</Text>
                                        </View>
                                        <View>
                                            {/* Haul road consructed safely */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({HaulRoadConstructedSafely: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.HaulRoadConstructedSafely == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({HaulRoadConstructedSafely: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.HaulRoadConstructedSafely == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({HaulRoadConstructedSafely: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.HaulRoadConstructedSafely == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Haul road consructed safely</Text>
                                                </View>
                                            </View>
                                            {/* Maneuvering and dumping safely */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({ManeuveringAndDumpingSafely: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.ManeuveringAndDumpingSafely == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({ManeuveringAndDumpingSafely: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.ManeuveringAndDumpingSafely == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({ManeuveringAndDumpingSafely: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.ManeuveringAndDumpingSafely == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Maneuvering and dumping safely</Text>
                                                </View>
                                            </View>
                                            {/* Signage obeyed */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({SignageObeyed: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.SignageObeyed == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({SignageObeyed: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.SignageObeyed == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({SignageObeyed: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.SignageObeyed == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Signage obeyed</Text>
                                                </View>
                                            </View>
                                            {/* Unauthorized people cleared */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({UnauthorizedPeopleCleared: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.UnauthorizedPeopleCleared == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({UnauthorizedPeopleCleared: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.UnauthorizedPeopleCleared == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({UnauthorizedPeopleCleared: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.UnauthorizedPeopleCleared == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Unauthorized people cleared</Text>
                                                </View>
                                            </View>
                                            {/* Dust suppresion spray safely applied */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({DustSuppresionSpraySafelyApplied: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.DustSuppresionSpraySafelyApplied == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({DustSuppresionSpraySafelyApplied: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.DustSuppresionSpraySafelyApplied == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({DustSuppresionSpraySafelyApplied: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.DustSuppresionSpraySafelyApplied == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Dust suppresion spray safely applied</Text>
                                                </View>
                                            </View>
                                            {/* Safe vehicle interaction / distance maintained */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({SafeVehicleInteraction: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.SafeVehicleInteraction == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({SafeVehicleInteraction: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.SafeVehicleInteraction == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({SafeVehicleInteraction: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.SafeVehicleInteraction == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Safe vehicle interaction / distance maintained</Text>
                                                </View>
                                            </View>
                                            {/* Berm height actively maintained */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({BermHeightActivelyMaintained: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.BermHeightActivelyMaintained == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({BermHeightActivelyMaintained: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.BermHeightActivelyMaintained == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({BermHeightActivelyMaintained: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.BermHeightActivelyMaintained == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Berm height actively maintained</Text>
                                                </View>
                                            </View>
                                            {/* Working with sufficient light */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({WorkingWithSufficientLight: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.WorkingWithSufficientLight == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({WorkingWithSufficientLight: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.WorkingWithSufficientLight == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({WorkingWithSufficientLight: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.WorkingWithSufficientLight == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Working with sufficient light</Text>
                                                </View>
                                            </View>
                                            {/* Maneuvering and loading safely */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({ManeuveringAndLoadingSafely: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.ManeuveringAndLoadingSafely == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({ManeuveringAndLoadingSafely: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.ManeuveringAndLoadingSafely == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({ManeuveringAndLoadingSafely: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.ManeuveringAndLoadingSafely == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Maneuvering and loading safely</Text>
                                                </View>
                                            </View>
                                            {/* Equipment/vehicle parked at designated area */}
                                            <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Y</Text>
                                                    <Radio
                                                        onPress={() => this.setState({EquipmentVehicleParked: 1})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.EquipmentVehicleParked == 1}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N</Text>
                                                    <Radio
                                                        onPress={() => this.setState({EquipmentVehicleParked: 2})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.EquipmentVehicleParked == 2}
                                                    />
                                                </View>
                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>N/A</Text>
                                                    <Radio
                                                        onPress={() => this.setState({EquipmentVehicleParked: 3})}
                                                        color={"#B3A369"}
                                                        selectedColor={"#B3A369"}
                                                        selected={this.state.EquipmentVehicleParked == 3}
                                                    />
                                                </View>
                                                <View style={{flex: 1, margin: 5, marginLeft: 20}}>
                                                    <Text style={{fontWeight: 'bold'}}>Equipment/vehicle parked at designated area</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>Tools & Equipment</Text>
                                        </View>
                                        <View>
                                            <Dropdown
                                                label='Select OK-KAN Type'
                                                data={data}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.titleContainerGrid}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>People</Text>
                                        </View>
                                        <View>
                                            <Dropdown
                                                label='Select OK-KAN Type'
                                                data={data}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.titleText}>OK-KAN REPORT TYPE</Text>
                                </View>
                                <View style={[styles.bodyCardContainer, {flexDirection: 'column'}]}>
                                    <TouchableOpacity 
                                        onPress={() => this.props.navigation.navigate('AddCorrectionAction', {
                                            onGoBack: () => this.getDataCorrectiveAction(),
                                            page: 'Add Corrective Action'
                                        })}
                                        style={{padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B3A369', marginBottom: 10}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>Add Correction Action</Text>
                                    </TouchableOpacity>
                                    {/* {this.state.CorrectiveAction.length == 0 ? false : 
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
                                    } */}
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{flexDirection: 'row', backgroundColor: '#B3A369', borderColor: '#63666A', borderWidth: 2}}>
                                            <View style={styles.headerTable}>
                                                <Text style={styles.fontStyle}>Assign To</Text>
                                            </View>
                                            <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                                            <View style={styles.headerTable}>
                                                <Text style={styles.fontStyle}>Resp. Department</Text>
                                            </View> 
                                            <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                                            <View style={styles.headerTable}>
                                                <Text style={styles.fontStyle}>Priority</Text>
                                            </View> 
                                            <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                                            <View style={styles.headerTable}>
                                                <Text style={styles.fontStyle}>Due Date</Text>
                                            </View> 
                                            <View style={{height: '100%', width: 2, backgroundColor:'#63666A'}} />
                                            <View style={styles.headerTable}>
                                                <Text style={styles.fontStyle}>Action</Text>
                                            </View>
                                        </View>
                                        {this.state.CorrectiveAction.length == 0 ?
                                            <View style={{flexDirection: 'row', backgroundColor: '#fff', borderColor: '#63666A', borderWidth: 1, flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                                                <Text>tidak ada data</Text>
                                            </View>
                                            :
                                            this.state.CorrectiveAction.map((item) => { 
                                                return this.renderRow(item);
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                        </Content>
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
                    </View>
                </ImageBackground>
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
        // flex: 1,
        // height: 30
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    bodyCardContainer:{
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
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
}
export default AddNewOKKAN
