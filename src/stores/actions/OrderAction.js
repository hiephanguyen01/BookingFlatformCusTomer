import { orderService } from "../../services/OrderService";
import {
  LOADING,
  SET_CHOOSE_SERVICE,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_CHOOSE_SERVICE,
  DELETE_CHOOSE_SERVICE,
} from "../types/OrderType";

export const getAllOrder = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    // const { data } = await orderService.getAllOrder();
    // dispatch({ type: SET_POST_LIST, payload: data.data });
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: LOADING, payload: false });
};

export const getAllOrderByUserId = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    // const { data } = await orderService.getAllOrderByUserId();
    // dispatch({ type: SET_POST_LIST, payload: data.data });
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: LOADING, payload: false });
};

export const getTotalOrder = async (id, category) => {
  try {
    const { data } = await orderService.getTotalOrderOfStudio(id, category);
    console.log(data.payload.count);
    return data.payload.count;
  } catch (err) {
    console.error(err);
  }
};

export const chooseServiceAction = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: SET_CHOOSE_SERVICE, payload: data });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: LOADING, payload: false });
};

export const deleteChooseServiceAction = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: DELETE_CHOOSE_SERVICE });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: LOADING, payload: false });
};

export const updateServiceListAction = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: UPDATE_CHOOSE_SERVICE, payload: data });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: LOADING, payload: false });
};

export const deleteOrder = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: DELETE_ORDER });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: LOADING, payload: false });
};

export const addOrder = (category, data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    switch (Number(category)) {
      case 1:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "studio", data: [...data] },
        });
        break;
      case 2:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "photographer", data: [...data] },
        });
        break;
      case 3:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "clothes", data: [...data] },
        });
        break;
      case 4:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "makeup", data: [...data] },
        });
        break;
      case 5:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "model", data: [...data] },
        });
        break;
      case 6:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "device", data: [...data] },
        });
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: LOADING, payload: false });
};

export const updateOrder = (category, data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    switch (Number(category)) {
      case 1:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "studio", data: [...data] },
        });
        break;
      case 2:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "photographer", data: [...data] },
        });
        break;
      case 3:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "clothes", data: [...data] },
        });
        break;
      case 4:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "makeup", data: [...data] },
        });
        break;
      case 5:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "model", data: [...data] },
        });
        break;
      case 6:
        dispatch({
          type: ADD_ORDER,
          payload: { category: "device", data: [...data] },
        });
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: LOADING, payload: false });
};
