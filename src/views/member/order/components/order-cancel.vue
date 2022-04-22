<template>
  <XtxDialog title="取消订单" v-model:visible="visibleDialog">
    <!-- 组件内容 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="cancelText = item"
          :class="{ active: cancelText === item }"
          href="javascript:;"
          v-for="item in cancelReason"
          :key="item"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <XtxButton
        type="gray"
        style="margin-right: 20px"
        @click="visibleDialog = false"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="submit">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { ref, watch } from 'vue'
import { cancelReason } from '@/api/constants'
import { Message } from '@/components'
import { cancelOrder } from '@/api/order'
export default {
  name: 'OrderCancel',
  setup () {
    debugger
    const visibleDialog = ref(false)
    const cancelText = ref('')
    const currentOrder = ref(null)
    const open = (order) => {
      visibleDialog.value = true
      currentOrder.value = order
    }

    const submit = async () => {
      // console.log('发送请求，取消订单')
      // console.log(cancelText.value)
      // console.log(currentOrder.value)
      if (!cancelText.value) {
        return Message({ type: 'warning', text: '请选择取消订单的原因' })
      }
      await cancelOrder(currentOrder.value.id, cancelText.value)
      // 关闭弹窗
      visibleDialog.value = false
      // 修改订单状态
      currentOrder.value.orderState = 6
    }

    watch(visibleDialog, () => {
      if (!visibleDialog.value) {
        cancelText.value = ''
      }
    })
    return {
      visibleDialog,
      cancelReason,
      cancelText,
      open,
      submit
    }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
