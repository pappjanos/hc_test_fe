export const mutations = {
  SET_USER(state, to) {
    state.user = to;
    localStorage.setItem("user", JSON.stringify(to))
  },
  LOGOUT_USER(state) {
    localStorage.removeItem("user");
    state.user = {
      email: null,
      isLoggedIn: false,
      roles: null,
      id: null,
      token: null,
    };
  },
  RELOAD_USER_FROM_LOCAL_STORAGE(state) {
    state.user = JSON.parse(localStorage.getItem("user"))
  }
};
