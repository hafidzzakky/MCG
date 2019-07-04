import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {
    Container, Thumbnail, Content
} from 'native-base';
import {
    HeaderApp
} from '../../Components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import GridView , {SuperGridSectionList} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import user from '../../Assets/image/user.png';
import bgImg from '../../Assets/image/bgImg.jpg';
import logo from '../../Assets/image/logo.png';
import icon_hazard from '../../Assets/image/icon_hazard.png';
import icon_insident from '../../Assets/image/icon_insident.png';
import icon_inspection from '../../Assets/image/icon_inspection.png';
import icon_okkan from '../../Assets/image/icon_okkan.png';
import icon_tahan from '../../Assets/image/icon_tahan.png';
export class Dashboard extends Component {
    render() {   
        return (
                <Container>
                    <ImageBackground source={bgImg} style={{
                        flex: 1,
                        resizeMode: 'cover'
                    }}>
                    <View style={{backgroundColor: 'rgba(255, 255, 255,0.9)', flex: 1}}>
                    <Content style={{padding: 10}}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                        style={styles.buttonLogout}>
                        <Icons name='exit-to-app' style={{marginTop: 0}} size={20} color='#fff' />
                        <Text style={{fontSize: 10, color: '#fff'}}>Logout</Text>
                    </TouchableOpacity>
                    <View>
                        <Image source={logo} style={{width: 230, height: 90, alignSelf: 'center', marginTop: 50, marginBottom: 10}}/>
                        <View style={{width: '90%',alignSelf: 'center', height: 2, backgroundColor: '#63666A'}}/>
                        <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 10}}>Safety System</Text>
                    </View>
                    {/* Card Info User */}
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.cardUserInfo}>
                            <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#99552B'}}>John Doe</Text>
                                    <Text style={{fontSize: 13}}>johndoe@merdekacoppergold.com</Text>
                                </View>
                                <Thumbnail source={user} small style={{zIndex: 2, height: 50, width: 50}} />
                            </View>
                        </View>
                    </View>
                    {/* Menu */}
                    <View style={styles.containerMenu}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('IncidentNotification', {page: 'Incident Notification'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_insident} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text>Incident Notification</Text>
                            </TouchableOpacity>
                            <View style={{height: '100%', width: 5}}/>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Inspection', {page: 'Inspection'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_inspection} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text>Inspection</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 4, width: '100%'}}/>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('OKKAN', {page: 'OK-KAN'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_okkan} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text>OK-KAN</Text>
                            </TouchableOpacity>
                            <View style={{height: '100%', width: 4}}/>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('HazardReport', {page: 'Hazard Report'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_hazard} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text>Hazard Report</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 4, width: '100%'}}/>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('TahanReport', {page: 'Tahan Report'})}
                        style={[styles.eachMenuContainer, {flex: 1, width: '100%'}]}>
                            <Image source={icon_tahan} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                            <Text>Tahan Report</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{height: 5, backgroundColor:'rgba(191,191,191, 0.2)', marginTop: 20}}/> */}
                    </Content>
                    </View>
                    </ImageBackground>
                </Container>
        )
    }
}

const styles = {
    container : {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    cardUserInfo : {
        padding: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius : 5,
        justifyContent: 'center',
        height: 100, 
        marginBottom: 10,
        marginTop: 20,
        alignSelf: 'center',
        width: '100%'
    },
    menuTitle:{
        fontSize: 12, 
        color: '#3b3c5f', 
        fontWeight: 'bold'
    },
    gridView: {
        // paddingTop: 25,
        flex: 1,
      },
      itemContainer: {
        marginTop: 10,
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 80, 
        width: 90,
        elevation: 4,
        alignSelf: 'center',
        alignItems: 'center'
      },
      itemName: {
        textAlign: 'center',
        fontSize: 11,
        color: '#99552B',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      gradient: {
        width: undefined,
        // height: 200,
        zIndex: 2,
        backgroundColor: 'red'
      },
      containerMenu:{
          justifyContent:'center',
          alignItems: 'center',
        //   backgroundColor: 'red',
        //   width: 445,
          width: '100%',
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 50,
          paddingLeft: 10,
          paddingRight: 10
      },
      eachMenuContainer:{
        backgroundColor: '#fff',
        flex: 1,
        // width: 220,
        // width: '100%', 
        height: 130,
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        elevation: 4
      },
      buttonLogout: {
        backgroundColor:'#B3A369', 
        padding: 5,width: 50, 
        height: 50, 
        borderRadius: 50, 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        top: 0, 
        right: 0
      }
}
export default Dashboard