<template>
  <div class="container">
    ajax.js
  </div>
</template>

<script>
import { login } from '@/api/login.js';

export default {
  name: "ajaxDemo",
  data() {
    return {
      cf: {
        q2http_url: "http://127.0.0.1:9585/icvs2/",
        flv_url: "http://127.0.0.1:9585/",
        websocket_url: "ws://127.0.0.1:9585/",
        // // - 配置登录参数
        connParams : {
          // - 登录平台IP
          // address : "172.25.18.20",
          // address : "220.248.233.105",
          address : "60.168.132.97",
          port : "49988",
          // - 登录平台用户名
          user : "zwtest",
          // - 登录平台密码
          password :"Zwtest123456",
          // - 登录平台企业ID
          epid : "system",
          // - 登录平台是否通过网闸模式
          bfix :1
        }
      },
      token:'',
    };
  },
  mounted() {
    this.fetchLogin()
  },
  watch: {
  },
  methods: {
    async fetchLogin() {
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
      console.log(typeof data);
      console.log(data);
      if (data && data.msg === "OK") {
        this.token = data.token;
      } else {
        this.$message.warning("登录失败");
      }
    },
  }
};
</script>

<style scoped lang="scss">
</style>
