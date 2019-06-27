import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import {
    HeaderSub
} from '../../Components';
import { Content, Form, Item, Input, Label } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImg from '../../Assets/image/bgImg.jpg'
export class Menu1 extends Component {
    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        return (
            <HeaderSub title={page} navigation={this.props.navigation}>
                {/* <Content style={{padding: 0}}>
                    <Form style={{padding: 10, backgroundColor: '#fff', marginLeft: -10, marginTop: 10}}>
                        <Item floatingLabel style={{ marginTop: -10}}>
                        <Label style={{fontSize: 13}}>Nama</Label>
                        <Input style={{fontSize: 13}} />
                        </Item>
                        <Item floatingLabel>
                        <Label style={{fontSize: 13}}>Keterangan</Label>
                        <Input style={{fontSize: 13}}/>
                        </Item>
                    </Form>
                </Content>
                <TouchableOpacity style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#42436A'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Kirim</Text>
                </TouchableOpacity> */}
                <ImageBackground source={bgImg} style={{
                        flex: 1,
                        resizeMode: 'cover'
                }}>
                <View style={{backgroundColor: 'rgba(255, 255, 255,0.9)', flex: 1}}>
                <Content>
                    {/* <TouchableOpacity style={{borderRadius: 0, padding: 10, borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginTop: 10, backgroundColor: '#fff'}}>
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
                    </TouchableOpacity> */}
                    
                </Content>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('addReportIncident', {page: 'Add New Incident'})} style={{position: 'absolute', bottom: 20,right: 10, padding: 10, backgroundColor: '#99552B', height: 60, width: 60, borderRadius: 60/2, justifyContent: 'center', alignItems: 'center'}}>
                    <Icons name='plus' size={35} color='#fff' />
                </TouchableOpacity>
                </View>
                </ImageBackground>
            </HeaderSub>
        )
    }
}

export default Menu1
