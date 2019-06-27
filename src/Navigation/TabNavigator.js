import { createBottomTabNavigator } from 'react-navigation';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from '../Screens/MainApp/Dashboard';
export default createBottomTabNavigator({
    'Home': Dashboard,
    'Compose': Dashboard,
    'Inbox': Dashboard,
    'History': Dashboard
},{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
            iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Compose') {
            iconName = `pencil${focused ? '' : ''}`;
        }else if (routeName === 'Inbox') {
            iconName = `email${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'History') {
            iconName = `restore-clock${focused ? '' : ''}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icons name={iconName} style={{marginTop: 0}} size={horizontal ? 20 : 22} color={tintColor} />;
      },
    }),
    tabBarOptions: {
        allowFontScaling  : false,
        activeTintColor: '#99552B',
        inactiveTintColor: 'gray',
        style:{
            borderTopColor:'rgba(191,191,191, 0.2)',
            borderTopWidth: 3,
            height: 55
        },
        iconStyle :{
            // marginTop: 10
        },
        labelStyle: {
            fontSize: 11,
            marginTop:-5,
            marginBottom: 5
        },
    },
})