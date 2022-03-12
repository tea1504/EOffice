import Api from '../../app/api'

export default {
  role(){
    return Api().get('/user/role');
  }
}
