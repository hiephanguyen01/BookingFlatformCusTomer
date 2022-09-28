import { studioPostService } from "../../services/StudioPostService";
import { userService } from "../../services/UserService";
import {
  SET_LOADING,
  SET_SAVED_POST_LIST,
  CANCEL_SAVED_POST,
} from "../types/userTypes";

export const getSavedPostList = (limit, page, userId) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const { data } = await userService.getSavedPostList(userId, page, limit);
    console.log(data.data.map((val) => val.savedPost));
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

export const cancelSavePost = (userId, postId) => async (dispatch) => {
  try {
    const res = await userService.cancelSavePost(userId, postId);
    dispatch({
      type: CANCEL_SAVED_POST,
      payload: { userId, postId },
    });
    // dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
  } catch (error) {
    console.error(error);
  }
};