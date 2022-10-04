const initialState = {
  orderStatus: [],
};

export const OrderStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDER_STATUS_BY_ID":
      return {
        ...state,
        orderStatus: action.payload,
      };
    default:
      return state;
  }
};
