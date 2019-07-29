import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import {
    Button,
    Icon,
    Container,
} from 'native-base';

export class HeaderSub extends Component {
    render() {
        return (
            <Container>
                <View style={styles.viewStyle}>
                    <Button transparent style={{alignItems:'center', marginTop: Platform.OS=='ios'?0:3}} onPress={()=>this.props.navigation.goBack()}>
                        <Icon style={{fontSize: 20, color: '#63666A'}} name='arrow-back' />
                    </Button>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </View>
                {this.props.children}
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
        marginLeft: 5,
        fontSize : 16,
        alignSelf:'center',
        fontWeight: 'bold',
        color:'#63666A'
    },
}


export default HeaderSub
