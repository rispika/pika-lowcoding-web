<template>
  <div>
    <!-- 编辑栏 -->
    <div class="edit-bar">
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
    <!-- 表单开始 -->
    <el-table :data="colForms" style="margin-top: 20px; width: 100%">
      <el-table-column prop="colId" label="列id" align="center" min-width="100">
      </el-table-column>
      <el-table-column
        prop="colName"
        label="列名"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="colType"
        label="类型"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="colLength"
        label="长度"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="isAutoIncrement"
        label="是否自增"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.isAutoIncrement === true">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isPrimary"
        label="是否为主键"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.isPrimary === true">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="nullable"
        label="是否可为NULL"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.nullable === true">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="defaultValue"
        label="默认值"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="colComment"
        label="注释"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单结束 -->
    <!-- 对话框开始 -->
    <!-- 对话框开始 -->
    <el-dialog
      :title="editFlag ? '修改列信息' : '添加列信息'"
      @closed="handleClosed"
      :visible.sync="dialogFormVisible"
    >
      <sql-col-picker ref="sqlPicker" :colForm="colForm"></sql-col-picker>
      <!-- 对话框脚 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框结束 -->
    <!-- 对话框结束 -->
  </div>
</template>

<script>
import SqlColPicker from "@/components/sql-col-picker.vue";
import {
  queryColsByTableId,
  removeCol,
  queryColByColId,
  updateColInfo,
  insertColInfo,
} from "@/api/generateApi";
import { removeConfirm } from "@/utils/util";
export default {
  name: "col-page",
  components: { SqlColPicker },
  data() {
    return {
      editFlag: true,
      dialogFormVisible: false,
      tableId: null,
      colForms: [],
      colForm: {
        colId: null,
        colName: "",
        colType: null,
        colLength: null,
        isAutoIncrement: null,
        isPrimary: null,
        nullable: null,
        defaultValue: null,
        colComment: null,
      },
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
          {
            required: true,
            message: "请选择是否可为空",
            trigger: blur,
          },
        ],
      },
    };
  },
  created() {
    this.tableId = this.$route.query.tableId;
    this.renderForm();
  },
  methods: {
    /**
     * 渲染表单
     */
    renderForm() {
      queryColsByTableId(this.tableId)
        .then((res) => {
          this.colForms = res.cols;
        })
        .catch(() => {});
    },
    // 修改操作
    handleEdit(row) {
      queryColByColId(row.colId)
        .then((res) => {
          this.colForm = res.col;
        })
        .catch(() => {});
      this.editFlag = true;
      this.dialogFormVisible = true;
    },
    handleClosed() {
      this.$refs["sqlPicker"].$refs["colForm"].resetFields();
    },
    handleAdd() {
      this.editFlag = false;
      this.dialogFormVisible = true;
    },
    /**
     * 删除
     * @param {Object} row
     */
    handleDelete(row) {
      removeConfirm(() => {
        removeCol(row.colId)
          .then(() => {
            this.$message.success("删除成功!");
            this.renderForm();
          })
          .catch(() => {});
      });
    },
    /**
     * 提交表单
     */
    submitForm() {
      this.$refs["sqlPicker"].$refs["colForm"].validate((value) => {
        if (!value) {
          this.$message.warning("请完善表单数据");
          return;
        } else {
          if (this.editFlag) {
            this.colForm.tableId = this.tableId;
            updateColInfo(this.colForm)
              .then(() => {
                this.$message.success("修改成功!");
                this.dialogFormVisible = false;
                this.renderForm();
              })
              .catch(() => {});
          } else {
            insertColInfo(this.colForm)
              .then(() => {
                this.$message.success("添加成功!");
                this.dialogFormVisible = false;
                this.renderForm();
              })
              .catch(() => {});
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
