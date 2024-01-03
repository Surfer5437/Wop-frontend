import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_ADDRESS || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class WopApi {
  // the token for interactive with the API will be stored here.
  static token;
  

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;

   const config = {
      method,
      url,
      data,
      withCredentials: true,
    };


    //     const params = (method === "get") ? data : {};
// const config = {
//   method,
//   url,
//   data,
//   params,
//   withCredentials: true, // Include this line
// }
    try {
      return (await axios(config)).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return (res.company);

  }

  static async getCompanies() {
    try{
      let res = await this.request(`companies/`);
    return (res);
    } catch (err){
      return null;
    }
  }

  static async getInvoicesPerCompany(company_id) {
    try{
      let res = await this.request(`invoices/company/${company_id}`);
    return (res);
    } catch (err){
      return null;
    }
  }

  static async getAllWorkOrders() {
    try{
      let res = await this.request(`allworkorders/`);
    return (res);
    } catch (err){
      return null;
    }
  }

  static async getUsers() {
    try{
      let res = await this.request(`users/`);
    return (res);
    } catch (err){
      return null;
    }
  }

  static async postUser(info) {
    let res = await this.request(`auth/register/`, info, 'post' );
    return (res);
  }

  static async postInvoiceToCompany(info) {
    let res = await this.request(`invoices/`, info, 'post' );
    return (res);
  }

  static async postNewCompany(info) {
    let res = await this.request(`companies/`, info, 'post' );
    return (res);
  }
  
  static async loginUser(info) {
    let res = await this.request(`auth/token/`, info, 'post' );
    console.log(res)
    return (res);
  }

  static async logoutUser() {
    let res = await this.request(`auth/logout/`);
    localStorage.clear()
    return (res);
  }

  static async getCurrentUser(info) {
    let res = await this.request(`users/${info}`);
    return (res);
  }

}


    export default WopApi;