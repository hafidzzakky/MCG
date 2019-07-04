import React, { Component } from 'react';
import { Text, View, Platform, TouchableOpacity, StatusBar} from 'react-native';
import {
    Container,
    Thumbnail
} from 'native-base';
import {
    Color
} from '../Components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import User from '../Assets/image/user.png';

class HeaderApp extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return (
            // <StyleProvider style={getTheme(material)}>
                <Container>
                    <StatusBar
                    backgroundColor="#7a5a3a"
                    barStyle="light-content" />
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>{this.props.title}</Text>
                        <TouchableOpacity style={{marginTop: Platform.OS=='ios'?0:10}} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <Icons name='exit-to-app' style={{marginTop: 0}} size={20} color='#fff' />
                        </TouchableOpacity>
                    </View>
                    {this.props.children}
                </Container>
            // </StyleProvider>
        );
    }
}

const styles = {
    headerBackground: {
        backgroundColor: '#00646A'
    },
    profileThumbnail:{
        // borderColor: '#00646A',
        // borderWidth: 2
        // shadowOffset:{  width: 10,  height: 10,  },
        // shadowColor: 'black',
        // // shadowOpacity: 1.0,
        // shadowRadius: 10,
        // shadowOpacity: 0.12,
    },
    viewStyle : {
        backgroundColor : "#997149",
        flexDirection : 'row',
        padding: 10,
        height : Platform.OS =='ios'? 80:60,
        // borderBottomColor : 'rgba(191,191,191, 0.2)',
        // borderBottomWidth: 2,
        alignItems:'center',
        justifyContent: 'space-between',
        // shadowColor : "#000",
        // shadowOffset : {width: 0, height: 2},
        // shadowOpacity : 0.9,
        // elevation : 4,
        // marginTop: Platform.OS == 'android' ? 0 : 20
        paddingTop: Platform.OS == 'android' ? 0 : 20
    },
    textStyle : {
        marginTop: 9,
        marginLeft: 5,
        fontSize : 16,
        alignSelf:'center',
        fontWeight: 'bold',
        fontFamily: 'sailec-medium',
        color: '#fff'
    },
    statusBar: {
        // height: 20,
    },
}

export {HeaderApp};
