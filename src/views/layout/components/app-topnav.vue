<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li>
          <RouterLink to="/member">
            <i class="iconfont icon-user"></i>{{ profile.account }}
          </RouterLink>
        </li>
        <template v-if="profile.token">
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Message } from '@/components/index'
export default {
  name: 'AppTopnav',
  setup () {
    const store = useStore()
    const router = useRouter()

    const profile = computed(() => {
      return store.state.user.profile
    })

    // 退出功能
    const logout = () => {
      // 清空购物车
      store.commit('cart/setCartList', [])
      // 清除个人信息
      store.commit('user/setProfile', {})
      router.push('/login')
      Message({ type: 'success', text: '退出成功' })
    }

    return {
      profile,
      logout
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
