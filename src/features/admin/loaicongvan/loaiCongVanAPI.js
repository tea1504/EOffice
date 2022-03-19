import Api from '../../../app/api'

export default {
  get() {
    return Api().get('/loaicongvan');
  },
  post(form) {
    return Api().post('/loaicongvan', form);
  },
  put(_id, form) {
    return Api().put('/loaicongvan/' + _id, form);
  },
  delete(_id) {
    return Api().delete('/loaicongvan/' + _id);
  }
}
