<template>
  <div
    class="m-compilation_icon"
    :class="`is-${label}`"
    :width="width"
    :height="height"
  >
    <img
      :src="require(`./assets/img/icons/icon_${label}.svg`)"
      alt=""
      :width="imgWidth"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true, default: '' },
    width: { type: String, required: true, default: '5rem' },
    height: { type: String, required: true, default: '5rem' },
    imgWidth: { type: String, require: true, default: 'auto' }
  }
}
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
