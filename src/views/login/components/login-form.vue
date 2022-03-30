<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="isMsgLogin" @click="isMsgLogin = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" v-else @click="isMsgLogin = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="target"
      :validation-schema="rules"
      class="form"
      v-slot="{ errors }"
      autocomplete="off"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              v-model="form.account"
              type="text"
              placeholder="请输入用户名"
              name="account"
              :class="{ error: errors.account }"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>

        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              name="password"
              :class="{ error: errors.password }"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="mobile"
              v-model="form.mobile"
              type="text"
              placeholder="请输入手机号"
              :class="{ error: errors.mobile }"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              name="code"
              v-model="form.code"
              type="password"
              placeholder="请输入验证码"
              :class="{ error: errors.code }"
            />
            <span class="code">发送验证码</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree"></Field>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { Message } from '@/components/index'
import { useRouter } from 'vue-router'
import { userAccountLogin } from '@/api/user'
import { Form, Field, configure } from 'vee-validate'
import {
  account,
  mobile,
  password,
  code,
  isAgree,
  resetFormData
} from '@/utils/validate'
configure({
  validateOnBlur: true,
  validateOnInput: true
})
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    // 是否使用短信登录
    const isMsgLogin = ref(false)

    watch(isMsgLogin, () => {
      // 重置表单数据 为了调试方便这里默认同意为true
      resetFormData(form, (form) => (form.isAgree = true))
    })

    // 登录
    const target = ref(null)
    const router = useRouter()
    const login = async () => {
      // console.log('发送请求登录')
      const res = await target.value.validate()
      if (!res) return

      try {
        const res = await userAccountLogin(form.account, form.password)
        console.log(res)
        Message({ type: 'success', text: '登录成功' })
        // 跳转到首页
        router.push('/')
      } catch (e) {
        Message({ type: 'error', text: e.response.data.message })
      }
    }

    const form = reactive({
      account: '',
      password: '',
      mobile: '',
      code: '',
      isAgree: true
    })
    // 表单校验规则
    const rules = {
      // 校验的时候，如果返回true，校验通过
      // 如果返回的不是true，而是其他值，校验失败，而且返回值就是校验的提示信息
      account,
      password,
      mobile,
      code,
      isAgree
    }
    return {
      isMsgLogin,
      target,
      rules,
      form,
      login
    }
  }
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
