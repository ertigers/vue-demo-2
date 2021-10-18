import { qxajax, qxjsonp } from "./request";

let QxRequest = qxajax || qxjsonp;
const base_url = "http://q2http.tsinglink.com:9585/icvs2/"; // 本地插件

export const webcu2plugin = {
  // 登录
  login: (params) => {
    return QxRequest("post", `${base_url}login`, params);
  },
  // 获取设备列表
  getDeviceList: (params) => {
    return QxRequest("get", `${base_url}CAS/C_CAS_QueryPUIDSets`, params);
  },
  // 获取设备列表子资源
  getDeviceByPuid: (params) => {
    return QxRequest("get", `${base_url}C_CAS_QueryPUIDRes`, params);
  },
  // 获取播放ID
  getPlayVideoId: (params) => {
    return QxRequest("get", `${base_url}video/startVideo2`, params);
  },
};
