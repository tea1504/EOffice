import Api from "../../app/api";

export default {
  get() {
    return Api().get('congvandi/full');
  },
  getSimpleDetail(id) {
    return Api().get('congvandi/' + id);
  },
  getDetail(id) {
    return Api().get('congvandi/full/' + id);
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
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    return Api().post('congvandi', formData, {
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
    return Api().put('congvandi/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete(id) {
    return Api().delete('congvandi/' + id);
  },
}