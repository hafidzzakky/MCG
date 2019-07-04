import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  Platform} from 'react-native';
import {
    HeaderSub
} from '../../../Components'
import { Content, Form, Textarea, Container, Button, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export class AddImmediateAction extends Component {
    constructor(props){
        super(props);
        this.state = {
           ImmediateAction: 'aksi penyelamatan',
           Description: 'deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan deskripsi aksi penyelamatan ',
           ActionTakenBy: '',
           idEdit: '',
           isEdit: false,
           EditActionTakenBy: ''
        };
        
        console.log('state ku : ', this.state)
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
            const value = await AsyncStorage.getItem('dataEditImmediateAction')
            if(value !== null) {
                const data = JSON.parse(value);
                this.setState({
                    isEdit: true,
                    EditActionTakenBy: data.ActionTakenBy,
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
            ActionTakenBy : this.state.EditActionTakenBy,
            ImmediateAction: this.state.ImmediateAction,
            Description: this.state.Description
        }
        console.log('-', data)
        
        try {
            await AsyncStorage.removeItem('isEdit');
            await AsyncStorage.setItem('dataEditImmediateAction', JSON.stringify(data));
            this.setState({
                isEdit: false
            })
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
          } catch (error) {
            console.log('error : ', error);
        }
    };

    _storeData = async () => {
        const generator = this.IDGenerator();
        let data = {
            ActionTakenBy : this.state.ActionTakenBy,
            ImmediateAction: this.state.ImmediateAction,
            Description: this.state.Description,
            id: generator
        }
        console.log('store data : ', data);
        try {
          await AsyncStorage.setItem('dataImmediateAction', JSON.stringify(data));
          this.props.navigation.state.params.onGoBack();
          this.props.navigation.goBack();
        } catch (error) {
          console.log('error : ', error);
        }
    };

    getDataReportedBy = async () => {
        try {
            const value = await AsyncStorage.getItem('dataReportedBy')
            if(value !== null) {
              if(this.state.isEdit){
                  this.setState({
                      EditActionTakenBy: JSON.parse(value)
                  })
                  console.log('isEdit : ', JSON.parse(value))
              }else{
                  this.setState({
                      ActionTakenBy: JSON.parse(value)
                  })
              }
            }
          } catch(e) {
            console.log(e)
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
        let data = [{
            value: 'PT. Bumi Suksesindo',
          }, {
            value: 'PT. Bumi Suksesindo',
          }, {
            value: 'PT. Bumi Suksesindo',
        }];
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
                    <View style={{padding: 10, marginTop: -10}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ReportedBy', {
                                onGoBack: () => this.getDataReportedBy(),
                                page: 'Action Taken By'
                            })}
                            style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, marginTop: 30, marginBottom: 10}}>
                            <Text style={{fontSize: 16, color: '#939393'}}>Immediate Action Taken By </Text>
                            <Text style={{fontSize: 16, color: '#939393', marginLeft: 10}}>{this.state.isEdit ? this.state.EditActionTakenBy.nama : this.state.ActionTakenBy.nama}</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop: 20, marginBottom: 5, fontWeight: 'bold'}}>Immediate Action</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Immediate Action" />
                        </Form>
                        <Text style={{marginTop: 20, marginBottom: 5, fontWeight: 'bold'}}>Description</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Description" />
                        </Form>
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

export default AddImmediateAction
