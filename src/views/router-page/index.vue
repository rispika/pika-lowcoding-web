<!-- 路由管理 -->
<template>
  <div>
    <!-- 编辑栏 -->
    <div class="edit-bar">
      <el-input
        type="text"
        v-model="queryForm.routerName"
        placeholder="路由名称"
        style="width: 220px"
      ></el-input>
      <el-select v-model="queryForm.routerLevel" placeholder="路由标识">
        <el-option label="" :value="null"></el-option>
        <el-option label="一级菜单" :value="1"></el-option>
        <el-option label="二级菜单" :value="2"></el-option>
        <el-option label="一级无孩子菜单" :value="0"></el-option>
        <el-option label="二级无孩子菜单" :value="-1"></el-option>
        <el-option label="三级无孩子菜单" :value="-2"></el-option>
        <el-option label="隐藏菜单" :value="-3"></el-option>
      </el-select>
      <el-button type="defualt" @click="getMenuList">搜 索</el-button>
      <el-button type="primary" @click="handleAdd">添 加</el-button>
    </div>
    <!-- 表格开始 -->
    <el-table :data="menu" max-height="700">
      <el-table-column prop="id" label="路由id" align="center" min-width="100">
      </el-table-column>
      <el-table-column
        prop="index"
        label="路由Index"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="路由名称"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column label="路由图标" align="center" min-width="100">
        <template slot-scope="scope">
          <pika-icon :name="scope.row.icon"></pika-icon>
          <span style="margin-left: 5px">{{ scope.row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="to"
        label="路由路径"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="parent"
        label="父路由ID"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="componentUrl"
        label="路由组件地址"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column label="菜单标识" align="center" min-width="100">
        <template slot-scope="scope">
          <el-tag>{{ getTag(scope.row.level) }}</el-tag>
        </template>
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
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 分页结束 -->
    <!-- 弹出框开始 -->
    <el-dialog
      @closed="dialogCloseHandler"
      :title="editFlag ? '路由编辑' : '路由添加'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :rules="rules"
        ref="form"
        label-width="120px"
        :model="form"
        label-position="right"
      >
        <el-form-item label="id" prop="id" v-show="editFlag">
          <el-input
            v-model="form.id"
            placeholder="请输入id"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="路由名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入路由名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由索引" prop="index">
          <el-input
            v-model="form.index"
            placeholder="请输入路由索引"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由图标" prop="icon">
          <el-input
            v-model="form.icon"
            placeholder="请选择路由图标"
            autocomplete="off"
            disabled
          >
            <template slot="prefix">
              <pika-icon :name="form.icon"></pika-icon>
            </template>
          </el-input>
          <el-button
            @click="visible = !visible"
            style="margin-top: 10px"
            type="primary"
            >选择</el-button
          >
        </el-form-item>
        <el-form-item label="路由标识" prop="level">
          <el-select v-model="form.level" placeholder="请选择路由标识">
            <el-option label="一级菜单" :value="1"></el-option>
            <el-option label="二级菜单" :value="2"></el-option>
            <el-option label="一级无孩子菜单" :value="0"></el-option>
            <el-option label="二级无孩子菜单" :value="-1"></el-option>
            <el-option label="三级无孩子菜单" :value="-2"></el-option>
            <el-option label="隐藏菜单" :value="-3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isFirstNode" label="父路由名称" prop="parent">
          <el-select
            v-model="form.parent"
            filterable
            :loading="loading"
            placeholder="请输入关键词"
            @visible-change="remoteMethod"
          >
            <el-option
              v-for="item in levelForm"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!hasChild" label="路由路径" prop="to">
          <el-input
            v-model="form.to"
            placeholder="请输入路由路径"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!hasChild" label="路由组件地址" prop="componentUrl">
          <el-input
            v-model="form.componentUrl"
            placeholder="请输入路由组件地址(例'/router-page/index'即寻找到地址'@/views/router-page/index')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框结束 -->
    <!-- 图标选择器 -->
    <icon-selector :visible="visible" @click="iconPick"></icon-selector>
    <!-- 图标选择器结束 -->
  </div>
</template>

<script>
import iconSelector from "@/components/icon-selector";
import routerApi from "@/api/routerApi";
import PikaIcon from "@/components/pika-icon";
export default {
  name: "router-page",
  components: {
    iconSelector,
    PikaIcon,
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      page: 1,
      size: 10,
      total: 0,
      menu: [],
      levelForm: [],
      visible: false,
      editFlag: true, //true 编辑 false 添加
      queryForm: {
        routerName: "",
        routerLevel: null,
      },
      form: {
        id: null,
        index: "",
        name: "",
        to: "",
        icon: "",
        componentUrl: "",
        parent: null,
        level: null,
      },
      rules: {
        index: [{ required: true, message: "请输入路由索引", trigger: "blur" }],
        name: [{ required: true, message: "请输入路由名称", trigger: "blur" }],
        to: [
          { required: true, message: "请选择路由组件地址", trigger: "blur" },
        ],
        icon: [],
        componentUrl: [
          { required: true, message: "请选择路由组件地址", trigger: "blur" },
        ],
        parent: [{ required: true, message: "请选择父路由", trigger: "blur" }],
        level: [{ required: true, message: "请选择路由标识", trigger: "blur" }],
      },
    };
  },
  computed: {
    /**
     * 判断路由是否存在子节点
     */
    hasChild() {
      return this.form.level > 0;
    },
    /**
     * 判断路由是否是一级菜单(或隐藏菜单),即不存在父节点
     */
    isFirstNode() {
      return (
        this.form.level === 1 || this.form.level === 0 || this.form.level === -3
      );
    },
  },
  methods: {
    remoteMethod(flag = true) {
      if (!flag) {
        return;
      }
      if (!this.form.level) {
        return;
      }
      this.loading = true;
      routerApi
        .getByLevel(Math.abs(this.form.level))
        .then((res) => {
          this.levelForm = res.route;
          console.log(this.levelForm);
          this.loading = false;
        })
        .catch(() => {});
    },
    iconPick(icon) {
      this.form.icon = icon;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getMenuList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getMenuList();
    },
    getTag(level) {
      if (level === 1) {
        return "一级菜单";
      } else if (level === 2) {
        return "二级菜单";
      } else if (level === 0) {
        return "一级无孩子菜单";
      } else if (level === -1) {
        return "二级无孩子菜单";
      } else if (level === -2) {
        return "三级无孩子菜单";
      } else if (level === -3) {
        return "隐藏菜单";
      } else {
        return "未知菜单";
      }
    },
    // 获取接口Api
    getMenuList() {
      routerApi
        .pikaMenuAdmin(this.page, this.size, this.queryForm)
        .then((res) => {
          this.menu = res.records;
          this.total = res.total;
        })
        .catch(() => {});
    },
    //添加
    handleAdd() {
      this.editFlag = false;
      this.dialogFormVisible = true;
    },
    // 根据id获取api信息
    handleEdit(row) {
      routerApi
        .getById(row.id)
        .then((res) => {
          let route = res.route;
          this.form = {
            id: route.id,
            index: route.index,
            name: route.name,
            to: route.to,
            icon: route.icon,
            componentUrl: route.componentUrl,
            parent: route.parent,
            level: route.level,
          };
        })
        .catch(() => {});
      this.editFlag = true;
      this.dialogFormVisible = true;
    },
    dialogCloseHandler() {
      this.$refs["form"].resetFields();
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return;
        }
        // 判断添加或修改
        if (this.editFlag) {
          routerApi
            .updateById(this.form)
            .then(() => {
              this.$message.success("路由数据修改成功");
              this.getMenuList();
              this.dialogFormVisible = false;
              this.$router.go(0);
            })
            .catch(() => {});
        } else {
          routerApi
            .save(this.form)
            .then(() => {
              this.$message.success("路由数据添加成功");
              this.getMenuList();
              this.dialogFormVisible = false;
              this.$router.go(0);
            })
            .catch(() => {});
        }
      });
    },
    // 删除接口
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          routerApi
            .removeById(row.id)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getMenuList();
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getMenuList();
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}
.edit-bar {
  border-bottom: $--light-border;
  padding-bottom: 20px;
  display: flex;
  gap: 15px;
  ::v-deep .el-button + .el-button,
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
  }
}
</style>
