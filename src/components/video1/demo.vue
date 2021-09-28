<template>
    <div class="container">
      <VideoDialog :videoDialogVisible="videoDialogVisible" :puid='puid' :idx='idx' @closeVideo="closeVideo" />
      <button @click="palyVideo1">播放1</button>
      <button @click="palyVideo2">播放2</button>
    </div>
</template>

<script>
import VideoDialog from './videoDialog.vue';

export default {
    name:'',
    components: {
      VideoDialog
    },
    data() {
        return {
          videoDialogVisible:false,
          puid: "201115202518752655",
          idx: 0,

          // puid:'201000000000001949',
        };
    },
    methods: {
      palyVideo1() {
        this.puid = "201115202518752655"
        this.videoDialogVisible = true
      },
      palyVideo2() {
        this.puid = '201000000000001949'
        this.videoDialogVisible = true
      },
      closeVideo() {
        this.videoDialogVisible = false
      }
    },
};
</script>

<style scoped lang="scss">

</style>
