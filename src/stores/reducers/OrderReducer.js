import moment from "moment";
import {
  LOADING,
  SET_CHOOSE_SERVICE_LIST,
  DELETE_CHOOSE_SERVICE,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  REMOVE_SERVICE_FROM_ORDER,
} from "../types/OrderType";
import { categories } from "../../utils/category";

const initialState = {
  loading: false,
  chooseServiceList: [],
  order: JSON.parse(localStorage.getItem("cart")) || {
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
    clothes: [
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
            Id: 1,
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
            Id: 1,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 0,
            OrderByDateFrom: moment(),
            OrderByDateTo: moment(),
            Price: 500000,
          },
        ],
      },
    ],
    makeup: [
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
            Id: 1,
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
            Id: 1,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 0,
            OrderByDateFrom: moment(),
            OrderByDateTo: moment(),
            Price: 500000,
          },
        ],
      },
    ],
    device: [
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
            Id: 1,
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
            Id: 1,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 0,
            OrderByDateFrom: moment(),
            OrderByDateTo: moment(),
            Price: 500000,
          },
        ],
      },
    ],
    model: [
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
            Id: 1,
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
            Id: 1,
            Name: "Premium Wisteria - phong cách tối giản",
            OrderByTime: 0,
            OrderByDateFrom: moment(),
            OrderByDateTo: moment(),
            Price: 500000,
          },
        ],
      },
    ],
  },
};

export const OrderReducer = (state = initialState, action) => {
  let category, post, service, findPost;
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_CHOOSE_SERVICE_LIST:
      // localStorage.setItem("choose-service", JSON.stringify(action.payload));

      return {
        ...state,
        chooseServiceList: action.payload,
      };
    // case UPDATE_CHOOSE_SERVICE:
    //   localStorage.setItem(
    //     "choose-service",
    //     JSON.stringify([...action.payload])
    //   );
    //   return {
    //     ...state,
    //     chooseServiceList: [...action.payload],
    //   };
    case DELETE_CHOOSE_SERVICE:
      // localStorage.removeItem("choose-service");
      return {
        ...state,
        chooseServiceList: [],
      };
    case ADD_ORDER:
      category = action.payload.category;
      post = action.payload.post;
      service = action.payload.service;
      findPost = state.order[categories[Number(category)]].find(
        (item) => item?.id === post?.id
      );
      let newPost = [];
      if (findPost) {
        if (
          !findPost?.Services?.some(
            (item) => (item?.Id || item?.id) === service?.id
          )
        ) {
          findPost?.Services.push(service);
        } else {
          const newServices = findPost?.Services.map((item) => {
            if (item?.id === service?.id) {
              return service;
            }
            return item;
          });
          findPost.Services = newServices;
        }
      } else {
        newPost = [{ id: post?.id, Name: post?.Name, Services: [service] }];
      }

      return {
        ...state,
        order: {
          ...state.order,
          [categories[Number(category)]]: [
            ...state.order[categories[category]].map((item) => {
              if ((item?.id || item?.Id) === 1) {
                return findPost;
              }
              return item;
            }),
            ...newPost,
          ],
        },
      };

    // case REMOVE_SERVICE_FROM_ORDER:
    //   category = action.payload.category;
    //   post = action.payload.post;
    //   service = action.payload.service;
    //   findPost = state.order[categories[Number(category)]].find(
    //     (item) => item?.id === post?.id
    //   );
    //   let newPost = [];
    //   if (findPost) {
    //     if (
    //       !findPost?.Services?.some(
    //         (item) => (item?.Id || item?.id) === service?.id
    //       )
    //     ) {
    //       findPost?.Services.push(service);
    //     } else {
    //       const newServices = findPost?.Services.map((item) => {
    //         if (item?.id === service?.id) {
    //           return service;
    //         }
    //         return item;
    //       });
    //       findPost.Services = newServices;
    //     }
    //   } else {
    //     newPost = [{ id: post?.id, Name: post?.Name, Services: [service] }];
    //   }

    //   return {
    //     ...state,
    //     order: {
    //       ...state.order,
    //       [categories[Number(category)]]: [
    //         ...state.order[categories[category]].map((item) => {
    //           if ((item?.id || item?.Id) === 1) {
    //             return findPost;
    //           }
    //           return item;
    //         }),
    //         ...newPost,
    //       ],
    //     },
    //   };

    case UPDATE_ORDER:
      return;

    case DELETE_ORDER:
      const orderKey = Object.keys(state.order);
      return {
        ...state,
        order: orderKey.reduce((obj, key) => ({ [key]: [], ...obj }), {}),
      };

    default:
      return state;
  }
};
