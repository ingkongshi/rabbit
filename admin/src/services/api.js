import { request } from "./request.js";

export function login(options) {
  return request({ url: "/login", method: "post", data: options });
}

export function productList(options) {
  return request({ url: "/product/list", method: "get", data: options });
}

