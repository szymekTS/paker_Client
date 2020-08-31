import axios from "axios";
import authHeader from "./auth-header";
import userService from "./user.service";

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

  addNewOrder(user, car, cargo, customer, driver, origin, destiny) {
    return axios.post(
      API_URL + "new",
      {
        creator: user,
        car: car,
        cargo: cargo,
        customer: customer,
        driver: driver,
        origin: origin,
        destiny: destiny
      },
      { headers: authHeader() }
    );
  }

  addNewStatus(order, worker, status, comment) {
    return axios.post(
      API_URL + "add_Status",
      {
        orderId: order,
        workerID:worker,
        status: status,
        comment: comment,
      },
      { headers: authHeader() }
    );
  }



  getStatusList(id) {
    return axios.get(API_URL + "get_statuslist", {
      headers: authHeader(),
      params: {
        id: id
      },
    });
  }
}

export default new OrderService();
