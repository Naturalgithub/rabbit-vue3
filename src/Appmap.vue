<template>
  <SuperMap></SuperMap>
</template>

<script>
import SuperMap from '@/superMap'
// import axios from '@/utils/request'
export default {
  components: { SuperMap },
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
