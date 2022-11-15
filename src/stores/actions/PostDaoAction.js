import {
  GET_LIST_POST,
  GET_DETAIL_POST,
  GET_PAGINATE_POSIBILITY,
  GET_ALL_DEFAULT_CMT,
  SET_RELATED_SERVICE,
} from "../types/PostDaoType";
import { postDaoService } from "../../services/PostDaoService";

export const getAllPostDaoAction = (currentListPost = [], filter) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllPost(
        filter?.limit,
        filter?.page,
        filter?.tags.join(",")
      );
      // if (filter.page === 1) {
      //   let temp = [...data.data];
      //   dispatch({
      //     type: GET_LIST_POST,
      //     data: temp,
      //   });
      // } else {
      //   let temp = [...currentListPost, ...data.data];
      //   dispatch({
      //     type: GET_LIST_POST,
      //     data: temp,
      //   });
      // }
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
      console.log(error);
    }
  };
};
export const getPostDaoAction = (currentListPost = [], limit, page) => {
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
      console.log(error);
    }
  };
};
export const getPostDaoByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getPostById(id);
      dispatch({ type: GET_DETAIL_POST, data: data });
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

export const getLikePostList = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getLike(userId);
      dispatch({ type: "GET_LIKE_POST_LIST", data: data.data });
    } catch (err) {
      console.error(err);
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
      const res = await postDaoService.getLike(userId);
      dispatch({ type: "GET_LIKE_POST_LIST", data: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllDefaultComments = () => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllDefaultComments();
      dispatch({ type: GET_ALL_DEFAULT_CMT, data: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setRelatedService = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_RELATED_SERVICE, data: data });
    } catch (err) {
      console.log(err);
    }
  };
};
