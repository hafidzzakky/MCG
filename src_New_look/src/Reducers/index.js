import {combineReducers} from 'redux';
import {reducer as FormLatihanReducer} from 'redux-form';
export default combineReducers({
    form        : FormLatihanReducer
})