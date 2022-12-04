import toastMessage from "../../components/ToastMessage";
import { userService } from "../../services/UserService";
import {
  CANCEL_SAVED_POST,
  SET_LOADING,
  SET_SAVED_POST_LIST,
} from "../types/userTypes";

export const getSavedPostList =
  (limit, page, userId, setLoading = () => {}) =>
  async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const { data } = await userService.getSavedPostList(userId, page, limit);
      dispatch({
        type: SET_SAVED_POST_LIST,
        payload: data.data,
      });
      // dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

export const getListPosts =
  (setLoading = () => {}) =>
  async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const { data } = await userService.getListPosts();
      dispatch({
        type: SET_SAVED_POST_LIST,
        payload: data.data,
      });
      setLoading(false);
      // dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

export const cancelSavePost = (userId, postId) => async (dispatch) => {
  try {
    await userService.cancelSavePost(userId, postId);
    dispatch(getSavedPostList(19, 1, userId));
    toastMessage("Hủy lưu bài viết thành công!", "success");
    // dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
  } catch (error) {
    console.error(error);
  }
};
