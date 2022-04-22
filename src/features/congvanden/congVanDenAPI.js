import Api from "../../app/api";

export default {
  get() {
    return Api().get('congvanden/full');
  },
  post(form) {
    var formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (!key.includes('err')) {
        if (key == 'dv_nhan' || key == 'taptin') {
          Array.from(value).map((el) => {
            formData.append(key, el);
          })
        }
        else {
          formData.append(key, value);
        }
      }
    }
    return Api().post('congvanden', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  put(id, form) {
    return Api().put('congvanden/' + id, form);
  },
  delete(id) {
    return Api().delete('congvanden/' + id);
  },
}