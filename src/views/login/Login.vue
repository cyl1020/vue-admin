<template>
  <div class="login">
    <header class="login-header">
      <img src="../../assets/images/logo-cyl.png" alt />
      <h2>Vue项目：后台管理系统</h2>
    </header>
    <section class="content">
      <div :class="{'error': error ? true : false}">{{error}}</div>
      <h3>用户登录</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="ruleForm.username"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            type="password"
            clearable
            @keyup.enter.native="submitForm('ruleForm')"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="button">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import storageUtils from "../../utils/storageUtils";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名 !", trigger: "change" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码 !", trigger: "change" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["user", "error"])
  },
  methods: {
    ...mapActions(["login"]),
    submitForm(formName) {
      //先进行表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          const username = this.ruleForm.username;
          const password = this.ruleForm.password;
          this.login({ username, password });
          setTimeout(() => {
            const user = this.user;
            if (user && user._id) {
              storageUtils.saveUser(user);
              this.$router.replace("/admin/home");
              this.$message({
                center: true,
                showClose: true,
                message: `登录成功! 欢迎你  ${user.username}`,
                type: "success"
              });
              this.$refs[formName].resetFields();
            }
          }, 800);
        } else {
          return false;
        }
      });
    }
  },
  activated() {
    const user = storageUtils.getUser();
    if (user && user._id) {
      this.$router.replace("/admin/home");
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("./images/bg.jpg");
  background-size: 100% 100%;
}

.login .login-header {
  width: 100%;
  height: 80px;
  background-color: rgba(21, 20, 13, 0.5);
  display: flex;
  align-items: center;
}

.login .login-header img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 30px 0 50px;
  position: relative;
  top: 12px;
}

.login .login-header h2 {
  font-size: 30px;
  color: white;
  font-weight: 100;
}

.login .content {
  width: 400px;
  height: 300px;
  background-color: #fff;
  margin: 80px auto;
  border-radius: 5px;
  position: relative;
  animation: animation 1s linear;
}

.login .content h3 {
  font-size: 30px;
  text-align: center;
  line-height: 70px;
  color: #000;
}

.login .content .demo-ruleForm {
  width: 80%;
  margin: 20px auto;
}

.login .content .button {
  width: 100%;
  margin: 10px auto;
  display: block;
}

.login .content .error {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: red;
  color: #fff;
  border-radius: 5px 5px 0 0;
  position: absolute;
  top: -20px;
}

@keyframes animation {
  0% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>