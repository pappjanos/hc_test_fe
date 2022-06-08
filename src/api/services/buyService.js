import Service from "../abstract/service";
import Api from "../../../apis/api.json";

class BuyService extends Service {
  constructor() {
    super(Api[window.location.host].BUY_SERVICE_URL);
  }

  buyProduct(properties) {
    return this.api.post("", properties)
  }
}

const buyService = new BuyService();

export default buyService;
