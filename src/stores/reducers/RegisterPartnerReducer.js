const initialState = {
  partnerDetail: {},
};
export const registerPartnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PARTNER_DETAIL":
      return {
        ...state,
        partnerDetail: action.payload,
      };
    default:
      return state;
  }
};
