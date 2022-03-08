import Api from './Api'

export default {
  login(form) {
    return Api().post('/login', form);
  },
}
