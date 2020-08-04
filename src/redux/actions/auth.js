import { RECEIVE_AUTH, RECEIVE_LICENCES, RECEIVE_LICENCE, SET_ACTIVE_LICENCE, RECEIVE_ADMIN_LICENCES } from "../actions/actionConstants";
import { addNotification } from "./actions";
import { fetchLicence } from "./waterLicences";

import { serviceLoader } from "../../services/serviceLoader";

const authService = serviceLoader("Auth");

export const receiveAuth = value => ({ type: RECEIVE_AUTH, value });

export const fetchAuth = (email, password) => {
  return dispatch => {
    return authService.authorise(email, password).then(response => {
      authService.setToken(response.token);
      dispatch(receiveAuth(response.token));

      dispatch(
        addNotification({
          id: Date.now(),
          text: "Admin login successful",
        })
      );
    });
  };
};

export const revokeAuth = () => {
  return authService.removeToken();
};

export const loadCurrentAuth = () => {
  return dispatch => {
    const token = localStorage.getItem("wl_jwt");
    if (!token) return;
    dispatch(receiveAuth(token));
  };
};

export const receiveLicences = payload => ({ type: RECEIVE_LICENCES, payload });
export const receiveLicence = payload => ({ type: RECEIVE_LICENCE, payload });

export const fetchLicences = () => {
  return dispatch => {
    authService.apiGetLicences().then(response => {
      console.log(response);
      dispatch(receiveLicences(response));
    });
  };
};

export function loadAdminLicences() {
  const adminLicences = JSON.parse(localStorage.getItem("wlLicences"));
  const currentLicence = localStorage.getItem("wlCurrentLicence");
  return dispatch => {
    dispatch(receiveAdminLicences(adminLicences));
    dispatch(setActiveLicence(currentLicence));
  };
}

export const receiveAdminLicences = payload => ({ type: RECEIVE_ADMIN_LICENCES, payload });

export const setActiveLicence = payload => ({ type: SET_ACTIVE_LICENCE, payload });

export function setCurrentLicence(licenceId) {
  localStorage.setItem("wlCurrentLicence", licenceId);
  return dispatch => {
    dispatch(setActiveLicence(licenceId));
  };
}

export const switchLicences = licenceId => {
  return dispatch => {
    dispatch(setCurrentLicence(licenceId));
    dispatch(fetchLicence(licenceId));
  };
};
