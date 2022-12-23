import { BaseService } from "./baseService";

class VisitService extends BaseService {
  count = () => {
    return this.get(`/api/count-visitor/count`);
  };
}

export const visitService = new VisitService();
