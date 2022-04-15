<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <GoodsItem v-for="item in goodsList" :key="item" :good="item" />
  </div>
</template>
<script>
// import GoodsItem from '@/views/category/components/goods-item.vue'
import GoodsItem from '@/views/category/components/goods-item'
import { findHotGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'GoodsHot',
  components: {
    GoodsItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: '24小时热榜'
    }
  },
  setup (props) {
    // 处理标题
    const route = useRoute()
    // 商品列表
    const goodsList = ref([])
    findHotGoods({ id: route.params.id, type: props.type }).then((data) => {
      goodsList.value = data.result.map((item) => {
        item.tag = item.desc
        return item
      })
    })
    return { goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
}
</style>
