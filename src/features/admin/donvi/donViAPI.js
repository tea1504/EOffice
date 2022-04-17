import Api from "../../../app/api";

export default {
  get() {
    return Api().get('donvi');
  },
  getByClericalAssistant(){
    return Api().get('donvi/dv');
  },
  post(form) {
    return Api().post('donvi', form);
  },
  postOther(form) {
    return Api().post('donvi/other', form);
  },
  put(id, form) {
    return Api().put('donvi/' + id, form);
  },
  delete(id) {
    return Api().delete('donvi/' + id);
  },
}
