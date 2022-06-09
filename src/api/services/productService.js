import Service from "../abstract/service";
import Api from "../../../apis/api.json";

class ProductService extends Service {
  constructor() {
    super(Api[window.location.host].PRODUCT_SERVICE_URL);
  }

  getProducts() {
    return this.api.get("");
  }

  getProduct(productId) {
    return this.api.get("/" + productId);
  }

  addProduct(product) {
    return this.api.post("", product)
  }

  patchProduct(productId, patch) {
    return this.api.patch("/" + productId, patch)
  }

  deleteProduct(productId) {
    return this.api.delete("/" + productId)
  }
}

const productService = new ProductService();

export default productService;
