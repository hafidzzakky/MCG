import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_LOADING,
    LOGGOUT_USER,      
    APP_LOADED,        
} from './Types';
import {
    infoDevice,
    buildFormBody
} from '../Components';

export const checkSplashScreen = (data) => {
    console.log('checkSplashScreen')
}

export const AuthLogin = () => {
    //define data params
    let detail = {
        username     : 'admin@system.com',
        password     : 'pass123',
        grant_type   : 'password'
    };
    console.log('masuk auth login')
    return(dispatch) => {
        dispatch({ type: LOGIN_USER_LOADING });
        //post method
        fetch('http://202.158.14.174:9093/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type':  'application/x-www-form-urlencoded',
            },
            body: buildFormBody(detail)
        })
        .then(response => response.json())
        .then((data) => {
            console.log('response bearer', data)
            if(data.error_description !== ''){
                //gagal login
                dispatch({
                    type: LOGIN_USER_FAIL,
                    payload: data.error_description
                })
            }else{
                //berhasil login
                // save data
                AsyncStorage.multiSet([
                    ['access_token', data.access_token],
                    ['userName', data.userName]
                ])
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: data.error_description
                })
                console.log('response', data)
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