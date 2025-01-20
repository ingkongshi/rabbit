export function request(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {
        "content-type": "application/json",
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          uni.showToast({
            title: res.data.message,
            icon: "none",
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: "网络请求失败",
          icon: "none",
        });
        reject(err);
      },
    });
  });
}
