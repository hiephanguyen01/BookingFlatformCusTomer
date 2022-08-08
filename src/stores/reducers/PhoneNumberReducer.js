import {PHONE_NUMBER,CONFIRM_PASS} from '../types/PhoneNumberType'


const initState = {
  phoneNumber: "1",
  confirmPass: localStorage.PassConfirm === undefined ? false: localStorage.PassConfirm
};

export const phoneNumberReducer = (state = initState, action) => {
  
  switch (action.type) {
    case PHONE_NUMBER:
      return {
        ...state,
        phoneNumber:action.payload,
      };
    case CONFIRM_PASS:
      return {
        ...state,
        confirmPass:action.payload,
      }
    default:
      return state;
  }
};
