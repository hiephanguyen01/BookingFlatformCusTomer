import {PHONE_NUMBER} from '../types/PhoneNumberType'
export const phoneNumberAction = (data) => {
  return {
    type: PHONE_NUMBER,
    payload: data
  };
};
