import Api from '../../../app/api'

export default {
  get() {
    return Api().get('/loaicongvan');
  },
}
