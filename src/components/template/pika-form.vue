<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form
    ref="form"
    label-position="right"
    label-width="120px"
    :model="formData"
  >
    <div
      v-for="(item, index) in table"
      v-show="item.tableColumnProp !== 'id'"
      :key="index"
    >
      <el-form-item
        :label="item.tableColumnLabel"
        :prop="item.tableColumnProp"
        :rules="item.tableColumnRules"
        v-if="!item.tableColumnType"
      >
        <el-input
          v-model="formData[item.tableColumnProp]"
          autocomplete="off"
          :placeholder="`请输入${item.tableColumnLabel}`"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="item.tableColumnLabel"
        :prop="item.tableColumnProp"
        :rules="item.tableColumnRules"
        v-else-if="item.tableColumnType === 'mapper'"
      >
        <el-select
          v-model="formData[item.tableColumnProp]"
          :placeholder="`请选择${item.tableColumnLabel}`"
        >
          <el-option
            v-for="(mapper, index1) in item.mappers"
            :label="mapper.mapperLabel"
            :value="mapper.mapperValue"
            :key="index1"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    formData: Object,
    table: Array,
  },
};
</script>

<style lang="scss" scoped></style>
