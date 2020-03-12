<template>
  <div>
    <div class="toolbar">
      <ul class="menu">
        <li>
          <router-link to="/findmusic/recommend">推荐</router-link>
        </li>
        <li>
          <router-link to="/findmusic/toplist">排行榜</router-link>
        </li>
        <li>
          <router-link to="/findmusic/playlist">歌单</router-link>
        </li>
        <li>
          <router-link to="/findmusic/artist">歌手</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
.toolbar {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #337ab7;
}

.menu {
  display: flex;
  justify-content: space-between;
  padding: 0 40% 0 26.5%;
  margin: 0;

  li {
    list-style: none;

    a {
      color: white;
    }
  }
}
</style>