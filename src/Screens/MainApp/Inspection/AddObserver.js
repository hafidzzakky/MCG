import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import {
    HeaderSub
} from '../../../Components';
import AsyncStorage from '@react-native-community/async-storage';
import { Content, Container, Button, Icon } from 'native-base';
export class AddObserver extends Component {
    constructor(props){
        super(props);
        this.state = {
            Observer: '',
            Location: '',
            isEdit: false,
            EditObserver: '',
            EditLocation: '',
            idEdit: ''
        };
    }

    async componentDidMount(){
        try {
            const value = await AsyncStorage.getItem('isEdit')
            if(value !== null) {
                this.setState({
                    isEdit: JSON.parse(value)
                })
                console.log('isEdit : ', JSON.parse(value))
                this.editData()
            }
          } catch(e) {
            console.log(e)
          }
    }

    editData = async () => {
        console.log('masuk Edit')
        try {
            const value = await AsyncStorage.getItem('dataEditObserver')
            if(value !== null) {
                const data = JSON.parse(value);
                this.setState({
                    isEdit: true,
                    EditObserver: data.Observer,
                    EditLocation: data.Location,
                    idEdit: data.id
                })
                console.log('dataku : ', data)
            }
            } catch(e) {
                console.log(e)
        }
    }

    _storeEditData = async () => {
        let data = {
            id: this.state.idEdit,
            Location : this.state.EditLocation,
            Observer: this.state.EditObserver,
        }
        console.log('-', data)
        
        try {
            await AsyncStorage.removeItem('isEdit');
            await AsyncStorage.setItem('dataEditObserver', JSON.stringify(data));
            this.setState({
                isEdit: false
            })
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
          } catch (error) {
            console.log('error : ', error);
        }
    };


    getDataObserver = async () => {
        try {
          const value = await AsyncStorage.getItem('dataReportedBy')
          console.log('re : ', value)
          if(value !== null) {
            if(this.state.isEdit){
                this.setState({
                    EditObserver: JSON.parse(value)
                })
                console.log('isEdit : ', JSON.parse(value))
            }else{
                this.setState({
                    Observer: JSON.parse(value)
                })
            }
          }
        } catch(e) {
          console.log(object)
        }
    }

    getDataLocation = async () => {
        try {
          const value = await AsyncStorage.getItem('dataLocation')
          console.log('loc : ', value)
          if(value !== null) {
            console.log('wkwk : ', this.state.isEdit)
            if(this.state.isEdit){
                this.setState({
                    EditLocation: JSON.parse(value)
                })
            }else{
                this.setState({
                    Location: JSON.parse(value)
                })
            }
          }
        } catch(e) {
          console.log(object)
        }
    }

    _storeData = async () => {
        const generator = this.IDGenerator();
        let data = {
            Location : this.state.Location,
            Observer: this.state.Observer,
            id: generator
        }
        console.log('store data : ', data);
        try {
          await AsyncStorage.setItem('dataObserver', JSON.stringify(data));
          this.props.navigation.state.params.onGoBack();
          this.props.navigation.goBack();
        } catch (error) {
          console.log('error : ', error);
        }
    }

    IDGenerator() {
        this.length = 8;
        this.timestamp = +new Date;
        
        var _getRandomInt = function( min, max ) {
           return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
        
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
        
        for( var i = 0; i < this.length; ++i ) {
            var index = _getRandomInt( 0, parts.length - 1 );
            id += parts[index];	 
        }
        return id;        
    }

    removeIsEdit = async () =>{
        try {
            await AsyncStorage.removeItem('isEdit');
            this.props.navigation.goBack();
        } catch (error) {
            console.log('error : ', error);
        }
    }

    render() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 'Page not found');
        return (
            <Container>
                <View style={styles.viewStyle}>
                    <Button transparent style={{alignItems:'center', marginTop: Platform.OS=='ios'?0:3}} onPress={()=>this.removeIsEdit()}>
                        <Icon style={{fontSize: 20, color: '#63666A'}} name='arrow-back' />
                    </Button>
                    <Text style={styles.textStyle}>{page}</Text>
                </View>
                <Content>
                    <View style={{padding: 10}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Location', {
                                onGoBack: () => this.getDataLocation(),
                                page: 'Location'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Location </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.isEdit ? this.state.EditLocation.nama : this.state.Location.nama}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ReportedBy', {
                                onGoBack: () => this.getDataObserver(),
                                page: 'Observer'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Observer </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.isEdit ? this.state.EditObserver.nama : this.state.Observer.nama}</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
                <TouchableOpacity
                    onPress={this.state.isEdit ? () => this._storeEditData() : () => this._storeData()}
                    style={{position: 'absolute',width: '100%', bottom: 0, flex: 1, padding: 10, backgroundColor: '#99552B'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Submit</Text>
                </TouchableOpacity>
            </Container>
        )
    }
}


const styles = {
    viewStyle : {
        marginLeft: -10,
        backgroundColor : "#fff",
        flexDirection : 'row',
        padding: Platform.OS=='ios'?10:0,
        paddingLeft: Platform.OS=='ios'?0:10,
        height : Platform.OS=='ios'?60:50,
        borderBottomColor : 'rgba(191,191,191, 0.2)',
        borderBottomWidth: 2,
        marginTop: Platform.OS == 'android' ? 0 : 20,
        alignItems:'center'
    },
    textStyle : {
        marginTop: Platform.OS=='ios'?5:0,
        // marginTop: 5,
        marginLeft: 5,
        fontSize : 16,
        alignSelf:'center',
        fontWeight: 'bold',
        color:'#63666A'
    },
}

export default AddObserver
