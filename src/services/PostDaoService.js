import { BaseService } from "./baseService";

class PostDaoService extends BaseService {
  getAllPost = (limit, page) => {
    return this.get(`/api/post-post?limit=${limit}&page=${page}`);
  };
  getPostById = (id) => {
    return this.get(`/api/post-post/${id}`);
  };
  getImage = (url) => {
    return this.get(`/image/${url}`);
  };
  updatePost = (id, data) => {
    return this.post(`/api/post-post/${id}`, data);
  };
  deletePost = (id) => {
    return this.delete(`/api/post-post/${id}`);
  };
  createLike = (data) => {
    return this.post("/api/like/", data);
  };
}

export const postDaoService = new PostDaoService();
