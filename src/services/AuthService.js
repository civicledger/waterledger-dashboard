import axios from 'axios';

require('dotenv').config();

const deployedContractJsonUrl = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class AuthService {
  async authorise(email, password){
    const { data } =  await axios.post(`${deployedContractJsonUrl}api/login`, { email, password});
    return data;
  }

  setToken(token) {
    localStorage.setItem('wl_jwt', token);
  }

  removeToken() {
    localStorage.removeItem('wl_jwt');
  }

  async apiGetLicences() {
    const { data } = await axios.get(`${deployedContractJsonUrl}api/licences/`);
    return data.licences;
  }

}