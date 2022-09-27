import { topOrderCategory } from "../../services/Top10OrderCategory";
import {
  SET_TOP_CLOTHES_POST,
  SET_TOP_DEVICE_POST,
  SET_TOP_MAKEUP_POST,
  SET_TOP_MODEL_POST,
  SET_TOP_ORDER_STUIDO_POST,
  SET_TOP_PHOTOGRAPHER_POST,
} from "../types/TopOrderCategoryPostType";
import {
  getAllStudioLikedAction1,
  getAllStudioLikedAction2,
  getAllStudioLikedAction3,
  getAllStudioLikedAction4,
  getAllStudioLikedAction5,
  getAllStudioLikedAction6,
} from "./studioPostAction";

export const getTop10OrderStudioPostAction = (category, currentUser) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "studio-post"
      );
      dispatch({ type: SET_TOP_ORDER_STUIDO_POST, data });
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction1(category));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderModelAction = (category, currentUser) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "model"
      );
      dispatch({ type: SET_TOP_MODEL_POST, data });
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction2(category));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderClothesAction = (category, currentUser) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "clothes"
      );
      dispatch({ type: SET_TOP_CLOTHES_POST, data });
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction3(category));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderDeviceAction = (category, currentUser) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "device"
      );
      dispatch({ type: SET_TOP_DEVICE_POST, data });
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction4(category));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderMakeupAction = (category, currentUser) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "makeup"
      );
      dispatch({ type: SET_TOP_MAKEUP_POST, data: data });
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction5(category));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderPhotographerAction = (category, currentUser) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "photographer"
      );
      dispatch({ type: SET_TOP_PHOTOGRAPHER_POST, data: data });
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction6(category));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
