<template>
  <div class="xtx-form">
    <Form
      ref="target"
      autocomplete="off"
      :validation-schema="rules"
      v-slot="{ errors }"
    >
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-user"></i>
          <Field
            v-model="form.account"
            name="account"
            class="input"
            type="text"
            placeholder="请输入用户名"
          />
        </div>
        <div class="error" v-if="errors.account">{{ errors.account }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            v-model="form.mobile"
            name="mobile"
            class="input"
            type="text"
            placeholder="请输入手机号"
          />
        </div>
        <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field
            v-model="form.code"
            name="code"
            class="input"
            type="text"
            placeholder="请输入验证码"
          />
          <span class="code" @click="send">
            {{ time > 0 ? `${time}s后发送` : '发送验证码' }}
          </span>
        </div>
        <div class="error" v-if="errors.code">{{ errors.code }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            v-model="form.password"
            name="password"
            class="input"
            type="password"
            placeholder="请输入密码"
          />
        </div>
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            v-model="form.rePassword"
            name="rePassword"
            class="input"
            type="password"
            placeholder="请确认密码"
          />
        </div>
        <div class="error" v-if="errors.rePassword">
          {{ errors.rePassword }}
        </div>
      </div>
    </Form>
    <a href="javascript:;" class="submit" @click="bind">立即提交</a>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useCountDown } from '@/hooks'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { account, mobile, code, password, rePassword } from '@/utils/validate'
import { Message } from '@/components'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'CallbackPatch',
  components: { Form, Field },
  props: {
    unionId: {
      type: String
    }
  },
  setup (props) {
    const target = ref(null)
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null
    })
    const rules = { account, mobile, code, password, rePassword }

    // 发送验证码
    const { time, start } = useCountDown()
    const send = async () => {
      const msg = mobile(form.mobile)
      console.log(msg)
      if (msg !== true) {
        target.value.setFieldError('mobile', msg)
        return
      }
      // 校验通过
      if (time.value === 0) {
        try {
          await userQQPatchCode(form.mobile)
          // 倒计时
          start()
        } catch (e) {
          Message({ type: 'error', text: e.response.data.message })
        }
      }
    }

    const router = useRouter()
    const store = useStore()
    // 立即绑定
    const bind = async () => {
      const valid = await target.value.validate()
      if (valid) {
        try {
          const { result } = await userQQPatchLogin(props.unionId, form)
          // 登录成功
          store.commit('user/setProfile', result)
          // 合并购物车
          store.dispatch('cart/mergeLocalCart').then(() => {
            // 跳转到首页
            router.push('/')
            Message({ type: 'success', text: 'QQ完善信息成功' })
          })
        } catch (error) {
          Message({ type: 'error', text: '完善信息失败' })
        }
      }
    }

    return {
      rules,
      form,
      send,
      target,
      time,
      bind
    }
  }
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
