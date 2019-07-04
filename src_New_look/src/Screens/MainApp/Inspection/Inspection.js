import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {
    Content
} from 'native-base';
import {
    HeaderSub
} from '../../../Components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
export class Inspection extends Component {
    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                <Content>
                    
                </Content>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddReportInspection', {page: 'Add New Inspection'})} style={{position: 'absolute', bottom: 20,right: 10, padding: 10, backgroundColor: '#99552B', height: 60, width: 60, borderRadius: 60/2, justifyContent: 'center', alignItems: 'center'}}>
                    <Icons name='plus' size={35} color='#fff' />
                </TouchableOpacity>
            </HeaderSub>
        )
    }
}

export default Inspection
