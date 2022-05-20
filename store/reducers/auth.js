import { LOGIN, REFRESH, SIGNUP,LOGOUT } from "../actions/auth";

const intialState = {
  token: null,
  userId: null,
  isLoggedIn: false,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        token: action.token,
        userId: action.userId,
        isLoggedIn: true,
      };
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        token:null,
        userId:null,
        isLoggedIn:false,
      }
    case SIGNUP:
      return {
        ...state,
      };
  }
  return state;
};
