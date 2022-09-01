import { AUTHING, PHONE, SET_LOADING, SET_USER } from "../types/authType";

const initialState = {
  loading: false,
  authing: true,
  currentUser: null,
  phoneVerify: null,
};
export const authenticateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTHING:
      return {
        ...state,
        authing: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case PHONE:
      return {
        ...state,
        phoneVerify: action.payload,
      };
    default:
      return state;
  }
};
