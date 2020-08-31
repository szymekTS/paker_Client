import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/cargo/";

class CargoService {
  checkType(itemList) {
    console.log(itemList);
    return axios.post(
      API_URL + "check_type",
      {
        list: itemList,
      },
      { headers: authHeader() }
    );
  }
}

export default new CargoService();
