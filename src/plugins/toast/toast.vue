<template>
  <div class="toastMessageBox" v-show="show">
    <div class="messeage-box">{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      show: false
    };
  }
};
</script>

<style lang="less" scoped>
.toastMessageBox {
  position: fixed;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #282828,
              inset 0 0 2px #282828;

  .messeage-box {
    color: #282828;
    padding: 8px;
    font-size: 12px;
    border-radius: 8px;
    text-align: center;
  }
}
</style>