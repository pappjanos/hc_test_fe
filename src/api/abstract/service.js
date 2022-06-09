import axios from "axios";
import store from "../../store/index";
export default class Service {
  constructor(baseURL) {
    this.api = axios.create({ baseURL });

    this.api.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        if (error.response.data.msg_id === 'USR_NOT_AUTHORIZED') {
          store.dispatch("user/logout")
        }
        return Promise.reject(error);
      }
    );
  }
  setAuthToken(token) {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  removeAuthToken() {
    this.api.defaults.headers.common.Authorization = null;
  }
}
