<template>
  <div class="auto-add">
    <!-- 步骤栏 -->
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="自动生成表"></el-step>
      <el-step title="自动生成列"></el-step>
      <el-step title="校验并确认"></el-step>
    </el-steps>
    <!-- 步骤栏结束 -->
    <el-container class="pika-container">
      <transition name="el-fade-in" mode="out-in">
        <!-- 表单开始 -->
        <div class="table-form" key="table-form" v-if="active === 1">
          <!-- 第一个表单开始 -->
          <el-form
            style="width: 500px"
            label-position="right"
            label-width="150px"
            :model="tableForm"
            :rules="rule"
            :ref="`form`"
          >
            <el-form-item label="生成表名" prop="tableName">
              <el-input
                v-model="tableForm.tableName"
                placeholder="请输入生成表名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="生成表注释" prop="tableComment">
              <el-input
                placeholder="请输入生成表注释"
                type="textarea"
                :rows="10"
                v-model="tableForm.tableComment"
              ></el-input>
            </el-form-item>
            <el-button-group style="margin: 20px" class="flex-center">
              <el-button
                type="primary"
                @click="reset('form')"
                icon="el-icon-refresh-left"
              >
                重 置
              </el-button>
              <el-button type="primary" @click="next('form')"
                >下一页<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </el-button-group>
          </el-form>
          <!-- 第一个表单结束 -->
        </div>
        <!-- 第二步骤开始 -->
        <!-- 第二步骤开始 -->
        <!-- 第二步骤开始 -->
        <div class="col-form" key="col-form" v-if="active == 2">
          <!-- 第二步表单开始 -->
          <!-- 标签开始 -->
          <el-tabs
            tab-position="left"
            @tab-add="tabAdd"
            @tab-remove="tabRemove"
            editable
            style="height: 100%"
          >
            <el-tab-pane
              v-for="(item, index) in colForms"
              :key="index"
              :name="index + ''"
              :label="item.colName"
            >
              <sql-col-picker ref="sqlPicker" :col-form="colForms[index]">
                <template slot="footer">
                  <el-button-group style="margin: 20px" class="flex-center">
                    <el-button
                      type="primary"
                      icon="el-icon-arrow-left"
                      @click="preview"
                      >上一页</el-button
                    >
                    <el-button
                      type="primary"
                      @click="reset('colForm', index)"
                      icon="el-icon-refresh-left"
                    >
                      重 置
                    </el-button>
                    <el-button type="primary" @click="next('colForm')"
                      >下一页<i class="el-icon-arrow-right el-icon--right"></i
                    ></el-button>
                  </el-button-group>
                </template>
              </sql-col-picker>
            </el-tab-pane>
          </el-tabs>
          <!-- 标签结束 -->
        </div>
        <!-- 第二步结束 -->
        <!-- 第二步结束 -->
        <!-- 第二步结束 -->

        <!-- 第三步开始 -->
        <div class="col-table" key="col-table" v-if="active == 3">
          <el-table :data="[tableForm]" style="width: 100%; height: 700px">
            <el-table-column prop="tableId" label="sql表id" width="180">
            </el-table-column>
            <el-table-column prop="tableName" label="sql表名" width="180">
            </el-table-column>
            <el-table-column prop="tableComment" label="sql表注释" width="180">
            </el-table-column>
          </el-table>
          <el-table :data="colForms" style="width: 100%">
            <el-table-column prop="colName" label="列名" width="180">
            </el-table-column>
            <el-table-column prop="colType" label="类型" width="180">
            </el-table-column>
            <el-table-column prop="colLength" label="长度" width="180">
            </el-table-column>
            <el-table-column
              prop="isAutoIncrement"
              label="是否自增"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="isPrimary" label="是否为主键" width="180">
            </el-table-column>
            <el-table-column prop="nullable" label="是否可为NULL" width="180">
            </el-table-column>
            <el-table-column prop="defaultValue" label="默认值" width="180">
            </el-table-column>
            <el-table-column prop="colComment" label="注释" width="380">
            </el-table-column>
          </el-table>
          <el-button-group style="margin: 20px" class="flex-center">
            <el-button type="primary" icon="el-icon-arrow-left" @click="preview"
              >上一页</el-button
            >
            <el-button type="primary" @click="addTable"
              >确认添加<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </el-button-group>
        </div>
        <!-- 第三部结束 -->
      </transition>
    </el-container>
  </div>
</template>

<script>
import { insertGenerateTable } from "@/api/generateApi";
import SqlColPicker from "@/components/sql-col-picker.vue";

export default {
  name: "generate-add-page",
  components: { SqlColPicker },
  data() {
    return {
      active: 1,
      tableForm: {
        tableId: null,
        tableName: null,
        tableComment: null,
      },
      colForms: [
        {
          colName: "colName",
          colType: null,
          colLength: null,
          isAutoIncrement: null,
          isPrimary: null,
          nullable: null,
          defaultValue: null,
          colComment: null,
        },
      ],
      rule: {
        tableName: [{ required: true, message: "请输入表单名", trigger: blur }],
        tableComment: [],
      },
    };
  },
  methods: {
    /**
     * 根据ref检查数据返回结果
     * @param {String} refName
     * @return {Boolean}
     */
    check(refName) {
      let flag = true;
      if (refName === "colForm") {
        for (const i in this.$refs["sqlPicker"]) {
          this.$refs["sqlPicker"][i].$refs[refName].validate((value) => {
            if (!value) {
              flag = false;
            }
          });
        }
      } else {
        this.$refs[refName].validate((value) => {
          if (!value) {
            flag = false;
          }
        });
      }
      return flag;
    },
    /**
     * 上一步
     */
    preview() {
      this.active--;
    },
    /**
     * 校验前往下一页
     * @param {String} refName
     */
    next(refName) {
      if (this.check(refName)) {
        this.active++;
      } else {
        this.$message.warning("请完善表单数据");
      }
    },
    /**
     * 重 置表单
     * @param {String} refName
     * @param {Number} index
     */
    reset(refName, index = 0) {
      if (refName == "colForm") {
        this.$refs["sqlPicker"][index].$refs[refName].resetFields();
      } else {
        this.$refs[refName].resetFields();
      }
    },
    /**
     * 添加tab
     */
    tabAdd() {
      if (this.check("colForm")) {
        this.colForms.push({
          colName: "colName",
        });
        this.$message.success("创建成功!");
      } else {
        this.$message.warning("请完善表单数据");
      }
    },
    /**
     * 根据tab名称删除tab
     * @param {tab名称} name
     */
    tabRemove(name) {
      if (this.colForms.length <= 1) {
        this.$message.warning("至少存在一个列");
      } else {
        this.colForms.splice(name, 1);
        this.$message.success("删除成功!");
      }
    },
    /**
     * 添加自动生成表单
     */
    addTable() {
      insertGenerateTable({
        generateTable: this.tableForm,
        generateCols: this.colForms,
      })
        .then(() => {
          this.$message.success("添加成功!");
          this.$router.push({ name: "生成表管理" });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.auto-add {
  height: 100%;
  .pika-container {
    position: relative;
    height: calc(100% - 100px);
  }
}
.table-form {
  position: absolute;
  margin-top: 40px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 5px;
  overflow: auto;
}
.col-form {
  box-sizing: border-box;
  position: absolute;
  margin-top: 40px;
  height: 100%;
}
.col-table {
  position: absolute;
  box-sizing: border-box;
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
:deep(.el-tabs__nav) {
  width: 30vw;
}
</style>
