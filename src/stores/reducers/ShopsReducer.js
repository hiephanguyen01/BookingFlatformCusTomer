import {
  GET_DETAIL_SHOP_CLOTHES,
  GET_DETAIL_SHOP_DEVICE,
} from "../types/ShopType";

const initialState = {
  clothesShop: {},
  deviceShop: {},
};

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_SHOP_CLOTHES:
      return { ...state, clothesShop: action.data };
    case GET_DETAIL_SHOP_DEVICE:
      return { ...state, deviceShop: action.data };

    default:
      return state;
  }
};
