import toastMessage from "../../components/ToastMessage";
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
  SET_STUDIO_SIMILAR,
  SET_PROMOTION_CODE,
  SET_FILTER_SERVICE,
  LOADING_SERVICE,
  SET_SERVICE_SELECT,
  ADD_TIME_ORDER,
  SELECT_TIME_ORDER,
} from "../types/studioPostType";

const initialState = {
  loading: false,
  studioPostList: [],
  filter: JSON.parse(localStorage.getItem("filter-post")) || {
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
  studioDetail1: [],
  studioNear: [],
  studioDetail: {},
  listLikedCategory1: [],
  listLikedCategory3: [],
  listLikedCategory2: [],
  listLikedCategory4: [],
  listLikedCategory5: [],
  listLikedCategory6: [],
  listLikedUser: [],
  listStudioSimilar: [],
  promotionCode: [],
  filterService: JSON.parse(localStorage.getItem("filter-post"))
    ? {
        OrderByTime: JSON.parse(localStorage.getItem("filter-post"))
          .OrderByTime,
        OrderByTimeFrom: JSON.parse(localStorage.getItem("filter-post"))
          .OrderByTimeFrom,
        OrderByTimeTo: JSON.parse(localStorage.getItem("filter-post"))
          .OrderByTimeTo,
        OrderByDateFrom: JSON.parse(localStorage.getItem("filter-post"))
          .OrderByDateFrom,
        OrderByDateTo: JSON.parse(localStorage.getItem("filter-post"))
          .OrderByDateTo,
      }
    : {
        OrderByTime: -1,
        OrderByTimeFrom: "",
        OrderByTimeTo: "",
        OrderByDateFrom: "",
        OrderByDateTo: "",
      },
  listTimeSelected: [],
  loadingService: false,
  serviceSelected: null,
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
    case SET_STUDIO_SIMILAR:
      return {
        ...state,
        listStudioSimilar: action.data,
      };
    case SET_PROMOTION_CODE:
      return {
        ...state,
        promotionCode: action.data,
      };
    case LOADING_SERVICE:
      return {
        ...state,
        loadingService: action.payload,
      };
    case SET_FILTER_SERVICE:
      return {
        ...state,
        filterService: { ...action.payload },
      };
    case SET_SERVICE_SELECT:
      console.log(action.payload);
      return {
        ...state,
        serviceSelected: action.payload,
      };
    case "SET_TIME_ORDER":
      return {
        ...state,
        listTimeSelected: action.data,
      };
    case ADD_TIME_ORDER:
      console.log(action.data);
      let newArray = [...state.listTimeSelected];
      if (newArray.length > 0) {
        const existed = newArray.findIndex(
          (item) => item.id === action.data?.id
        );
        if (existed !== -1) {
          newArray[existed] = action.data;
        } else {
          newArray = [...newArray, action.data];
        }
      } else {
        newArray = [...newArray, action.data];
      }
      console.log(newArray);
      return {
        ...state,
        listTimeSelected: newArray,
      };
    case SELECT_TIME_ORDER:
      let newFilter = { ...state.filterService };

      if (newFilter.id == action.data.id) {
        newFilter = {};
      } else {
        let data = state.listTimeSelected.find(
          (item) => item.id == action.data.id
        );
        console.log("data da chon", data);
        if (data) {
          newFilter = data;
        } else {
          newFilter = { ...newFilter, id: -1 };
          toastMessage("Vui lòng chọn giá theo giờ hoặc theo ngày!", "warn", 2);
        }
      }

      return {
        ...state,
        filterService: newFilter,
      };
    case "SET_SELECT_TIME_ORDER":
      return {
        ...state,
        filterService: {},
      };
    case "SET_TIME_ORDER_SELECTED":
      return {
        ...state,
        filterService: {
          OrderByTime: -1,
          OrderByTimeFrom: "",
          OrderByTimeTo: "",
          OrderByDateFrom: "",
          OrderByDateTo: "",
        },
      };
    default:
      return state;
  }
};
