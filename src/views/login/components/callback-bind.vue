<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="qqInfo.avatar" alt="" />
      <p>
        Hi，{{ qqInfo.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~
      </p>
    </div>
    <Form
      ref="target"
      autocomplete="off"
      :validation-schema="rules"
      v-slot="{ errors }"
    >
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            v-model="form.mobile"
            name="mobile"
            class="input"
            type="text"
            placeholder="绑定的手机号"
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
            placeholder="短信验证码"
          />
          <span class="code" @click="send">{{
            time > 0 ? `${time}s后发送` : '发送验证码'
          }}</span>
        </div>
        <div class="error" v-if="errors.code">{{ errors.code }}</div>
      </div>
    </Form>

    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import QC from 'qc'
import { Form, Field } from 'vee-validate'
import { mobile, code } from '@/utils/validate'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { useCountDown } from '@/hooks'
import { Message } from '@/components'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'CallbackBind',
  components: { Form, Field },
  props: {
    unionId: {
      type: String
    }
  },
  setup (props) {
    const target = ref(null)
    const qqInfo = reactive({
      nickname: '',
      avatar: ''
    })
    if (QC.Login.check()) {
      QC.api('get_user_info').success((res) => {
        qqInfo.avatar = res.data.figureurl_qq_1
        qqInfo.nickname = res.data.nickname
      })
    }

    const rules = { mobile, code }
    const form = reactive({
      mobile: '',
      code: ''
    })
    const { start, time } = useCountDown()
    const send = async () => {
      const msg = mobile(form.mobile)
      if (msg !== true) {
        return target.value.setFieldError('mobile', msg)
      }
      if (time.value > 0) return

      try {
        // 开始请求
        await userQQBindCode(form.mobile)
        start()
      } catch (error) {
        Message({ type: 'error', text: error.response.data.message })
      }
    }

    const router = useRouter()
    const store = useStore()
    const bind = async () => {
      // 对整体表单校验
      const valid = await target.value.validate()
      if (!valid) return
      try {
        // 发送请求，进行绑定
        const { result } = await userQQBindLogin({
          unionId: props.unionId,
          mobile: form.mobile,
          code: form.code
        })
        Message({ type: 'success', text: '绑定成功' })
        store.commit('user/setProfile', result)
        router.push('/')
      } catch (error) {
        Message({ type: 'error', text: error.response.data.message })
      }
    }

    return {
      qqInfo,
      rules,
      target,
      form,
      send,
      time,
      bind
    }
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
