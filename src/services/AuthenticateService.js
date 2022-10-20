import { BaseService } from "./baseService";

class AuthenticateService extends BaseService {
  authenticate = (data) => {
    return this.post(`/api/booking-user`, data);
  };
  loginByPhoneNumber = (data) => {
    return this.post(`/api/booking-user/login`, data);
  };
  socialAccountLink = (data) => {
    return this.post(`/api/booking-user/social-account-link`, data);
  };
  cancelSocialAccountLink = (data) => {
    return this.post(`/api/booking-user/cancel-social-account-link`, data);
  };
  me = () => {
    return this.get(`/api/booking-user/me`);
  };
  updateData = (data) => {
    return this.patch(`/api/booking-user`, data);
  };
}

export const authenticateService = new AuthenticateService();
