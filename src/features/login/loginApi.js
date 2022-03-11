import Api from '../../apis/Api'

export default {
  login(form) {
    return Api().post('/login', form);
  },
}
