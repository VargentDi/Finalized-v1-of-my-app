import { TRY_AUTH, AUTH_SET_TOKEN ,AUTH_REMOVE_TOKEN} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTab from '../../screen/MainTabs/startMainTabs'
import { AsyncStorage } from 'react-native'
import {apiKey} from '../../../fireBaseApi'
import App from '../../../App'
export const tryAuth = (authData, authMode) => {

    return dispatch => {
        dispatch(uiStartLoading());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey
        if (authMode === 'signup') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .catch(err => {
                console.log(err)
                alert('auth failed')
                dispatch(uiStopLoading())
            })
            .then(data => data.json())
            .then(parsedData => {
                dispatch(uiStopLoading())
                if (!parsedData.idToken) {
                    alert(authMode + ' failed ' + parsedData.error.message)
                } else {
                    dispatch(authStoreToken(parsedData.idToken,parsedData.expiresIn,parsedData.refreshToken));
                    startMainTab()
                }


            })

    }

}
export const authStoreToken = (token,expiresIn,refreshToken) => {
    return dispatch => {
        const now =new Date();
        const expirDate=now.getTime()+expiresIn*1000;
        console.log(now,new Date(expirDate))
        dispatch(authSetToken(token,expirDate))
        AsyncStorage.setItem('memory:auth:token', token)
        AsyncStorage.setItem("ap:auth:expirDate",expirDate.toString())
        AsyncStorage.setItem("ap:auth:refreshToken",refreshToken)

    }
}
export const authSetToken = (token ,expirDate)=> {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expirDate:expirDate
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            
            const token = getState().auth.token;
            const expirDate=getState().auth.expirDate
            if (!token|| new Date(expirDate)<=new Date()) {
                let fetchedToken
                AsyncStorage.getItem("memory:auth:token")
                    .catch(err => {
                        reject()
                    })
                    .then(tokenFromStorage => {
                        fetchedToken=tokenFromStorage
                        if (!tokenFromStorage) {
                            reject()
                            return
                        }
                        return AsyncStorage.getItem("ap:auth:expirDate")
                        

                    })
                    .then(expirDate=>{
                        const parsedExpireDate= new Date(parseInt(expirDate))
                        const now=new Date();
                        if(parsedExpireDate>now){
                            dispatch(authSetToken(fetchedToken))
                            resolve(fetchedToken)
                        }else{
                            reject()
                        }
                    })
                    .catch(err=>{
                        reject()
                    })
            } else {
                resolve(token)
            }
        });
        return promise
        .catch(err=>{
            return AsyncStorage.getItem("ap:auth:refreshToken")
            .then(refreshToken=>{
                return fetch('https://securetoken.googleapis.com/v1/token?key='+apiKey,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body:'grant_type=refresh_token&refresh_token='+refreshToken
                })

            })
            .then(res=>res.json())
            .then(parsed=>{
                if(parsed.id_token){
                    console.log('refresh token worked')
                    dispatch(authStoreToken(parsed.id_token,parsed.expires_in,parsed.refresh_token))
                    return parsed.id_token
                }else{
                    dispatch(authClearStorage())
                }
            })
        })
        .then(token=>{
            if(!token){
                throw(new error())
            }else{
                return token
            }
        })

    }
}

export const authClearStorage=()=>{
    return dispatch=>{

        AsyncStorage.removeItem("ap:auth:expirDate")
        AsyncStorage.removeItem("memory:auth:token")
        return AsyncStorage.removeItem("ap:auth:refreshToken")
    }
}
export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTab()
            })
            .catch(err => {
                console.log('failed to fetch')
            })
    }
}

export const authLogout=()=>{
    return dispatch=>{
        dispatch(authClearStorage())
        .then(()=>{

            App();
        });
        dispatch(authRemoveToken())
    }
}
export const authRemoveToken=()=>{
    return{
        type:AUTH_REMOVE_TOKEN,
    }
}
// export const authSignup =(authData)=>{
//     return dispatch=>{
//         dispatch(uiStartLoading())
//         fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC84FX6Aek70drORWBT4h-ydEaytcsRcG8',{
//             method:'POST',
//             body:JSON.stringify({
//                 email:authData.email,
//                 password:authData.password,
//                 returnSecureToken:true
//             }),
//             headers:{
//                 "Content-Type":'application/json'
//             }
//         })
//         .catch(err=>{
//             console.log(err)
//             alert('auth failed')
//             dispatch(uiStopLoading())
//         })
//         .then(data=>data.json())
//         .then(parsedData=>{
//             dispatch(uiStopLoading())
//             if(parsedData.error){
//                 alert('sign in failed'+parsedData.error)
//             }else{
//                 startMainTab()
//             }
//             console.log(parsedData)

//         })
//     }
// }
