import Api from "../../../app/api";

export default {
  get() {
    return Api().get('canbo');
  },
  getLanhDao() {
    return Api().get('canbo/lanhdao');
  },
  post(form) {
    return Api().post('canbo', form);
  },
  put(id, form) {
    return Api().put('canbo/' + id, form);
  },
  lock(id) {
    return Api().put('canbo/' + id + '/lock');
  },
  delete(id) {
    return Api().delete('canbo/' + id);
  },
}
