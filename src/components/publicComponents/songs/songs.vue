<template>
  <div class="music-content">
    <table :class="{'outer-border': !flag}">
      <tr v-if="flag">
        <th></th>
        <th>标题</th>
        <th>时长</th>
        <th>歌手</th>
      </tr>
      <tr v-for="(item, i) in song_list" :key="i">
        <td>{{ i + 1 }}</td>
        <td>
          <router-link :to="{path: '/song', query: {id: item.music_id}}">{{ item.music_name }}</router-link>
        </td>
        <td>{{ item.time }}</td>
        <td>{{ item.music_singer }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    song_list: {
      type: Array
    },
    flag: {
      type: Boolean
    }
  }
};
</script>

<style lang="less" scoped>
.music-content {
  table {
    width: 100%;
    border: 1px solid rgba(28, 28, 28, 0.3);
    border-collapse: collapse;

    a {
      color: #282828;
    }

    a:hover {
      text-decoration: underline;
    }

    th,
    td {
      font-weight: normal;
      color: #282828;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      font-size: 12px;
    }

    th {
      background: linear-gradient(rgb(255, 255, 255), rgb(235, 235, 235));
      border: 1px solid rgba(28, 28, 28, 0.3);
    }

    tr:nth-child(even) {
      background-color: white;
    }

    tr:nth-child(odd) {
      background-color: rgba(230, 230, 230, 0.6);
    }

    td {
      height: 30px;
      line-height: 30px;
    }

    td:nth-child(1),
    th:nth-child(1) {
      width: 10%;
    }

    td:nth-child(2),
    th:nth-child(2) {
      width: 55%;
    }

    td:nth-child(3),
    th:nth-child(3) {
      width: 15%;
    }
  }
}

.music-content .outer-border {
  border: none;
}
</style>