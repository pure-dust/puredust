<template>
  <div class="main-content">
    <div class="header">
      <h1 class="logo">
        <a href class="title">尘心音乐</a>
      </h1>
      <ul class="menu">
        <li
          class="menu-item"
          data-index="1"
          @click="selected"
          :class="{ 'menu-item-selected': selected_index == 1 }"
        >
          <router-link to="/findmusic">发现音乐</router-link>
        </li>
        <li
          class="menu-item"
          data-index="2"
          @click="selected"
          :class="{ 'menu-item-selected': selected_index == 2 }"
        >
          <router-link to="/my">我的音乐</router-link>
        </li>
        <li
          class="menu-item"
          data-index="3"
          @click="selected"
          :class="{ 'menu-item-selected': selected_index == 3 }"
        >
          <router-link to="/friends">朋友</router-link>
        </li>
        <li class="menu-item">下载客户端</li>
      </ul>
      <div class="search-container">
        <span>
          <input type="text" class="search" placeholder="音乐/视频/歌手" />
        </span>
      </div>
      <div class="user">
        <div
          class="user-image"
          v-if="ifLogin"
          @mouseenter="showUserPanel"
          @mouseleave="showUserPanel"
        >
          <img :src="user_info.head_portrait" alt ref="user-image" />
        </div>
        <div v-else class="open-login">
          <a href="javascript:;" class="open-login" @click="openLogin">登录</a>
        </div>
        <div
          class="user-panel"
          v-show="ifshowUserPanel"
          @mouseenter="showUserPanel"
          @mouseleave="ifshowUserPanel && showUserPanel()"
        >
          <i class="top-arrow"></i>
          <ul>
            <li>
              <router-link :to="{path: '/user/home', query: {id: user_info.id}}">我的主页</router-link>
            </li>
            <li>
              <a href>我的消息</a>
            </li>
            <li>
              <a href>个人设置</a>
            </li>
            <li>
              <a href="#" @click="logout">退出登录</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="e-page" v-if="loginFlag">
        <div class="login-header">
          <span class="login-title">登录</span>
          <span class="close" @click="openLogin"></span>
        </div>
        <form>
          <div class="input-container">
            <label for="username">账号</label>
            <input type="text" class="username" id="username" autocomplete="off" ref="username" />
          </div>
          <div class="input-container">
            <label for="password">密码</label>
            <input type="password" class="password" id="password" autocomplete="off" ref="pwd" />
          </div>
        </form>
        <div class="fun-but">
          <input type="button" value="登录" class="login" @click="login" />
          <input type="button" value="注册" class="register" @click="openRegister" />
        </div>
      </div>
      <div class="e-page" v-if="r_flag">
        <div class="login-header">
          <span class="login-title">注册</span>
          <span class="close" @click="openRegister"></span>
        </div>
        <form>
          <div class="input-container">
            <label for="username">账号</label>
            <input type="text" class="username" id="username" autocomplete="off" ref="r_username" />
          </div>
          <div class="input-container">
            <label for="password">密码</label>
            <input type="password" class="password" id="password" autocomplete="off" ref="r_pwd" />
          </div>
        </form>
        <div class="fun-but">
          <input type="button" value="返回" class="login" @click="openRegister" />
          <input type="button" value="注册" class="register" @click="register" />
        </div>
      </div>
      <div class="shelter" v-if="loginFlag"></div>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
    <music-play class="music-play"></music-play>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      user_info: {},
      loginFlag: false,
      ifLogin: false,
      ifshowUserPanel: false,
      image: "",
      selected_index: this.$cookies.get("menu_index") || 1,
      isRouterAlive: true,
      r_flag: false
    };
  },
  methods: {
    openLogin() {
      this.loginFlag = !this.loginFlag;
    },
    openRegister() {
      this.r_flag = !this.r_flag;
      this.openLogin();
    },
    login() {
      let name = this.$refs.username.value;
      let pwd = this.$refs.pwd.value;
      this.axios({
        method: "GET",
        url: "api/users/user",
        params: {
          name: name,
          pwd: pwd
        }
      })
        .then(res => {
          if (res.data == "err") {
            console.log(this.$Toast);
            this.$Toast({ message: "用户名或密码错误", time: 3000 });
          } else {
            this.user_info = res.data;
            this.ifLogin = true;
            this.loginFlag = false;
            localStorage.clear();
            this.$store.commit("setUserInfo", res.data);
            this.$store.commit("setLoginState", this.ifLogin);
            this.getPlayList();
            this.getCollectionList();
            let redirect = decodeURIComponent(
              this.$route.query.redirect || this.$route.path
            );
            let query = this.$route.query || {};
            this.$router.push({ path: redirect, query: query });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    logout() {
      localStorage.clear();
      this.ifLogin = false;
      this.$store.commit("infoInit");
      this.showUserPanel();
      this.reload();
      this.$router.push({ path: "/" });
      localStorage.clear();
      this.$cookies.remove("menu_index");
      this.selected_index = 1;
    },
    showUserPanel() {
      this.ifshowUserPanel = !this.ifshowUserPanel;
    },
    getPlayList() {
      let user_id = this.$store.getters.getUserInfo.id;
      this.axios({
        method: "get",
        url: "api/users/getplaylist",
        params: {
          userId: user_id
        }
      })
        .then(res => {
          this.$store.commit("setUserMusicList", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCollectionList() {
      let user_id = this.$store.getters.getUserInfo.id;
      this.axios({
        method: "get",
        url: "api/users/getcollectedlist",
        params: {
          userId: user_id
        }
      })
        .then(res => {
          this.$store.commit("setUserCollectedList", res.data);
          this.collected_list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    selected(event) {
      this.selected_index = event.currentTarget.dataset.index;
      this.$cookies.set("menu_index", this.selected_index, 0);
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    beforeUnload() {
      this.$cookies.remove("l_id");
      this.$cookies.remove("l_s1");
      this.$cookies.remove("l_s2");
      this.$cookies.remove("menu_index");
    },
    register() {
      let name = this.$refs.r_username.value;
      let pwd = this.$refs.r_pwd.value;
      if (name == "" || name == undefined) {
        this.$Toast("用户名不能为空");
        return;
      } else if (pwd == "" || pwd == undefined) {
        this.$Toast("密码不能为空");
        return;
      }
      this.axios({
        method: "post",
        url: "api/users/createaccount",
        data: {
          name: name,
          pwd: pwd
        }
      })
        .then(res => {
          if (res.data == "exist") this.$Toast("该用户名已存在!");
          else if (res.data == "success") this.$Toast("注册成功!");
        })
        .catch(err => {
          this.$Toast("注册失败!");
          throw err;
        });
    }
  },
  created() {
    this.ifLogin = this.$store.getters.getLoginState;
    if (this.ifLogin) {
      this.user_info = this.$store.getters.getUserInfo;
      this.getPlayList();
      this.getCollectionList();
    }
    window.onbeforeunload = this.beforeUnload;
  }
};
</script>

<style lang="less" scoped>
.main-content {
  width: 100%;
  a {
    text-decoration: none;
    color: lightgray;
  }

  h1 {
    margin: 0;
  }

  .title {
    padding-left: 12%;
  }

  .header {
    display: flex;
    background-color: rgb(40, 40, 40);
    padding: 0 10%;
    align-items: center;
    height: 60px;

    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .logo {
    height: 60px;
    line-height: 60px;
    font-weight: 500;
    color: lightgrey;
    font-size: 24px;
    flex: 1;
    text-align: center;
    background: url(/assets/image/favicon.png) no-repeat 10% 50%;
    background-size: 20%;
  }
}

//导航栏
.menu {
  height: 60px;
  list-style: none;
  display: flex;
  line-height: 60px;
  color: lightgrey;
  font-size: 14px;
  flex: 3;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  cursor: pointer;

  .menu-item {
    flex-grow: 1;
    text-align: center;
  }

  .menu-item:hover {
    background-color: black;
  }

  .menu-item-selected {
    background: black;
  }
}

//搜索框
.search-container {
  flex: 1;
  display: flex;
  align-items: center;
  border: none;
  background-color: white;
  border-radius: 35px;
  text-align: center;
  height: 30px;
  box-sizing: border-box;
  margin: 0 45px;
  background-image: url(/assets/image/search.png);
  background-size: 10%;
  background-repeat: no-repeat;
  background-position: 90% 50%;

  .search {
    border: none;
    width: 70%;
    outline: none;
    height: 30px;
    line-height: 30px;
  }
}

//用户登录区域
.user {
  flex: 0.5;
  text-align: center;
  height: 60px;
  display: flex;
  justify-content: center;
  position: relative;
  .open-login {
    color: darkgray;
    height: 60px;
    line-height: 60px;
    font-size: 12px;

    a:hover {
      text-decoration: underline;
    }
  }
}

//登录界面
.e-page {
  z-index: 1001;
  width: 20%;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 30%;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 0px 10px black;

  .login-header {
    padding: 5px;
    background-color: #282828;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close {
      width: 10px;
      height: 10px;
    }

    .close::before {
      content: "";
      display: block;
      width: 20px;
      height: 5px;
      border-radius: 5px;
      background: white;
      transform: translateY(50%) translateX(-50%) rotateZ(45deg);
    }

    .close::after {
      content: "";
      display: block;
      width: 20px;
      height: 5px;
      border-radius: 5px;
      background: white;
      transform: translateY(-50%) translateX(-50%) rotateZ(-45deg);
    }
  }

  .login-title {
    color: white;
  }

  .input-container {
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
  }

  input[type="text"],
  input[type="password"] {
    border: 1px solid lightgray;
    border-radius: 5px;
    height: 25px;
    outline: none;
    padding-left: 5px;
    margin-left: 5px;
  }

  .fun-but {
    text-align: center;
    margin-bottom: 10px;
  }

  .login,
  .register {
    width: 80px;
    background-image: linear-gradient(#4b4b4b, #282828, #4b4b4b);
    border: 1px solid grey;
    border-radius: 3px;
    color: white;
    outline: none;
  }

  .login:hover,
  .register:hover {
    background-image: linear-gradient(#282828, #4b4b4b, #282828);
  }

  .login:active,
  .register:active {
    background-image: linear-gradient(#282828, #3b3b3b, #282828);
  }
}

//遮罩层
.shelter {
  z-index: 1000;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

//用户头像
.user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  align-self: center;
  overflow: hidden;

  img {
    width: 100%;
  }
}

//用户功能选项
.user-panel {
  background-color: #282828;
  position: absolute;
  width: 120px;
  top: 50px;
  border: 1px solid #202020;
  box-shadow: 0 0 20px #282828;
  z-index: 1000;

  ul {
    li {
      list-style: none;
      a {
        padding: 5px 0;
        display: block;
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
      }
    }

    li:hover {
      background-color: rgba(70, 70, 70, 0.3);
    }
  }
}
</style>