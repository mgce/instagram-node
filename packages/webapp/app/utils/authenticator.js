

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
    }
};