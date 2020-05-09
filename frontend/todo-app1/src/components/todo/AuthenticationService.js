import axios from 'axios';
import {API_URL} from '../../constants';

const AUTHENTICATED_USER  = 'authenticatedUser';

class AuthenticationService {
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }
    createJWTToken(jwtToken) {
        return `Bearer ${jwtToken}`
    }
    executeJWTAuthenticationService(username, password) {
        console.log(API_URL)
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    executeBasicAuthenticationService(username, password) {
        const basicAuthHeader = this.createBasicAuthToken(username, password)
        return axios.get(`${API_URL}/basicAuth`, {
            headers: {
                authorization: basicAuthHeader
            }
        })
    }
    
    registerSuccessfulLogin(userName, password) {
        sessionStorage.setItem(AUTHENTICATED_USER, userName);
        this.setAxiosInterceptor(this.createBasicAuthToken(userName, password))
    }
    registerSuccessfulLoginForJWT(userName, jwtToken) {
        console.log(jwtToken)
        sessionStorage.setItem(AUTHENTICATED_USER, userName);
        this.setAxiosInterceptor(this.createJWTToken(jwtToken))
    }
    logout() {
        sessionStorage.removeItem(AUTHENTICATED_USER)
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(AUTHENTICATED_USER);
        if(user === null){
            return false
        }
        return true;
    }
    getUserLoggedIn() {
        let user = sessionStorage.getItem(AUTHENTICATED_USER);
        if(user === null){
            return ''
        }
        return user;
    }
    setAxiosInterceptor(authToken) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = authToken;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();