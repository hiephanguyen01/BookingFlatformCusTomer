import { orderService } from "../../services/OrderService";

export const getOrderById = async (id, category) => {
  return async (dispatch) => {
    try {
      const data = await orderService.getOrderById(id, category);

      dispatch({ type: "GET_ORDER_STATUS_BY_ID", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
};
