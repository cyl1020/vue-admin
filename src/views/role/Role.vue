<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="primary" @click="dialogVisible1 = true">创建角色</el-button>
          <el-button
            type="primary"
            :disabled="Object.keys(currentRow).length===0?true:false"
            @click="dialogVisible2 = true"
          >设置角色权限</el-button>
        </span>
      </div>
      <el-table
        v-loading="loading"
        border
        ref="multipleTable"
        :data="roleData.slice((currpage - 1)*pagesize, currpage*pagesize)"
        style="width: 100%"
        highlight-current-row
        :header-cell-style="{background: '#FAFAFA', color: '#000'}"
        @current-change="handleCurrentChange"
      >
        <el-table-column align="center" prop="index" width="60"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="320px"></el-table-column>
        <el-table-column prop="auth_time" label="授权时间" width="320px"></el-table-column>
        <el-table-column prop="auth_name" label="授权人"></el-table-column>
      </el-table>
      <el-pagination
        :page-size="pagesize"
        layout="prev, pager, next, jumper, total"
        :total="roleData.length"
        background
        :current-page.sync="currpage"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="dialogVisible1" width="40%">
      <AddForm ref="addform" @addformShow="addformShow" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addform">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="设置角色权限" :visible.sync="dialogVisible2" width="40%">
      <AuthForm ref="authform" :auth="currentRow" @authformShow="authformShow" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="authform">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleList } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import storageUtils from "../../utils/storageUtils";
import AddForm from "./AddForm";
import AuthForm from "./AuthForm";

export default {
  name: "Role",
  components: {
    AddForm,
    AuthForm
  },
  data() {
    return {
      pagesize: 4,
      currpage: 1,
      roleData: [],
      currentRow: {},
      dialogVisible1: false,
      dialogVisible2: false,
      loading: false
    };
  },
  methods: {
    async getRoleList() {
      this.loading = true;
      const result = await reqRoleList();
      if (result.status === 0) {
        this.loading = false;
        result.data.forEach((item, index) => {
          item.create_time = formateDate(item.create_time);
          item.auth_time = formateDate(item.auth_time);
          item.index = index + 1;
        });
        this.roleData = result.data;
      }
    },

    handleCurrentChange(val) {
      if (val) {
        this.currentRow = val;
      } else {
        this.currentRow = {};
      }
    },

    addform() {
      this.$refs.addform.submitForm();
    },

    addformShow(isShow) {
      this.dialogVisible1 = isShow.isShow;
      this.getRoleList();
      this.$message({
        message: "添加角色成功!",
        type: "success",
        center: true
      });
    },

    authform() {
      this.$refs.authform.getCheckedKeys();
    },

    authformShow(isShow) {
      this.dialogVisible2 = isShow.isShow;
      this.getRoleList();
      this.$message({
        message: "设置角色权限成功!",
        type: "success",
        center: true
      });
      const user = storageUtils.getUser();
      if (user.role.name === this.currentRow.name) {
        storageUtils.removeUser(); //清除内存中的user
        this.$store.commit("login", ""); //清除vuex中的user
        this.$store.commit("error", ""); //清除vuex中的错误消息
        this.$router.replace("/login");
        setTimeout(() => {
          this.$message({
            center: true,
            type: "warning",
            message: "所属角色权限发生更改，请重新登录!"
          });
        }, 500);
      }
    }
  },
  activated() {
    this.getRoleList();
  }
};
</script>

<style scoped>
.el-card {
  border: none;
  box-shadow: none;
  position: relative;
}

.input {
  display: flex;
  width: 40%;
}

/* .input .el-select {
  width: 200px;
} */

.input .el-input {
  margin: 0 10px;
  width: 240px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-pagination {
  margin: 20px 0;
  float: right;
}
</style>