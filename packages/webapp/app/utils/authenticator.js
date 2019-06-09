import 'whatwg-fetch';

export const authenticator = {
    isAuthenticated(){
        const token = localStorage.getItem('token');
        if(token)
            return true;
        return false;
    },
    setTokens(accessToken, refreshToken){
        if(accessToken)
            localStorage.setItem('token', accessToken);
        if(refreshToken)
            localStorage.setItem('refreshToken', refreshToken);
    },
    getAccessToken(){
        return localStorage.getItem('token');
    },
    getRefreshToken(){
        return localStorage.getItem('refreshToken');
    }
};