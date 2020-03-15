<template>

</template>
<script>
export default {
  data() {
    return {
      id: ""
    };
  },
  method: {},
  created() {
    this.id = this.$route.query.id;
  }
};
</script>

<style>
</style>