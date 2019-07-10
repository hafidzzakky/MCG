import React, { Component } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import {
    HeaderSub,
    AccordionAdditionalIncident
} from '../../../Components';
import {
    Content
} from 'native-base';
import ImageView from 'react-native-image-view';
import bgImg from '../../../Assets/image/bgImg.jpg';
export class HazardDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            ModalVisible: false,
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
                    ResponsibleDepartment: "Kemananan",
                    chosenDate: "Wed, 10 Jul 2019",
                    id: "43264393"
                }
            ]
        }
    }

    viewModal = () => {
        this.setState({
            ModalVisible: true
        })
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

        const images = [
            {
                source: bgImg,
                title: 'Paris',
                width: 806,
                height: 720,
            }
        ];
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <View style={styles.contentContainer}>
                        <View style={styles.containerCard}>
                            <View style={styles.infoIncident}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0}]}>Reported By </Text>
                                    <Text style={styles.contentIncident}>Abdul Malik</Text>
                                </View>
                                <View>
                                    <Text style={styles.dateIncident}>01 Januari 2019</Text>
                                    <Text style={styles.dateIncident}>13:49</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Reporting Department </Text>
                                    <Text style={[styles.contentIncident]}>ADR</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Reporting Section</Text>
                                    <Text style={[styles.contentIncident]}>Gold Room</Text>
                                </View>
                            </View>
                            <View style={{height: 1, backgroundColor: '#dbdbdb', marginTop: 10}}/>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 5}]}>Location </Text>
                            <Text>ACHR Topsoil Stockpile</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Responsible Department </Text>
                                    <Text style={[styles.contentIncident]}>ADR</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Hazard Type</Text>
                                    <Text style={[styles.contentIncident]}>Unsafe Condition</Text>
                                </View>
                            </View>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 15}]}>Hazard Category </Text>
                            <Text>Energy sources (Hydraulic, Pneumatic, Mechanical etc)</Text>
                            <View style={{height: 1, backgroundColor: '#dbdbdb', marginTop: 10}}/>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Detail of Hazard</Text>
                            <Text>Energy sources (Hydraulic, Pneumatic, Mechanical etc) qweqweqwesfasdfadfadsfadfadfadfadfasdfadf qweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadfqweqweqwesfasdfadfadsfadfadfadfadfasdfadf</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 15}]}>Immediate Action Taken </Text>
                            <Text>Energy sources (Hydraulic, Pneumatic, Mechanical etc)</Text>
                        </View>
                    </View>
                    <View style={{padding: 10, paddingTop: 10}}>
                        <TouchableOpacity 
                            onPress={() => this.viewModal()}
                            style={styles.cardPhotoIncident}>
                            <View>
                                <Image style={styles.ImageContainer} source={bgImg} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 20}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Actual Risk Level</Text>
                    </View>
                    <View style={{padding: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Actual Likehood</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#e74c3c'}]}>LIKELY</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Actual Consequence</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>INSIGNIFICANT</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Actual Risk Level</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#f1c40f'}]}>HIGH</Text>
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

export default HazardDetail
