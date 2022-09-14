import {
  GET_ALL_PROMO_CODE,
  GET_PROMO_BY_STUDIO_POST,
  GET_PAGINATE_POSIBILITY,
  SET_STUDIO_POST_ID,
} from "../types/promoCodeType";

const initialState = {
  studioPostId: -1,
  promoCodeByStudio: [],
  promoCodeList: [],
  pagination: {},
};

export const promoCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROMO_CODE:
      return { ...state, promoCodeList: action.data };
    case GET_PROMO_BY_STUDIO_POST:
      return { ...state, promoCodeByStudio: action.data };
    case GET_PAGINATE_POSIBILITY:
      return { ...state, pagination: action.data };
    case SET_STUDIO_POST_ID:
      return { ...state, studioPostId: action.data };
    default:
      return state;
  }
};
