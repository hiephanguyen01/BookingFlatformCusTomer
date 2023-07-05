import { topOrderCategory } from "../../services/Top10OrderCategory";
import {
  SET_TOP_CLOTHES_POST,
  SET_TOP_DEVICE_POST,
  SET_TOP_MAKEUP_POST,
  SET_TOP_MODEL_POST,
  SET_TOP_ORDER_STUDIO_POST,
  SET_TOP_PHOTOGRAPHER_POST,
} from "../types/TopOrderCategoryPostType";

export const getTop10OrderStudioPostAction = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "studio-post"
      );
      dispatch({ type: SET_TOP_ORDER_STUDIO_POST, data });
    } catch (error) {}
  };
};
export const getTop10OrderModelAction = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "model"
      );
      dispatch({ type: SET_TOP_MODEL_POST, data });
    } catch (error) {}
  };
};
export const getTop10OrderClothesAction = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "clothes"
      );
      dispatch({ type: SET_TOP_CLOTHES_POST, data });
    } catch (error) {}
  };
};
export const getTop10OrderDeviceAction = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "device"
      );
      dispatch({ type: SET_TOP_DEVICE_POST, data });
    } catch (error) {}
  };
};
export const getTop10OrderMakeupAction = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "makeup"
      );
      dispatch({ type: SET_TOP_MAKEUP_POST, data: data });
    } catch (error) {}
  };
};
export const getTop10OrderPhotographerAction = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "photographer"
      );
      dispatch({ type: SET_TOP_PHOTOGRAPHER_POST, data: data });
    } catch (error) {}
  };
};
