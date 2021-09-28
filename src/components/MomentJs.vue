<template>
  <div>
    <h1>MomentJs入门使用总结</h1>
    <div>
        clone项目，更改组件MomentJs中mounted的方法，打开控制台
    </div>
  </div>
</template>

<script>
export default {
  name: "MomentJs",
  mounted(){
    // this.valueOf()
    // this.format()
    // this.startOf()
    // this.add()
    this.action()
  },
  methods:{
    // 时间戳   valueOf与unix的区别
    valueOf() {
        let date1 = this.$moment().valueOf()
        let date2 = this.$moment().unix()
        console.log('date1:',date1);
        console.log('date2:',date2);
    },
    // 格式化  按样式输出时间
    format() {
        let date0 = this.$moment().format()
        let date1 = this.$moment().format('YYYY-MM-DD')
        let date2 = this.$moment().format('YYYY-MM-DD HH:mm:ss')
        let date3 = this.$moment().format('YYYY-MM-DD HH:mm')
        let date4 = this.$moment().format('MM-DD-YYYY')
        console.log('date0:',date0);
        console.log('date1:',date1);
        console.log('date2:',date2);
        console.log('date3:',date3);
        console.log('date4:',date4);
    },
    // 开始时间，结束时间
    startOf() {
        let date0 = this.$moment().format('YYYY-MM-DD HH:mm:ss')
        let date1 = this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
        let date2 = this.$moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        let date3 = this.$moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
        console.log('date0:',date0);
        console.log('date1:',date1);
        console.log('date2:',date2);
        console.log('date3:',date3);
    },
    // 加减时间
    add() {
        let date0 = this.$moment().format('YYYY-MM-DD HH:mm:ss')
        let date1 = this.$moment().add(7,'days').format('YYYY-MM-DD HH:mm:ss')
        let date2 = this.$moment().add(1,'months').format('YYYY-MM-DD HH:mm:ss')
        let date3 = this.$moment().subtract(3,'days').format('YYYY-MM-DD HH:mm:ss')
        let date4 = this.$moment().subtract(1,'months').format('YYYY-MM-DD HH:mm:ss')
        console.log('date0:',date0);
        console.log('date1:',date1);
        console.log('date2:',date2);
        console.log('date3:',date3);
        console.log('date4:',date4);
    },
    // 综合案例
    action() {
        let today = this.$moment().valueOf();
        let todayStart = this.$moment().startOf("day").format('YYYY-MM-DD');
        let yesterStart = this.$moment().subtract(1, "day").startOf("day").valueOf();
        let yesterEnd = this.$moment().subtract(1, "day").endOf("day").valueOf();
        let monthStart = this.$moment().startOf("month").valueOf();
        console.log('today:',today);
        console.log('todayStart:',todayStart);
        console.log('yesterStart:',yesterStart);
        console.log('yesterEnd:',yesterEnd);
        console.log('monthStart:',monthStart);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
