import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
    HeaderSub
} from '../../Components';
import { Content, Form, Item, Input, Label } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
export class Menu1 extends Component {
    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    <TouchableOpacity style={{borderRadius: 0, padding: 10, borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginTop: 10}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Incident Title</Text>
                        <Text style={{fontSize: 13, }}>Resp Depart</Text>
                        <Text style={{fontSize: 13, }}>Resp Sect</Text>
                        <Text style={{fontSize: 11, }}>Location</Text>
                        <View style={{position: 'absolute',borderRadius:20, top: 10, right: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>01 Januari 2019</Text>
                            <View style={{borderRadius:20, backgroundColor: '#e74c3c', padding: 5, width: 60, marginTop: 10, marginLeft: 25}}>
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>Status</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </Content>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('addReportIncident', {page: 'Add New Incident'})} style={{position: 'absolute', bottom: 20,right: 10, padding: 10, backgroundColor: '#99552B', height: 60, width: 60, borderRadius: 60/2, justifyContent: 'center', alignItems: 'center'}}>
                    <Icons name='plus' size={35} color='#fff' />
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}

export default Menu1
