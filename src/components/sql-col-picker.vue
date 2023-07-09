<template>
  <el-form
    label-position="right"
    label-width="150px"
    :model="item"
    :rules="colRules"
    ref="colForm"
  >
    <el-form-item label="生成列名" prop="colName">
      <el-input v-model="item.colName" placeholder="请输入生成列名"></el-input>
    </el-form-item>
    <SqlTypePicker v-model="item.colType"></SqlTypePicker>
    <el-form-item label="长度" prop="colLength">
      <el-input v-model="item.colLength" placeholder="请输入长度"></el-input>
    </el-form-item>
    <el-form-item label="是否自增" prop="isAutoIncrement">
      <el-select
        style="width: 350px"
        v-model="item.isAutoIncrement"
        placeholder="请选择是否为自增"
      >
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否为主键" prop="isPrimary">
      <el-select
        style="width: 350px"
        v-model="item.isPrimary"
        placeholder="请选择是否为主键"
      >
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!item.isPrimary" label="是否可为NULL" prop="nullable">
      <el-select
        style="width: 350px"
        v-model="item.nullable"
        placeholder="请选择是否可为NULL"
      >
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="默认值" prop="defaultValue">
      <el-input
        v-model="item.defaultValue"
        placeholder="请输入默认值"
      ></el-input>
    </el-form-item>
    <el-form-item label="列注释" prop="colComment">
      <el-input
        type="textarea"
        v-model="item.colComment"
        placeholder="请输入列注释"
      ></el-input>
    </el-form-item>
    <slot name="footer"></slot>
  </el-form>
</template>

<script>
import SqlTypePicker from "./sql-type-picker.vue";

export default {
  components: { SqlTypePicker },
  props: {
    colForm: {
      type: Object,
    },
  },
  watch: {
    colForm: {
      deep: true,
      handler(value) {
        this.item = value;
      },
    },
  },
  data() {
    return {
      item: {},
      // 列表校验规则
      colRules: {
        colName: [{ required: true, message: "请输入列名", trigger: blur }],
        colType: [{ required: true, message: "请选择列类型", trigger: blur }],
        colLength: [],
        isAutoIncrement: [
          {
            required: true,
            message: "请选择是否自增",
            trigger: blur,
          },
        ],
        isPrimary: [
          {
            required: true,
            message: "请选择是否为主键",
            trigger: blur,
          },
        ],
        nullable: [
          { required: true, message: "请选择是否可为NULL", trigger: blur },
        ],
        defaultValue: [],
        colComment: null,
      },
    };
  },
  created() {
    this.item = this.colForm;
  },
};
</script>

<style lang="scss" scoped></style>
