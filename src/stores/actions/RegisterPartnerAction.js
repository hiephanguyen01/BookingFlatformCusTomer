import { registerPartnerService } from "../../services/RegisterPartnerService";

export const getPartnerDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await registerPartnerService.getPartnerById(id);
      dispatch({ type: "SET_PARTNER_DETAIL", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
};
