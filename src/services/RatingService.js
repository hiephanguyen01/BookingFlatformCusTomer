import { BaseService } from "./baseService";

class RatingService extends BaseService {
  getAllRateStudioById = (id) => {
    return this.get(`/api/rating&report/studioPost/rate/${id}`);
  };
}

export const ratingService = new RatingService();
