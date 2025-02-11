import request from "./request.js";

export function login(options) {
  return request({ url: "/login", method: "post", data: options });
}

export function productList(options) {
  return request({ url: "/product/list", method: "get", data: options });
}

export function testApi(options) {
  return request({ url: "/banner/list", method: "GET", data: options });
}

export function upload(options) {
  return request({ url: "/upload", method: "post", data: options,  headers: { 'Content-Type': '`multipart/form-data' }, });
}
