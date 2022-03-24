<template>
  <router-view></router-view>
</template>

<script>
// import axios from '@/utils/request'
export default {
  async created () {
    // const res = await axios.get('/home/index')
    // console.log(res)
  }
}
</script>
<style lang="less" scoped>
// @import '~@/assets/styles/variables.less';
// @import '~@/assets/styles/mixins.less';
h1 {
  background-color: @xtxColor;
  .hoverShadow();
}
</style>
