// 引入 axios 构造函数
import axios from "axios";
// 导出 request 函数，用于封装 axios 请求
export function request(config) {
  /**
   * @description axios初始化
   */
  const instance = axios.create({
    // 接口地址
    baseURL: "",
    // 请求超时时间
    timeout: 10000,
    // 请求头
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  /**
   * @description axios请求拦截器
   */
  instance.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  /**
   * @description axios响应拦截器
   */
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      if (response === undefined) {
        console.error( "未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起");
        return Promise.reject(error);
      } else return Promise.reject(error);
    }
  );
}
