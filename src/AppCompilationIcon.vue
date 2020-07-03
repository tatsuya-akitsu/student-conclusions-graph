<template>
  <div
    class="m-compilation_icon"
    :class="`is-${label}`"
    :width="width"
    :height="height"
  >
    <img
      :src="path"
      alt=""
      :width="imgWidth"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    label: { type: String, required: true, default: '' },
    width: { type: String, required: true, default: '5rem' },
    height: { type: String, required: true, default: '5rem' },
    imgWidth: { type: String, require: true, default: 'auto' }
  },

  setup (props) {
    const state = reactive({
      path: computed(() => {
        switch (label) {
          case 'selEq':
            return './assets/img/icons/icon_selEq.svg'
          case 'grit':
            return './assets/img/icons/icon_grit.svg'
          case 'motivation':
            return './assets/img/icons/icon_motivation.svg'
          case 'deviation':
            return './assets/img/icons/icon_deviation.svg'
        }
      })
    })

    return {
      label: props.label,
      width: props.width,
      height: props.height,
      imgWidth: props.imgWidth,
      path: state.path
    }
  }
});
</script>

<style lang="scss" scoped>
.m-compilation_icon {
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;

  &.is-selEq {
    background: #e5f7ff;
  }

  &.is-grit {
    background: #f9f0fc;
  }

  &.is-motivation {
    background: #e5f9f5;
  }

  &.is-deviation {
    background: #e6eef4;
  }
}

img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
