import { userService } from "../../services/UserService";
import {
  CANCEL_SAVED_POST,
  SET_LOADING,
  SET_SAVED_POST_LIST,
} from "../types/userTypes";

export const getSavedPostList = (limit, page, userId) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const { data } = await userService.getSavedPostList(userId, page, limit);
    dispatch({
      type: SET_SAVED_POST_LIST,
      payload: data.data.map((val) => val.savedPost),
    });
    // dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const getListPosts = (limit, page) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const { data } = await userService.getListPosts(page, limit);
    dispatch({
      type: SET_SAVED_POST_LIST,
      payload: data.data,
    });
    // dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const cancelSavePost = (userId, postId) => async (dispatch) => {
  try {
    await userService.cancelSavePost(userId, postId);
    dispatch({
      type: CANCEL_SAVED_POST,
      payload: { userId, postId },
    });
    // dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
  } catch (error) {
    console.error(error);
  }
};
