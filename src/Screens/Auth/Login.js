import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, Image, ImageBackground } from 'react-native'
import {
    Container,
    Form, 
    Item, 
    Input, 
    Label,
    Content
} from 'native-base';
import { connect } from 'react-redux';
import {
    AuthLogin
} from '../../Actions'
import Logo from '../../Assets/image/logo.png'
import bgImg from '../../Assets/image/bgImg.jpg'
export class Login extends Component {
    render() {
        return (
            <Container style={{flex: 1}}>
                <StatusBar
                    backgroundColor="#4a423e"
                    barStyle="light-content" />
                <ImageBackground source={bgImg} style={{
                    flex: 1,
                    resizeMode: 'cover'
                }}>
                <View style={{backgroundColor: 'rgba(255, 255, 255,0.9)', flex: 1}}>
                <Content>
                <Image source={Logo} style={{width: 230, height: 90, alignSelf: 'center', marginTop: 50, marginBottom: 10}}/>
                <Text style={{alignSelf: 'center', marginTop: 0, color: '#63666A', fontWeight: 'bold', fontSize: 20}}>Merdeka Safety</Text>
                <Text style={{alignSelf: 'center', marginTop: 10, marginBottom: 30, color: '#63666A', fontWeight: 'bold', fontSize: 12}}>PT. Merdeka Copper Gold. Tbk</Text>
                {/* <Text style={{marginLeft: 25, marginTop: 10, color: '#99552B', fontWeight: 'bold', fontSize: 18}}>Login</Text> */}
                <View style={{padding: 25}}>
                    <View style={styles.cardLogin}>
                        <Form style={{padding: 10, backgroundColor: '#fff', paddingRight: 20}}>
                            <Item floatingLabel style={{ marginTop: -10}}>
                            <Label style={{fontSize: 13}}>Username</Label>
                            <Input style={{fontSize: 13}} />
                            </Item>
                            <Item floatingLabel>
                            <Label style={{fontSize: 13}}>Password</Label>
                            <Input style={{fontSize: 13}}/>
                            </Item>
                        </Form>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Dashboard')} 
                            // onPress={() => this.props.AuthLogin()} 
                            style={{padding: 10, backgroundColor: '#99552B', borderRadius: 25, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 20
                        }}>
                            <Text style={{color: '#fff', fontWeight: 'bold', alignSelf:'center', marginTop: 5, marginBottom: 5}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('IntroScreen')} style={{alignSelf: 'center', marginTop: 20}}>
                    <Text style={{fontSize: 12, color: '#63666A'}}>Butuh Bantuan?</Text>
                </TouchableOpacity>
                {/* <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 30}}>
                    <Text style={{alignSelf: 'center', color: '#4a423e'}}>v.0.1</Text>
                </View> */}
                </Content>
                </View>
                </ImageBackground>
            </Container>
        )
    }
}

const styles = {
    cardLogin :{
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        opacity: 1,
        elevation: 5
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    AuthLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
