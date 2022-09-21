import {
  GET_ALL_PROMO_CODE,
  GET_PAGINATE_POSSIBILITY,
  GET_PROMO_BY_STUDIO_POST,
  SET_STUDIO_POST_ID,
} from "../types/promoCodeType";
import { promoCodeService } from "../../services/PromoCodeService";

export const getAllPromoCodeAction = (currentListPost, filter) => {
  return async (dispatch) => {
    try {
      const { data } = await promoCodeService.getAllPromoCode(
        filter.limit,
        filter.page
      );
      let temp = [...currentListPost, ...data.data];
      dispatch({
        type: GET_ALL_PROMO_CODE,
        data: temp,
      });
      dispatch({
        type: GET_PAGINATE_POSSIBILITY,
        data: data.pagination,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPromoCodeByStudioPostAction = (studioPostId) => {
  return async (dispatch) => {
    try {
      const { data } = await promoCodeService.getPromoCodeByStudioPost(
        studioPostId
      );
      dispatch({ type: GET_PROMO_BY_STUDIO_POST, data: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setStudioPostIdAction = (studioPostId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_STUDIO_POST_ID, data: studioPostId });
    } catch (error) {
      console.error(error);
    }
  };
};
