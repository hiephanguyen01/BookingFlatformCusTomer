import { BaseService } from "./baseService";

class StudioPostService extends BaseService {
  getFilterStudioPost = (limit, page, filter) => {
    return this.post(`/api/filter/advance?page=${page}&limit=${limit}`, filter);
  };
  getAllProvince = () => {
    return this.get(`/api/provinces`);
  };
  getAllStudioPost = (limit, page, category) => {
    return this.get(
      `/api/studio-post?page=${page}&limit=${limit}&category=${category}`
    );
  };
  getDetailStudio = (id) => {
    return this.get(`/api/studio-post/byid?id=${id}&category=1`);
  };
  getStudioNear = (lat, lng) => {
    return this.get(`/api/studio-post/distance?lat=${lat}&lng=${lng}`);
  };
}

export const studioPostService = new StudioPostService();
