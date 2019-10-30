import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, Image, ImageBackground } from 'react-native'
import {
    Container,
    Form, 
    Item, 
    Input, 
    Label,
    Content,
    Spinner
} from 'native-base';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {
    FormInput
} from '../../Components';
import {
    AuthLogin
} from '../../Actions';
import Logo from '../../Assets/image/logo.png';
import bgImg from '../../Assets/image/bgImg.jpg';
let _isMounted = true;
const UsernameRequired = value => value ? undefined : 'Username tidak boleh kosong';
const PasswordRequired = value => value ? undefined : 'Password tidak boleh kosong';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            DeviceIMEI: '',
            DeviceModel:'',
            DeviceOS: '',
            DeviceOSVer: '',
            DeviceUUID: ''
        };
        this.LoginUser = this.LoginUser.bind(this)
    }

    async componentDidMount(){
        this._isMounted = true;
    }

    LoginUser = (data) => {
        const params = {
            username: data.username,
            password: data.password,
            grant_type: 'password'
        }
        this.props.AuthLogin(params);
    }

    renderButton = () => {
        if(this.props.loading){
            return  <Spinner size="small" color='#f1c40f' />
        }
        return(
            <TouchableOpacity 
                onPress={this.props.handleSubmit(this.LoginUser)}
                style={{padding: 10, backgroundColor: '#f1c40f', borderRadius: 25, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 20
            }}>
                <Text style={{color: '#fff', fontWeight: 'bold', alignSelf:'center', marginTop: 5, marginBottom: 5}}>Login</Text>
            </TouchableOpacity>
        );
    }

    renderError = () => {
        if(this.props.error){
            return(
                <Text style={{textAlign: 'center', width: '100%',color: '#e74c3c', fontWeight: 'bold', fontSize: 13, marginBottom: 10}}>{this.props.error}</Text>
            );
        }
    }

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
                            <Field name='username' label='Username' component={FormInput}
                                // validate={[required, maxlength8, minValue8]}
                                validate={[UsernameRequired]}
                            />
                            <View style={{height: 20}}/>
                            <Field name='password' password={true} label='Password' component={FormInput}
                                // validate={[required, maxlength8, minValue8]}
                                validate={[PasswordRequired]}
                            />
                        </Form>
                        {this.renderButton()}
                        {/*error messege*/}
                        {this.renderError()}
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

const LoginForm = reduxForm({
    form: 'login',
})(Login);

const mapStateToProps = (state) => {
    return{
        loading: state.authState.loading,
        error: state.authState.error
    }
  }

const mapDispatchToProps = {
    AuthLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
