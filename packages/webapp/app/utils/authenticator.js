import 'whatwg-fetch';
import httpClient from 'utils/httpClient'

export const authenticator = {
    isAuthenticated(){
        const token = localStorage.getItem('token');
        if(token)
            return true;
        return false;
    },
    setTokens(accessToken, refreshToken){
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    },
    getAccessToken(){
        return localStorage.getItem('token');
    },
    getRefreshToken(){
        return localStorage.getItem('refreshToken');
    },
    retriveAccessToken(){
        const refreshToken = localStorage.getItem('refreshToken');
        httpClient('token/' + refreshToken).then((result)=>{
            localStorage.setItem('refreshToken', result.refreshToken)
        }).catch(err=>{console.log(err)})
    }
};