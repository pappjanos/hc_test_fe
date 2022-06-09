import userService from "../../api/services/userService";
import productService from "../../api/services/productService";
import buyService from "../../api/services/buyService";
import depositService from "../../api/services/depositService";

import { parse } from "@/util/jwt";
import router from "../../router";

function setMessage(context, message, color = "red") {
  context.dispatch(
    "general/setSnackbar",
    {
      message,
      color,
    },
    { root: true }
  );
}

function setAuthtokens(token) {
  // call setAuthToken for all apis here
  productService.setAuthToken(token);
  buyService.setAuthToken(token);
  depositService.setAuthToken(token);
}

function clearAuthTokens() {
  // remove auth token in case of logging out
  productService.removeAuthToken();
  buyService.removeAuthToken();
  depositService.removeAuthToken();
}

export const actions = {
  async login(context, { email, password }) {
    try {
      const response = await userService.login({ email, password });
      const tokenPayload = parse(response.data.token);

      context.commit("SET_USER", {
        email: tokenPayload.user.email,
        isloggedIn: true,
        roles: tokenPayload.user.role,
        id: tokenPayload.user.id,
        token: response.data.token
      });

      setAuthtokens(response.data.token)

      setMessage(context, response.data.message, "green");
      router.push({ name: "Home" }).catch(()=>{});
    } catch (error) {
      setMessage(context, error.response.data.message);
    }
  },

  reloadUserFromLocalStorage(context) {
    if (localStorage.getItem("user")) {
      context.commit("RELOAD_USER_FROM_LOCAL_STORAGE")
      setAuthtokens(JSON.parse(localStorage.getItem("user")).token)
    } else {
      context.dispatch('logout')
    }
  },

  async register(context, { email, password, role }) {
    const user = {
      email,
      password,
      role
    };
    try {
      const response = await userService.register(user);
      setMessage(context, response.data.message, "green");
      router.push({ name: "Login" }).catch(()=>{});
    } catch (error) {
      setMessage(context, error.response.data.message);
    }
  },

  async logout(context) {
    clearAuthTokens()
    context.commit("LOGOUT_USER");
    router.push({ name: "Home" }).catch(()=>{});
  },
};
