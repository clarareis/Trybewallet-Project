// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default login;
