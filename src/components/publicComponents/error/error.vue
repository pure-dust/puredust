<template>
  <div class="outer-box">
    <title>404</title>
    <p>很抱歉，您所找的页面不存在哦</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.outer-box {
  background-color: #fff;
}

title,
p {
  display: block;
  text-align: center;
  font-size: 10em;
  font-weight: 900;
}

title {
  font-style: italic;
  color: #666;
  text-shadow: 1px 1px 5px #333;
}

p {
  font-size: 1em;
  color: #aaa;
}
</style>