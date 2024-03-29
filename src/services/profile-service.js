import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/user/";

class ProfileService {
  getUserData(id) {
    return axios.get(API_URL + "find", {
      headers: authHeader(),
      params: {
        id: id,
      },
    });
  }

  changePassword(id, password, oldpassword) {
    const bodyForm = new FormData();
    bodyForm.append('id',id);
    bodyForm.append('oldPassword',oldpassword)
    bodyForm.append('password',password)

   const option = {headers: authHeader()};

    return axios.post(API_URL + "pass/",{
        id: id,
        oldPassword: oldpassword,
        password: password
      },option
    );
  }
}

export default new ProfileService();
