<template>
  <div
    class="m-compilation_icon"
    :class="`is-${label}`"
    :width="width"
    :height="height"
  >
    <template v-if="label === 'selEq'">
      <icon-sel-eq :style="{ width: imgWidth }"></icon-sel-eq>
    </template>
    <template v-else-if="label === 'grit'">
      <icon-grit :style="{ width: imgWidth }"></icon-grit>
    </template>
    <template v-else-if="label === 'motivation'">
      <icon-motivation :style="{ width: imgWidth }"></icon-motivation>
    </template>
    <template v-else-if="label === 'deviation'">
      <icon-deviation :style="{ width: imgWidth }"></icon-deviation>
    </template>
    <img
      :src="path"
      alt=""
      :width="imgWidth"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from '@vue/composition-api'
import IconDeviation from '@/IconDeviation'
import IconGrit from '@/IconGrit'
import IconMotivation from '@/IconMotivation'
import IconSelEq from '@/IconSelEq'

export default defineComponent({
  components: {
    IconDeviation,
    IconGrit,
    IconMotivation,
    IconSelEq
  },

  props: {
    label: { type: String, required: true, default: '' },
    width: { type: String, required: true, default: '5rem' },
    height: { type: String, required: true, default: '5rem' },
    imgWidth: { type: String, require: true, default: 'auto' }
  },

  setup (props) {
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

svg {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
