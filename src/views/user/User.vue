<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="primary" @click="addUser">创建用户</el-button>
        </span>
      </div>
      <el-table
        border
        ref="multipleTable"
        style="width: 100%"
        highlight-current-row
        :header-cell-style="{background: '#FAFAFA', color: '#000'}"
        :data="userData.slice((currpage - 1)*pagesize, currpage*pagesize)"
      >
        <el-table-column prop="username" label="用户名" width="120px"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话" width="160px"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="role_name" label="所属角色" width="120px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button type="text" @click="updateUser(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="pagesize"
        layout="prev, pager, next, jumper, total"
        :total="userData.length"
        background
        :current-page.sync="currpage"
      ></el-pagination>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <AddUser
        ref="userForm"
        :roleData="roleData"
        :currentUser="currentUser"
        @addorupdateuser="addorupdate"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorupdateuser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqUserList, reqDeleteUser } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import AddUser from "./AddUser";

export default {
  name: "User",
  components: {
    AddUser
  },
  data() {
    return {
      pagesize: 3,
      currpage: 1,
      userData: [],
      roleData: [],
      dialogVisible: false,
      currentUser: {}
    };
  },
  computed: {
    title() {
      return Object.keys(this.currentUser).length !== 0 ? '修改用户' : '添加用户'
    }
  },
  methods: {
    async getUserList() {
      const result = await reqUserList();
      if (result.status === 0) {
        result.data.roles.forEach(role => {
          result.data.users.forEach(user => {
            if (user.role_id === role._id) {
              user.role_name = role.name;
              user.create_time = formateDate(user.create_time);
            }
          });
        });
        this.userData = result.data.users;
        this.roleData = result.data.roles;
      }
    },

    addUser() {
      this.currentUser = {};
      this.dialogVisible = true;
    },

    updateUser(index, user) {
      this.currentUser = user;
      this.dialogVisible = true;
    },

    deleteUser(index, user) {
      this.$confirm(
        `此操作将永久删除用户<span style="color:red">${user.username}</span>, 是否继续?`,
        "删除用户",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const result = await reqDeleteUser(user._id);
          if (result.status === 0) {
            this.getUserList();
            this.$message({
              message: `删除用户<span style="color:red">${user.username}</span>成功!`,
              type: "success",
              center: true,
              dangerouslyUseHTMLString: true
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    addorupdateuser() {
      this.$refs.userForm.userForm();
    },

    addorupdate(isShow) {
      this.dialogVisible = isShow.isShow
      this.getUserList()
    }
  },
  mounted() {
    this.getUserList();
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