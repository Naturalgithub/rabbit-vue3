<template>
  <XtxTabs v-model="activeName" @tabClick="tabClick">
    <XtxTabsPanel
      v-for="item in orderStatus"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    ></XtxTabsPanel>
  </XtxTabs>
  <!-- 订单列表 -->
  <div class="order-list">
    <div v-if="loading" class="loading"></div>
    <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
    <OrderItem
      v-for="item in orderList"
      :key="item.id"
      :order="item"
      @onCancel="onCancel"
      @onDelete="onDelete"
      @onConfirm="onConfirm"
      @onLogistics="onLogistics"
    ></OrderItem>
  </div>

  <!-- 分页 -->
  <XtxPagination
    :page="reqParams.page"
    :pageSize="reqParams.pageSize"
    :total="total"
    @currentChange="currentChange"
  ></XtxPagination>

  <OrderCancel ref="target"></OrderCancel>

  <OrderLogistics ref="logisticsTarget"></OrderLogistics>
</template>

<script>
import { ref, watch, reactive } from 'vue'
import { orderStatus } from '@/api/constants'
import { deleteOrder, findOrderList, confirmOrder } from '@/api/order'
import OrderItem from './components/order-item.vue'
import OrderCancel from './components/order-cancel.vue'
import OrderLogistics from './components/order-logistics.vue'
import { Confirm, Message } from '@/components'
export default {
  components: {
    OrderItem,
    OrderCancel,
    OrderLogistics
  },
  setup () {
    const activeName = ref('all')
    const loading = ref(false)
    // 发送请求获取订单数据
    const reqParams = reactive({
      orderState: 0,
      page: 1,
      pageSize: 5
    })
    const orderList = ref([])
    const total = ref(0)

    const getList = () => {
      loading.value = true
      findOrderList(reqParams).then((res) => {
        total.value = res.result.counts
        orderList.value = res.result.items
        loading.value = false
      })
    }
    watch(
      reqParams,
      () => {
        getList()
      },
      {
        immediate: true
      }
    )

    const tabClick = ({ index }) => {
      reqParams.orderState = index
      reqParams.page = 1
    }

    const currentChange = (value) => {
      reqParams.page = value
    }
    const target = ref(null)
    const onCancel = (order) => {
      // console.log('取消订单', order)
      target.value.open(order)
    }

    // 删除订单
    const onDelete = async (item) => {
      try {
        await Confirm({ text: '你确定要删除该订单吗' })
      } catch {
        return
      }
      // 发送请求
      await deleteOrder([item.id])
      // console.log(res)
      getList()
      Message({ text: '删除订单成功' })
    }

    // 查看物流
    const logisticsTarget = ref(null)
    const onLogistics = (item) => {
      // console.log('查看物流', item)
      logisticsTarget.value.open(item)
    }
    return {
      activeName,
      orderStatus,
      orderList,
      tabClick,
      loading,
      total,
      reqParams,
      currentChange,
      onCancel,
      target,
      onDelete,
      ...useConfirm(),
      onLogistics,
      logisticsTarget
    }
  }
}

export const useConfirm = () => {
  // 确认收货
  const onConfirm = async (item) => {
    try {
      await Confirm({ text: '你确定要确认收货吗' })
    } catch {
      return
    }
    // 发送请求
    await confirmOrder(item.id)
    // console.log(res)
    item.orderState = 4
    Message({ text: '确认收货成功' })
  }
  return {
    onConfirm
  }
}
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(~@/assets/images/loading.gif)
    no-repeat center 300px;
}
.none {
  height: 600px;
  text-align: center;
  line-height: 600px;
  color: #999;
}
</style>
