import 'whatwg-fetch';

const REFRESH_TOKEN = 'refreshToken';
const TOKEN = 'token';

export const authenticator = {
    isAuthenticated(){
        const token = localStorage.getItem('token');
        if(token)
            return true;
        return false;
    },
    setTokens(accessToken, refreshToken){
        if(accessToken)
            localStorage.setItem(TOKEN, accessToken);
        if(refreshToken)
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
    },
    getAccessToken(){
        return localStorage.getItem(TOKEN);
    },
    getRefreshToken(){
        return localStorage.getItem(REFRESH_TOKEN);
    },
    removeTokens(){
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }
};