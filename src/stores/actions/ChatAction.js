import { FIND_CONVERSATION ,CREATE_CONVERSATION,UPDATE_SCROLL} from "../types/messType";

export const findConverAction = (data) => {
  return {
    type: FIND_CONVERSATION,
    payload: data,
  };
};
export const createConverAction = (data) => {
  return {
    type: CREATE_CONVERSATION,
    payload: data,
  };
};
export const updateMAction = (data) => {
  return {
    type: UPDATE_SCROLL,
    payload: data
  };
};