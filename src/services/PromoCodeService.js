import { BaseService } from "./baseService";

class PromoCodeService extends BaseService {
  getAllPromoCode = (limit, page) => {
    return this.get(`/api/promoCode?limit=${limit}&page=${page}`);
  };
  getPromoCodeById = (id) => {
    return this.get(`/api/promoCode/${id}`);
  };
  getPromoCodeByStudioPost = (studioPostId) => {
    return this.get(`/api/promoCode/studio?StudioPostId=${studioPostId}`);
  };
}

export const promoCodeService = new PromoCodeService();
