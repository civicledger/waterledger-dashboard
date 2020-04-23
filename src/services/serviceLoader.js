import OrderBookService from './OrderBookService';
import ZonesService from './ZonesService';
import OrderHistoryService from './OrderHistoryService';
import LicencesService from './LicencesService';
import AuthService from './AuthService';

const services = { OrderBookService, ZonesService, OrderHistoryService, LicencesService, AuthService };

let singletons = {};

export const serviceLoader = service => {
  if(!service.includes('Service')) {
    service = `${service}Service`;
  }
  let singleton = singletons[service] || new services[service]();
  singletons[service] = singleton;
  return singleton;
}