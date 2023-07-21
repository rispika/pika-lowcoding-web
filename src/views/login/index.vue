<template>
  <div class="login-page">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="login-form"
      :label-position="labelPosition"
    >
      <div class="login-title">Pika管理系统</div>
      <el-form-item label="账号" prop="account">
        <el-input
          type="text"
          v-model="loginForm.account"
          autocomplete="off"
          oninput="value=value.replace(/[\u4e00-\u9fa5/\s+/]|[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <div class="login-submit">
        <el-button type="primary" @click="submitForm('loginForm')"
          >登录</el-button
        >
        <!-- <el-button @click="resetForm('loginForm')">重置</el-button> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/userApi";
export default {
  name: "login-page",
  data() {
    // 密码校验
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    // 账号校验
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("账号长度在6-15个之间"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "top",
      loginForm: {
        account: "pika@admin",
        password: "123456",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: validateAccount, trigger: "blur" }],
      },
    };
  },
  methods: {
    /**
     * 提交表单
     * @param {String} formName
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginForm.account, this.loginForm.password)
            .then((res) => {
              console.log(res);
              this.$router.push("/home");
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
  async created() {},
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("../../assets/img/bg1.png");
  background-size: cover;
  background-position: center;
}
.login-title {
  font-size: 32px;
  margin-bottom: 32px;
  text-align: center;
  color: #4379d9;
}
.login-form {
  width: 500px;
  height: 400px;
  background-color: rgba(240, 248, 255, 0.444);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  .el-form-item__label {
    font-size: 100px;
  }
  .login-submit .el-button {
    margin-top: 20px;
    width: 500px;
    text-align: center;
  }
}
</style>
