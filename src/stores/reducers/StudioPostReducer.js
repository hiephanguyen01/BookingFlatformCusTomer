import {
  SET_POST_LIST,
  SET_FILTER,
  SET_POST_PAGINATION,
  LOADING,
  SET_STUDIO_DETAIL,
} from "../types/studioPostType";

const initialState = {
  laoding: false,
  studioPostList: [],
  filter: {
    keyString: "",
    category: 1,
    priceOption: 0,
    price1: undefined,
    price2: undefined,
    provinceIds: [],
    ratingOption: 1,
  },
  pagination: {
    page: 1,
    limit: 10,
  },
  studioDetail: {},
};

export const studioPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_POST_LIST:
      return {
        ...state,
        studioPostList: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SET_POST_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case SET_STUDIO_DETAIL:
      return {
        ...state,
        studioDetail: action.payload,
      };

    default:
      return state;
  }
};
