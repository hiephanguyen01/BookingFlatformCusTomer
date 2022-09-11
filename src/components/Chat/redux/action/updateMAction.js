import { UPDATE_SCROLL } from "../type/messType";
export const updateMAction = (data) => {
  return {
    type: UPDATE_SCROLL,
    payload: data
  };
};