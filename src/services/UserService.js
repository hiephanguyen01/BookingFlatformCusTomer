import { BaseService } from "./baseService";

class UserService extends BaseService {
  getSavedPostList = (UserId, page, limit) => {
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

  infoUser = (id) => {
    return this.get(`/api/booking-user/${id}`);
  };
  getListRatings = (id) => {
    return this.get(`/api/my-ratings/${id}`);
  };
  saveInfo = (data) => {
    return this.patch(`/api/booking-user/updateMe`, data);
  };
  deleteMe = () => {
    return this.patch(`/api/booking-user/deleteMe`);
  };
  getRecentViews = () => {
    return this.get(`/api/booking-user/recently`);
  };
  setRecentViews = (PostId, Category) => {
    return this.post(`/api/booking-user/recently-watch`, {
      PostId,
      Category,
    });
  };
}

export const userService = new UserService();
