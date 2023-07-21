<template>
  <div>
    <!-- 搜索栏模板 -->
    <pika-query
      :query-data.sync="searchData"
      :query-list="searchList"
      @query="renderTable"
      @add="handleAdd"
    ></pika-query>
    <!-- 表格模板 -->
    <pika-table :table="table" :table-data="tableData">
      <!-- 操作栏 -->
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </pika-table>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <pika-pagination
      @pagination-change="renderTable"
      :pagination.sync="pagination"
    ></pika-pagination>
    <!-- 分页结束 -->
    <!-- 对话框 -->
    <pika-dialog
      :form="form"
      :table="table"
      :formData="formData"
      :visible.sync="dialogFormVisible"
      @submitForm="submitForm"
    ></pika-dialog>
    <!-- 对话框结束 -->
  </div>
</template>

<script>
import { queryTemplateInfo } from "@/api/generateApi";

import {
  selectAll,
  selectOne,
  insert,
  update,
  deleteByIds,
} from "@/api/auto/testApi";
export default {
  name: "default-template",
  data() {
    return {
      // 分页
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      // 搜索栏
      searchList: [],
      searchData: {},
      // 表格
      table: [
        {
          tableColumnLabel: "路由id",
          tableColumnProp: "id",
          tableColumnRules: [
            { required: true, message: "请输入id", trigger: "blur" },
          ],
        },
        {
          tableColumnLabel: "路由名称",
          tableColumnProp: "routerName",
        },
        {
          tableColumnLabel: "是否为null",
          tableColumnProp: "isNull",
          tableColumnType: "mapper",
          mappers: [
            {
              mapperLabel: "是",
              mapperValue: true,
            },
            {
              mapperLabel: "否",
              mapperValue: false,
            },
          ],
        },
      ],
      tableData: [
        {
          id: "112312",
          routerName: "哈哈",
          isNull: true,
        },
      ],
      // 表单
      form: {
        title: "修改表单",
      },
      formData: {},
      // 编辑标识
      editFlag: true,
      // dialog隐藏标识
      dialogFormVisible: false,
    };
  },
  methods: {
    /**
     * 渲染模板信息
     */
    renderTemplate() {
      queryTemplateInfo("1")
        .then((res) => {
          this.table = res.tableColumns;
        })
        .catch(() => {});
    },
    /**
     * 渲染表格信息
     */
    renderTable() {
      selectAll(this.pagination.page, this.pagination.size, this.searchData)
        .then((res) => {
          this.tableData = res.records;
          // 解决bug
          if (res.total < (this.pagination.page - 1) * this.pagination.size) {
            this.page = Math.floor(res.total / this.size);
            this.renderTable();
          }
          this.pagination.total = res.total;
        })
        .catch(() => {});
    },
    /**
     * 处理编辑按钮点击事件
     * @param {Object} row
     */
    handleEdit(row) {
      selectOne(row.id)
        .then((res) => {
          this.formData = res.data;
        })
        .catch(() => {});
      this.editFlag = true;
      this.dialogFormVisible = true;
    },
    /**
     * 处理删除按钮点击事件
     * @param {Object} row
     */
    handleDelete(row) {
      this.$util.removeConfirm(() => {
        deleteByIds(row.id)
          .then(() => {
            this.$message.success("删除成功!");
            this.renderTable();
          })
          .catch(() => {});
      });
    },
    /**
     * 处理添加按钮
     */
    handleAdd() {
      this.editFlag = false;
      this.dialogFormVisible = true;
    },

    /**
     * 提交表单
     */
    submitForm() {
      if (this.editFlag) {
        // 编辑
        update(this.formData)
          .then(() => {
            this.$message.success("修改成功!");
            this.renderTable();
            this.dialogFormVisible = false;
          })
          .catch(() => {});
      } else {
        // 添加
        insert(this.formData)
          .then(() => {
            this.$message.success("添加成功!");
            this.renderTable();
            this.dialogFormVisible = false;
          })
          .catch(() => {});
      }
    },
  },
  watch: {
    table() {
      this.table.forEach((column) => {
        if (column.searchFlag) {
          this.searchList.push(column);
        }
      });
    },
  },
  created() {
    this.renderTemplate();
    this.renderTable();
  },
};
</script>

<style lang="scss" scoped>
.table-template {
  width: 100%;
}
</style>
