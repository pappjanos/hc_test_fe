import Service from "../abstract/service";
import Api from "../../../apis/api.json";

class DepositService extends Service {
  constructor() {
    super(Api[window.location.host].DEPOSIT_SERVICE_URL);
  }

  getDeposit() {
    return this.api.get("");
  }

  updateDeposit(deposit) {
    return this.api.post("", deposit)
  }

  resetDeposit() {
    return this.api.delete("/reset")
  }
}

const depositService = new DepositService();

export default depositService;
