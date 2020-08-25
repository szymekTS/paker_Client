import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/order/";

class OrderService {
  getAllOrder() {
    return axios.get(API_URL + "find_all", {
      headers: authHeader(),
    });
  }

  deleteOrder(id) {
    console.log(id);
    return axios.delete(API_URL + "del", {
      headers: authHeader(),
      params: {
        id: id,
      },
    });
  }
  addNewOrder(name, surname, email) {
    return axios.post(
      API_URL + "new",
      {
        email: email,
        name: name,
        surname: surname,
      },
      { headers: authHeader() }
    );
  }
}

export default new OrderService();
