import { HIDE_MODAL, SHOW_MODAL } from "../types/modalTypes";

const initialState = {
  visible: false,
  Component: <p></p>,
  isListImage: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        visible: true,
        Component: action.Component,
      };
    case "SHOW_MODAL_LIST":
      return {
        ...state,
        visible: true,
        Component: action.Component,
        isListImage: true,
      };
    case HIDE_MODAL:
      return { ...state, visible: false, Component: <></>, isListImage: false };

    default:
      return state;
  }
};
