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

    // Check if data is FormData and adjust headers accordingly
    let headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    if (data instanceof FormData) {
        // Let the browser set the Content-Type for FormData with the correct boundary
        delete headers['Content-Type'];
    }

    const config = {
        method,
        url,
        data,
        headers,
        withCredentials: true,
    };

    if (method !== 'get') {
        config.data = data;
    } else {
        config.params = data;
    }

    try {
        return (await axios(config)).data;
    } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response ? err.response.data.error.message : err.message;
        throw Array.isArray(message) ? message : [message];
    }
}


  // Individual API routes

  /** Get details on a company by id. */

  static async getCompany(id) {
    let res = await this.request(`companies/${id}`);
    return (res.company);
  }

  static async patchCompany(id, info) {
    let res = await this.request(`companies/${id}`, info, 'patch');
    return (res);
  }

  static async getCompanies() {
    try {
      let res = await this.request(`companies/`);
      return (res);
    } catch (err) {
      return null;
    }
  }

  static async getInvoicesPerCompany(company_id) {
    try {
      let res = await this.request(`invoices/company/${company_id}`);
      return (res);
    } catch (err) {
      return null;
    }
  }

  static async getAllWorkOrders() {
    try {
      let res = await this.request(`allworkorders/`);
      return (res);
    } catch (err) {
      return null;
    }
  }

  static async getUsers() {
    try {
      let res = await this.request(`users/`);
      return (res);
    } catch (err) {
      return null;
    }
  }

  static async postUser(info) {
    let res = await this.request(`auth/register/`, info, 'post');
    return (res);
  }

  static async postInvoiceToCompany(info) {
    let res = await this.request(`invoices/`, info, 'post');
    return (res);
  }

  static async postNewCompany(info) {
    let res = await this.request(`companies/`, info, 'post');
    return (res);
  }

  static async loginUser(info) {
    let res = await this.request(`auth/token/`, info, 'post');
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

  static async sendRegistrationEmailForNewUser(info) {
    let res = await this.request(`users/sendRegistrationEmailForNewUser/`, info, 'post');
    return (res);
  }

  static async getRegistraionCompanyInfo(info) {
    let res = await this.request(`users/getRegistraionCompanyInfo/`, { info }, 'post');
    console.log(res)
    return (res);
  }

  static async registerUserToCompany(info) {
    let res = await this.request(`users/registeruser`, info, 'post');
    console.log(res)
    return (res);
  }




  static async uploadFile(fileData) {
    try {
        // Assuming fileData is already FormData; if not, prepare it here
        console.log(fileData);
        const response = await this.request('upload/', fileData, 'post');
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}



}


export default WopApi;