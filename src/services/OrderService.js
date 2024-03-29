import { BaseService } from "./baseService";

class OrderService extends BaseService {
  getAllOrder = () => {
    return this.post(``, {});
  };
  getAllOrderByUserId = (params) => {
    return this.get(`/api/booking/personal`, params);
  };
  getOrderStatus = (params) => {
    return this.get(`/api/booking/order-status`, params);
  };
  getOrderById = (id, category) => {
    return this.get(`/api/booking/byid?id=${id}&category=${category}`);
  };
  getOrderByIdentify = (identifyCode, category) => {
    return this.get(
      `/api/booking/byIdentifyCode?identifyCode=${identifyCode}&category=${category}`
    );
  };
  getLatestOrderByUserId = (UserId, PartnerId) =>
    this.get(
      `/api/booking/latestBookingbyUserId?UserId=${UserId}&PartnerId=${PartnerId}`
    );

  addOrder = (data) => {
    return this.post("/api/booking", data);
  };
  updateRefundOrderByid = (data, IdentifyCode, category, token) => {
    return this.patch(
      `/api/booking/refund?IdentifyCode=${IdentifyCode}&category=${category}&token=${token}`,
      data
    );
  };
  updateCart = (data, IdentifyCode) => {
    return this.put(`/api/booking/update/${IdentifyCode}`, data);
  };
  checkOrderTimeExits = (data) => {
    return this.post(`/api/booking/checkOrderTimeExits`, data);
  };
}

export const orderService = new OrderService();
