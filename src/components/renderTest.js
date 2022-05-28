import { watch } from 'vue'
export default {
  render: function (createElement, context) {
    return <div>asdasd</div>
  },
  props: {
    minWidth: {
      type: Number,
      default: 64
    }
  },
  setup (props) {
    watch(
      props,
      (v) => {
        console.log('xixix')
      },
      {
        deep: true,
        immediate: true
      }
    )
  }
}
