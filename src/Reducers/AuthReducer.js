import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_LOADING,
    LOGOUT_USER_SUCCESS,      
    APP_LOADED,
    FAIL_CHECK_SPLASH,
    CHECK_VERSION_LOADING,
    CHECK_VERSION_SUCCESS,
    CHECK_VERSION_FAIL

} from '../Actions/Types'

const INITIAL_STATE = { 
    user: null,
    error:'',
    loading: false,
    app_started: false,
    authenticated:false,
    errorSplash:'',
    errorAlertLogin: '',
    appVersion: '',
    loadingCheckVersion: false,
    errorCheckVersion: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){
        case LOGIN_USER_LOADING :
            return { ...state, error: '', loading: true};
        case LOGIN_USER_SUCCESS :
            return {...state, authenticated: true, error: '', user: action.payload}
        case LOGIN_USER_FAIL :
            return {...state, authenticated: false, loading: false, errorAlert: true, pin:'', errorAlertLogin: action.payload}
        case LOGOUT_USER_SUCCESS :
            return {...state, authenticated: false, loading: false}
        case FAIL_CHECK_SPLASH :
            return {...state, authenticated: false, loading: false, errorSplash: action.payload, errorAlert: true}
        case CHECK_VERSION_LOADING :
                return {...state, errorCheckVersion: '', loadingCheckVersion: true}
        case CHECK_VERSION_SUCCESS :
            return {...state, errorCheckVersion: '', loadingCheckVersion: false, appVersion: action.payload}
        case CHECK_VERSION_FAIL :
            return {...state, errorCheckVersion: action.payload, loadingCheckVersion: false}
        case APP_LOADED:
            return {...state, app_started: true}
        default:
            return state
    }
}