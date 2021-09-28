<template>
  <div class="container">
    <el-dialog
      :visible.sync="videoDialogVisible"
      :before-close="stopPlay"
      :modal="false"
      :close-on-click-modal="false"
    >
      <div class="video-wrapper">
        <video id="video" controls></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import flv from "flv.js";
import { login, getPlayRouter,stopVideo } from '@/api/play.js';

export default {
  name: "videoDialog",
  props: {
    videoDialogVisible: {
      type: Boolean,
      default: () => false,
    },
    puid: {
      type: String,
    },
    idx: {
      type: Number,
    },
  },
  data() {
    return {
      dialogVisible: false,
      cf: {
        // q2http_url: "http://127.0.0.1:9585/icvs2/",
        flv_url: "http://127.0.0.1:9585/",
        websocket_url: "ws://127.0.0.1:9585/",

        // - 配置登录参数
        connParams: {
          // - 登录平台IP
          // address : "172.25.18.20",
          // address : "220.248.233.105",
          address: "220.248.233.105",
          port: "9988",
          // - 登录平台用户名
          user: "admin",
          // - 登录平台密码
          password: "",
          // - 登录平台企业ID
          epid: "system",
          // - 登录平台是否通过网闸模式
          bfix: 1,
        },
      },
      videoObject: null,
    };
  },
  mounted() {},
  watch: {
    videoDialogVisible(value) {
      if (value) {
        this.fetchVideo();
      }
    },
  },
  methods: {
    async fetchVideo() {
      // 登录获取token
      let params = {
        address: this.cf.connParams.address,
        port: this.cf.connParams.port,
        user: this.cf.connParams.user,
        password: this.cf.connParams.password,
        epid: this.cf.connParams.epid,
        fixaddr: this.cf.connParams.bfix,
      };
      const data = await login(params);
      if (data && data.msg === "OK") {
        this.token = data.token;
        this.fetchPlayID(this.puid, this.idx);
      } else {
        //   换个平台登录
        this.$message.warning("登录失败");
        this.login2()
      }
    },
    // 第二个登录平台
    async login2() {
      let params = {
        address: '60.168.132.97',
        port: '49988',
        user: 'zwtest',
        password: 'Zwtest123456',
        epid: this.cf.connParams.epid,
        fixaddr: this.cf.connParams.bfix,
      };
      const data = await login(params);
      if (data && data.msg === "OK") {
        this.token = data.token;
        this.fetchPlayID('201000000000001949', this.idx);
      } else {
        this.$message.warning("登录失败");
      }
    },

    // 获取播放ID
    async fetchPlayID(puid, idx) {
      const baseValue = { puid, idx, url: "", playID: "" };
      const params = { puid, idx, stream: 0, token: this.token };
      const data = await getPlayRouter( params);
      if (data && data.playID) {
        baseValue.playID = data.playID;
      }
      let flvUrl = this.cf.flv_url + "stream2.flv?playID=" + baseValue.playID;
      baseValue.url = flvUrl;
      let videoElement = document.getElementById("video");
      this.createFlvPlayer(flvUrl, videoElement, baseValue);
    },

    // 新建flvPlayer,播放flv
    createFlvPlayer(url, videoElement, baseValue) {
      let self = this;
      let flvPlayer = new flv.createPlayer(
        {
          type: "flv",
          url: url,
          isLive: true,
          hasAudio: false,
        },
        {
          lazyLoad: false, //有足够的数据可播放，是否中止http连接。
          enableStashBuffer: false, //启用IO隐藏缓冲区
          autoCleanupSourceBuffer: true, //	对SourceBuffer进行自动清理
          autoCleanupMaxBackwardDuration: 30,
          autoCleanupMinBackwardDuration: 10,
          stashInitialSize: 128, // 减少首桢显示等待时长
        }
      );
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      setTimeout(function () {
        flvPlayer.play();
      }, 100);
      // 对象监听
      flvPlayer.on("scriptdata_arrived", function (e) {
        console.log("视频正在播放", e);
        self.videoObject = { flvPlayer, baseValue };
      });
      flvPlayer.on("error", function (e) {
        //出现错误，重新播放
        console.log("出现错误，重新再播放", e);
        self.videoObject.flvPlayer.pause();
        self.videoObject.flvPlayer.unload();
        self.videoObject.flvPlayer.detachMediaElement();
        self.videoObject.flvPlayer.destroy();
        self.videoObject.flvPlayer = null;
        self.videoObject = null;
        setTimeout(() => {
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }, 1000);
      });
    },

    // 暂停播放
    async stopPlay() {
      if(this.videoObject) {
        let params = {
            token: this.token || '',
            playID: this.videoObject.baseValue.playID || '',
        };
        let data = await stopVideo(params);
        console.log(data);
        if(this.videoObject.flvPlayer) {
          this.videoObject.flvPlayer.pause();
          this.videoObject.flvPlayer.unload();
          this.videoObject.flvPlayer.detachMediaElement();
          this.videoObject.flvPlayer.destroy();
          this.videoObject.flvPlayer = null;
        }
        this.videoObject = null;
      }
      this.$emit("closeVideo");
    },
  },
};
</script>
<style scoped>
video {
  width: 400px;
  height: 300px;
}
</style>