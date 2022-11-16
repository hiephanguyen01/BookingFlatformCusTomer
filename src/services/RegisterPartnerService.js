import { BaseService } from "./baseService";

class RegisterPartnerService extends BaseService {
  getPartnerById = (id) => {
    return this.get(`/api/register-partner/${id}`);
  };
}

export const registerPartnerService = new RegisterPartnerService();
