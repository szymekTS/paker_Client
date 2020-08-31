import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/car/";

class CarService {
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
  addNewCar(brand, model, licensePlate,localization, carType) {
    return axios.post(API_URL + "new",
    {
        brand: brand,
        model: model,
        licensePlate: licensePlate,
        carType: carType,
        localization:localization

    },
    {headers: authHeader()} 
  );
  }
  updateCar(id,localization, isRepair, isFree) {
    return axios.post(API_URL + "updejt",
    {
        id: id,
        localization: localization,
        repairing: isRepair,
        free: isFree
    },
    {headers: authHeader()} 
  );
  }

  getCarLocType(localization, carType) {
    return axios.get(API_URL + "find_good_loc", {
      headers: authHeader(),
      params: {
        localization: localization,
        type: carType
      },
    });
  }
  
}

export default new CarService();