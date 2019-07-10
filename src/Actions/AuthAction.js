import { Platform, NativeModules } from 'react-native';
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_LOADING,  
    APP_LOADED,       
    FAIL_CHECK_SPLASH,
    LOGOUT_USER_SUCCESS,
    CHECK_VERSION_LOADING,
    CHECK_VERSION_FAIL
} from './Types';
import {
    infoDevice,
    buildFormBody,
    baselink
} from '../Components';
import AsyncStorage from '@react-native-community/async-storage';

export const checkSplashScreen = (isLoggin, token) => {
    console.log('check splash : ', isLoggin, ' token : ', token);
    return(dispatch) => {
        // if(isLoggin !== null){
        //     dispatch({type: LOGIN_USER_SUCCESS})
        //     dispatch({type: APP_LOADED})
        // }else{
        //     dispatch({type: APP_LOADED})
        //     // dispatch({
        //     //     type : FAIL_CHECK_SPLASH, 
        //     //     payload: 'Gagal check Splash Screen'
        //     // })
        // }
        if(isLoggin){
            dispatch({type: LOGIN_USER_SUCCESS})
        }
        dispatch({type: APP_LOADED})
    }
}

export const AuthLogin = (data) => {
    //define data params
    let detail = {
        username     : 'admin@system.com',
        password     : 'pass123',
        grant_type   : 'password'
    };
    console.log('masuk auth login : ', data);
    return(dispatch) => {
        dispatch({ type: LOGIN_USER_LOADING });
        //post method
        fetch(baselink + 'oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type':  'application/x-www-form-urlencoded',
            },
            body: buildFormBody(detail)
        })
        .then(response => response.json())
        .then((data) => {
            console.log('response bearer', data)
            if(data.access_token == ''){
                //gagal login
                dispatch({
                    type: LOGIN_USER_FAIL,
                    payload: data.error_description
                })
            }else{
                AsyncStorage.setItem('authenticated', '1');
                AsyncStorage.setItem('access_token', data.access_token);
                AsyncStorage.setItem('userName', data.userName);
                AsyncStorage.setItem('expires', JSON.stringify(data.expires_in));
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: data
                });
            }
        })
        .catch((error) => {
            dispatch({
                type : LOGIN_USER_FAIL,
                payload: error.toString().replace(/TypeError:/g,'')
            })
        });
    };
}

export const LogOut = () => {
    console.log('masuk logout')
    //hits service
    return(dispatch) => {
        AsyncStorage.multiRemove(['access_token','userName','authenticated','issued', 'expires'])
        dispatch({
            type: LOGOUT_USER_SUCCESS
        })
    }
}

export const GetUserInfo = () => {
    //define data params
    let detail = {
        username     : 'admin@system.com',
        password     : 'pass123',
        grant_type   : 'password'
    };
    console.log('masuk auth login')
    return(dispatch) => {
        dispatch({ type: LOGIN_USER_LOADING });
        //GET method
        fetch('http://202.158.14.174:9093/api/Account/UserInfo', {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2Y2QxYzM4NS0zYmJmLTRlMGUtYjUyZS1lMWY5MjcyMzE3NjUiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQHN5c3RlbS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI5NmIxMmM0Yy04MGZlLTRjNjMtOTAzYi05MGY2ODc1MTFjOGIiLCJyb2xlIjoic3VwZXJ1c2VyIiwiaXNzIjoid3NhZmUuYmF0dXR1YWdyb3VwLmNvbSIsImF1ZCI6IjIxMmU5ODMyYjE5ODNnNjZhYmM3OWY1NDEyMDE3c2UyMTEiLCJleHAiOjE1NjIyMjM5NzIsIm5iZiI6MTU2MjEzNzU3Mn0.k0rD5EKiextRxUsfLuATszrCrAhivcDMyTXUvZa18i4',
                'Content-Type':  'application/x-www-form-urlencoded',
                'Accept'       : 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log('response bearer', data);
        })
        .catch((error) => {
            dispatch({
                type : LOGIN_USER_FAIL,
                payload: error.toString().replace(/TypeError:/g,'')
            })
        });
    };
}