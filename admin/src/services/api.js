import { request } from "./request.js";

export function login(options) {
  return request({ url: "/login", method: "post", data: options });
}
