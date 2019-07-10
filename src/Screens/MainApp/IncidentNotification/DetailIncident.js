import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import {
    HeaderSub,
    AccordionInncident,
    AccordionAdditionalIncident
} from '../../../Components';
import {
    Content
} from 'native-base';
import ImageView from 'react-native-image-view';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import camera2 from '../../../Assets/image/camera2.png'
import bgImg from '../../../Assets/image/bgImg.jpg'
export class DetailIncident extends Component {
    constructor(props){
        super(props);
        this.state = {
            ImageSource1: bgImg,
            ImageSource2: bgImg,
            ImageSource3: bgImg,
            ModalVisible: false,
            indexImage: 0,
            DataImmediateAction : [
                {
                    ActionTakenBy:{
                        id: "0088eb32-7fb6-4b6d-b2cc-d1cc2e996af41",
                        nama: "YANI MAILANGKAY ",
                        nik: "B0408",
                        posisi: "OPERATOR BOGGER"

                    },
                    Description: "deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan ",
                    ImmediateAction: "aksi penyelamatan",

                },
                {
                    ActionTakenBy:{
                        id: "0088eb32-7fb6-4b6d-b2cc-d1cc2e996af4",
                        nama: "YANI MAILANGKAY ",
                        nik: "B0408",
                        posisi: "OPERATOR BOGGER"

                    },
                    Description: "deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan ",
                    ImmediateAction: "aksi penyelamatan",

                }
            ],
            DataAdditionalImmediateAction : [
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
        };
    }

    viewModal = (index) => {
        this.setState({
            indexImage: index,
            ModalVisible: true
        })
    }

    keyExtractor = (item, index) => item.ActionTakenBy.id;

    keyExtractorAdditional = (item, index) => item.AssignTo.id;

    renderItem = ({item}) => (
        <AccordionInncident 
            data = {item}
        />
    );

    renderItemAdditional = ({item}) => (
        <AccordionAdditionalIncident 
            data = {item}
        />
    );

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');

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
                    <View style={styles.contentContainer}>
                        <Text style={{marginBottom: 10,marginTop: 10, fontWeight: 'bold', fontSize: 20}}>Report Incident</Text>
                        <View style={styles.containerCard}>
                            <Text style={styles.titleIncident}>Incident Title</Text>
                            <View style={styles.infoIncident}>
                                <View>
                                    <Text style={styles.contentIncident}>PT. BUMI SUKSESINDO</Text>
                                    <Text style={styles.contentIncident}>Abdul Malik</Text>
                                </View>
                                <View style={styles.rightContent}>
                                    <Text style={styles.dateIncident}>01 Januari 2019</Text>
                                    <Text style={styles.dateIncident}>08:00</Text>
                                </View>
                            </View>
                            <View style={styles.separator}/>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 5}]}>Contractor </Text>
                            <Text>PT. Semen Indonesia Logistik (SILOG)</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Category </Text>
                            <Text style={[styles.contentIncident,{marginBottom: 10}]}>Energy sources (Hydraulic, Pneumatic, Mechanical etc)</Text>
                            <View style={styles.separator}/>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 5}]}>Location </Text>
                            <Text>ACHR Topsoil Stockpile</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Responsible Department </Text>
                                    <Text style={[styles.contentIncident]}>ADR</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Responsible Section</Text>
                                    <Text style={[styles.contentIncident]}>Gold Room</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{padding: 10, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity 
                            onPress={() => this.viewModal(0)}
                            style={styles.cardPhotoIncident}>
                            <View>
                                <Image style={styles.ImageContainer} source={bgImg} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.viewModal(1)}
                            style={styles.cardPhotoIncident}>
                            <View>
                                <Image style={styles.ImageContainer} source={bgImg} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.viewModal(2)}
                            style={styles.cardPhotoIncident}>
                            <View>
                                <Image style={styles.ImageContainer} source={bgImg} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 10}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Incident Type</Text>
                    </View>
                    <View style={{padding: 10}}>
                        <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 5}]}>Primary Incident Type</Text>
                        <Text>Security</Text>
                        <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Secondary Incident Type</Text>
                        <Text style={[styles.contentIncident]}>Plant/Property Damage</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Risk Level</Text>
                    </View>
                    <View style={{padding: 10}}>
                        <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 5}]}>Actual</Text>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text>Risk Level</Text>
                                <View style={{padding: 5, backgroundColor: '#e74c3c', borderRadius: 15}}>
                                    <Text style={{marginRight: 10, marginLeft: 10, fontWeight: 'bold', color: '#fff', fontSize: 12}}>Extreme</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                                <Text>Incident Class</Text>
                                <View style={{padding: 5, backgroundColor: '#e74c3c', borderRadius: 15}}>
                                    <Text style={{marginRight: 10, marginLeft: 10, fontWeight: 'bold', color: '#fff', fontSize: 12}}>Catastrophic</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 15}]}>Potential</Text>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text>Risk Level</Text>
                                <View style={{padding: 5, backgroundColor: '#e74c3c', borderRadius: 15}}>
                                    <Text style={{marginRight: 10, marginLeft: 10, fontWeight: 'bold', color: '#fff', fontSize: 12}}>Extreme</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                                <Text>Incident Class</Text>
                                <View style={{padding: 5, backgroundColor: '#e74c3c', borderRadius: 15}}>
                                    <Text style={{marginRight: 10, marginLeft: 10, fontWeight: 'bold', color: '#fff', fontSize: 12}}>Catastrophic</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.separator, {marginTop: 10}]}/>
                        <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Serious Potential Incident (SPI) / Significant Incident</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#e74c3c'}]}>No</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Statutory Report Required</Text>
                            <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0, color: '#16a085'}]}>Yes</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Immediate Action</Text>
                    </View>
                    <View>
                        {this.state.DataImmediateAction.length == 0 ? false : 
                            <FlatList
                                data={this.state.DataImmediateAction}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                            />
                        }
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Additional Immediate Action</Text>
                    </View>
                    <View>
                        {this.state.DataImmediateAction.length == 0 ? false : 
                            <FlatList
                                data={this.state.DataAdditionalImmediateAction}
                                keyExtractor={this.keyExtractorAdditional}
                                renderItem={this.renderItemAdditional}
                            />
                        }
                    </View>
                    <View style={{height: 40}}/>
                </Content>
                <ImageView
                    images={images}
                    imageIndex={this.state.indexImage}
                    isVisible={this.state.ModalVisible}
                />
            </HeaderSub>
        )
    }
}

const styles = {
    titleIncident:{
        fontWeight: 'bold',
        fontSize: 16
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
        justifyContent: 'space-between',
        marginTop: 5
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
    separator:{
        height: 1,
        backgroundColor: '#dbdbdb',
        marginTop: 5,
        marginBottom: 5
    },
    titleContainer:{
        padding: 10,
        backgroundColor: '#f7f7f7'
    },
    headerStyle:{
        fontWeight: 'bold',
        fontSize: 16
    },
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
}
export default DetailIncident
