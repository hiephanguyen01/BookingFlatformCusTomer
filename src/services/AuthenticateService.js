import { BaseService } from "./baseService";

class AuthenticateService extends BaseService {
  authenticate = (data) => {
    return this.post(`/api/booking-user`, data);
  };
  loginByPhoneNumber = (data) => {
    return this.post(`/api/booking-user/login`, data);
  };
  me = () => {
    return this.get(`/api/booking-user/me`);
  };
  updateData = (data) => {
    return this.patch(`/api/booking-user`, data);
  };
}

export const authenticateService = new AuthenticateService();
