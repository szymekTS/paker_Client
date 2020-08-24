import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8900/api/customer/";

class CustomerService {
  getAllCustomers(){
    return axios.get(API_URL + "find_all",{
      headers: authHeader(),
    });
  }

  deleteCustomer(id) {
    console.log(id)
    return axios.delete(API_URL + "del", {
      headers: authHeader(),
      params: {
        id:id
      }
    }
    );
  }
  addNewCustomer(name, surname, email) {
    return axios.post(API_URL + "new",
    {
        name: name,
        surname: surname,
        email: email
    },
    {headers: authHeader()} 
  );
  }

}

export default new CustomerService();