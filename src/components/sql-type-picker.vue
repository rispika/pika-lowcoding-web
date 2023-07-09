<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form-item label="列类型" prop="colType">
    <el-select
      filterable
      style="width: 350px"
      @change="change"
      :value="typeId"
      placeholder="请选择列类型"
    >
      <el-option
        v-for="(item, index) in types"
        :key="index"
        :label="item.name"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { queryAllSqlTypes } from "@/api/generateApi";
export default {
  name: "sql-type-pikcer",
  data() {
    return {
      types: [],
    };
  },
  model: {
    prop: "typeId",
    event: "change",
  },
  props: {
    typeId: {
      type: Number,
    },
  },
  methods: {
    change(value) {
      return this.$emit("change", value);
    },
    async render() {
      await queryAllSqlTypes()
        .then((res) => {
          for (let i in res) {
            this.types.push({
              value: Number(i),
              name: res[i],
            });
          }
        })
        .catch(() => {});
    },
  },
  created() {
    this.render();
  },
};
</script>

<style lang="scss" scoped></style>
