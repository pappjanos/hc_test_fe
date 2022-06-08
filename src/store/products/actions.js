import productService from "../../api/services/productService";
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

export const actions = {

  async getProductList(context) {
    try {
      const response = await productService.getProducts();
      context.commit("SET_PRODUCTS", response.data.products);
    } catch (error) {
      console.log(error);
      setMessage(context, error.response.data.message);
    }
  },

  async getProduct(context, id) {
    try {
      const response = await productService.getProduct(id);
      context.commit("SET_PRODUCT", response.data.product)
    } catch (error) {
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },

  async addProduct(context, product) {
    try {
      const response = await productService.addProduct(product);
      context.commit("ADD_PRODUCT", response.data.product)
      setMessage(context, response.data.message, 'green');
      // router.push({ name: "Home" }).catch(()=>{});
    } catch (error) {
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },
  async patchProduct(context, patch) {
    try {
      const response = await productService.patchProduct(patch.id, patch)
      context.commit("PATCH_PRODUCT", {to: response.data.updatedProduct, id: response.data.updatedProduct.id})
      setMessage(context, response.data.message, 'green');
    } catch (error) {
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },
  async deleteProduct(context, id) {
    try {
      const response = await productService.deleteProduct(id);
      context.commit("DELETE_PRODUCT", id)
      setMessage(context, response.data.message, 'green');
      // router.push({ name: "Home" }).catch(()=>{});
    } catch (error) {
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },
};
