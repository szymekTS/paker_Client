import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/car/";

class CityService {
  getAllCars(){
    return axios.get(API_URL + "find_all",{
      headers: authHeader(),
    });
  }

  deleteCar(id) {
    console.log(id)
    return axios.delete(API_URL + "del", {
      headers: authHeader(),
      params: {
        id:id
      }
    }
    );
  }
  addNewCar(brand, model, licensePlate, carType) {
    return axios.post(API_URL + "new",
    {
        brand: brand,
        model: model,
        licensePlate: licensePlate,
        carType: carType

    },
    {headers: authHeader()} 
  );
  }

}

export default new CityService();