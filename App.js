import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'; 
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from './src/Navigation/StackNavigator';
import {  
  infoDevice,
  baselink
} from './src/Components';
import { 
  checkSplashScreen,
  GetUserInfo,
  LogOut
} from './src/Actions';
import logo from './src/Assets/image/logo.png'
let _isMounted = true;

export class App extends PureComponent {
  constructor(props){
    super(props) 
    this.state={
      data: '',
      loadingAppVersion: false,
      AppVersion: '',
      loadingCheckExpiredToken : true,
      CheckExpiredToken : false,
      ListCompany: [],
      ListDepartment: [],
      ListSection: [],
      ListAllEmployee: [],
      ListAllTenant: [],
      ListLocation: [],
      UserInfo: '',
      loadingSplashCheck: true,
      loadingSplashInfo: ''
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.checkLogins();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  checkAppVersion = async (token) => {
    await fetch(baselink + 'api/AppVersion/currentversion', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking App Version'
      })
      AsyncStorage.setItem('AppVersion', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }

  listCompany = async (token) => {
    console.log('halo ', token);
    await fetch(baselink + 'api/Account/listcompany', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking List Company'
      })
      AsyncStorage.setItem('ListCompany', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }

  listContractor = async (token) => {
    console.log('halo ', token)
    await fetch(baselink + 'api/Account/listcontractor', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking List Contractor'
      })
      AsyncStorage.setItem('ListContractor', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }
  
  listDepartment = async (token) => {
    console.log('halo ', token)
    await fetch(baselink + 'api/Account/listdepartment', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking List Department'
      })
      AsyncStorage.setItem('ListDepartment', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }

  listSection = async (token) => {
    console.log('halo ', token)
    await fetch(baselink + 'api/Account/listsection', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking List Section'
      })
      AsyncStorage.setItem('ListSection', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }

  listEmployee = async (token) => {
    console.log('halo ', token)
    await fetch(baselink + 'api/Account/listallemployee', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking List Employee'
      })
      AsyncStorage.setItem('ListEmployee', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }

  listTenant = async (token) => {
    console.log('halo ', token)
    await fetch(baselink + 'api/Account/listtenant', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking List Tenant'
      })
      AsyncStorage.setItem('ListTenant', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }

  listLocation = async (token) => {
    console.log('halo ', token)
    await fetch(baselink + 'api/Account/listlocation', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loadingSplashInfo: 'Checking List Location'
      })
      AsyncStorage.setItem('ListLocation', JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e)
    })
  }

  checkExpiredToken = async () => {
    const Exp = await AsyncStorage.getItem('expires').catch(e=>console.log(e));
    if(Exp != null){
      const ExpToken = new Date(Exp);
    }else{
      const ExpToken = new Date(Exp);
    }
    const NowDate  = new Date();
    console.log('Exp Token ? ', Exp)
    console.log('Tgl Sekarang ? ', NowDate)
    console.log('is Expired ? ', NowDate > ExpToken);
    if(NowDate > ExpToken){
      this.setState({
        CheckExpiredToken: true
      })
      // this.props.LogOut();
      // this.props.navigation.navigate('LoginScreen');
    }else{
      this.setState({
        CheckExpiredToken: false
      })
    }
  }

  async checkLogins(){
    const isLoggin = await AsyncStorage.getItem('authenticated').catch(e=>console.log(e));
    const Token = await AsyncStorage.getItem('access_token').catch(e=>console.log(e));
    if(Token == null){
      await this.checkAppVersion(Token);
      this.props.checkSplashScreen(isLoggin, Token);
    }
    await this.checkAppVersion(Token);
    await this.listCompany(Token);
    await this.listDepartment(Token);
    await this.listSection(Token);
    await this.listEmployee(Token);
    await this.listTenant(Token);
    await this.listLocation(Token);
    await this.listContractor(Token);
    this.setState({
      loadingSplashInfo: 'Done'
    })
    setTimeout(() => {
      this.props.checkSplashScreen(isLoggin, Token);
    }, 5000)
    
  }

  _renderApproot(authenticated){
    console.log('authenticated : ', authenticated);
    const CreateRoot = AppNavigation(authenticated);
    return <CreateRoot />
  }

  _renderError(){
    if(this.props.authState.errorSplash){
      return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, paddingLeft: 20, paddingRight: 20}}>
        <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10}}>Oooops</Text>
        <Text style={{fontSize: 12, textAlign: 'center', marginBottom: 10}}>{this.props.authState.errorSplash}</Text>
        <TouchableOpacity onPress={() => this.checkLogins()} style={{backgroundColor: '#B3A369', padding: 10, borderRadius: 5}}>
          <Text>Coba lagi?</Text>
        </TouchableOpacity>
      </View>
      );
    }else{
      false
    }
  }

  _renderSplash(){
    return(
        <View style={{flex: 1, backgroundColor: '#fff', justifyContent:'center', alignItems: 'center'}}>
          {/* {this.renderInfo()} */}
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 20
          }}>
            <Image source={logo} style={{width: 240, height: 90, alignSelf: 'center'}}/>
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 20
          }}>
            <ActivityIndicator size='small' color='#B3A369' />
            <Text style={{marginTop: 10, fontSize: 12, fontWeight: 'bold'}}>{this.state.loadingSplashInfo}</Text>
          </View>
          {this._renderError()}
          {/*Offline Notice*/}
          {/* <View style={{
            position: 'absolute',
            top: 20
          }}>
            <Text>Offline</Text>
          </View> */}
        </View>
    );
  }

  render() {
    const{app_started, authenticated} = this.props.authState;
    {console.log('app started : ', app_started, ' authenticated : ', authenticated)}
    return app_started ? this._renderApproot(authenticated) : this._renderSplash(app_started);
    // return app_started ? this._renderSplash(app_started) : this._renderSplash(app_started);
  }
}

const mapStateToProps = (state) => {
  return{
    authState : state.authState
  }
}

const mapDispatchToProps = {
  checkSplashScreen,
  GetUserInfo,
  LogOut
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
