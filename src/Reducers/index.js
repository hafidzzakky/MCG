import {combineReducers} from 'redux';
import {reducer as FormLatihanReducer} from 'redux-form';
import AuthReducer from './AuthReducer';

export default combineReducers({
    form        : FormLatihanReducer,
    authState   : AuthReducer,
})