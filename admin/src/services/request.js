// 引入 axios 构造函数
import axios from "axios";
import { ElNotification } from 'element-plus'
const showNotification = ( message, title='请求出错啦!!!', type='error' ) => ElNotification({title, message, type})
  /**
   * @description axios初始化
   */
  const service = axios.create({
    // 接口地址
    baseURL: "/api",
    // 请求超时时间
    timeout: 3000,
    // 请求头
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  /**
   * @description axios请求拦截器
   */
  service.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      return config;
    },
    (error) => {
      showNotification('请求错误，请稍后再试')
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  /**
   * @description axios响应拦截器
   */
  service.interceptors.response.use(
    (response) => {
      const { status, data } = response;
      if (status === 200) {
        // 接口网络请求成功，关闭等待提示
        if (data.code === 0) {
          // 接口请求结果正确
          return data;
        } else {
          showNotification(data.message, `出错了 -- ${data.code}`)
          return Promise.reject(data);
        }
      }
    },
    (error) => {
      console.log('error: ', error);
      const { response, message } = error;
      showNotification(message || '未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起')
      return Promise.reject(error);
    }
  );

// 导出 request 函数，用于封装 axios 请求
export default service;
