import { topOrderCategory } from "../../services/Top10OrderCategory";
import {
  SET_TOP_CLOTHES_POST,
  SET_TOP_DEVICE_POST,
  SET_TOP_MAKEUP_POST,
  SET_TOP_MODEL_POST,
  SET_TOP_ORDER_STUIDO_POST,
  SET_TOP_PHOTOGRAPHER_POST,
} from "../types/TopOrderCategoryPostType";

export const getTop10OrderStudioPostAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "studio-post"
      );
      console.log(data);
      dispatch({ type: SET_TOP_ORDER_STUIDO_POST, data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderModelAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "model"
      );
      console.log(data);
      dispatch({ type: SET_TOP_MODEL_POST, data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderClothesAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "clothes"
      );
      console.log(data);
      dispatch({ type: SET_TOP_CLOTHES_POST, data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderDeviceAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "device"
      );
      console.log(data);
      dispatch({ type: SET_TOP_DEVICE_POST, data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderMakeupAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "makeup"
      );
      console.log(data);
      dispatch({ type: SET_TOP_MAKEUP_POST, data: data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTop10OrderPhotographerAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await topOrderCategory.getTop10OrderCategoryPost(
        "photographer"
      );
      console.log(data);
      dispatch({ type: SET_TOP_PHOTOGRAPHER_POST, data: data });
    } catch (error) {
      console.log(error);
    }
  };
};
