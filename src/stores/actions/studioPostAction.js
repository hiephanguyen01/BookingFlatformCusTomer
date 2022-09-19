import { studioPostService } from "../../services/StudioPostService";
import {
  LOADING,
  SET_POST_LIST,
  SET_POST_PAGINATION,
  SET_STUDIO_DETAIL,
  SET_STUDIO_NEAR,
} from "../types/studioPostType";

export const getAllStudioPost = (limit, page, category) => async (dispatch) => {
  console.log(limit, page, category);
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await studioPostService.getAllStudioPost(
      limit,
      page,
      category
    );
    console.log("lítđâtts", data);
    dispatch({ type: SET_POST_LIST, payload: data.data });
    dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: LOADING, payload: false });
};
export const getFilterdStudioPost =
  (limit, page, filter) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const { data } = await studioPostService.getFilterStudioPost(
        limit,
        page,
        filter
      );
      dispatch({ type: SET_POST_LIST, payload: data.data });
      dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: LOADING, payload: false });
  };

export const studioDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getDetailStudio(id);
      dispatch({ type: SET_STUDIO_DETAIL, payload: data.data });
      dispatch(studioNearAction(data.data.Latitude, data.data.Longtitude));
    } catch (error) {
      console.log(error);
    }
  };
};
export const studioNearAction = (lat, lng) => async (dispatch) => {
  try {
    const { data } = await studioPostService.getStudioNear(lat, lng);
    dispatch({ type: SET_STUDIO_NEAR, payload: data });
  } catch (error) {
    console.log(error);
  }
};
