import axios from "axios";
import { Message } from "element-ui";
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,
  headers: { "X-Custom-Header": "foobar" },
});

// http request 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 这里判断localStorage里面是否存在token，如果有则在请求头里面设置
    // if (localStorage.jwtToken) {
    //   config.headers.Authorization = getLocalStorage("jwtToken");
    // }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http response 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 这里对响应的数据做了操作，大家可以自己设置响应过滤哦，下面会给出具体代码
    if (response.data.code !== 200) {
      if (response.data.msg) {
        Message.error(response.data.msg);
      } else {
        Message.error("服务器遇到错误，无法完成请求。");
      }
      return Promise.reject(response.data);
    }

    return response.data.data;
  },
  (error) => {
    Message({
      type: "error",
      message: "HTTP：服务器遇到错误，无法完成请求。",
    });
    return Promise.reject(error);
  }
);

export default http;
