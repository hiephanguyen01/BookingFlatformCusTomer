import { BaseService } from "./baseService";

class PostDaoService extends BaseService {
  getAllPost = (limit, page, tags) => {
    return this.get(`/api/post-post?limit=${limit}&page=${page}&tags=${tags}`);
  };
  getPostById = (id) => {
    return this.get(`/api/post-post/${id}`);
  };
  getImage = (url) => {
    return this.get(`/image/${url}`);
  };
  createPost = (userId, data) => {
    return this.post(`/api/post-post?userId=${userId}`, data);
  };
  updatePost = (id, data) => {
    return this.post(`/api/post-post/${id}`, data);
  };
  deletePost = (id) => {
    return this.delete(`/api/post-post/${id}`);
  };
  getLike = (userId) => {
    return this.get(`/api/like?userId=${userId}`);
  };
  createLike = (data) => {
    return this.post("/api/like/", data);
  };
  getAllDefaultComments = () => {
    return this.get(`/api/user-comment`);
  };
  createComment = (data) => {
    return this.post("/api/comment", data);
  };
  getComments = (postId) => {
    return this.get(`/api/comment/${postId}`);
  };
  filterRelatedService = (hasTags, search) => {
    return this.get(
      `/api/studio-post/filter-related-service?hasTags=${hasTags}&search=${search}`
    );
  };
}

export const postDaoService = new PostDaoService();
