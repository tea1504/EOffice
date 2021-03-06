import Api from "../../app/api";

export default {
  get() {
    return Api().get('congvanden/full');
  },
  getdulieuchuaduyet() {
    return Api().get('congvanden/getdulieuchuaduyet');
  },
  getdulieutuchoi() {
    return Api().get('congvanden/getdulieutuchoi');
  },
  getdulieuxuly() {
    return Api().get('congvanden/getdulieuxuly');
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
  duyetCV(id, form) {
    var formData = new FormData();
    formData.append('ykien', form.ykien);
    formData.append('cb_xuly', form.cb_xuly);
    return Api().put('congvanden/duyet/' + id, formData);
  },
  khongduyetCV(id, form) {
    var formData = new FormData();
    formData.append('ykien', form.ykien);
    return Api().put('congvanden/khongduyet/' + id, formData);
  },
  delete(id) {
    return Api().delete('congvanden/' + id);
  },
  xulyCV(id) {
    return Api().put('congvanden/xulyCV/' + id);
  },
  delete(id) {
    return Api().delete('congvanden/' + id);
  },
}