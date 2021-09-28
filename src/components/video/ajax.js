function ajax(method, url, params) {
  return new Promise((resolve, reject) => {
    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    // 状态改变时的回调
    xhr.onreadystatechange = function() {
      // readyState为4的时候已接收完毕
      if (xhr.readyState === 4) {
        // 状态码200表示成功
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.status);
        }
      }
    };

    // get
    if (method === "get" || method === "GET") {
      if (typeof params === "object") {
        // params拆解成字符串
        params = Object.keys(params)
          .map(function(key) {
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            );
          })
          .join("&");
      }
      url = params ? url + "?" + params : url;
      xhr.open(method, url, true);
      xhr.send();
    }

    //post
    if (method === "post" || method === "POST") {
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(params));
    }
  });
}

const base_url = 'http://127.0.0.1:9585/icvs2/'


/**
 * 视频浏览
 * @param {*} params 
 * 
 */
// 登录
export const login = (params) => {
  return ajax('post',`${base_url}login`, params);
}

// 获取设备列表
export const getDeviceList = (params) => {
  return ajax('get',`${base_url}CAS/C_CAS_QueryPUIDSets`, params);
}

// 获取设备列表子资源
export const getDeviceListByPuid = (params) => {
  return ajax('post',`${base_url}C_CAS_QueryPUIDRes`, params);
}

// 获取播放ID
export const getPlayVideoId = (params) => {
  return ajax('get',`${base_url}video/startVideo2`, params);
}
