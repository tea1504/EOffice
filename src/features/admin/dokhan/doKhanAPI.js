import Api from '../../../app/api';

export default {
  get() {
    return Api().get('dokhan');
  },
  post(form) {
    return Api().post('dokhan', form);
  },
  put(id, form) {
    return Api().put('dokhan/' + id, form);
  },
  delete(id) {
    return Api().delete('dokhan/' + id);
  },
}
