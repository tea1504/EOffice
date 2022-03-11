import axios from 'axios'
import cookie from 'js-cookie'

let BaseApi = axios.create({
    baseURL: 'http://localhost:3001/',
});

let Api = function () {
    let token = cookie.get('jwt');

    if (token)
        BaseApi.defaults.headers.common['x-access-token'] = `Bearer ${token}`;

    return BaseApi;
}

export default Api;
