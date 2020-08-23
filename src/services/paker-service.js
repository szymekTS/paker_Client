import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/order/";

class PakerService {
  getOrdersFromLocalizationWithStatus(status, localization) {
    return axios.get(API_URL + `find_status_localization/?status=${status}&localization= ${localization}`, {
      headers: authHeader(),
    });
  }
}

export default new PakerService();
