<template>
  <div class="outer-box">
    <div class="inner-box">
      <div class="header">
        <p class="title">全部</p>
      </div>
      <div class="list-container">
        <div v-for="(item, i) in music_list" :key="i" class="detail-container">
          <div class="img-container">
            <router-link
              :to="{path: '/playlist',query:{id:item.id}}"
              :title="item.title"
              class="link"
            >
              <img :src="item.cover" alt class="list-item" />
            </router-link>
          </div>
          <div class="bottom">
            <a :href="item.url" :title="item.title">{{ item.name }}</a>
          </div>
        </div>
      </div>
      <div class="toobar">
        <a href="javascript:;" class="btn arrow">&lt; 上一页</a>
        <div class="page">
          <a href="javascript:;" class="btn select-item">1</a>
        </div>
        <a href="javascript:;" class="btn arrow">下一页 &gt;</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list_kinds: [],
      music_list: [],
      select: []
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
    },
    getAllList() {
      this.axios({
        method: "get",
        url: "api/users/getallplaylist"
      })
        .then(res => {
          this.music_list = res.data;
          for (let i = 0; i < this.music_list.length; i++) {
            this.select[i] = {
              num: i + 1,
              id: this.music_list[i].id
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.init();
    this.getAllList();
  }
};
</script>

<style lang="less" scoped>
.outer-box {
  border-bottom: 1px solid rgba(28, 28, 28, 0.3);
  .inner-box {
    padding: 40px;
    min-height: 600px;
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

    .link {
      width: 100%;
      height: 100%;
      position: absolute;
      display: block;
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

  .btn {
    display: block;
    color: #3f3f4f;
    border: 1px solid #aaaaaa;
    border-radius: 3px;
    margin: 0 3px;
  }

  .select-item {
    font-size: 10px;
    padding: 3px 6px;
    background: #ffffff;
  }

  .select-item:hover {
    border: 1px solid #444444;
  }

  .arrow {
    padding: 4px 8px;
    font-size: 12px;
    background: linear-gradient(white, #eeeeee);
  }
}
</style>