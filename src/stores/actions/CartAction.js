import { message } from "antd";
import { cartService } from "../../services/CartService";
import { orderService } from "../../services/OrderService";
import {
  DEFINE_SERVICES_TO_LIST,
  ADD_CART,
  UPDATE_CHOOSE_SERVICE,
  DELETE_CHOOSE_SERVICE,
  REMOVE_SERVICE_FROM_CART,
  SET_CART_BY_CATEGORY,
  ADD_SERVICE_TO_LIST,
} from "../types/CartType";

export const chooseServiceAction = (data) => async (dispatch) => {
  // dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: DEFINE_SERVICES_TO_LIST, payload: data });
    dispatch({ type: "SET_TIME_ORDER", data: [] });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const getCartItemCheckout = (cartItems) => async (dispatch) => {
  try {
    const res = await cartService.getCartItemCheckout(cartItems);
    dispatch({ type: DEFINE_SERVICES_TO_LIST, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const addServiceList = (data) => async (dispatch) => {
  try {
    dispatch({ type: DEFINE_SERVICES_TO_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const addServiceToList = (cartService) => async (dispatch) => {
  try {
    const res = await orderService.checkOrderTimeExits({
      OrderByTime: cartService?.OrderByTime,
      OrderByTimeFrom: cartService?.OrderByTimeFrom,
      OrderByTimeTo: cartService?.OrderByTimeTo,
      OrderByDateFrom: cartService?.OrderByDateFrom,
      OrderByDateTo: cartService?.OrderByDateTo,
      ServiceId: cartService?.StudioRoom?.Id,
      Category: cartService?.Category,
    });
    const checkTime = res?.data?.success;
    cartService["CartItemId"] = cartService["id"];
    if (!checkTime) {
      dispatch({
        type: ADD_SERVICE_TO_LIST,
        payload: { service: cartService },
      });
    } else {
      message.warning("Đã có người đặt trong khoảng thời gian này rồi!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteChooseServiceAction = () => async (dispatch) => {
  // dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: DELETE_CHOOSE_SERVICE });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const updateServiceListAction = (promotion, id) => async (dispatch) => {
  // dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: UPDATE_CHOOSE_SERVICE, payload: { promotion, id } });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const getCartItemByCategory = (category) => async (dispatch) => {
  /**
  * Gets the cart items for the given category.

  * Args:
  *   category: The category of the cart items.

  * Returns:
  *   A promise that resolves to an object containing the cart items for the given category, or rejects with
  *   an error if the cart items could not be retrieved.
  */
  try {
    const res = await cartService.getCartItemByCategory(category);
    if (res.data.data) {
      dispatch({
        type: SET_CART_BY_CATEGORY,
        payload: { category, data: res.data.data },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addCart = (category, post, service) => async (dispatch) => {
  /**
  * Adds an item to the cart.

  * Args:
  *   category: The category of the item.
  *   post: The post object, if the item is a post.
  *   service: The service object, if the item is a service.

  * Returns:
  *   A promise that resolves to an object containing the cart data, or rejects with an error if the item could not be added to the cart.
  */
  try {
    console.log(post);
    let req_body = null;
    switch (category) {
      case 3:
        req_body = {
          category,
          CategoryPostId: post?.id,
          serviceId: service?.id,
          Size: post.size,
          Color: post.color,
          Amount: post.amount,
          OrderByTime: service?.OrderByTime,
          OrderByTimeFrom: service?.OrderByTimeFrom,
          OrderByTimeTo: service?.OrderByTimeTo,
          OrderByDateFrom: service?.OrderByDateFrom,
          OrderByDateTo: service?.OrderByDateTo,
        };
        break;
      case 5:
        req_body = {
          category,
          CategoryPostId: post?.id,
          serviceId: service?.id,
          Amount: post.amount,
          OrderByTime: service?.OrderByTime,
          OrderByTimeFrom: service?.OrderByTimeFrom,
          OrderByTimeTo: service?.OrderByTimeTo,
          OrderByDateFrom: service?.OrderByDateFrom,
          OrderByDateTo: service?.OrderByDateTo,
        };
        break;
      default:
        req_body = {
          category,
          CategoryPostId: post?.id,
          serviceId: service?.id,
          OrderByTime: service?.OrderByTime,
          OrderByTimeFrom: service?.OrderByTimeFrom,
          OrderByTimeTo: service?.OrderByTimeTo,
          OrderByDateFrom: service?.OrderByDateFrom,
          OrderByDateTo: service?.OrderByDateTo,
        };
        break;
    }
    const res = await cartService.addToCart({ ...req_body });

    if (res.data.success) {
      message.success(res.data.message);
      dispatch({
        type: ADD_CART,
        payload: { category, post, service },
      });
    }
  } catch (error) {
    message.warning(error.response.data.message);
  }
};

export const removeServiceFromCart =
  (category, post, serviceId) => async (dispatch) => {
    try {
      dispatch({
        type: REMOVE_SERVICE_FROM_CART,
        payload: { category, post, serviceId },
      });
    } catch (error) {
      console.error(error);
    }
  };

export const updateCart = (category, data) => async (dispatch) => {
  // dispatch({ type: LOADING, payload: true });
  try {
    switch (Number(category)) {
      case 1:
        dispatch({
          type: ADD_CART,
          payload: { category: "studio", data: [...data] },
        });
        break;
      case 2:
        dispatch({
          type: ADD_CART,
          payload: { category: "photographer", data: [...data] },
        });
        break;
      case 3:
        dispatch({
          type: ADD_CART,
          payload: { category: "clothes", data: [...data] },
        });
        break;
      case 4:
        dispatch({
          type: ADD_CART,
          payload: { category: "makeup", data: [...data] },
        });
        break;
      case 5:
        dispatch({
          type: ADD_CART,
          payload: { category: "model", data: [...data] },
        });
        break;
      case 6:
        dispatch({
          type: ADD_CART,
          payload: { category: "device", data: [...data] },
        });
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  // dispatch({ type: LOADING, payload: false });
};
