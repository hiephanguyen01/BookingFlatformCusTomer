import {
  GET_LIST_POST,
  GET_DETAIL_POST,
  GET_PAGINATE_POSIBILITY,
  GET_SEARCH_LIST_POST,
} from "../types/PostDaoType";
import { postDaoService } from "../../services/PostDaoService";

export const getAllPostDaoAction = (totalpage) => {
  return async (dispatch) => {
    try {
      let limit = Math.ceil(totalpage / 2);
      const data1 = await postDaoService.getAllPost(limit, 1);
      const data2 = await postDaoService.getAllPost(limit, 2);
      let temp = [...data1.data.data, ...data2.data.data];
      dispatch({
        type: GET_SEARCH_LIST_POST,
        data: temp,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPostDaoAction = (currentListPost, limit, page) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllPost(limit, page);
      let temp = [...currentListPost, ...data.data];
      dispatch({
        type: GET_LIST_POST,
        data: temp,
      });
      dispatch({
        type: GET_PAGINATE_POSIBILITY,
        data: data.pagination,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const getPostDaoByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getPostById(id);
      dispatch({ type: GET_DETAIL_POST, data: data.data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const updatePostDaoAction = (id, form) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.updatePost(id, form);
      dispatch({ type: GET_LIST_POST, data: data.data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const deletePostDaoAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.deletePost(id);
      dispatch({ type: GET_LIST_POST, data: data.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const likePost = (userId, postId) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.createLike({
        PostId: postId,
        UserId: userId,
      });
      dispatch({ type: "GET_LIKE", data: data.data });
    } catch (err) {
      console.error(err);
    }
  };
};
