import Service from "../abstract/service";
import Api from "../../../apis/api.json";

class UserService extends Service {
  constructor() {
    super(Api[window.location.host].USER_SERVICE_URL);
  }

  login({ email, password }) {
    return this.api.post("/login", {
      email,
      password,
    });
  }

  register(user) {
    return this.api.post("/register", user);
  }
}

const userService = new UserService();

export default userService;
