import request from "./request.js";

export function login(options) {
  return request({ url: "/login", method: "post", data: options });
}

export function productList(options) {
  return request({ url: "/product/list", method: "get", data: options });
}

export function testApi(options) {
  options = {
    account: 'admin111',
    password: '123456'
  }
  return request({ url: "/register", method: "post", data: options });
}

export function upload(options) {
  return request({ url: "/upload", method: "post", data: options });
}
