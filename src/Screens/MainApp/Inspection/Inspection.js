import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import {
    Content
} from 'native-base';
import {
    HeaderSub
} from '../../../Components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImg from '../../../Assets/image/bgImg.jpg'
export class Inspection extends Component {
    constructor(props){
        super(props);
        this.state = {
            ListDataInspection:[],        
        };
    }

    renderRow(item) {
        console.log('item', item)
        return (
            <View key={'item-'+item.id} style={styles.rowContainer}>
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>Inspection Date</Text>
                    </View>
                    <View style={styles.tableBodySeparator} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>Inspection Type</Text>
                    </View> 
                    <View style={styles.tableBodySeparator} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>Department</Text>
                    </View> 
                    <View style={styles.tableBodySeparator} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>Location</Text>
                    </View>
                    <View style={styles.tableBodySeparator} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>Status</Text>
                    </View>
                    <View style={styles.tableBodySeparator} />
                    <View style={[styles.bodyTable]}>
                        <View style={styles.buttonActionContainer}>
                            <TouchableOpacity 
                            onPress={() => this.editData(item)}
                            style={styles.iconContainerStyle}>
                                <Icons name='pencil' size={25} color='#B3A369' />
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => this.removeItem(item.id)} 
                            style={styles.iconContainerStyle}>
                                <Icons name='delete' size={25} color='#B3A369' />
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
            
        );
    }

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>    
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('InspectionDetails', {page: 'Detail Inspection'})}
                    style={styles.listItemContainer}>
                        <Text style={styles.titleList}>Inspection Type</Text>
                        <Text style={styles.departmenList}>Exploration</Text>
                        <Text style={styles.locationList}>ACHR Topsoil Stockpile</Text>
                        <View style={styles.containerRight}>
                            <Text style={styles.dateList}>01 Januari 2019</Text>
                            <View style={styles.containerStatus}>
                                <Text style={styles.statusList}>Danger</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Content>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('AddReportInspection', {page: 'Add New Inspection'})} 
                    style={styles.ButtonAdd}>
                    <Icons name='plus' size={35} color='#fff' />
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}

const styles = {
    headerTable:{
        flex: 1, 
        alignSelf: 'stretch', 
        padding: 10
    },
    fontStyle:{
        fontWeight: 'bold', 
        color: '#fff',
        fontSize: 12,
        textAlign: 'center'
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
    tableHeadSeparator: {
        height: '100%', 
        width: 2, 
        backgroundColor:'#63666A'
    },
    tableHeadContainer:{
        flexDirection: 'row', 
        backgroundColor: '#B3A369', 
        borderColor: '#63666A', 
        borderWidth: 1.5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    tableContainer:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    containerTidakAdaData:{
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        borderColor: '#63666A', 
        borderWidth: 1, 
        flex: 1, 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    tableBodySeparator:{
        height: '100%', 
        width: 2, 
        backgroundColor:'#63666A'
    },
    iconContainerStyle:{
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonActionContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingLeft: 20, 
        paddingRight: 20
    },
    rowContainer:{
        flexDirection: 'row', 
        backgroundColor: '#fff',
        borderColor: '#63666A', 
        borderWidth: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    titlePage:{
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10
    },
    ButtonAdd:{
        position: 'absolute', 
        bottom: 20,
        right: 10, 
        padding: 10, 
        backgroundColor: '#99552B', 
        height: 60, 
        width: 60, 
        borderRadius: 60/2, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    listItemContainer:{
        borderRadius: 0, 
        padding: 10, 
        borderBottomColor: '#dbdbdb', 
        borderBottomWidth: 1, 
        marginTop: 0, 
        backgroundColor:'#fff'
    },
    titleList: {
        fontSize: 15, 
        fontWeight: 'bold'
    },
    departmenList:{
        fontSize: 13, 
        marginTop: 5
    },
    locationList:{
        fontSize: 11, 
        marginTop: 5
    },
    containerRight:{
        position: 'absolute',
        borderRadius:20, 
        top: 10, 
        right: 10
    },
    dateList:{
        fontWeight: 'bold', 
        fontSize: 11, 
        alignSelf: 'center', 
        textAlign: 'center'
    },
    containerStatus:{
        borderRadius:20, 
        backgroundColor: '#e74c3c', 
        padding: 5, 
        width: 60, 
        marginTop: 10, 
        marginLeft: 25
    },
    statusList: {
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 11, 
        alignSelf: 'center', 
        textAlign: 'center'
    }
}

export default Inspection
