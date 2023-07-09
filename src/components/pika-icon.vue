<template>
  <i
    v-if="name"
    @click="clickEvent"
    :style="{
      'font-size': fontSize,
      '--hover-color': '#409EFF',
    }"
    :class="[
      {
        iconfont: name.substring(0, 7) !== 'el-icon',
        hover: pointer,
        pointer: pointer,
      },
      name,
    ]"
  ></i>
</template>

<script>
export default {
  name: "pika-icon",
  props: {
    name: {
      type: String,
      default: "el-icon-warning-outline",
    },
    fontSize: {
      type: String,
      default: "18px",
    },
    pointer: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {
    clickEvent(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.hover {
  &:hover {
    color: var(--hover-color);
  }
}
.pointer {
  cursor: pointer;
}
</style>
