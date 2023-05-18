import { BaseService } from "./baseService";

class RoomService extends BaseService {
  getDetailRoom = (id) => {
    return this.get(`/api/room/${id}`);
  };
  getScheduleAndPrice = (from, to, serviceId, category) => {
    return this.get(
      `/api/booking/scheduleAndPrice?from=${from}&to=${to}&serviceId=${serviceId}&category=${category}`
    );
  };
}

export const roomService = new RoomService();
