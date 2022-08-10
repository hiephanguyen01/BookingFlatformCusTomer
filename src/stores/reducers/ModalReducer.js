import { HIDE_MODAL, SHOW_MODAL } from "../types/modalTypes";

const initialState = {
  visible: false,
  Component: <p></p>,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        visible: true,
        Component: action.Component,
      };
    case HIDE_MODAL:
      return { ...state, visible: false };

    default:
      return state;
  }
};
