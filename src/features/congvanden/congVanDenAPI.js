import Api from "../../app/api";

export default {
  get() {
    return Api().get('congvanden/full');
  },
  getDetail(id) {
    return Api().get('congvanden/full/' + id);
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
    var formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (!key.includes('err')) {
        if (key == 'dv_nhan' || key == 'taptin') {
          Array.from(value).map((el) => {
            console.log(key, el);
            formData.append(key, el);
          })
        }
        else if (key == 'trangthai') {
          formData.append(key, value._id ? value._id : value);
        }
        else {
          formData.append(key, value);
        }
      }
    }
    return Api().put('congvanden/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete(id) {
    return Api().delete('congvanden/' + id);
  },
}