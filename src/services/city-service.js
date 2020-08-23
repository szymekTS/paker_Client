import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/city/";

class CityService {
  getCityNeighbours(id) {
    return axios.get(API_URL + "get_neighbours", {
      headers: authHeader(),
      params: {
        id: id,
      },
    });
  }

  getCityData(id) {
    return axios.get(API_URL + "find", {
      headers: authHeader(),
      params: {
        id: id,
      },
    });
  }
  getAllCities(){
    return axios.get(API_URL + "find_all",{
      headers: authHeader(),
    });
  }
}

export default new CityService();