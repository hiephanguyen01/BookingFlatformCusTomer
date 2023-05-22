import { BaseService } from "./baseService";

class RegisterPartnerService extends BaseService {
  getPartnerById = (id) => {
    return this.get(`/api/register-partner/${id}`);
  };
  getPartnerByTenantId = (tenantId) => {
    return this.get(`/api/register-partner/byTenant/${tenantId}`);
  };
  searchForRegisterPartner = (keyword = null) => {
    return this.get(`/api/register-partner/search/${keyword}`);
  };
}

export const registerPartnerService = new RegisterPartnerService();
