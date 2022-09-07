import {
  GET_LIST_POST,
  GET_DETAIL_POST,
  GET_PAGINATE_POSIBILITY,
} from "../types/PostDaoType";

const initialState = {
  listPost: [],
  pagination: {},
  postDetail: {},
};

export const postDaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return { ...state, listPost: action.data };
    case GET_DETAIL_POST:
      return { ...state, postDetail: action.data };
    case GET_PAGINATE_POSIBILITY:
      return { ...state, pagination: action.data };
    case GET_LIST_POST:
      return { ...state, listPost: action.data };
    default:
      return state;
  }
};
