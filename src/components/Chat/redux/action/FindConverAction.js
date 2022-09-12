import { FIND_CONVERSATION, CREATE_CONVERSATION } from "../type/FindConverType";

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
