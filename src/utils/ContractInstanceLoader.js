// import { serviceLoader } from "../services/serviceLoader";
// import { wrap } from "./ContractWrapper";

// require("dotenv").config();

// let globalInstances = {};

export const loadInstance = async () => {
  // const orderbookService = serviceLoader('OrderBook');
  // const scheme = await orderbookService.getScheme();
  // const {abi, address} = scheme[`${deploymentName}Deployment`];
  // const instance = wrap(abi, address);
  // globalInstances[deploymentName] = instance;
  // return globalInstances;
};

export default class ContractInstanceLoader {
  // static instances = {};
  // constructor() {
  //   if (!ContractInstanceLoader._instance) {
  //     ContractInstanceLoader._instance = this;
  //   }
  //   return ContractInstanceLoader._instance;
  // }
  // async getDeployment(deploymentName) {
  //   if(!ContractInstanceLoader.instances[deploymentName]){
  //     await this.loadAll();
  //   }
  //   if(ContractInstanceLoader.instances[deploymentName]){
  //     return ContractInstanceLoader.instances[deploymentName];
  //   }
  // }
  // async loadAll() {
  //   const orderbookService = serviceLoader('OrderBook');
  //   const scheme = await orderbookService.getScheme();
  //   ['history', 'orderbook', 'licence', 'zones'].forEach(deploymentName => {
  //     const {abi, address} = scheme[`${deploymentName}Deployment`];
  //     const instance = wrap (abi, address);
  //     globalInstances[deploymentName] = instance;
  //     ContractInstanceLoader.instances[deploymentName] = instance;
  //   });
  // }
}
