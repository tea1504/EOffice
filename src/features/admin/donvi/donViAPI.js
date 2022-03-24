import Api from "../../../app/api";

export default {
  get() {
    return Api().get('donvi');
  },
  post(form) {
    return Api().post('donvi', form);
  },
  put(id, form) {
    return Api().put('donvi/' + id, form);
  },
  delete(id) {
    return Api().delete('donvi/' + id);
  },
}
