<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods?.categories[1].id}`">
          {{ goods?.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods?.categories[0].id}`">
          {{ goods?.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ goods?.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods?.mainPictures"></GoodsImage>
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 名字区组件 -->
          <GoodsName v-if="goods" :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku v-if="goods" :goods="goods" @changeSku="changeSku" />
          <!-- 数量组件 -->
          <XtxNumbox v-model="num" :max="goods?.inventory"></XtxNumbox>
          <!-- 加入购物车 -->
          <XtxButton type="primary" style="margin-top: 20px"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods?.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot
            v-for="item in hotArr"
            :type="item.id"
            :title="item.title"
            :Key="item.id"
          ></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods-tabs'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn.vue'
import { provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup () {
    const goods = useGoods()
    // 跨级通讯
    provide('goods', goods)

    const num = ref(1)
    // 更改商品响应式数据
    const changeSku = (sku) => {
      if (sku) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }

    const hotArr = ref([
      {
        id: 1,
        title: '24小时热销榜'
      },
      {
        id: 2,
        title: '周热销榜'
      },
      {
        id: 3,
        title: '总热销榜'
      }
    ])

    return {
      goods,
      changeSku,
      num,
      hotArr
    }
  }
}

// 优化商品数据的获取 要放在export default下面
// 获取商品数据
const useGoods = () => {
  // 获取商品详情数据
  const goods = ref(null)
  const route = useRoute()
  findGoods(route.params.id).then((res) => {
    goods.value = res.result
  })
  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
    .xtx-button {
      margin-top: 20px;
    }
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
