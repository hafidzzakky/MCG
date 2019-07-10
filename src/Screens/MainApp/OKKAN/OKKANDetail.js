import React, { Component } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import {
    HeaderSub,
    AccordionAdditionalIncident
} from '../../../Components';
import {
    Content
} from 'native-base';

export class OKKANDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            DataCorrectiveAction : [
                {
                    AssignTo:{
                        id: "0088eb32-7fb6-4b6d-b2cc-d1cc2e996af4",
                        nama: "YANI MAILANGKAY ",
                        nik: "B0408",
                        posisi: "OPERATOR BOGGER"
                    },
                    ImmediateAction: "aksi aksi aksi",
                    Priority: "A1",
                    PriorityCategory: "Temporary",
                    ResponsibleDepartment: "ADR",
                    chosenDate: "Wed, 10 Jul 2019",
                    id: "43264393"
                }
            ]
        }
    }
    
    keyExtractor = (item, index) => item.AssignTo.id;

    renderItem = ({item}) => (
        <AccordionAdditionalIncident 
            data = {item}
        />
    );

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <View style={styles.contentContainer}>
                        <View style={styles.containerCard}>
                            <View style={styles.infoIncident}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>OK-KAN Type</Text>
                                    <Text style={[styles.contentIncident]}>Unsafe Condition</Text>
                                </View>
                                <View>
                                    <Text style={styles.dateIncident}>01 Januari 2019</Text>
                                    <Text style={styles.dateIncident}>13:49</Text>
                                </View>
                            </View>
                            <View style={[styles.infoIncident, {marginTop: 10}]}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0}]}>Supervisor Name </Text>
                                    <Text style={styles.contentIncident}>Abdul Malik</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, textAlign: 'right'}]}>No. of people observed</Text>
                                    <Text style={{textAlign: 'right'}}>085678766789</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Department Observed</Text>
                                    <Text style={[styles.contentIncident]}>ADR</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Section</Text>
                                    <Text style={[styles.contentIncident]}>Gold Room</Text>
                                </View>
                            </View>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 5}]}>Location Observed</Text>
                            <Text>ACHR Topsoil Stockpile</Text>
                            <View style={{height: 1, backgroundColor: '#dbdbdb', marginTop: 10}}/>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Description of activity/task observed</Text>
                            <Text>Energy sources (Hydraulic, Pneumatic, Mechanical etc) qweqweqwesfasdfadfadsfadfadfadfadfasdfadf qweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadf</Text>
                            <View style={{height: 1, backgroundColor: '#dbdbdb', marginTop: 10}}/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Observing Department</Text>
                                    <Text>ADR</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10, textAlign: 'right'}]}>Shift</Text>
                                    <View style={{borderRadius: 20, padding: 2, backgroundColor: '#f39c12', width: 50, justifyContent: 'center', alignItems: 'center', marginRight: -5}}>
                                        <Text style={[styles.contentIncident,{ color: '#fff', fontWeight: 'bold', marginTop: 0}]}>Day</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 15}]}>Observing Conducted 1 </Text>
                            <Text>Abdul Malik</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 15}]}>Observing Conducted 2 </Text>
                            <Text>Abdul Rahman</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 15}]}>Observing Conducted 3 </Text>
                            <Text>Abdul Rohman</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 15}]}>Other Observer / Contractor </Text>
                            <Text>Abdul Malik, Malik, Abdul</Text>
                            <View style={{height: 1, backgroundColor: '#dbdbdb', marginTop: 10}}/>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Unsave Act / Condition</Text>
                            <Text>Energy sources (Hydraulic, Pneumatic, Mechanical etc) qweqweqwesfasdfadfadsfadfadfadfadfasdfadf qweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadf</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Agreed Condition / Action To Be Taken</Text>
                            <Text>Energy sources (Hydraulic, Pneumatic, Mechanical etc) qweqweqwesfasdfadfadsfadfadfadfadfasdfadf qweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadf</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Planning Impelemntation</Text>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>JSEA/WI/Procedure reviewed and communicated</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>JSEA/WI/Procedure Understood</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>JSEA/WI/Procedure Followed</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Work Environment</Text>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Haul road consructed safely</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Maneuvering and dumping safely</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Signage obeyed</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Unauthorized people cleared</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Dust suppresion spray safely applied</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Safe vehicle interaction / distance maintained</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Berm height actively maintained</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Working with sufficient light</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Maneuvering and loading safely</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Equipment/vehicle parked at designated area</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Tools & Equipment</Text>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Equipment used in safe condition</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Pre start check conducted correctly</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Use suitable tools / equipment</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>People</Text>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Fit for work and sufficient sleep</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Operating equipment/vehicle with proper license</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Safe position of people (hit/pinched/struck/fall/slip)</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Access/egress to worl area or equipment safely</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Not rushing/speeding on the job</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Drive to condition</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Correct approach to mobile equipment</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>PPE used correctly</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text>Safe reversing and parking practice</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Corrective Action</Text>
                    </View>
                    <View>
                        {this.state.DataCorrectiveAction.length == 0 ? false : 
                            <FlatList
                                data={this.state.DataCorrectiveAction}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                            />
                        }
                    </View>
                    <View style={{height: 40}}/>
                </Content>
            </HeaderSub>
        )
    }
}

const styles = {
    titleIncident:{
        fontWeight: 'bold',
        fontSize: 14
    },
    contentContainer:{
        padding: 10
    },
    containerCard:{
        padding: 15,
        borderRadius: 7,
        backgroundColor: '#f7f7f7',
    },
    infoIncident:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentIncident:{
        fontSize: 13,
        marginTop: 3
    },
    rightContent:{
    },
    dateIncident:{
        fontSize: 12,
        textAlign: 'right',
        marginTop: 3
    },
    titleContainer:{
        padding: 10,
        backgroundColor: '#f7f7f7'
    },
    headerStyle:{
        fontWeight: 'bold',
        fontSize: 16
    },
    ImageContainer: {
        height: 300,
        width: 300,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardPhotoIncident:{
        height: 300,
        width: 300,
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
}

export default OKKANDetail
