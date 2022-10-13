import { convertDateSendToDB } from "../../utils/convert";
import {
  SET_POST_LIST,
  SET_FILTER,
  SET_POST_PAGINATION,
  LOADING,
  SET_STUDIO_DETAIL,
  SET_STUDIO_NEAR,
  SET_STUDIO_DETAIL1,
  SET_LIST_LIKED_CATEGORY_1,
  SET_LIST_LIKED_CATEGORY_2,
  SET_LIST_LIKED_CATEGORY_3,
  SET_LIST_LIKED_CATEGORY_4,
  SET_LIST_LIKED_CATEGORY_5,
  SET_LIST_LIKED_CATEGORY_6,
  SET_LIST_LIKED_CATEGORY,
  SET_PROMOTION_CODE,
} from "../types/studioPostType";

const initialState = {
  loading: false,
  studioPostList: [],
  filter: {
    keyString: "",
    OrderByTime: -1,
    OrderByTimeFrom:
      convertDateSendToDB(new Date()).slice(0, 13) + ":00:00.000Z",
    OrderByTimeTo:
      convertDateSendToDB(new Date()).slice(0, 11) +
      `${
        parseInt(convertDateSendToDB(new Date()).slice(11, 13)) > 9
          ? parseInt(convertDateSendToDB(new Date()).slice(11, 13)) + 1
          : `0${parseInt(convertDateSendToDB(new Date()).slice(11, 13)) + 1}`
      }` +
      ":00:00.000Z",
    OrderByDateFrom: convertDateSendToDB(new Date()),
    OrderByDateTo: convertDateSendToDB(new Date()),
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
  studioDetail1: [],
  studioNear: [],
  studioDetail: [],
  listLikedCategory1: [],
  listLikedCategory3: [],
  listLikedCategory2: [],
  listLikedCategory4: [],
  listLikedCategory5: [],
  listLikedCategory6: [],
  listLikedUser: [],
  promotionCode: [],
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
    case SET_STUDIO_DETAIL1:
      return {
        ...state,
        studioDetail1: action.payload,
      };

    case SET_STUDIO_NEAR:
      return {
        ...state,
        studioNear: action.payload,
      };
    case SET_LIST_LIKED_CATEGORY:
      return {
        ...state,
        listLikedUser: action.data,
      };
    case SET_LIST_LIKED_CATEGORY_1:
      return {
        ...state,
        listLikedCategory1: action.data,
      };
    case SET_LIST_LIKED_CATEGORY_2:
      return {
        ...state,
        listLikedCategory2: action.data,
      };
    case SET_LIST_LIKED_CATEGORY_3:
      return {
        ...state,
        listLikedCategory3: action.data,
      };
    case SET_LIST_LIKED_CATEGORY_4:
      return {
        ...state,
        listLikedCategory4: action.data,
      };
    case SET_LIST_LIKED_CATEGORY_5:
      return {
        ...state,
        listLikedCategory5: action.data,
      };
    case SET_LIST_LIKED_CATEGORY_6:
      return {
        ...state,
        listLikedCategory6: action.data,
      };
    case SET_PROMOTION_CODE:
      return {
        ...state,
        promotionCode: action.data,
      };

    default:
      return state;
  }
};
