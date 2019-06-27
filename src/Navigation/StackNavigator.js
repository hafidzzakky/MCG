import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {Animated, Easing} from 'react-native';
import TabNavigator from '../Navigation/TabNavigator';
import Login from '../Screens/Auth/Login';
import Menu1 from '../Screens/MainApp/Menu1';
import Intro from '../Screens/MainApp/Intro';
import addReportIncident from '../Screens/MainApp/IncidentNotification/AddReportIncident';
import ReportedBy from '../Screens/MainApp/IncidentNotification/ReportedBy';
import AddAdditionalImmediateActionRequired from '../Screens/MainApp/IncidentNotification/AddAdditionalImmediateActionRequired';
import AddImmediateAction from '../Screens/MainApp/IncidentNotification/AddImmediateAction';
//inspection
import Inspection from '../Screens/MainApp/Inspection/Inspection';
import AddReportInspection from '../Screens/MainApp/Inspection/AddReportInspection';
import AddObserver from '../Screens/MainApp/Inspection/AddObserver';
//hazard Report 
import HazardReport from '../Screens/MainApp/HazardReport/HazardReport';
import AddHazardReport from '../Screens/MainApp/HazardReport/AddHazardReport';
import AddCorrectionAction from '../Screens/MainApp/HazardReport/AddCorrectionAction';
//tahan Report
import TahanReport from '../Screens/MainApp/TahanReport/TahanReport';
import AddTahanReport from '../Screens/MainApp/TahanReport/AddTahanReport';
//OK KAN
import OKKAN from '../Screens/MainApp/OKKAN/OKKAN';
import AddNewOKKAN from '../Screens/MainApp/OKKAN/AddNewOKKAN';
//reusable
import Location from '../Screens/MainApp/Reusable/Location';
export default MainApp = createStackNavigator({
    LoginScreen: { screen: Login, navigationOptions: ({ navigation }) => { } },
    MainScreen: { screen: TabNavigator, navigationOptions: ({ navigation }) => { } },
    menu1Screen: { screen: Menu1, navigationOptions: ({ navigation }) => { } },
    IntroScreen: { screen: Intro, navigationOptions: ({ navigation }) => { } },
    //Incident Notification 
    addReportIncident: { screen: addReportIncident, navigationOptions: ({ navigation }) => { } },
    AddAdditionalImmediateActionRequired: { screen: AddAdditionalImmediateActionRequired, navigationOptions: ({ navigation }) => { } },
    AddImmediateAction: { screen: AddImmediateAction, navigationOptions: ({ navigation }) => { } },
    ReportedBy: { screen: ReportedBy, navigationOptions: ({ navigation }) => { } },
    //Inspection 
    Inspection: { screen: Inspection, navigationOptions: ({ navigation }) => { } },
    AddReportInspection: { screen: AddReportInspection, navigationOptions: ({ navigation }) => { } },
    AddObserver: { screen: AddObserver, navigationOptions: ({ navigation }) => { } },
    //OK-Kan
    OKKAN: { screen: OKKAN, navigationOptions: ({ navigation }) => { } },
    AddNewOKKAN: { screen: AddNewOKKAN, navigationOptions: ({ navigation }) => { } },
    //Hazard Report
    HazardReport: { screen: HazardReport, navigationOptions: ({ navigation }) => { } },
    AddHazardReport: { screen: AddHazardReport, navigationOptions: ({ navigation }) => { } },
    AddCorrectionAction: { screen: AddCorrectionAction, navigationOptions: ({ navigation }) => { } },
    //Tahan Report
    TahanReport: { screen: TahanReport, navigationOptions: ({ navigation }) => { } },
    AddTahanReport: { screen: AddTahanReport, navigationOptions: ({ navigation }) => { } },
    //Reusable
    Location: { screen: Location, navigationOptions: ({ navigation }) => { } },
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    mode: 'card',
    navigationOptions: params => ({
        gesturesEnabled: true,
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
