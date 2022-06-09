export const mutations = {
  SET_PRODUCTS(state, to) {
    state.products = to;
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product)
  },
  SET_PRODUCT(state, to) {
    state.product = to;
  },
  PATCH_PRODUCT(state, { to, id }) {
    state.products = state.products.map(product => {
      if (product.id === id) {
        return Object.assign({}, product, to)
      }
      return product
    })
  },
  DELETE_PRODUCT(state, id) {
    state.products = state.products.filter((product) => product.id !== id);
  }
};
