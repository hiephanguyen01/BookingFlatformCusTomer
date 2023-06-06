import { BaseService } from "./baseService";

class ShopService extends BaseService {
  getShopDetail = (id, category) => {
    return this.get(`/api/shop/${id}?category=${category}`);
  };
}

export const shopService = new ShopService();
