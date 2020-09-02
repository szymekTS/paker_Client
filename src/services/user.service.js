import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/user/";

class UserService {
  constructor() {
    this.state = {
      option: { headers: authHeader() },
    };
  }

  findById(id){
    return axios.get(API_URL + "find", {
      headers: authHeader(),
      params: {
        id: id,
      },
    });
  }

  getAllUsers() {
    return axios.get(API_URL + "find_all", this.state.option);
  }

  updateUser(username, name, surname, number, email, roles, localization,driver) {
    return axios.post(
      API_URL + "update",
      {
        userName: username,
        name: name,
        surname: surname,
        number: number,
        email: email,
        roles:roles,
        localization: localization,
        isDriver: driver
      },
      this.state.option
    );
  }

  createUser(username, name, surname, number, email, password, roles, localization, driver) {
    return axios.post(
      API_URL + "new",
      {
        userName: username,
        name: name,
        surname: surname,
        number: number,
        email: email,
        password: password,
        roles:roles,
        localization: localization,
        isFree: true,
        isDriver: driver
      },
      this.state.option
    );
  }

  changeLocation(id, locationId) {
    return axios.post(
      API_URL + "loc",
      {
        id: id,
        newLocalization: locationId,
      },
      this.state.option 
    );
  }

  deleteUser(id) {
    console.log(id)
    return axios.delete(API_URL + "del", {
      headers: authHeader(),
      params: {
        id:id
      }
    }
    );
  }

  changePassword(id, password, oldpassword) {
    return axios.post(
      API_URL + "pass/",
      {
        id: id,
        oldPassword: oldpassword,
        password: password,
      },
      this.state.option
    );
  }
  findFreeDriverInLoc(localization){
    return axios.get(API_URL + "find_driver_loc", {
      headers: authHeader(),
      params: {
        localization: localization,
      },
    });
  }
}

export default new UserService();
