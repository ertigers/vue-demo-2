<template>
  <div class="icon">
    <img
      :src="svgs[icon]"
      :style="{ width: size + 'px', height: size + 'px' }"
    />
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "QxIcon",
  props: {
    icon: {
      type: String,
      default: "area",
    },
    size: {
      type: Number,
      default: 32,
    },
  },
  data: () => {
    return {
      svgs: {
        device_offline: require("./icons/ico_device_offline.svg"),
        device_online: require("./icons/ico_device_online.svg"), 
        camera_online: require("./icons/ico_camera_online.svg"),
        camera_offline: require("./icons/ico_camera_offline.svg"),
      },
    };
  },
};
</script>
<style scoped lang="scss">
.icon {
  img {
    margin-right: 10px;
  }
}
</style>
