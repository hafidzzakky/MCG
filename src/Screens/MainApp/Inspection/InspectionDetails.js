import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import {
    HeaderSub
} from '../../../Components';
import {
    Content
} from 'native-base';
export class InspectionDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            DataLocation: [
                {
                    Location: {
                        id: "07acffb5-4438-4ec4-8347-b2ae51eab192",
                        nama: "Magazine"
                    },
                    Observer: {
                        id: "0088eb32-7fb6-4b6d-b2cc-d1cc2e996af4",
                        nama: "YANI MAILANGKAY ",
                        nik: "B0408",
                        posisi: "OPERATOR BOGGER"
                    },
                    id : "01314784"
                },
                {
                    Location: {
                        id: "0a124157-e220-4670-9be6-9d8cda596f9d",
                        nama: "Processing Plant Maintenance"
                    },
                    Observer: {
                        id: "014cbe0b-9e14-4b8f-8682-9a315552f9a7",
                        nama: "ADI CANDRA ",
                        nik: "B0476",
                        posisi: "OPERATOR AIRLEG"
                    },
                    id : "44665175"
                }
            ]
        }
    }

    keyExtractor = (item, index) => item.id;

    renderItem = ({item}) => (
        <View style={{borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginTop: 0, backgroundColor: '#fff', marginTop: 10, paddingBottom: 10}}>
            {console.log('ok : ', item)}
            <View style={{padding: 5, paddingRight: 10, paddingLeft: 10}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>{item.Observer.nama}</Text>
                <Text style={{fontSize: 13, textAlign: 'justify'}}>{item.Location.nama}</Text>
            </View>
        </View>
    );

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <View style={styles.contentContainer}>
                        <View style={styles.containerCard}>
                            <Text style={styles.titleIncident}>BSI-OHS-FO-119 Hygiene Sanitation Inspection Report</Text>
                            <View style={styles.infoIncident}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 0}]}>Company </Text>
                                    <Text style={styles.contentIncident}>PT. BUMI SUKSESINDO</Text>
                                </View>
                                <View>
                                    <Text style={styles.dateIncident}>01 Januari 2019</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Department </Text>
                                    <Text style={[styles.contentIncident]}>ADR</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contentIncident, {fontWeight: 'bold', marginTop: 10}]}>Section</Text>
                                    <Text style={[styles.contentIncident]}>Gold Room</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerStyle}>Observer</Text>
                    </View>
                    <View>
                        {this.state.DataLocation.length == 0 ? false : 
                            <FlatList
                                data={this.state.DataLocation}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                            />
                        }
                    </View>
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
        justifyContent: 'space-between',
        marginTop: 15
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
}
export default InspectionDetails
