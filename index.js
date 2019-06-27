/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';
import reducers from './src/Reducers';
import bgMessage from './src/FirebasePushNotif/bgMessage';
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)),
appRootComponent = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => appRootComponent);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessage);