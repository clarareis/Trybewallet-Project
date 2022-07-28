export const REQUEST_API = 'REQUEST_API';
export const LOGIN = 'LOGIN';

export const requestAPI = () => ({ type: REQUEST_API });

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(data);
    } catch (error) {
      return error;
    }
  };
}
