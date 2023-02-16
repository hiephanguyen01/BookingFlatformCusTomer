import { BaseService } from "./baseService";

class VisitService extends BaseService {
  count = () => {
    return this.get(`/api/count-visitor/count`);
  };

  affiliateAccessCount = (data) => {
    return this.post(`/api/affiliate-connect`, data);
  };
}

export const visitService = new VisitService();
