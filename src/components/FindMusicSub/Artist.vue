<template>
  <div class="outer-box">
    <div class="border-line">
      <div class="left">
        <div class="singer-kind" v-for="(item, i) in menu" :key="i">
          <div class="kind-title">{{ item.title }}</div>
          <ul>
            <li
              v-for="(subitem, index) in item.subtitle"
              :key="index"
              :class="{'li-selected': index == subcurrent&&i ==current}"
              @click="change(index, i)"
            >
              <router-link
                :to="{path: `/findmusic/artist/${subitem.url}`,query: subitem.query ? {id:subitem.query} : {}}"
              >{{ subitem.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <span class="top-title">{{ title }}</span>
        </div>
        <div class="img-box">
          <ul>
            <li v-for="(item, i) in singerInfo" :key="i">
              <div class="img-container">
                <img :src="item.cover" alt />
              </div>
              <div class="singer-info">{{ item.name }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      menu: [],
      current: 0,
      subcurrent: 0,
      title: "",
      singerInfo: []
    };
  },
  methods: {
    getArtistMenu() {
      this.axios({
        method: "get",
        url: "api/users/getartistmenu"
      })
        .then(res => {
          this.menu = res.data;
          this.title = this.menu[this.current].subtitle[this.subcurrent].title;
        })
        .catch(err => {
          throw err;
        });
    },
    change(index, i) {
      this.current = i;
      this.subcurrent = index;
    },
    getSingerInfo() {
        this.axios({
            method: "get",
            url: "api/users/getsingerinfo",
            params: this.$route.query.id
        }).then(res => {
            
        })
    }
  },
  created() {
    this.getArtistMenu();
    this.singerInfo = [
      {
        cover:
          "http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg?param=130y130",
        name: "JJ Lin"
      },
      {
        cover:
          "http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg?param=130y130",
        name: "JJ Lin"
      },
      {
        cover:
          "http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg?param=130y130",
        name: "JJ Lin"
      },
      {
        cover:
          "http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg?param=130y130",
        name: "JJ Lin"
      },
      {
        cover:
          "http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg?param=130y130",
        name: "JJ Lin"
      },
      {
        cover:
          "http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg?param=130y130",
        name: "JJ Lin"
      },
      {
        cover:
          "http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg?param=130y130",
        name: "JJ Lin"
      }
    ];
    console.log(this.$route.query.id);
  },
  watch: {
      
  }
};
</script>

<style lang="less" scoped>
.outer-box {
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0 13%;
  background: #f5f5f5;
}

.border-line {
  height: 100%;
  border: 1px solid #ccc;
  border-top: none;
  display: flex;

  .left {
    flex: 1;
    border-right: 1px solid #ccc;
    padding: 30px 10px;
    background: #f9f9f9;
  }

  .right {
    flex: 4;
    padding: 40px;
    background: #fff;
  }
}

.singer-kind {
  border-bottom: 1px solid #aaa;
  padding: 10px 0;

  .kind-title {
    padding-left: 10px;
    margin-bottom: 5px;
  }

  ul {
    li {
      height: 28px;
      line-height: 28px;
      margin-bottom: 3px;
      position: relative;
      a {
        padding: 0 0 0 25px;
        display: block;
        width: calc(100% - 25px);
        color: #333;
        font-size: 12px;
        height: 100%;
        line-height: 28px;
        position: relative;
      }

      a::after {
        content: "·";
        display: block;
        font-size: 20px;
        font-weight: 900;
        position: absolute;
        height: 100%;
        top: 0;
        left: 10px;
        line-height: 28px;
      }
    }

    .li-selected a {
      color: #337ab7;
    }

    .li-selected::before {
      content: "";
      position: absolute;
      display: block;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      top: 0;
      left: 0;
      border: 1px solid #ccc;
      background: linear-gradient(#fff, #f5f5f5);
    }
  }
}

.top {
  border-bottom: 2px solid #337ab7;
  font-size: 24px;
  padding-bottom: 10px;
}

.img-box {
  ul {
    margin: 20px 0 0 -2%;
    li {
      width: 18%;
      margin: 0 0 20px 2%;
      float: left;
      .img-container {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .singer-info {
        padding-top: 2px;
        font-size: 12px;
        color: #333;
        height: 24px;
        line-height: 24px;
      }
    }
  }
}
</style>