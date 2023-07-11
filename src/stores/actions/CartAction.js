import { message } from "antd";
import { cartService } from "../../services/CartService";
import { orderService } from "../../services/OrderService";
import {
  SET_CHOOSE_SERVICE_LIST,
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
    dispatch({ type: SET_CHOOSE_SERVICE_LIST, payload: data });
    dispatch({ type: "SET_TIME_ORDER", data: [] });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const getCartItemCheckout = (cartItems) => async (dispatch) => {
  try {
    const res = await cartService.getCartItemCheckout(cartItems);
    dispatch({ type: SET_CHOOSE_SERVICE_LIST, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const addServiceList = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_CHOOSE_SERVICE_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const addServiceToList = (service) => async (dispatch) => {
  try {
    const res = await orderService.checkOrderTimeExits({
      OrderByTime: service?.OrderByTime,
      OrderByTimeFrom: service?.OrderByTimeFrom,
      OrderByTimeTo: service?.OrderByTimeTo,
      OrderByDateFrom: service?.OrderByDateFrom,
      OrderByDateTo: service?.OrderByDateTo,
      ServiceId: service?.StudioRoom?.Id,
      Category: service?.Category,
    });
    const checkTime = res?.data?.success;
    if (!checkTime) {
      dispatch({ type: ADD_SERVICE_TO_LIST, payload: { service: service } });
      // setChooseServices(service);
    } else {
      message.warning("Đã có người đặt trong khoảng thời gian này rồi!");
    }
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
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
  try {
    const res = await cartService.getCartItemByCategory(category);
    dispatch({
      type: SET_CART_BY_CATEGORY,
      payload: { category, data: res.data.data },
    });
  } catch (error) {
    console.error(error);
  }
};

export const addCart = (category, post, service) => async (dispatch) => {
  try {
    await cartService.addToCart({
      category,
      CategoryPostId: post?.id,
      serviceId: service?.id,
      OrderByTime: service?.OrderByTime,
      OrderByTimeFrom: service?.OrderByTimeFrom,
      OrderByTimeTo: service?.OrderByTimeTo,
      OrderByDateFrom: service?.OrderByDateFrom,
      OrderByDateTo: service?.OrderByDateTo,
    });
    dispatch({
      type: ADD_CART,
      payload: { category, post, service },
    });
  } catch (error) {
    console.error(error);
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
