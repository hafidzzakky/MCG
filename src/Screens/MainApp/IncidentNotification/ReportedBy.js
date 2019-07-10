import React, { Component } from 'react'
import { Text, View, Platform, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import {
  Container,
  Button,
  Icon,
  Item,
  Input,
  ListItem
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {
  baselink
} from '../../../Components';
export class ReportedBy extends Component {
  constructor(props){
    super(props);
    this.state = {
        Search: false,
        isLoading: true,
        dataSource: '',
        text: ''
    };
    this.arrayholder = [];
  }

  componentDidMount(){
    this.getDataFromService();
  }

  // getDataFromService = () => {
  //   return fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     console.log('response : ', responseJson)
  //     this.setState(
  //       {
  //         isLoading: false,
  //         dataSource: responseJson
  //       },
  //       function() {
  //         this.arrayholder = responseJson;
  //       }
  //     );
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  getDataFromService = async () => {
    const Token = await AsyncStorage.getItem('access_token').catch(e=>console.log(e));
    await fetch(baselink + 'api/Account/listallemployee', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ Token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/x-www-form-urlencoded',
      }
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch((e) => {
      console.log(e)
    })
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }
  
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  loadingData = () => {
    if(this.state.isLoading){
      return(
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return(
      <FlatList 
        keyExtractor={(item, index) => item.ID}
        data = {this.state.dataSource}
        renderItem={({item}) => {
            return(
                <TouchableOpacity onPress={() => this._storeData(item)} style={{backgroundColor: '#fff', borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7, padding: 10}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.Name}</Text>
                  <Text style={{fontSize: 13}}>NIK-{item.NIK}</Text>
                  <Text style={{fontSize: 13}}>{item.Position}</Text>
                </TouchableOpacity>
            );
        }}
      />
    );
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      Search: !prevState.Search
    }));
  }

  _storeData = async (data) => {
    console.log('store data : ', data)
    let dataKaryawan = {
        id: data.ID,
        nama: data.Name,
        nik: data.NIK,
        posisi: data.Position
    }

    try {
      await AsyncStorage.setItem('dataReportedBy', JSON.stringify(dataKaryawan));
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    } catch (error) {
      console.log('error : ', error);
    }
  };

  render() {
    const { navigation } = this.props;
    const page = navigation.getParam('page', 'Page not found');
    return (
      <Container>
        <View style={styles.viewStyle}>
            <Button transparent style={{alignItems:'center', marginTop: Platform.OS=='ios'?0:3}} onPress={()=>this.props.navigation.goBack()}>
                <Icon style={{fontSize: 20, color: '#666666'}} name='arrow-back' />
            </Button>
            {this.state.Search ? 
              <Item>
                <Input 
                autoFocus={true} 
                placeholder="Search"
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text} />
              </Item>
              : 
              <Text style={styles.textStyle}>{page}</Text>}
            <TouchableOpacity onPress={() => this.toggleSearch()} style={{position: 'absolute', right: 20, justifyContent: 'center', alignItems: 'center'}}>
              <Icon style={{fontSize: 20, color: '#666666'}} name={this.state.Search ? 'close' : 'search'} />
              {console.log('ok : ', this.state.Search)}
            </TouchableOpacity>
        </View>
        {this.loadingData()}
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
      color:'#666666'
  },
}

export default ReportedBy
