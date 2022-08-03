export const REQUEST_API = 'REQUEST_API';
export const LOGIN = 'LOGIN';
export const RESPONSE_API_SUCESS = 'RESPONSE_API_SUCESS';
export const RESPONSE_API_FAILURE = 'RESPONSE_API_FAILURE';
export const BUTTON = 'BUTTON';

export const requestAPI = () => ({ type: REQUEST_API });

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const responseApiSucess = (currencies) => ({
  type: RESPONSE_API_SUCESS,
  payload: currencies,
});

export const responseApiFailure = (error) => ({
  type: RESPONSE_API_FAILURE,
  error,
});

export const buttonExpense = (payload) => ({
  type: BUTTON,
  payload,
});
