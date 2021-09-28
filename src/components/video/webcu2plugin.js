
const webcu2plugin = {
  QXAJAX: (method, url, params)=> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        }
      };

      if (method === "get" || method === "GET") {
        if (typeof params === "object") {
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

      if (method === "post" || method === "POST") {
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(params));
      }
    });
  },
  base_url: 'http://127.0.0.1:9585/icvs2/',       // 本地插件

  // 登录
  login: (params) => {
    return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}login`, params);
  },

  // 获取设备列表
  getDeviceList: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}CAS/C_CAS_QueryPUIDSets`, params);
  },

  // 获取单个设备列表子资源
  getDeviceByPuid: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}C_CAS_QueryPUIDRes`, params);
  },

  // 获取播放ID
  getPlayVideoId: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}video/startVideo2`, params);
  },

  // 云台控制(13个指令)
  ptzControl: (params) => {
    let puid = params.puid || "";
    let idx = params.idx || 0;
    let control =params.control || "";
    let xml = "";
    let token =  params.token
    if (!puid || !control) {
      return
    }

    // 云台上下左右
    if (control === "left" || control === "up" || control === "right" || control === "down" || control === "stop") {
      let params = {
          puid,
          motion: control,
          idx,
          token,
      }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_Turn`, params);
    }
    //放大图像
    if (control === "zoomin") {
      let params = { puid,idx,token }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_ZoomInPicture`, params);
    }
    // 缩小图像
    if (control === "zoomout") {
      let params = { puid,idx,token }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_ZoomOutPicture`, params);
    }
    // 停止缩放
    if (control === "stopzoom") {
      let params = { puid,idx,token }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_StopPictureZoom`, params);
    }
    // 推远焦点
    if (control === "focusfar") {
      let params = { puid,idx,token }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_MakeFocusFar`, params);
    }
    // 拉近焦点
    if (control === "focusnear") {
      let params = { puid,idx,token }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_MakeFocusNear`, params);
    }
    // 停止调焦
    if (control === "stopfocus") {
      let params = { puid,idx,token }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_StopFocusMove`, params);
    }
    if (control === "augment") {
      // 增大光圈
      xml = '<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="G" Prio="1" EPID="system" Lang="zh_CN"> <Res Type="IV" Idx="'+idx+'" OptID="C_PTZ_AugmentAperture" Stream="0"><Param></Param></Res></C></M>';
      let params= { xml }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}RawRequest?dstType=201&dstID='${puid}'&token=${token}`, params);
    }
    if (control === "minish") { 
      // 缩小光圈
      xml = '<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="G" Prio="1" EPID="system" Lang="zh_CN"><Res Type="IV" Idx="'+idx+'" OptID="C_PTZ_MinishAperture" Stream="0"><Param></Param></Res></C></M>';
      let params= { xml }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}RawRequest?dstType=201&dstID='${puid}'&token=${token}`, params);
    } 
    if (control === "stopaperture") { 
      // 停止光圈
      xml = '<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="G" Prio="1" EPID="system" Lang="zh_CN"><Res Type="IV" Idx="'+idx+'" OptID="C_PTZ_StopApertureZoom" Stream="0"><Param></Param></Res></C></M>';
      let params= { xml }
      return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}RawRequest?dstType=201&dstID='${puid}'&token=${token}`, params);
    }
  },


  // 设置预置位
  setPresetPos: (params) => {
    return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_SetPresetPos`, params);
  },

  // 前往预置位
  moveToPresetPos: (params) => {
    return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_MoveToPresetPos`, params);
  },

  // 前往原始预置位
  gotoOriginalPresetPos: (params) => {
    return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}PTZ/C_PTZ_GotoOriginalPresetPos`, params);
  },


  // 开始云抓拍
  startCloudSnapshot: (params) => {
    return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}CSS/C_CSS_StartManualSnapshot`, params);
  },

  // 开始云存储(云连拍，云录像)
  startCloudStorage: (params) => {
    return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}CSS/C_CSS_StartManualStorage`, params);
  },

  // 停止云存储（云录像，云连拍）
  stopCloudStorage: (params) => {
    return webcu2plugin.QXAJAX('post',`${webcu2plugin.base_url}CSS/C_CSS_StopManualStorage`, params);
  },

  // 开始对讲
  startTalk: (params)=>{
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}audio/startTalk2`, params);
  },

  // 开始喊话
  startCall: (params)=>{
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}audio/startCall2`, params);
  },

  // 停止对讲、喊话、播放流
  stoptStream: (params)=>{
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}stopPlay2`, params);
  },


  /**
  * 
  * @param {*查询回放} params 
  * 
  */
  // 查询云文件（云录像，云抓拍）
  getCloudFile: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}CSS/C_CSS_QueryStorageFiles`, params);
  },

  // 查询前端文件（录像，抓拍，录音）
  getDeviceFile: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}SG/C_SG_QueryRecordFiles`, params);
  },

  // 下载云文件
  downloadCloudFile: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}downloadCloudFile2`, params);
  },

  // 下载前端文件
  downloadDeviceFile: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}downloadDeviceFile2`, params);
  },

  // 暂停下载
  setPuaseDownload: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}puaseDownload2`, params);
  },

  // 恢复下载
  setRestoreDownload: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}restoreDownload2`, params);
  },

  // 停止下载
  setStopDownload: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}stopDownload2`, params);
  },

  // 点播云文件
  getVodCloudFile: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}vodCloudFile2`, params);
  },

  // 点播前端文件
  getVodDeviceFile: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}vodDeviceFile2`, params);
  },

  // 暂停点播
  setPuaseVod: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}puaseVod2`, params);
  },

  // 恢复点播
  setRestoreVod: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}restoreVod2`, params);
  },

  // 设置点播速度
  setSpeedVod: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}setVodSpeed2`, params);
  },

  // 设置点播位置
  setOffsetVod: (params) => {
    return webcu2plugin.QXAJAX('get',`${webcu2plugin.base_url}setVodOffset2`, params);
  }
}

export default webcu2plugin 
