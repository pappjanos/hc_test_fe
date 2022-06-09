import depositService from "../../api/services/depositService";
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

  async getDeposit(context) {
    try {
      const response = await depositService.getDeposit();
      context.commit("SET_DEPOSIT", response.data.deposit)
    } catch (error) {
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },
  async updateDeposit(context, deposit) {
    try {
      const response = await depositService.updateDeposit({deposit});
      context.commit("SET_DEPOSIT", response.data.deposit)
    } catch (error) {
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },
  async resetDeposit(context) {
    try {
      const response = await depositService.resetDeposit();
      context.commit("SET_DEPOSIT", response.data.currentDeposit)
    } catch (error) {
      console.log(error)
      setMessage(context, error.response.data.message);
    }
  },

};
