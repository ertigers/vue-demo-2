<template>
  <div class="container">
    <div>什么是双向绑定？</div>
    <input v-model="message" placeholder="editMe" />
    <p>message is :{{ message }}</p>
    <p>
      <button @click="message = 'heihei,hi,vue'">
        set something to message
      </button>
    </p>
    <hr />
    <div>动手实现方式MYINPUT</div>
    <input :value="message" @input="message = $event.target.value" />
    <MyInput :value="message" @input="message = $event" />
    <hr />
    <div>爱好：{{ x }}</div>
    <label>
      <input type="checkbox" v-model="x" :value="1" />
      <span>喝酒</span>
    </label>
    <label>
      <input type="checkbox" v-model="x" :value="2" />
      <span>抽烟</span>
    </label>
    <label>
      <input type="checkbox" v-model="x" :value="3" />
      <span>烫头</span>
    </label>
    <hr />
    <div>爱好：{{ y }}</div>
    <label>
      <input name="radio" type="radio" v-model="y" :value="1" />
      <span>喝酒</span>
    </label>
    <label>
      <input name="radio" type="radio" v-model="y" :value="2" />
      <span>抽烟</span>
    </label>
    <label>
      <input name="radio" type="radio" v-model="y" :value="3" />
      <span>烫头</span>
    </label>
    <hr />
    <div>爱好：{{ z }}</div>
    <select v-model="z">
      <option value="">-</option>
      <option :value="1">抽烟</option>
      <option :value="2">喝酒</option>
      <option :value="3">烫头</option>
    </select>
    <hr />
    <div>爱好：{{ z1 }}</div>
    <select v-model="z1">
      <option value="">-</option>
      <option v-for="(item, index) in z1Array" :key="index" :value="item.value">
        {{ item.text }}
      </option>
    </select>
    <hr />
    <div>登录</div>
    <form @submit.prevent="onSubmit">
      <label>
        <span>用户名</span>
        <input type="text" v-model="user.username" />
      </label>
      <label>
        <span>密码</span>
        <input type="password" v-model="user.password" />
      </label>
      <button type="submit">登录</button>
    </form>
    <!--  
      修饰符
      .lazy：用在input事件的v-model.lazy,辅助慢一步同步数据
      .number:只取数字
      .trim：去除两边的空格
    -->
    <hr />
    <a-input placeholder="ant 引入成功" />
    <hr />
    <div>引入登录框</div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            },
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import MyInput from "../components/MyInput.vue";
export default {
  name: "",
  components: { MyInput },
  data() {
    return {
      message: "",
      x: [],
      y: [],
      z: "",
      z1Array: [
        { text: "抽烟", value: 1 },
        { text: "喝酒", value: 2 },
        { text: "烫头", value: 3 },
      ],
      z1: "",
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    onSubmit() {
      console.log(this.user);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
