import router from './../router'
import vuex from  'vuex'

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function errorResponseHandler(error) {
    // check for errorHandle config
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
        return Promise.reject(error);
    }
    // if has response show the error
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.removeItem('vuex')
            window.location.href = "/login";
            return Promise.reject(error);
        } else if (error.response.status === 403) {
            router.push({name: '403'});
            return Promise.reject(error);
        } else if (error.response.status === 404) {
            router.push({name: '404'});
            return Promise.reject(error);
        } else if (error.response.status === 500) {
            router.push({name: '500'});
            return Promise.reject(error);
        }else {
            return Promise.reject(error);
        }
    }
}

// apply interceptor on response
window.axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);

export default errorResponseHandler;
