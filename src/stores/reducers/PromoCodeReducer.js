import {
  GET_ALL_PROMO_CODE,
  GET_PROMO_BY_STUDIO_POST,
  GET_PAGINATE_POSSIBILITY,
  SET_STUDIO_POST_ID,
  SET_PROMOTION_CODE_USER_SAVE,
  SET_CHOOSE_PROMOTION_USER,
} from "../types/promoCodeType";

const initialState = {
  studioPostId: -1,
  promoCodeByStudio: [],
  promoCodeList: [],
  pagination: {},
  promoCodeUserSave: [],
  choosePromotionUser: {},
};

export const promoCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROMO_CODE:
      return { ...state, promoCodeList: action.data };
    case GET_PROMO_BY_STUDIO_POST:
      return { ...state, promoCodeByStudio: action.data };
    case GET_PAGINATE_POSSIBILITY:
      return { ...state, pagination: action.data };
    case SET_STUDIO_POST_ID:
      return { ...state, studioPostId: action.data };
    case SET_PROMOTION_CODE_USER_SAVE:
      return { ...state, promoCodeUserSave: action.data };
    case SET_CHOOSE_PROMOTION_USER:
      return { ...state, choosePromotionUser: action.data };
    default:
      return state;
  }
};
