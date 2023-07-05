import { shopService } from "../../services/ShopService";
import { GET_DETAIL_SHOP_CLOTHES } from "../types/ShopType";

export const getDetailShopAction = (id, category) => {
  return async (dispatch) => {
    try {
      const { data } = await shopService.getShopDetail(id, category);
      dispatch({ type: GET_DETAIL_SHOP_CLOTHES, data: data.data });
    } catch (error) {}
  };
};
