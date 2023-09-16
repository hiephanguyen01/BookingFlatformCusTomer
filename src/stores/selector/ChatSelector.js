export const findConverSelector = (state) => state.chatReducer.findConversation;
export const createConverFlagSelector = (state) => state.chatReducer.flagCreate;
export const updateMSelector = (state) => state.chatReducer.update;
export const closeConversationSelector = (state) =>
  state.chatReducer.closeConversation;
export const getToggleState = (state) => state.chatReducer.toggleState;
export const showChatDrawerSelector = (state) => state.chatReducer.showChat;
