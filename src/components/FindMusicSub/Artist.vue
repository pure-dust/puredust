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
        <div v-if="this.$route.path == '/findmusic/artist/'">
          <div class="top">
            <span class="top-title">入驻歌手</span>
          </div>
          <div class="img-box">
            <ul>
              <li v-for="(item, i) in singerInfo" :key="i">
                <div class="img-container">
                  <router-link :to="{path: '/artist', query: {id: item.id}}">
                    <img class="list-item" :src="item.cover" alt />
                  </router-link>
                </div>
                <div class="singer-info">{{ item.name }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="top">
            <span>{{ subtitle }}</span>
          </div>
          <div class="img-box">
            <div class="initial-search" v-if="current != 0">
              <router-link
                :to="{path: menu[current].subtitle[subcurrent].url, query: { id: menu[current].subtitle[subcurrent].query, iniatial: -1 } }"
                class="hot"
                :class="{'router-link-exact-active': !this.$route.query.initial}"
              >热门</router-link>
              <router-link
                v-for="(item, i) in initial_box"
                :key="i"
                :to="{path: '/findmusic/artist/cat', query:{id: menu[current].subtitle[subcurrent].query,initial: item}}"
              >{{ item }}</router-link>
            </div>
            <ul>
              <li v-for="(item, i) in singerInfo" :key="i">
                <div class="img-container">
                  <router-link :to="{path: '/artist', query: {id: item.id}}">
                    <img class="list-item" :src="item.cover" alt />
                  </router-link>
                </div>
                <div class="singer-info">{{ item.name }}</div>
              </li>
            </ul>
          </div>
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
      singerInfo: [],
      subtitle: "",
      initial_box: []
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
          ? this.$route.query.initial
            ? { id: this.$route.query.id, initial: this.$route.query.initial }
            : { id: this.$route.query.id }
          : {}
      })
        .then(res => {
          this.singerInfo = res.data;
          this.subtitle = this.menu[this.current].subtitle[
            this.subcurrent
          ].title;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created() {
    this.getArtistMenu();
    this.getSingerInfo();
    for (let i = 0; i < 26; i++)
      this.initial_box[i] = String.fromCharCode(65 + i);
  },
  mounted() {},
  watch: {
    routePath(val) {
      this.getSingerInfo();
    }
  },
  computed: {
    routePath() {
      return this.$route.query;
    }
  }
};
</script>

<style lang="less" scoped>
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

.initial-search {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  span {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    color: #333;
  }

  a {
    color: #333;
    width: 18px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    display: block;
  }

  .hot {
    width: 40px;
  }

  .router-link-exact-active {
    background: #337ab7;
    border-radius: 3px;
    color: #fff;
  }
}
</style>