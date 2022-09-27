import { studioPostService } from "../../services/StudioPostService";
import {
  LOADING,
  SET_FILTER,
  SET_POST_LIST,
  SET_POST_PAGINATION,
  SET_STUDIO_DETAIL,
  SET_STUDIO_DETAIL1,
  SET_STUDIO_NEAR,
} from "../types/studioPostType";

export const getAllStudioPost = (limit, page, category) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await studioPostService.getAllStudioPost(
      limit,
      page,
      category
    );
    dispatch({ type: SET_POST_LIST, payload: data.data });
    dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: LOADING, payload: false });
};
export const getFilterStudioPost =
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
      dispatch({ type: SET_FILTER, payload: filter });
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: LOADING, payload: false });
  };

export const studioDetailAction = (id, category) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const { data } = await studioPostService.getDetailStudio(id, category);
      console.log(data);
      dispatch({
        type: SET_STUDIO_DETAIL,
        payload: {
          data: data.data,
          service: data.service,
          album: data.album,
          shop: data.shop,
          rating: data.rating,
        },
      });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: LOADING, payload: false });
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

export const studioDetailAction1 = (id, category) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const { data } = await studioPostService.getDetailStudio(id, category);
      console.log(data);
      dispatch({ type: SET_STUDIO_DETAIL1, payload: data.data });
      dispatch(studioNearAction(data.data.Latitude, data.data.Longtitude));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: LOADING, payload: false });
  };
};

export const getLikeStudioPostAction = (postId, category, setLike, like) => {
  return async (dispatch) => {
    try {
      await studioPostService.getLikeStudioPost({
        PostId: postId,
        CategoryId: category,
      });
      setLike(!like);
      dispatch(getAllStudioLikedAction1(category));
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction6 = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked({
        CategoryId: category,
      });
      console.log(data);
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction5 = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked({
        CategoryId: category,
      });
      console.log(data);
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction4 = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked({
        CategoryId: category,
      });
      console.log(data);
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllStudioLikedAction1 = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked({
        CategoryId: category,
      });
      console.log(data);
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllStudioLikedAction2 = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked({
        CategoryId: category,
      });
      console.log(data);
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction3 = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked({
        CategoryId: category,
      });
      console.log(data);
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
