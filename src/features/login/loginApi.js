import Api from '../../app/api'

export default {
  login(form) {
    return Api().post('/login', form);
  },
}
