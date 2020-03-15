<template>
  <div class="contain_box" ref="contain_box">
    <div class="item">
      <div class="image">
        <img :src="currentimg" alt />
      </div>
    </div>
    <div class="arrow">
      <div class="arrow"></div>
      <div class="arrow"></div>
    </div>
    <div class="control">
      <div :class="(i==currentId)?'checked':'point'" v-for="(item, i) in list" :key="i"></div>
    </div>
  </div>
</template>x`xx`

<script>
export default {
  data() {
    return {
      time: this.auto,
      list: this.image,
      length: this.image.length,
      currentId: 0,
      clock: null,
      currentimg: null
    };
  },
  methods: {
    rotate() {
      this.currentimg = this.image[0];
      if (this.clock != null) return;
      else {
        this.clock = setInterval(() => {
          if (this.currentId == this.image.length - 1) this.currentId = 0;
          else {
            this.currentId++;
          }
          this.currentimg = this.image[this.currentId];
        }, this.time);
      }
    }
  },
  created() {},
  mounted() {
    this.rotate();
  },
  props: {
    image: {
      type: Array,
      required: true,
      default: function() {
        return ["static/1.png", "static/2.png", "static/3.png"];
      }
    },
    auto: {
      type: Number,
      default: 4000
    }
  }
};
</script>

<style lang="less" scoped>
.contain_box {
  width: 100%;
  height: 100%;
  position: relative;
}

.item {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
    animation: change 4s ease infinite;
    -webkit-animation: change 4s ease infinite;
    background-size: 100%;
    background-repeat: no-repeat;

    img {
      width: 100%;
      height: auto;
    }
  }

  @keyframes change {
    0% {
      opacity: 1;
    }
    75% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.5;
    }
  }
}

.control {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  background-color: inherit;
  display: flex;
  justify-content: center;

  .point {
    width: 1vw;
    height: 1vw;
    background-color: lightgray;
    border-radius: 50%;
    margin: 0 0.3vw;
  }

  .checked {
    width: 1vw;
    height: 1vw;
    background-color: red;
    border-radius: 50%;
    margin: 0 0.3vw;
  }
}
</style>