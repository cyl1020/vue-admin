<template>
  <div class="adduser">
    <el-form :model="form" label-width="80px" :rules="rules" ref="userForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="Object.keys(currentUser).length===0">
        <el-input
          v-model="form.password"
          :type="type"
          placeholder="请输入密码"
          clearable
          class="password"
        ></el-input>
        <el-switch v-model="show" active-color="#13ce66" inactive-color="#ececec"></el-switch>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id" placeholder="请选择角色" clearable>
          <el-option v-for="role in roleData" :key="role._id" :label="role.name" :value="role._id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqAddOrUpdateUser } from "../../api";
export default {
  name: "AddUser",
  props: {
    roleData: {
      type: Array,
      default() {
        return [];
      }
    },
    currentUser: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        phone: "",
        email: "",
        role_id: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "change"
          }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      show: false
    };
  },
  methods: {
    userForm() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const { username, password, phone, email, role_id } = this.form;
          let user = { username, password, phone, email, role_id };
          if (this.currentUser) {
            user._id = this.currentUser._id;
          }
          const result = await reqAddOrUpdateUser(user);
          if (result.status === 0) {
            this.$emit("addorupdateuser", { isShow: false });
            this.$message({
              message: `${user._id ? "更新用户成功" : "添加用户成功"}`,
              type: "success",
              center: true
            });
          } else {
            this.$emit("addorupdateuser", { isShow: false });
            this.$message({
              message: `添加用户失败,原因:<span style="font-weight:900; color:red">${result.msg}</span>`,
              type: "warning",
              center: true,
              dangerouslyUseHTMLString: true
            });
          }
          this.$refs.userForm.resetFields();
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    type() {
      return this.show ? "text" : "password";
    }
  },
  mounted() {
    if (this.currentUser) {
      this.form.username = this.currentUser.username;
      this.form.password = this.currentUser.password;
      this.form.phone = this.currentUser.phone;
      this.form.email = this.currentUser.email;
      this.form.role_id = this.currentUser.role_id;
    }
  },
  watch: {
    currentUser(value) {
      if (value) {
        this.form.username = value.username;
        this.form.password = value.password;
        this.form.phone = value.phone;
        this.form.email = value.email;
        this.form.role_id = value.role_id;
      }
    }
  },
  deactivated() {
    this.$refs.userForm.resetFields();
  }
};
</script>

<style scoped>
.el-form-item {
  width: 90%;
}

.el-select {
  width: 100%;
}

.password {
  position: relative;
}

.el-switch {
  position: absolute;
  top: 50%;
  margin-left: 10px;
  transform: translateY(-50%);
}
</style>