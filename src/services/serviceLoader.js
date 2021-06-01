import OrderBookService from "./OrderBookService";
import ZonesService from "./ZonesService";
import OrderHistoryService from "./OrderHistoryService";
import LicencesService from "./LicencesService";
import AuthService from "./AuthService";
import LiabilityService from "./LiabilityService";
import UsersService from "./UsersService";

const services = { OrderBookService, ZonesService, OrderHistoryService, LicencesService, AuthService, LiabilityService, UsersService };

let singletons = {};

export const serviceLoader = service => {
  if (!service.includes("Service")) {
    service = `${service}Service`;
  }

  let singleton = singletons[service] || new services[service]();
  singletons[service] = singleton;
  return singleton;
};
