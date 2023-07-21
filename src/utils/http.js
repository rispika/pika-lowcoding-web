import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
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
    let data = response.data;
    // 这里对响应的数据做了操作，大家可以自己设置响应过滤哦，下面会给出具体代码
    if (data.code >= 300 || data.code < 200) {
      // 未登录
      if (data.code === 401) {
        router.push("/login");
      }
      if (data.msg) {
        Message.error(data.msg);
      } else {
        Message.error("服务器遇到错误，无法完成请求。");
      }
      return Promise.reject(data);
    }

    return data.data;
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
