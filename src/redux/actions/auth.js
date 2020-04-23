import {RECEIVE_AUTH} from '../actions/actionConstants';
import { addNotification } from './actions';

import {serviceLoader} from '../../services/serviceLoader';

const authService = serviceLoader('Auth');

export const receiveAuth = value => ({ type: RECEIVE_AUTH, value });

export const fetchAuth = (email, password) => {
  return dispatch => {
    return authService.authorise(email, password).then(
      response => {
        authService.setToken(response.token);
        dispatch(receiveAuth(response.token));

        dispatch(addNotification({
          id: Date.now(),
          text: 'Admin login successful'
        }));
      }
    )
  }
}

export const revokeAuth = () => {
  return authService.removeToken();
}

export const loadCurrentAuth = () => {
  return dispatch => {
    const token = localStorage.getItem('wl_jwt');
    if(!token) return;
    dispatch(receiveAuth(token));
  }
}