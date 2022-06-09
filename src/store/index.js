import Vue from "vue";
import Vuex from "vuex";
import user from "./user/index";
import general from "./general/index";
import blog from "./blog/index";
import products from "./products/index";
import deposit from "./deposit/index";
import buy from "./buy/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    general,
    blog,
    products,
    deposit,
    buy
  },
});
