import {
  GET_LIST_BY_CATEGORY,
  SET_CATEGORY,
  SET_LINK_TO,
} from "../types/ListByCategoryTypes";

const initialState = {
  listByCategory: [],
  category: "",
  linkTo: "",
};

export const listByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BY_CATEGORY:
      return {
        ...state,
        listByCategory: action.data,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.data,
      };
    case SET_LINK_TO:
      return {
        ...state,
        linkTo: action.data,
      };
    default:
      return state;
  }
};
