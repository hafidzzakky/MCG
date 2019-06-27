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
import BgImg from '../../Assets/image/bgImg.jpg';
export class Dashboard extends Component {
    render() {
        const items = [
            { name: 'Incident Notification', icon: 'magnify', routing: 'menu1Screen' }, 
            { name: 'Inspection', icon: 'magnify', routing: 'Inspection' },
            { name: 'OK-KAN', icon: 'magnify', routing: 'OKKAN' }, { name: 'Hazard Report', icon: 'magnify', routing: 'HazardReport' },
            { name: 'TAHAN Report', icon: 'magnify', routing: 'TahanReport' },
        ];      
        return (
            <HeaderApp navigation={this.props.navigation} title="Safety System">
                <Container>
                    <Content>
                    {/* Card Info User */}
                    <View
                        style={[styles.gradient, {padding: 10, paddingLeft: 20, paddingRight: 20}]}>
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
                    {/* <View style={{padding:10, height: 280}}>
                        <GridView
                            itemDimension={100}
                            items={items}
                            style={styles.gridView}
                                renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(item.routing, {page: item.name})} style={[styles.itemContainer, { backgroundColor: '#fff' }]}>
                                    <Icons name={item.icon} style={{marginTop: 0}} size={35} color='#8a4b29' />
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View> */}
                    <View style={styles.containerMenu}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.eachMenuContainer}>
                                <Text>Menu 1</Text>
                            </TouchableOpacity>
                            <View style={{height: '100%', width: 4}}/>
                            <TouchableOpacity style={styles.eachMenuContainer}>
                                <Text>menu 2</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 4, width: '100%'}}/>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.eachMenuContainer}>
                                <Text>Menu 1</Text>
                            </TouchableOpacity>
                            <View style={{height: '100%', width: 4}}/>
                            <TouchableOpacity style={styles.eachMenuContainer}>
                                <Text>menu 2</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 4, width: '100%'}}/>
                        <TouchableOpacity style={[styles.eachMenuContainer, {flex: 1, width: '100%'}]}>
                            <Text>menu 5</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{height: 5, backgroundColor:'rgba(191,191,191, 0.2)', marginTop: 20}}/> */}
                    </Content>
                </Container>
            </HeaderApp>
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
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius : 5,
        justifyContent: 'center',
        height: 100, 
        marginBottom: 10,
        marginTop: 20
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
        zIndex: 2
      },
      containerMenu:{
          justifyContent:'center',
          alignItems: 'center',
        //   backgroundColor: 'red',
          width: 505,
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10
      },
      eachMenuContainer:{
        backgroundColor: '#fff',
        width: 250, 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        elevation: 4
      }
}
export default Dashboard