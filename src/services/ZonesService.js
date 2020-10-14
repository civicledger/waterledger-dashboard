import { getInstanceIdentifier } from "../utils/ethUtils";
import { wrap } from "../utils/ContractWrapper";
import BaseService from "./BaseService";
import axios from "axios";
require("dotenv").config();

export default class ZonesService extends BaseService {
  contract = null;
  contractName = "Zone";

  getZoneBalanceFor = async (address, zoneIndex) => {
    await this.loadContract();
    return await this.contract[zoneIndex].web3Contract.methods.balanceOf(address).call();
  };
}
