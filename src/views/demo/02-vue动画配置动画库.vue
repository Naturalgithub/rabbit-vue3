<template>
  <button @click="show = !show">change</button>

  <Transition
    name="aa"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutRight"
  >
    <div v-show="show">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
      consequatur recusandae explicabo obcaecati consequuntur laborum nostrum
      repudiandae quaerat ut possimus, voluptates enim dolorum et accusamus quo
      beatae optio deserunt debitis asperiores minima blanditiis odio voluptate
      dolore. Rem sequi pariatur quod, voluptatum commodi tempora harum nihil
      repellendus est fugiat totam asperiores, in architecto quaerat
      exercitationem. Perferendis quia voluptatum ipsum iste numquam sint magnam
      voluptates modi quisquam dolor deserunt quis explicabo, reprehenderit
      voluptatem doloremque soluta, voluptas asperiores molestiae et! Eius rem
      quia id! Laudantium minus, odio minima quas dicta eligendi! Mollitia,
      quaerat. Pariatur, beatae. Architecto cupiditate tenetur odit ipsam nemo
      similique? Quam.
    </div>
  </Transition>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    const show = ref(true)

    return {
      show
    }
  }
}
</script>
<style lang="less" scoped>
div {
  width: 400px;
}
</style>
