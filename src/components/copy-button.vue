<template>
  <el-button v-bind="customizedAttrs" @click="copy">
    <slot></slot>
  </el-button>
</template>

<script>
import Clipboard from "clipboard";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: [Function, String],
      required: true,
    },
  },
  computed: {
    customizedAttrs() {
      return {
        ...this.$attrs,
        id: this.id,
        text: this.text,
      };
    },
  },
  methods: {
    copy() {
      let clipboard = new Clipboard(`#${this.id}`, {
        text: this.text instanceof String ? () => this.text : this.text,
      });
      //复制成功
      clipboard.on("success", () => {
        this.$message.success("复制成功！");
        clipboard.destroy();
      });
      //复制失败
      clipboard.on("error", () => {
        this.$message.error("该浏览器不支持自动复制!");
        clipboard.destory();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
