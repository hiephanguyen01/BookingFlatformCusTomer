import moment from "moment";
import {
  checkIfChosenServiceDifferentFromCurrentList,
  checkIfChosenServiceExistInCurrentListInRedux,
} from "../../utils/cartUtils";
import { categories } from "../../utils/category";
import {
  ADD_CART,
  ADD_SERVICE_TO_LIST,
  DEFINE_SERVICES_TO_LIST,
  DELETE_CART,
  DELETE_CHOOSE_SERVICE,
  LOADING,
  REMOVE_SERVICE_FROM_CART,
  SET_CART_BY_CATEGORY,
  UPDATE_CART,
  UPDATE_CHOOSE_SERVICE,
} from "../types/CartType";

const initialState = {
  loading: false,
  chooseServiceList: [],
  cart: JSON.parse(localStorage.getItem("cart")) || {
    studio: [],
    photographer: [
      {
        Id: 1,
        Name: "Studio Wisteria",
        Services: [
          {
            Id: 1,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 1,
            OrderByTimeFrom: moment(),
            OrderByTimeTo: moment(),
            Price: 500000,
          },
          {
            Id: 2,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 0,
            OrderByDateFrom: moment(),
            OrderByDateTo: moment(),
            Price: 500000,
          },
        ],
      },
      {
        Id: 2,
        Name: "Studio Wisteria",
        Services: [
          {
            Id: 1,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 1,
            OrderByTimeFrom: moment(),
            OrderByTimeTo: moment(),
            Price: 500000,
          },
          {
            Id: 2,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 0,
            OrderByDateFrom: moment(),
            OrderByDateTo: moment(),
            Price: 500000,
          },
        ],
      },
    ],
    clothes: [],
    makeup: [],
    device: [],
    model: [],
  },
};

export const CartReducer = (state = initialState, action) => {
  let category, post, service, findPost, data;
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case DEFINE_SERVICES_TO_LIST:
      return {
        ...state,
        chooseServiceList: action.payload,
      };

    case ADD_SERVICE_TO_LIST:
      let currentChooseServiceList = [...state?.chooseServiceList];
      let comparedResultId = checkIfChosenServiceExistInCurrentListInRedux(
        state.chooseServiceList,
        action?.payload?.service
      );

      if (
        checkIfChosenServiceDifferentFromCurrentList(
          state.chooseServiceList,
          action?.payload?.service
        )
      ) {
        return {
          ...state,
          chooseServiceList: [action?.payload?.service],
        };
      }

      if (comparedResultId.length > 0) {
        currentChooseServiceList.splice(comparedResultId[0], 1);
        return {
          ...state,
          chooseServiceList: currentChooseServiceList,
        };
      }
      return {
        ...state,
        chooseServiceList: [
          ...state.chooseServiceList,
          action?.payload?.service,
        ],
      };

    case UPDATE_CHOOSE_SERVICE:
      const { id, promotion } = action.payload;
      service = state.chooseServiceList.find((item) => item?.id === id);
      if (!service) {
        return state;
      }
      if (service?.promotion?.id === promotion?.id) {
        delete service.promotion;
      } else {
        service.promotion = promotion;
      }
      return {
        ...state,
        // chooseServiceList: [...action.payload],
      };
    case DELETE_CHOOSE_SERVICE:
      // localStorage.removeItem("choose-service");
      return {
        ...state,
        chooseServiceList: [],
      };
    case SET_CART_BY_CATEGORY:
      category = action.payload.category;
      data = action.payload.data;
      return {
        ...state,
        cart: { ...state.cart, [categories[category]]: data },
      };

    case ADD_CART:
      category = action.payload.category;
      post = action.payload.post;
      service = action.payload.service;
      findPost = state.cart[categories[Number(category)]].find(
        (item) => item?.id === post?.id
      );
      let newPost = [];
      if (findPost) {
        if (
          !findPost?.Services?.some(
            (item) => (item?.Id || item?.id) === service?.id
          )
        ) {
          findPost?.Services.push({ ...service, ...post });
        } else {
          const newServices = findPost?.Services.map((item) => {
            if (item?.id === service?.id) {
              return { ...service, ...post };
            }
            return item;
          });
          findPost.Services = newServices;
        }
      } else {
        newPost = [
          {
            id: post?.id,
            Name: post?.Name,
            Services: [{ ...service, ...post }],
          },
        ];
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          [categories[Number(category)]]: [
            ...state.cart[categories[category]].map((item) => {
              if ((item?.id || item?.Id) === 1) {
                return findPost;
              }
              return item;
            }),
            ...newPost,
          ],
        },
      };

    case REMOVE_SERVICE_FROM_CART:
      return;

    case UPDATE_CART:
      return;

    case DELETE_CART:
      const orderKey = Object.keys(state.cart);
      return {
        ...state,
        cart: orderKey.reduce((obj, key) => ({ [key]: [], ...obj }), {}),
      };

    default:
      return state;
  }
};
