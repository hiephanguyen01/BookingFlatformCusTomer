import {
  LOADING,
  SET_CHOOSE_SERVICE,
  DELETE_CHOOSE_SERVICE,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  UPDATE_CHOOSE_SERVICE,
} from "../types/OrderType";

const initialState = {
  loading: false,
  chooseServiceList: JSON.parse(localStorage.getItem("choose-service")) || [],
  order: JSON.parse(localStorage.getItem("cart")) || {
    studio: [],
    photographer: [],
    device: [],
    clothes: [],
    makeup: [],
    model: [],
  },
};

export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_CHOOSE_SERVICE:
      localStorage.setItem(
        "choose-service",
        JSON.stringify([...action.payload])
      );
      return {
        ...state,
        chooseServiceList: [...action.payload],
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
      localStorage.removeItem("choose-service");
      return {
        ...state,
        chooseServiceList: [],
      };
    case ADD_ORDER:
      const { category, data } = action.payload;
      return {
        ...state,
        order: {
          ...state.order,
          [category]: [...state.order[category], ...data],
        },
      };

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
