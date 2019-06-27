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
export class HazardReport extends Component {
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
                <Content>
                    
                </Content>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddHazardReport', {page: 'Add New Hazard Report'})} style={{position: 'absolute', bottom: 20,right: 10, padding: 10, backgroundColor: '#99552B', height: 60, width: 60, borderRadius: 60/2, justifyContent: 'center', alignItems: 'center'}}>
                    <Icons name='plus' size={35} color='#fff' />
                </TouchableOpacity>
                </View>
                </ImageBackground>
            </HeaderSub>
        )
    }
}

export default HazardReport
