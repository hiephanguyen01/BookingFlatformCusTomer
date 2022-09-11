
import {NEW_MESS } from "../type/messType";

export const newMessAction = (data) => {
  return {
    type: NEW_MESS,
    payload: data
  };
};