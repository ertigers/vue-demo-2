<template>
  <div class="realPlay" ref="container" style="height: 100%">
    <div class="device">
      <div class="title">设备列表</div>
      <div class="list">
        <el-input
          placeholder="搜索设备名称"
          v-model="searchText"
          style="width: 260px; margin: 10px"
        >
        </el-input>
        <el-scrollbar style="height: 90%">
          <el-tree
            :data="deviceList"
            :props="defaultProps"
            :load="loadNode"
            lazy
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              @dblclick="handleNodeDBClick(node)"
            >
              <QxIcon
                v-if="data.type == 'device'"
                :icon="
                  data.OnlineFlag == '1' ? 'device_online' : 'device_offline'
                "
                :size="20"
              ></QxIcon>
              <QxIcon
                v-if="data.type == 'video'"
                :icon="
                  node.parent.data.OnlineFlag == '1'
                    ? data.Usable == '1'
                      ? 'camera_online'
                      : 'camera_offline'
                    : 'camera_offline'
                "
                :size="20"
              ></QxIcon>
              {{ node.label }}
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
    </div>
    <div class="video-wrapper"       
      v-show="videoDialogVisible"
      >
      <div class="icon-close" @click="stopPlay">X</div>
      <video id="video" controls></video>
    </div>
  </div>
</template>

<script>
import flv from "flv.js";
import { login, getDeviceList, getDeviceListByPuid, getPlayVideoId } from '@/api/ajax'
import QxIcon from '@/components/qx_icon/qx_icon.vue';
import cf from "@/utils/config"  // 登录参数
import bus from "@/bus";

export default {
  components:{
    QxIcon
  },
  data(){
    return {
      token:'',
      // 获取设备列表
      deviceList: [], 
      searchList: [],
      defaultProps: {
        children: "children",
        label: "Name",
        isLeaf: 'leaf',
        id: "$",
      },
      searchText: "",

      // 播放相关
      videoDialogVisible: false,

      videoObject: null,

    }
  },
  watch: {
    // 过滤筛选
    searchText(val) {
      if (!val) {
        this.deviceList = this.searchList;
        this.deviceList.sort((a, b) => {
          return b.OnlineFlag - a.OnlineFlag;
        });
        return;
      }
      this.deviceList = this.searchList.filter((data) => {
        return data.Name.toLowerCase().includes(val.toLowerCase());
      });
      this.deviceList.sort((a, b) => {
        return b.OnlineFlag - a.OnlineFlag;
      });
    }
  },
  mounted(){
    this.login()
    bus.$on("device_online", (data) => {
      this.deviceList.forEach((item) => {
        if (item.$ == data) {
          item.OnlineFlag = 1;
        }
      });
      //console.log('device_online')
      this.deviceList.sort((a, b) => {
        return b.OnlineFlag - a.OnlineFlag;
      });
      this.deviceList = JSON.parse(JSON.stringify(this.deviceList));
    });
    bus.$on("device_offline", (data) => {
      this.deviceList.forEach((item) => {
        if (item.$ == data) {
          item.OnlineFlag = 0;
        }
      });

      this.deviceList.sort((a, b) => {
        return b.OnlineFlag - a.OnlineFlag;
      });
      this.deviceList = JSON.parse(JSON.stringify(this.deviceList));

      this.playList.forEach((item) => {
        if (item.puid == data) {
          this.stopVideo(item.id);
        }
      });
    })
  },
  methods:{
    async login() {
      let params = {
        address: cf.connParams.address,
        port: cf.connParams.port,
        user: cf.connParams.user,
        password: cf.connParams.password,
        epid: cf.connParams.epid,
        fixaddr: cf.connParams.bfix,
      };
      let data = await login(params);
      if(data && data.token) {
        this.token = data.token
        this.fetchDeviceList(0,200)
      }
    },
    //获取设备列表 200一组循环获取
    async fetchDeviceList(offset, count) {
        let params = {
            offset,
            count,
            token: this.token
        };
      let res = await getDeviceList(params);
      if(res instanceof Array) {
          res.map((item) => {
            this.$set(item, "type", "device");
            this.deviceList.push(item);
            this.searchList.push(item);
          });
          this.deviceList.sort((a, b) => {
            return b.OnlineFlag - a.OnlineFlag;
          });
          if(res.length === count) {
            offset += count;
            this.fetchDeviceList(offset, count);
          }
      }else {
        this.$message.error('获取设备列表失败')
      }
    },
        //懒加载
    async loadNode(node, resolve) {
      if (node.data.type == "device") {
        let list = await this.fetchDeviceResource(node.data);
        list.forEach((item)=>{
          if(!item.children || item.children.length != 0){
            item.leaf = true
          }
        })
        this.$set(node.data, "children", list);
        resolve(list);
      } else {
        resolve([]);
      }
    },
        //获取设备列表资源
    async fetchDeviceResource(item) {
      let list = [];
      let params = {
        puid: item.$,
        token: this.token
      };
      let res = await getDeviceListByPuid(params);
      if (res.Res.length) {
        res.Res.forEach((e) => {
          if (e.Type == "IV") {
            this.$set(e, "type", "video");
            this.$set(e, "puid", params.puid);
            list.push(e);
          }
        });
      }
      list.sort((a, b) => {
        return b.Usable - a.Usable;
      });
      return list;
    },
        //双击触发播放视频
    async handleNodeDBClick(node) {
      let puid = node.parent.data.$
      let idx = node.data.Idx
      console.log(puid,idx);
      this.fetchPlayID(puid,idx)
    },
        // 获取播放ID
    async fetchPlayID(puid, idx) {
      const baseValue = { puid, idx, url: "", playID: "" };
      const params = { puid, idx, stream: 0, token: this.token };
      const data = await getPlayVideoId( params);
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
        self.videoObject.flvPlayer.destroy();
        self.videoObject.flvPlayer = null;
        self.videoObject = null;
        setTimeout((url,videoElement,baseValue) => {
          console.log('重新连接中~');
          self.createFlvPlayer(url,videoElement,baseValue)
        }, 1000);
      });
    },

    // 暂停播放
    stopPlay() {
      if(this.videoObject && this.videoObject.flvPlayer) {
        this.videoObject.flvPlayer.pause();
        this.videoObject.flvPlayer.unload();
        this.videoObject.flvPlayer.detachMediaElement();
        this.videoObject.flvPlayer.destroy();
        this.videoObject.flvPlayer = null;
        this.videoObject = null;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.device {
  height: 60%;
  .list {
    width: 290px;
    height: 94%;
    margin: 0 15px;
    background: rgba(19, 85, 176, 0.2);
    .custom-tree-node {
      -ms-flex: 1;
      flex: 1;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: flex-start;
      font-size: 14px;
      padding-right: 8px;
      position: relative;
      width: 100%;
      color: #000000;
      border-bottom: 1px solid #f6f6ff;

      .right {
        position: absolute;
        left: 0;
      }
    }
  }
}
.video-wrapper {
  width: 400px;
  height: 300px;
  position: relative;
  background-color: #333333;
}
.icon-close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: aliceblue;
  font-size: 20px;
  cursor: pointer;
  z-index: 999;
}
video {
  width: 400px;
  height: 300px;
}
</style>