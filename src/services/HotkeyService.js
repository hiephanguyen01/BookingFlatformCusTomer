import { BaseService } from "./baseService";

export class HotKeyService extends BaseService {
  createhotKey = (data) => {
    return this.post(`/api/hot-key`, data);
  };
  updatehotKey = (id, data) => {
    return this.patch(`/api/hot-key/${id}`, data);
  };
  getAllhotKey = () => {
    return this.get(`/api/hot-key`);
  };
  detelehotKey = (id) => {
    return this.delete(`/api/hot-key/${id}`);
  };
}

export const hotKeyService = new HotKeyService();
