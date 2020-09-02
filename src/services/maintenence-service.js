import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/maintanence/";

class MaintenenceService {
    addNewRepair(carId, description) {
        return axios.post(
          API_URL + "new",
          {
            carId: carId,
            description:description,
          },
          { headers: authHeader() }
        );
      }

      getCarMaintenece(id){
        return axios.get(API_URL + "find_car", {
          headers: authHeader(),
          params: {
            car: id,
          },
        });
      }

      changeMainteneceStatus(id){
        return axios.get(API_URL + "change_status", {
          headers: authHeader(),
          params: {
            id: id,
          },
        });
      }

      getAllMaintenece(){
        return axios.get(API_URL + "find_all",{
          headers: authHeader(),
        });
      }
}

export default new MaintenenceService();