import { CREATE_CONVERSATION, FIND_CONVERSATION } from "../type/FindConverType";
const initState = {
  findConversation: 0,
  flagCreate:0
};
export const findConverReducer = (state = initState, action) => {
  switch (action.type) {
    case FIND_CONVERSATION:
      return {
        ...state,
        findConversation: action.payload,
      };
    case CREATE_CONVERSATION:
      return {
        ...state,
        flagCreate : action.payload
      }
    default:
      return state;
  }
};
