<template>
  <div class="outer-box">
    <div class="inner-box">
      <div class="header">
        <p class="title">全部</p>
        <select name="kinds" id="kinds" class="kinds">
          <option v-for="(item, i) in list_kinds" :key="i" :value="item">{{ item.name }}</option>
        </select>
        <a href class="hot">热门</a>
      </div>
      <div class="list-container">
        <div v-for="(item, i) in music_list" :key="i" class="detail-container">
          <div class="img-container">
            <a :href="item.url" :title="item.title" class="link">
              <img :src="item.imgUrl" alt class="list-item" />
            </a>
          </div>
          <div class="bottom">
            <a :href="item.url" :title="item.title">{{ item.title }}</a>
          </div>
        </div>
      </div>
      <div class="toobar">
        <a href>上一页</a>
        <div class="page"></div>
        <a href>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list_kinds: [],
      music_list: []
    };
  },
  methods: {
    init() {
      this.list_kinds = [
        {
          name: "华语"
        },
        {
          name: "欧美"
        }
      ];
      this.music_list = [
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        },
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        },
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        },
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        },
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        },
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        },
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        },
        {
          imgUrl: "static/1.png",
          url: "",
          title: "this is title"
        }
      ];
    }
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  }
};
</script>

<style lang="less" scoped>
.outer-box {
  width: 100%;
  height: 100%;
  padding: 0 13%;
  background-color: #f5f5f5;
  border-bottom: 1px solid rgba(28, 28, 28, 0.3);

  .inner-box {
    padding: 40px;
    background-color: white;
    border-left: 1px solid rgba(28, 28, 28, 0.3);
    border-right: 1px solid rgba(28, 28, 28, 0.3);
  }
}

.header {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #337ab7;

  .title {
    margin: 0;
    font-size: 24px;
  }

  .kinds {
    appearance: none;
    -webkit-appearance: none;
    width: 80px;
    height: 30px;
    margin-left: 20px;
    padding-left: 10px;
  }

  .hot {
    margin-left: auto;
  }
}

.list-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  .detail-container {
    width: 16%;
    margin-top: 30px;
    margin-right: 5%;

    .img-container {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;

      .link {
        width: 100%;
        height: 100%;
        position: absolute;
        display: block;
      }

      .list-item {
        width: 100%;
        height: 100%;
      }
    }

    .bottom {
      width: 100%;
      padding: 0 10px 10px 10px;

      a {
        color: #282828;
        font-size: 16px;
      }
    }
  }
}

.list-container > div:nth-child(5n + 0) {
  margin-right: 0;
}

.toobar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>