import { parseISO, isBefore } from "date-fns";

export const interceptResponse = response => {
  if (Array.isArray(response.data)) {
    response.data = response.data.map(item => {
      return Object.entries(item).reduce(dateReducer, {});
    });
    return response;
  }

  if (response.data.user) {
    response.data.user = Object.entries(response.data.user).reduce(dateReducer, {});
    return response;
  }

  response.data = Object.entries(response.data).reduce(dateReducer, {});
  return response;
};

const dateReducer = (acc, [key, value]) => {
  acc[key] = value;

  if (Array.isArray(value)) {
    acc[key] = value.map(item => {
      return Object.entries(item).reduce(dateReducer, {});
    });
  }

  if (key === "quantity") return acc;

  const date = parseISO(value);
  if (isNaN(date) || isBefore(date, new Date(1905))) return acc;

  acc[key] = date;
  return acc;
};

export const interceptRequest = request => {
  if (request.data) {
    request.data = Object.entries(request.data).reduce((accumulator, [key, value]) => {
      accumulator[key] = typeof value === "string" ? value.trim() : value;
      return accumulator;
    }, {});
  }
  return request;
};
