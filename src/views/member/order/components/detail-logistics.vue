<template>
  <div class="detail-logistics">
    <p>
      <span>{{ logistics.list[0].time }}</span>
      <span>{{ logistics.list[0].text }}</span>
    </p>
    <a href="javascript:;" @click="show">查看物流</a>
    <Teleport to="body">
      <OrderLogistics ref="logisticsTarget"></OrderLogistics>
    </Teleport>
  </div>
</template>
<script>
import { logisticsOrder } from '@/api/order'
import { ref } from 'vue'
import OrderLogistics from './order-logistics.vue'
export default {
  name: 'DetailLogistics',
  components: {
    OrderLogistics
  },
  props: {
    order: Object
  },
  // setup默认不允许添加async如果添加了async，必须配合suspense组件
  async setup (props) {
    const logistics = ref(null)
    // 发送请求-获取订单物流信息
    const res = await logisticsOrder(props.order.id)
    logistics.value = res.result

    const logisticsTarget = ref(null)
    const show = () => {
      logisticsTarget.value.open(props.order)
    }
    return {
      logistics,
      logisticsTarget,
      show
    }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  transform: translate(10px, 10px);
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
