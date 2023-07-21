<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    @closed="dialogClosed"
    :title="form.title"
    :visible.sync="newVisible"
  >
    <pika-form ref="pika-form" :table="table" :form-data="formData"></pika-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="$emit('submitForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import pikaForm from "@/components/template/pika-form";
export default {
  components: {
    pikaForm,
  },
  props: {
    table: Array,
    formData: Object,
    form: Object,
    visible: Boolean,
  },
  methods: {
    /**
     * 对话框关闭触发钩子
     * 默认用于重置表单信息
     */
    dialogClosed() {
      this.$refs["pika-form"].$refs["form"].resetFields();
    },
  },
  computed: {
    newVisible: {
      get() {
        return this.visible;
      },
      set(newVal) {
        this.$emit("update:visible", newVal);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
