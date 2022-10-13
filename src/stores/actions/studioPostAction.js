import { studioPostService } from "../../services/StudioPostService";
import { userService } from "../../services/UserService";
import {
  LOADING,
  SET_PROMOTION_CODE,
  SET_FILTER,
  SET_LIST_LIKED_CATEGORY,
  SET_POST_LIST,
  SET_POST_PAGINATION,
  SET_STUDIO_DETAIL,
  SET_STUDIO_DETAIL1,
  SET_STUDIO_NEAR,
  SET_STUDIO_SIMILAR,
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
  (limit, page, filter, user) => async (dispatch) => {
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
      if (user !== null) {
        dispatch(getAllStudioLikedAction1(filter.category));
      }
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: LOADING, payload: false });
  };

export const studioDetailAction = (id, category, currentUser) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const { data } = await studioPostService.getDetailStudio(
        id,
        category,
        currentUser
      );
      if (category == 1) {
        dispatch(
          studioNearAction(id, data.data.Latitude, data.data.Longtitude)
        );
      }
      if (currentUser) {
        await userService.setRecentViews(id, category);
        dispatch(getAllStudioLikedAction1(category));
      }
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
export const studioNearAction = (id, lat, lng) => async (dispatch) => {
  try {
    const { data } = await studioPostService.getStudioNear(id, lat, lng);
    dispatch({ type: SET_STUDIO_NEAR, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getStudioSimilarAction = (id, cate) => async (dispatch) => {
  try {
    const { data } = await studioPostService.getStudioSimilar(id, cate);
    console.log("similar", data);
    dispatch({ type: SET_STUDIO_SIMILAR, data: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const studioDetailAction1 = (id, category) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const { data } = await studioPostService.getDetailStudio(id, category);

      dispatch({ type: SET_STUDIO_DETAIL1, payload: data.data });
      dispatch(studioNearAction(data.data.Latitude, data.data.Longtitude));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: LOADING, payload: false });
  };
};

export const getLikeStudioPostAction = (postId, category, currentUser = "") => {
  return async (dispatch) => {
    try {
      await studioPostService.getLikeStudioPost({
        PostId: postId,
        CategoryId: category,
      });
      dispatch(getAllStudioLikedAction1(category));
      dispatch(getAllStudioLikedAction(category));
      if (currentUser) {
        dispatch(studioDetailAction(postId, category, currentUser));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction6 = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(
        {
          CategoryId: category,
        },
        sort
      );

      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction5 = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(
        {
          CategoryId: category,
        },
        sort
      );

      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction4 = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(
        {
          CategoryId: category,
        },
        sort
      );

      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllStudioLikedAction1 = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(
        {
          CategoryId: category,
        },
        sort
      );
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllStudioLikedAction = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(
        {
          CategoryId: category,
        },
        sort
      );
      dispatch({
        type: SET_LIST_LIKED_CATEGORY,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllStudioLikedAction2 = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(
        {
          CategoryId: Number(category),
        },
        sort
      );

      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllStudioLikedAction3 = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(
        {
          CategoryId: category,
        },
        sort
      );
      dispatch({
        type: `SET_LIST_LIKED_CATEGORY_${category}`,
        data: data.Posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPromotionByTenantId = (tenantId) => async (dispatch) => {
  try {
    const { data } = await studioPostService.getPromotionByTenantId(tenantId);
    dispatch({
      type: SET_PROMOTION_CODE,
      data: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
