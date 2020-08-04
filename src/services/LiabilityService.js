import axios from "axios";

require("dotenv").config();

const deployedContractJsonUrl = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class LiabilityService {
  async apiGetLiabilities() {
    const accountId = localStorage.getItem("wlLicence");
    const { data } = await axios.get(`${deployedContractJsonUrl}api/liabilities?accountId=${accountId}`);
    return data.liabilities;
  }
}
