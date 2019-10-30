import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, Modal, ScrollView } from 'react-native';
import {
    Container, Thumbnail, Content
} from 'native-base';
import {
    Fonts
} from '../../Components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {
    LogOut
} from '../../Actions';
import {
    LineChart
} from 'react-native-chart-kit';
import FlashMessage, {showMessage} from 'react-native-flash-message'
import user from '../../Assets/image/user.png';
import bgImg from '../../Assets/image/bgImg.jpg';
import logo from '../../Assets/image/logo.png';
import icon_hazard from '../../Assets/image/icon_hazard.png';
import icon_insident from '../../Assets/image/icon_insident.png';
import icon_inspection from '../../Assets/image/icon_inspection.png';
import icon_okkan from '../../Assets/image/icon_okkan.png';
import icon_tahan from '../../Assets/image/icon_tahan.png';
export class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = { 
            modalVisible: true,
            modalGrafik: false
        };
        this.LogOutUser = this.LogOutUser.bind(this)
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setModalGrafisVisible(visible) {
        this.setState({modalGrafik: visible});
    }

    LogOutUser = () => {
        this.props.LogOut();
    }

    componentDidMount(){
        this.getExpDate();
    }

    getExpDate = async () => {
        const Exp = await AsyncStorage.getItem('authenticated').catch(e=>console.log(e));
        const access_token = await AsyncStorage.getItem('access_token').catch(e=>console.log(e));
        const userName = await AsyncStorage.getItem('userName').catch(e=>console.log(e));
        const expires = await AsyncStorage.getItem('expires').catch(e=>console.log(e));
        console.log('ok ', Exp)
        console.log('ok ', access_token)
        console.log('userName ', userName)
        console.log('expires ', new Date(expires*1000).toString())
    } 
    
    render() {   
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','Desember'],
            datasets: [{
              data: [ 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43 ],
              color: (opacity = 1) => `rgba(179,163,105, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }]
        }

        const chartConfig = {
            // backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(161,146,94, ${opacity})`,
            strokeWidth: 3
        }

        return (
                <Container>
                    <ImageBackground source={bgImg} style={{
                        flex: 1,
                        resizeMode: 'cover'
                    }}>
                    <View style={{backgroundColor: 'rgba(255, 255, 255,0.9)', flex: 1}}>
                    <Content style={{padding: 10}}>
                    <TouchableOpacity 
                        onPress={() => this.LogOutUser()}
                        style={styles.buttonLogout}>
                        <Icons name='exit-to-app' style={{marginTop: 0}} size={20} color='#fff' />
                        <Text style={{fontSize: 10, color: '#fff'}}>Logout</Text>
                    </TouchableOpacity>
                    <View>
                        <Image source={logo} style={{width: 230, height: 90, alignSelf: 'center', marginTop: 50, marginBottom: 10}}/>
                        <View style={{width: '90%',alignSelf: 'center', height: 2, backgroundColor: '#63666A'}}/>
                        <Text style={{fontSize: 18, fontFamily: Fonts.OpenSansSemiBold, alignSelf: 'center', marginTop: 10}}>Safety System</Text>
                    </View>
                    {/* Card Info User */}
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <TouchableOpacity 
                            onPress={() => this.setModalGrafisVisible(!this.state.modalGrafik)}
                            style={styles.cardUserInfo}>
                            <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#99552B'}}>John Doe</Text>
                                    <Text style={{fontSize: 13}}>johndoe@merdekacoppergold.com</Text>
                                </View>
                                <Thumbnail source={user} small style={{zIndex: 2, height: 50, width: 50}} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Menu */}
                    <View style={styles.containerMenu}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('IncidentNotification', {page: 'Incident Notification'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_insident} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text style={{fontFamily: Fonts.Open}}>Incident Notification</Text>
                            </TouchableOpacity>
                            <View style={{height: '100%', width: 5}}/>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Inspection', {page: 'Inspection'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_inspection} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text style={{fontFamily: Fonts.Open}}>Inspection</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 4, width: '100%'}}/>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('OKKAN', {page: 'OK-KAN'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_okkan} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text style={{fontFamily: Fonts.Open}}>OK-KAN</Text>
                            </TouchableOpacity>
                            <View style={{height: '100%', width: 4}}/>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('HazardReport', {page: 'Hazard Report'})}
                            style={styles.eachMenuContainer}>
                                <Image source={icon_hazard} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                                <Text style={{fontFamily: Fonts.Open}}>Hazard Report</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 4, width: '100%'}}/>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('TahanReport', {page: 'Tahan Report'})}
                        style={[styles.eachMenuContainer, {flex: 1, width: '100%'}]}>
                            <Image source={icon_tahan} style={{width: 60, height: 60, alignSelf: 'center'}}/>
                            <Text style={{fontFamily: Fonts.Open}}>Tahan Report</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{height: 5, backgroundColor:'rgba(191,191,191, 0.2)', marginTop: 20}}/> */}
                    {/* Modal Peringatan */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        >
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <View style={{borderRadius: 5, backgroundColor: '#fff', padding: 10, width: 320}}>
                                <View style={{padding: 30, justifyContent: 'center', alignItems: "center", paddingBottom: 20}}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
                                        <Text style={{fontSize: 30, fontWeight: 'bold',}}>Judul Pop Up</Text>
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
                                        <Icons name="check-circle-outline" size={120} color="#5a5a5a" />
                                        <Text style={{marginTop: 10, textAlign: 'center'}}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                    style={{borderRadius: 5, backgroundColor: '#B3A369', padding: 10, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 10}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>OK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        top: -10, 
                                        right: -10, 
                                        backgroundColor: '#5a5a5a', 
                                        width: 30, 
                                        height: 30, 
                                        borderRadius: 30/2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        elevation: 5
                                        }}
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Icons name="close" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal Grafik */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalGrafik}
                        >
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <View style={{borderRadius: 5, backgroundColor: '#fff', padding: 10, width: 320}}>
                                <View style={{justifyContent: 'center', alignItems: "center"}}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
                                        <Text style={{fontSize: 20, fontFamily: Fonts.OpenSansSemiBold}}>Grafik Report OK-KAN</Text>
                                        <Text style={{fontSize: 18, fontFamily: Fonts.OpenSansSemiBold}}>2019</Text>
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
                                        <View
                                            style={{
                                                borderRadius: 16,
                                                backgroundColor: '#fff',
                                                height: 240,
                                                borderRadius: 10,
                                                padding: 0,
                                                paddingTop: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <ScrollView
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                            >
                                                <LineChart
                                                    data={data}
                                                    width={900}
                                                    height={220}
                                                    chartConfig={chartConfig}
                                                    bezier
                                                    onDataPointClick={({value, getColor}) =>
                                                    showMessage({
                                                        message: `OK-KAN`,
                                                        description: `${value} Report`,
                                                        backgroundColor: getColor(0.8)
                                                    })
                                                    }
                                                />
                                            </ScrollView>
                                        </View>
                                        <FlashMessage duration={20000} style={{borderRadius: 5}}/>
                                        <Text style={{marginBottom: 15, textAlign: 'center', fontFamily: Fonts.OpenSansRegular}}>Keterangan : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => {
                                        this.setModalGrafisVisible(!this.state.modalGrafik);
                                        }}
                                        style={{borderRadius: 5, backgroundColor: '#B3A369', padding: 10, justifyContent: 'center', alignItems: 'center', width: 280, marginBottom: 10}}>
                                        <Text style={{fontFamily: Fonts.OpenSansBold, fontSize: 16, color: '#fff'}}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        top: -10, 
                                        right: -10, 
                                        backgroundColor: '#5a5a5a', 
                                        width: 30, 
                                        height: 30, 
                                        borderRadius: 30/2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        elevation: 5
                                        }}
                                    onPress={() => {
                                        this.setModalGrafisVisible(!this.state.modalGrafik);
                                    }}>
                                    <Icons name="close" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
        elevation: 8,
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
        backgroundColor:'#2980b9', 
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    LogOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
