import {
  FIND_CONVERSATION,
  CREATE_CONVERSATION,
  UPDATE_SCROLL,
  FLAG_CLOSE_CONVERSATION,
} from "../types/messType";
const initState = {
  findConversation: 0,
  flagCreate: 0,
  update: false,
  closeConversation: false,
};
export const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case FIND_CONVERSATION:
      return {
        ...state,
        findConversation: action.payload,
      };
    case CREATE_CONVERSATION:
      return {
        ...state,
        flagCreate: action.payload,
      };
    case UPDATE_SCROLL:
      return {
        ...state,
        update: !state.update,
      };
    case FLAG_CLOSE_CONVERSATION:
      return {
        ...state,
        closeConversation: !state.closeConversation,
      };
    default:
      return state;
  }
};
