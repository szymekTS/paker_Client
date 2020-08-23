import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/city/";

class CityService {
  getCityData(id) {
    return axios.get(API_URL + "find", {
      headers: authHeader(),
      params: {
        id: id,
      },
    });
  }
}

export default new CityService();