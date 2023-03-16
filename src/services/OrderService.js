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
  addOrder = (data) => {
    return this.post("/api/booking", data);
  };
  updateRefundOrderByid = (data, IdentifyCode, category, token) => {
    return this.patch(
      `/api/booking/refund?IdentifyCode=${IdentifyCode}&category=${category}&token=${token}`,
      data
    );
  };
  updateOrder = (data, IdentifyCode) => {
    return this.put(`/api/booking/update/${IdentifyCode}`, data);
  };
}

export const orderService = new OrderService();
