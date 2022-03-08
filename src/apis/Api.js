import axios from 'axios'
import cookie from 'js-cookie'

let BaseApi = axios.create({
    baseURL: 'http://10.10.43.127:3001/',
});

let Api = function () {
    let token = cookie.get('jwt');

    if (token)
        BaseApi.defaults.headers.common['x-access-token'] = `Bearer ${token}`;

    return BaseApi;
}

export default Api;
