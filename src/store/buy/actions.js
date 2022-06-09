import buyService from "../../api/services/buyService";

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
  async buyProduct(context, properties) {
    try {
      const response = await buyService.buyProduct(properties);
      context.commit("BUY_PRODUCT", response.data)
      context.dispatch("deposit/getDeposit", null, { root: true });
      context.dispatch("products/getProductList", null, { root: true });
    } catch (error) {
      error.response.data.msg_d === 'NOT_ENOUGH_PRODUCTS' && context.dispatch("products/getProductList", null, { root: true });
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },
};
