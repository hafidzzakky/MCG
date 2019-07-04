import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_LOADING,
    LOGGOUT_USER,      
    APP_LOADED,  
} from '../Actions/Types'

const INITIAL_STATE = { 
    user: null,
    error:'',
    loading: false,
    app_started: false,
    authenticated:false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch(action.type){
        case LOGIN_USER_LOADING :
            return { ...state, error: '', loading: true};
        case LOGIN_USER_SUCCESS :
            return {...state, authenticated: true}
        case LOGIN_USER_FAIL :
            return {...state, authenticated: false, loading: false, errorAlert: true, pin:'', errorAlertLogin: action.payload}
        case LOGGOUT_USER :
            return {...state, authenticated: false, loading: false}
        default:
            return state
    }
}