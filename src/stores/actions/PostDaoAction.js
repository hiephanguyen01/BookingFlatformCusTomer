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
    if (typeof currentListPost === "number") return;
    try {
      const { data } = await postDaoService.getAllPost(
        filter?.limit || 1,
        filter?.page || 1,
        filter?.tags?.join(",") || ""
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
    } catch (error) {}
  };
};
export const getPostDaoAction = (currentListPost = [], limit, page) => {
  return async (dispatch) => {
    if (typeof currentListPost === "number") return;
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
    } catch (error) {}
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
      await postDaoService.updatePost(id, form);
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

// export const likePost = (userId, postId) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await postDaoService.createLike({
//         PostId: postId,
//         UserId: userId,
//       });
//       // dispatch({ type: "GET_LIKE", data: data.data });
//       // const res = await postDaoService.getLike(userId);
//       // dispatch({ type: "GET_LIKE_POST_LIST", data: res.data.data });
//     } catch (err) {
//     }
//   };
// };

export const getAllDefaultComments = () => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllDefaultComments();
      dispatch({ type: GET_ALL_DEFAULT_CMT, data: data });
    } catch (err) {}
  };
};

export const createLikeCommentDao = (data1, id, setComments, pagination) => {
  return async (dispatch) => {
    try {
      await postDaoService.createLikeComment(data1);
      const { data } = await postDaoService.getComments(
        id,
        1,
        5 * pagination?.currentPage
      );
      setComments(data.data);
      // getComments(1);
      // dispatch(getAllDefaultComments);
    } catch (error) {}
  };
};
export const setRelatedService = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_RELATED_SERVICE, data: data });
    } catch (err) {}
  };
};

export const toggleNotificationDaoAction = (data) => {
  return async (dispatch) => {
    try {
      await postDaoService.toggleNotificationDao(data);
      dispatch(getAllNotificationDaoAction());
    } catch (error) {}
  };
};

export const getAllNotificationDaoAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllNotificationDao();
      dispatch({ type: "SET_LIST_NOTIFICATION_USER", data: data.data });
    } catch (error) {}
  };
};
