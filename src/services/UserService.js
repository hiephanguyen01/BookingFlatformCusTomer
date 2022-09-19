import { BaseService } from "./baseService";

class UserService extends BaseService {
  getListSavePost = (UserId, page, limit) => {
    return this.get(
      `/api/save-post?&UserId=${UserId}&page=${page}&limit=${limit}`
    );
  };
  savePost = (UserId, PostId) => {
    return this.post(`/api/save-post`, {
      UserId,
      PostId,
    });
  };
  cancelSavePost = (UserId, PostId) => {
    return this.delete(`/api/save-post`, {
      UserId,
      PostId,
    });
  };
  infoUser = (id)=> {
    return this.get(`/api/booking-user/${id}`,);
  }
}

export const userService = new UserService();