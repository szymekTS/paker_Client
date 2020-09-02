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

  deleteCity(id) {
    console.log(id)
    return axios.delete(API_URL + "del", {
      headers: authHeader(),
      params: {
        id:id
      }
    }
    );
  }

  addNewNeighbour(id, idNeighbour, distance) {
    return axios.post(API_URL + "add_neighbour",
    {
      id: id,
      city_id: idNeighbour,
      distance: distance
    },
    {headers: authHeader()} 
  );
  }
  
  addNewCity(name, province, zipCode) {
    return axios.post(API_URL + "new",
    {
      name: name,
      province: province,
      zipCode: zipCode
    },
    {headers: authHeader()} 
  );
  }
  
  getCityData(id) {
    return axios.get(API_URL + "find", {
      headers: authHeader(),
      params: {
        id: id,
      },
    });
  }

  getCityDataName(id) {
    return axios.get(API_URL + "find_name", {
      headers: authHeader(),
      params: {
        name: id,
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