import Api from "../../../app/api";

export default {
  get() {
    return Api().get('domat');
  },
  post(form) {
    return Api().post('domat', form);
  },
  put(id, form) {
    return Api().put('domat/' + id, form);
  },
  delete(id) {
    return Api().delete('domat/' + id);
  },
}
