import Vue from 'vue'
import moment from 'moment';
// 完整导入
import Antd from 'ant-design-vue';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
// 局部引入
// import { Button, message } from 'ant-design-vue';

Vue.use(ElementUI);
Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.use(Antd);

/* v1.1.3+ 自动注册Button下组件，如Button.Group */
// Vue.use(Button);

// Vue.prototype.$message = message;


new Vue({
  render: h => h(App),
}).$mount('#app')
