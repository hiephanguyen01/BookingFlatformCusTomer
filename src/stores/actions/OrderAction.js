import { orderService } from "../../services/OrderService";
import { DELETE_CART } from "../types/CartType";

export const getAllOrder = () => async (dispatch) => {
  // dispatch({ type: LOADING, payload: true });
  try {
    // const { data } = await orderService.getAllOrder();
    // dispatch({ type: SET_POST_LIST, payload: data.data });
  } catch (error) {
    console.error(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const getAllOrderByUserId = () => async (dispatch) => {
  // dispatch({ type: LOADING, payload: true });
  try {
    // const { data } = await orderService.getAllOrderByUserId();
    // dispatch({ type: SET_POST_LIST, payload: data.data });
  } catch (error) {
    console.error(error);
  }
  // dispatch({ type: LOADING, payload: false });
};

export const getTotalOrder = async (id, category) => {
  try {
    const { data } = await orderService.getTotalOrderOfStudio(id, category);
    return data.payload.count;
  } catch (err) {
    console.error(err);
  }
};

export const deleteOrder = () => async (dispatch) => {
  // dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: DELETE_CART });
  } catch (error) {
    console.log(error);
  }
  // dispatch({ type: LOADING, payload: false });
};
