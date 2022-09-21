import { BaseService } from "./baseService";

class OrderService extends BaseService {
  getAllOrder = () => {
    return this.post(``, {});
  };
  getAllOrderByUserId = () => {
    return this.post(``, {});
  };
  addOrder = (data) => {
    return this.post("/api/booking", data);
  };

  updateOrder = (data, IdentifyCode) => {
    return this.put(`/api/booking/update/${IdentifyCode}`, data);
  };
}

export const orderService = new OrderService();
