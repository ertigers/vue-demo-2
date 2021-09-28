<template>
  <div id="app">
    <Demo :deviceData='deviceData' />
    <button @click="handle"></button>
  </div>
</template>

<script>
// import Demo from  "./components/contactPerson/index.vue"
import Demo from  "./components/video/device.vue"

export default {
  name: 'App',
  components: {
    Demo
  },
  data(){
    return {
      deviceData: {
        puid:12311323,
        idx:1
      }

    }
  },
  methods:{
    handle() {
      this.deviceData = {
        puid:12311323,
        idx:1
      }
    }
  }
}
</script>

<style lang="scss">

</style>
