export const webcu2plugin = {
  QxData: null,
  QxFrame: "",
  init: () => {
    let dom = document.createElement("iframe");
    dom.id = "pluginframe";
    dom.src = "http://q2http.tsinglink.com:9585/apidoc/index.html";
    dom.style =
      "position: absolute;bottom: 0;left: 0;opacity: 0;width: 2px;height: 2px;";
    document.body.appendChild(dom);

    window.addEventListener(
      "message",
      webcu2plugin.receiveMessageFromIframePage,
      false
    );
    webcu2plugin.QxFrame = document.getElementById("pluginframe");
  },
  QxRequest: (type, params) => {
    return new Promise((resolve) => {
      webcu2plugin.QxData = null;
      let SendData = { type, params };
      webcu2plugin.QxFrame.contentWindow.postMessage(SendData, "*");
      let timer = window.setInterval(() => {
        let data = webcu2plugin.QxData;
        // console.log(data);
        if (data) {
          resolve(data);
          webcu2plugin.QxData = null;
          window.clearInterval(timer);
        }
      }, 50);
    });
  },
  // 接收通信
  receiveMessageFromIframePage: (event) => {
    if(event.origin === "http://q2http.tsinglink.com:9585") {
      webcu2plugin.QxData = event.data;
    }
  },

  // 登录
  login: (params) => {
    return webcu2plugin.QxRequest("login", params);
  },
  // 获取设备列表
  getDeviceList: (params) => {
    return webcu2plugin.QxRequest("getDeviceList", params);
  },
  // 获取设备列表子资源
  getDeviceByPuid: (params) => {
    return webcu2plugin.QxRequest("getDeviceByPuid", params);
  },
  // 获取播放ID
  getPlayVideoId: (params) => {
    return webcu2plugin.QxRequest("getPlayVideoId", params);
  },
};
