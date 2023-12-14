import { studioPostService } from "../../services/StudioPostService";
import queryString from "query-string";
import { userService } from "../../services/UserService";
import {
  LOADING,
  LOADING_SERVICE,
  SET_FILTER,
  SET_CHOOSE_SERVICE,
  SET_LIST_LIKED_CATEGORY,
  SET_POST_LIST,
  SET_POST_PAGINATION,
  SET_PROMOTION_CODE,
  SET_STUDIO_DETAIL,
  SET_STUDIO_DETAIL1,
  SET_STUDIO_NEAR,
  SET_STUDIO_SIMILAR,
} from "../types/studioPostType";
import {
  DELETE_CHOOSE_SERVICE,
  DEFINE_SERVICES_TO_LIST,
} from "../types/CartType";
import moment from "moment";
import toastMessage from "../../components/ToastMessage";
import { addCart } from "./CartAction";

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
  (limit, page, filter, currentUser, navigate, setVisible = () => {}) =>
  async (dispatch) => {
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
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction1(filter.category));
      }
      setVisible(false);

      navigate(
        `/home/filter?${queryString.stringify(
          Object.keys(filter)?.reduce(
            (newFilter, key) =>
              filter[key] === "" || filter[key] === undefined
                ? { ...newFilter }
                : { ...newFilter, [key]: filter[key] },
            {}
          )
        )}`
      );
    } catch (error) {}
    dispatch({ type: LOADING, payload: false });
  };

export const getFilterStudioPostMobile =
  (limit, page, filter, currentUser, navigate, setVisible = () => {}) =>
  async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const { data } = await studioPostService.getFilterStudioPostMobile(
        limit,
        page,
        filter
      );
      dispatch({ type: SET_POST_LIST, payload: data.data });
      dispatch({ type: SET_POST_PAGINATION, payload: data.pagination });
      dispatch({ type: SET_FILTER, payload: filter });
      if (currentUser !== null) {
        dispatch(getAllStudioLikedAction1(filter.category));
      }
      setVisible(false);
      navigate(
        `/home/filter?${queryString.stringify(
          Object.keys(filter)?.reduce(
            (newFilter, key) =>
              filter[key] === "" || filter[key] === undefined
                ? { ...newFilter }
                : { ...newFilter, [key]: filter[key] },
            {}
          )
        )}`
      );
    } catch (error) {}
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
      if (category === 1) {
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
    } catch (error) {}
    dispatch({ type: LOADING, payload: false });
  };
};
export const studioNearAction = (id, lat, lng) => async (dispatch) => {
  try {
    const { data } = await studioPostService.getStudioNear(id, lat, lng);
    dispatch({ type: SET_STUDIO_NEAR, payload: data });
  } catch (error) {}
};
export const getStudioSimilarAction = (id, cate) => async (dispatch) => {
  try {
    const { data } = await studioPostService.getStudioSimilar(id, cate);
    dispatch({ type: SET_STUDIO_SIMILAR, data: data.data });
  } catch (error) {}
};

export const studioDetailAction1 = (id, category) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const { data } = await studioPostService.getDetailStudio(id, category);

      dispatch({ type: SET_STUDIO_DETAIL1, payload: data.data });
      dispatch(studioNearAction(data.data.Latitude, data.data.Longtitude));
    } catch (error) {}
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
      // dispatch(getAllStudioLikedAction1(category));
      // dispatch(getAllStudioLikedAction(category));
      if (currentUser) {
        dispatch(studioDetailAction(postId, category, currentUser));
      }
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
  };
};

export const getAllStudioLikedAction = (category, sort = "") => {
  return async (dispatch) => {
    try {
      const { data } = await studioPostService.getAllStudioLiked(sort);
      dispatch({
        type: SET_LIST_LIKED_CATEGORY,
        data: data,
      });
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
  };
};

export const getPromotionByTenantId = (tenantId) => async (dispatch) => {
  try {
    const { data } = await studioPostService.getPromotionByTenantId(tenantId);
    dispatch({
      type: SET_PROMOTION_CODE,
      data: data.data,
    });
  } catch (error) {}
};

export const setFilterStudioService =
  (limit, page, filter) => async (dispatch) => {
    dispatch({ type: LOADING_SERVICE, payload: true });
    try {
      dispatch({ type: SET_POST_PAGINATION, payload: { limit, page } });
      // dispatch({ type: SET_CHOOSE_SERVICE, payload: filter });
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: LOADING_SERVICE, payload: false });
  };

export const handlerSelectServiceAction = (
  data,
  chooseServiceTime,
  call_add_cart_flag = false,
  data_pass_to_add_cart = null
) => {
  return async (dispatch) => {
    try {
      if (chooseServiceTime.OrderByTime === 1) {
        if (
          chooseServiceTime?.disableTimeOrder?.some((item) => {
            return (
              parseInt(item) >=
                parseInt(
                  moment(chooseServiceTime?.OrderByTimeFrom).utc().hour()
                ) &&
              parseInt(item) <=
                parseInt(moment(chooseServiceTime?.OrderByTimeTo).utc().hour())
            );
          })
        ) {
          dispatch({ type: DELETE_CHOOSE_SERVICE });
          return toastMessage(
            "Đã có người đặt trong khoảng thời gian này!",
            "warning"
          );
        }
      } else if (chooseServiceTime.OrderByTime === 0) {
        if (
          chooseServiceTime.disableDate.some(
            (item) =>
              moment(item, "DD-MM-YYYY") >=
                moment(chooseServiceTime?.OrderByDateFrom) &&
              moment(item, "DD-MM-YYYY") <=
                moment(chooseServiceTime?.OrderByDateTo)
          )
        ) {
          dispatch({ type: DELETE_CHOOSE_SERVICE });
          return toastMessage(
            "Đã có người đặt trong khoảng thời gian này!",
            "warning"
          );
        }
      }
      dispatch({
        type: DEFINE_SERVICES_TO_LIST,
        payload: [
          {
            ...chooseServiceTime,
            ...data,
          },
        ],
      });
      dispatch({
        type: SET_CHOOSE_SERVICE,
        payload: {
          ...chooseServiceTime,
          ...data,
        },
      });

      if (call_add_cart_flag) {
        const { category_number, clothes_data, service } =
          data_pass_to_add_cart;
        // const new_service = { ...service, serviceId: data.id };
        dispatch(addCart(category_number, clothes_data, chooseServiceTime));
      }
    } catch (error) {}
  };
};
