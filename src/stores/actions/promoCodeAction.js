import {
  GET_ALL_PROMO_CODE,
  GET_PAGINATE_POSSIBILITY,
  GET_PROMO_BY_STUDIO_POST,
  SET_STUDIO_POST_ID,
  SET_PROMOTION_CODE_USER_SAVE,
  SET_CHOOSE_PROMOTION_USER,
  SAVE_PROMOTION,
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

export const getPromotionCodeUserSave = () => {
  return async (dispatch) => {
    try {
      const { data } = await promoCodeService.getPromoCodeUserSave();
      dispatch({
        type: SET_PROMOTION_CODE_USER_SAVE,
        data: data.data.reduce((arr, item) => {
          if (item.PromoteCodeId === undefined) {
            return [...arr, item];
          }
          return [...arr, item.SaleCode];
        }, []),
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setChoosePromotionUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CHOOSE_PROMOTION_USER,
        data: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const savePromotion = (promoCodeId) => {
  return async (dispatch) => {
    try {
      const { data } = await promoCodeService.savePromotion({
        PromoteCodeId: promoCodeId,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const cancelSavePromotion = (promoCodeId) => {
  return async (dispatch) => {
    try {
      const { data } = await promoCodeService.cancelSavePromotion(promoCodeId);
    } catch (error) {
      console.error(error);
    }
  };
};
