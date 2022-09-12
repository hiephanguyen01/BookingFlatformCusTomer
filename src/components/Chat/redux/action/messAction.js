import { FIND_CONVERSATION } from "../type/FindConverType";

export const newMessAction = (data) => {
  return {
    type: FIND_CONVERSATION,
    payload: data
  };
};