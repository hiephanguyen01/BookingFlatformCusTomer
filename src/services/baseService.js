import axios from "axios";
export class BaseService {
  put = (url, model) => {
    return axios({
      url: `${process.env.REACT_APP_DB_BASE_URL}${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_TOKEN),
      }, //JWT
    });
  };
  patch = (url, model) => {
    return axios({
      url: `${process.env.REACT_APP_DB_BASE_URL}${url}`,
      method: "PATCH",
      data: model,
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_TOKEN),
      }, //JWT
    });
  };

  post = (url, model) => {
    return axios({
      url: `${process.env.REACT_APP_DB_BASE_URL}${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_TOKEN),
      }, //JWT
    });
  };

  get = (url) => {
    return axios({
      url: `${process.env.REACT_APP_DB_BASE_URL}${url}`,
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_TOKEN),
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  delete = (url) => {
    return axios({
      url: `${process.env.REACT_APP_DB_BASE_URL}${url}`,
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_TOKEN),
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };
}
