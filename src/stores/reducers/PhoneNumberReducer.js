import {PHONE_NUMBER} from '../types/PhoneNumberType'
const initState = {
  phoneNumber: "1",
};
export const phoneNumberReducer = (state = initState, action) => {
  switch (action.type) {
    case PHONE_NUMBER:
      return {
        ...state,
        phoneNumber:action.payload,
      };
    default:
      return state;
  }
};
