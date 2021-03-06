import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {Animated, Easing} from 'react-native';
import TabNavigator from '../Navigation/TabNavigator';
import Login from '../Screens/Auth/Login';
import Intro from '../Screens/MainApp/Intro';
import Dashboard from '../Screens/MainApp/Dashboard';
//incident
import addReportIncident from '../Screens/MainApp/IncidentNotification/AddReportIncident';
import AddAdditionalImmediateActionRequired from '../Screens/MainApp/IncidentNotification/AddAdditionalImmediateActionRequired';
import AddImmediateAction from '../Screens/MainApp/IncidentNotification/AddImmediateAction';
import IncidentNotification from '../Screens/MainApp/IncidentNotification/IncidentNotification';
import DetailIncident from '../Screens/MainApp/IncidentNotification/DetailIncident';
//inspection
import Inspection from '../Screens/MainApp/Inspection/Inspection';
import AddReportInspection from '../Screens/MainApp/Inspection/AddReportInspection';
import AddObserver from '../Screens/MainApp/Inspection/AddObserver';
import InspectionDetails from '../Screens/MainApp/Inspection/InspectionDetails';
//hazard Report 
import HazardReport from '../Screens/MainApp/HazardReport/HazardReport';
import AddHazardReport from '../Screens/MainApp/HazardReport/AddHazardReport';
import AddCorrectionAction from '../Screens/MainApp/HazardReport/AddCorrectionAction';
import HazardDetail from '../Screens/MainApp/HazardReport/HazardDetail';
//tahan Report
import TahanReport from '../Screens/MainApp/TahanReport/TahanReport';
import AddTahanReport from '../Screens/MainApp/TahanReport/AddTahanReport';
import TahanDetail from '../Screens/MainApp/TahanReport/TahanDetail';
//OK KAN
import OKKAN from '../Screens/MainApp/OKKAN/OKKAN';
import AddNewOKKAN from '../Screens/MainApp/OKKAN/AddNewOKKAN';
import OKKANDetail from '../Screens/MainApp/OKKAN/OKKANDetail';
//reusable
import Location from '../Screens/MainApp/Reusable/Location';
import ReportedBy from '../Screens/MainApp/IncidentNotification/ReportedBy';


const MainApp = createStackNavigator({
    // LoginScreen: { screen: Login, navigationOptions: ({ navigation }) => { } },
    // MainScreen: { screen: TabNavigator, navigationOptions: ({ navigation }) => { } },
    Dashboard: { screen: Dashboard, navigationOptions: ({ navigation }) => { } },
    IncidentNotification: { screen: IncidentNotification, navigationOptions: ({ navigation }) => { } },
    IntroScreen: { screen: Intro, navigationOptions: ({ navigation }) => { } },
    //Incident Notification 
    addReportIncident: { screen: addReportIncident, navigationOptions: ({ navigation }) => { } },
    AddAdditionalImmediateActionRequired: { screen: AddAdditionalImmediateActionRequired, navigationOptions: ({ navigation }) => { } },
    AddImmediateAction: { screen: AddImmediateAction, navigationOptions: ({ navigation }) => { } },
    DetailIncident: { screen: DetailIncident, navigationOptions: ({ navigation }) => { } },
    //Inspection 
    Inspection: { screen: Inspection, navigationOptions: ({ navigation }) => { } },
    AddReportInspection: { screen: AddReportInspection, navigationOptions: ({ navigation }) => { } },
    AddObserver: { screen: AddObserver, navigationOptions: ({ navigation }) => { } },
    InspectionDetails: { screen: InspectionDetails, navigationOptions: ({ navigation }) => { } },
    //OK-Kan
    OKKAN: { screen: OKKAN, navigationOptions: ({ navigation }) => { } },
    AddNewOKKAN: { screen: AddNewOKKAN, navigationOptions: ({ navigation }) => { } },
    OKKANDetail: { screen: OKKANDetail, navigationOptions: ({ navigation }) => { } },
    //Hazard Report
    HazardReport: { screen: HazardReport, navigationOptions: ({ navigation }) => { } },
    AddHazardReport: { screen: AddHazardReport, navigationOptions: ({ navigation }) => { } },
    AddCorrectionAction: { screen: AddCorrectionAction, navigationOptions: ({ navigation }) => { } },
    HazardDetail: { screen: HazardDetail, navigationOptions: ({ navigation }) => { } },
    //Tahan Report
    TahanReport: { screen: TahanReport, navigationOptions: ({ navigation }) => { } },
    AddTahanReport: { screen: AddTahanReport, navigationOptions: ({ navigation }) => { } },
    TahanDetail: { screen: TahanDetail, navigationOptions: ({ navigation }) => { } },
    //Reusable
    Location: { screen: Location, navigationOptions: ({ navigation }) => { } },
    ReportedBy: { screen: ReportedBy, navigationOptions: ({ navigation }) => { } },
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    mode: 'card',
    navigationOptions: params => ({
        gesturesEnabled: false,
        gesturesDirection: 'inverted',
    }),
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            })

            return { transform: [ { translateX } ] }
        },
        headerTitleInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            return {
                opacity: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [ 0, 1, 0],
                }),
                transform: [{
                    translateX: position.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [-50, 0, 50],
                    }),
                }]
            };
        },
    }),
});


const AuthScreen = createStackNavigator({
    LoginScreen: { screen: Login, navigationOptions: ({ navigation }) => { } },
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    mode: 'card',
    navigationOptions: params => ({
        gesturesEnabled: false,
        gesturesDirection: 'inverted',
    }),
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            })

            return { transform: [ { translateX } ] }
        },
        headerTitleInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            return {
                opacity: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [ 0, 1, 0],
                }),
                transform: [{
                    translateX: position.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [-50, 0, 50],
                    }),
                }]
            };
        },
    }),
});


export default  AppNavigation = (authenticated) => createSwitchNavigator(
    {
      MainApp: MainApp,
      Auth: AuthScreen,
    },
    {
        
      initialRouteName: authenticated? 'MainApp':'Auth'
    }
);