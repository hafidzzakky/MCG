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

export class OKKAN extends Component {
    constructor(props){
        super(props);
        this.state = {
            ListDataOKKAN:[],        
        };
    }

    renderRow(item) {
        console.log('item', item)
        return (
            <View key={'item-'+item.id} style={styles.rowContainer}>
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>Observation Data</Text>
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
                        <Text style={styles.fontBodyStyle}>Observed Department</Text>
                    </View>
                    <View style={styles.tableBodySeparator} />
                    <View style={styles.bodyTable}>
                        <Text style={styles.fontBodyStyle}>Shift</Text>
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
                <ImageBackground source={bgImg} style={{
                        flex: 1,
                        resizeMode: 'cover'
                }}>
                <View style={{backgroundColor: 'rgba(255, 255, 255,0.9)', flex: 1}}>
                <Content style={{padding: 10}}>
                    <View>
                        <Text style={styles.titlePage}>Report</Text>
                    </View>
                    <View style={styles.tableContainer}>
                        <View style={styles.tableHeadContainer}>
                            <View style={styles.headerTable}>
                                <Text style={styles.fontStyle}>Observation Data</Text>
                            </View>
                            <View style={styles.tableHeadSeparator} />
                            <View style={styles.headerTable}>
                                <Text style={styles.fontStyle}>Department</Text>
                            </View> 
                            <View style={styles.tableHeadSeparator} />
                            <View style={styles.headerTable}>
                                <Text style={styles.fontStyle}>Location</Text>
                            </View> 
                            <View style={styles.tableHeadSeparator} />
                            <View style={styles.headerTable}>
                                <Text style={styles.fontStyle}>Observed Department</Text>
                            </View> 
                            <View style={styles.tableHeadSeparator} />
                            <View style={styles.headerTable}>
                                <Text style={styles.fontStyle}>Shift</Text>
                            </View>
                            <View style={styles.tableHeadSeparator} />
                            <View style={styles.headerTable}>
                                <Text style={styles.fontStyle}>Status</Text>
                            </View>
                            <View style={styles.tableHeadSeparator} />
                            <View style={styles.headerTable}>
                                <Text style={styles.fontStyle}>Action</Text>
                            </View>
                        </View>
                        {this.state.ListDataOKKAN.length == 0 ?
                            <View style={styles.containerTidakAdaData}>
                                <Text>No Data</Text>
                            </View>
                            :
                            this.state.ListDataOKKAN.map((item) => { 
                                return this.renderRow(item);
                            })
                        }
                    </View>
                </Content>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNewOKKAN', {page: 'Add New OK-KAN'})} style={{position: 'absolute', bottom: 20,right: 10, padding: 10, backgroundColor: '#99552B', height: 60, width: 60, borderRadius: 60/2, justifyContent: 'center', alignItems: 'center'}}>
                    <Icons name='plus' size={35} color='#fff' />
                </TouchableOpacity>
                </View>
                </ImageBackground>
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
    }
}

export default OKKAN
