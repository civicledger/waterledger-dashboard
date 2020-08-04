import axios from "axios";
import { wrap } from "./ContractWrapper";

require("dotenv").config();

const deployedContractJsonUrl = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export const loadInstance = async (contractName, identifier) => {
  const identifierUrl = `${deployedContractJsonUrl}api/contracts/${contractName.toLowerCase()}/instances/${identifier}`;

  let response = null;
  try {
    response = await axios.get(identifierUrl);
  } catch (error) {
    console.log(error);
  }

  if (!response) return false;
  const { address, abi } = response.data.instance;

  return wrap(abi, address);
};
