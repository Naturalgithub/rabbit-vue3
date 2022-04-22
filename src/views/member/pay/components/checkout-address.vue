<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!showAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ showAddress.contact }}</li>
        <li>
          <span>收货地址：</span
          >{{ showAddress.fullLocation + showAddress.address }}
        </li>
      </ul>
      <a href="javascript:;" @click="target.open(showAddress)">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="dialogVisible = true">切换地址</XtxButton>
      <XtxButton class="btn" @click="target.open()">添加地址</XtxButton>
    </div>
    <XtxDialog title="选择收货地址" v-model:visible="dialogVisible">
      <div
        class="text item"
        v-for="item in list"
        :key="item.id"
        @click="selectedAddress = item"
        :class="{ active: selectedAddress?.id === item.id }"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
      <template #footer>
        <XtxButton
          type="gray"
          style="margin-right: 10px"
          @click="dialogVisible = false"
          >取消</XtxButton
        >
        <XtxButton type="primary" @click="confirm"> 确定 </XtxButton>
      </template>
    </XtxDialog>
    <AddressEdit ref="target"></AddressEdit>
  </div>
</template>

<script>
import AddressEdit from './address-edit'
import { provide, ref, watch } from 'vue'
export default {
  name: 'CheckoutAddress',
  components: {
    AddressEdit
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    /*
      确定默认的收获地址
      1. 从list中查找isDefault为0的默认收货地址
      2. 如果没有，把数组的第一项作为默认收获地址
    */
    const showAddress = ref(null)

    watch(
      () => props.list,
      () => {
        if (props.list.length > 0) {
          const defaultAddress = props.list.find((item) => item.isDefault === 0)
          if (defaultAddress) {
            showAddress.value = defaultAddress
          } else {
            showAddress.value = {
              ...props.list[0]
            }
          }
          // 需要子传父的方式，把默认的显示的收货地址id传给父组件
          selectedAddress.value = showAddress.value
          emit('changeAddress', showAddress.value.id)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    const dialogVisible = ref(false)
    const selectedAddress = ref(null)

    const confirm = () => {
      dialogVisible.value = false
      showAddress.value = selectedAddress.value
      emit('changeAddress', selectedAddress.value.id)
    }

    const target = ref(null)

    const updateAddress = (address) => {
      showAddress.value = address
      selectedAddress.value = address
    }

    provide('updateAddress', updateAddress)
    return {
      showAddress,
      dialogVisible,
      selectedAddress,
      confirm,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
      }
    }
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
