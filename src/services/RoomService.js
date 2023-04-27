import { BaseService } from "./baseService";

class RoomService extends BaseService {
  getDetailRoom = (id) => {
    return this.get(`/api/room/${id}`);
  };
  getScheduleAndPrice = (from, to, roomId) => {
    return this.get(
      `/api/booking/scheduleAndPrice?from=${from}&to=${to}&roomId=${roomId}`
    );
  };
}

export const roomService = new RoomService();
