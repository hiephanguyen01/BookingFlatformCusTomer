import {PHONE_NUMBER,CONFIRM_PASS} from '../types/PhoneNumberType'
export const phoneNumberAction = (data) => {
  return {
    type: PHONE_NUMBER,
    payload: data
  };
};
export const confirmPassAction = (data) => {
  return {
    type: CONFIRM_PASS,
    payload: data
  };
};
