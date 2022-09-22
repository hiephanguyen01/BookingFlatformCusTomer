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
    return this.get(`/api/booking-user/${id}`);
  }
  getListRatings = (id)=> {
    return this.get(`/api/my-ratings/${id}`);
  }
  saveInfo = (id,data)=> {
    return this.patch(`/api/booking-user/updateMe/${id}`,data);
  }
  deleteMe = (id) => {
    return this.patch(`/api/booking-user/deleteMe/${id}`)
  }
}

export const userService = new UserService();
