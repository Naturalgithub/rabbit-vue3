<template>
  <XtxDialog
    :title="formData.id ? '修改收货地址' : '添加收获地址'"
    v-model:visible="dialogVisible"
  >
    <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="label">收货人：</div>
        <div class="field">
          <input
            class="input"
            placeholder="请输入收货人"
            v-model="formData.receiver"
          />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">手机号：</div>
        <div class="field">
          <input
            class="input"
            placeholder="请输入手机号"
            v-model="formData.contact"
          />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地区：</div>
        <div class="field">
          <XtxCity
            :fullLocation="formData.fullLocation"
            placeholder="请选择收获地区"
            @changeCity="changeCity"
          />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">详细地址：</div>
        <div class="field">
          <input
            class="input"
            placeholder="请输入详细地址"
            v-model="formData.address"
          />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">邮政编码：</div>
        <div class="field">
          <input
            class="input"
            placeholder="请输入邮政编码"
            v-model="formData.postalCode"
          />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地址标签：</div>
        <div class="field">
          <input
            class="input"
            placeholder="请输入地址标签，逗号分隔"
            v-model="formData.addressTags"
          />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">是否默认</div>
        <div class="field">
          <XtxSwitch
            v-model="formData.isDefault"
            :activeValue="0"
            :inactiveValue="1"
          ></XtxSwitch>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <XtxButton
        type="gray"
        style="margin-right: 20px"
        @click="dialogVisible = false"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="confirm">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { inject, reactive, ref, watch } from 'vue'
import { addAddress, editAddress } from '@/api/order'
export default {
  name: 'AddressEdit',
  setup () {
    const dialogVisible = ref(false)
    const open = (address) => {
      dialogVisible.value = true
      console.log(address)
      // const obj = address.value
      // console.log(address.countyCode)
      // 把address中所有的属性赋值给formData
      if (address) {
        // console.log('123')
        for (const k in address) {
          formData[k] = address[k]
        }
      }
    }

    // 表单数据
    const formData = reactive({
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1,
      fullLocation: ''
    })
    const changeCity = (city) => {
      console.log(city)
      formData.provinceCode = city.provinceCode
      formData.cityCode = city.cityCode
      formData.countyCode = city.countyCode
      formData.fullLocation =
        city.provinceName + ' ' + city.cityName + ' ' + city.countyName
    }
    const getInfo = inject('getInfo')
    const updateAddress = inject('updateAddress')
    const confirm = async () => {
      // 发送请求，添加一个地址
      // 表单的校验
      if (formData.id) {
        // 修改
        await editAddress(formData)
        // 不需要重新发送请求
        updateAddress({
          ...formData
        })
      } else {
        // 新增
        await addAddress(formData)
        // 重新获取地址信息
        getInfo()
      }
      dialogVisible.value = false
    }

    watch(dialogVisible, (value) => {
      if (!value) {
        for (const k in formData) {
          formData[k] = ''
        }
        formData.isDefault = 1
      }
    })
    return {
      dialogVisible,
      open,
      formData,
      changeCity,
      confirm
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
.xtx-switch {
  transform: translateY(15px);
}
</style>
