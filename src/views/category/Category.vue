<template>
  <div class="categrory">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <span v-if="isShow">一级分类列表</span>
          <span v-else>
            <span style="color: #1A93F7;cursor: pointer;" @click="showCategory">一级分类列表</span>&nbsp;
            <i class="el-icon-right">&nbsp;{{currentCategory.name}}</i>
          </span>
        </span>
        <el-button type="primary" @click="dialogForm2">
          <i class="el-icon-plus"></i>
          <span>添加</span>
        </el-button>
      </div>
      <!-- 实现分页效果 -->
      <el-table
        v-loading="loading"
        :data="category.slice((currpage - 1)*pagesize, currpage*pagesize)"
        border
        style="width: 100%"
        :header-cell-style="{background: '#FAFAFA', color: '#000'}"
      >
        <el-table-column prop="name" label="分类"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogForm1(scope.$index, scope.row)">修改分类</el-button>
            <el-button
              type="text"
              @click="showChildren(scope.$index, scope.row)"
              v-show="isShow"
            >查看子分类</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="pagesize"
        layout="prev, pager, next, jumper, total"
        :total="category.length"
        background
        :current-page.sync="currpage"
      ></el-pagination>
    </el-card>
    <el-dialog title="修改分类" :visible.sync="dialogFormVisible1" width="40%">
      <UpdateForm :row="row" ref="updateform" @updateChange="updateChange" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateform">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible2" width="40%">
      <AddForm :currentCategory="currentCategory" ref="addform" @addChange="addChange" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addform">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UpdateForm from "./UpdateForm";
import AddForm from "./AddForm";

import { mapActions, mapState } from "vuex";

export default {
  name: "Category",
  components: {
    UpdateForm,
    AddForm
  },
  data() {
    return {
      pagesize: 3,
      currpage: 1,
      currentCategory: {},
      // currentpage: 1
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      row: {},
      loading: false
    };
  },
  computed: {
    ...mapState(["category"]),
    isShow() {
      return this.currentCategory.parentId !== "0" ? true : false;
    }
  },
  methods: {
    ...mapActions(["getCategory"]),

    // handleCurrentChange(val) {
    //   this.currpage = val;
    //   // if (this.currentCategory.parentId !== "0") {
    //   //   this.currentpage = val;
    //   // }
    // },

    showChildren(index, row) {
      this.currentCategory = row;
      this.getCategory(row._id);
    },

    showCategory() {
      this.currentCategory = {};
      this.currpage = 1;
      this.getCategory("0");
    },

    dialogForm1(index, row) {
      this.dialogFormVisible1 = true;
      this.row = row;
    },

    updateform() {
      this.$refs.updateform.updateForm();
    },

    updateChange(obj) {
      this.dialogFormVisible1 = obj.show;
    },

    dialogForm2() {
      this.dialogFormVisible2 = true;
    },

    addform() {
      this.currentCategory = {};
      this.currpage = 1;
      this.$refs.addform.addForm();
    },

    addChange(obj) {
      this.dialogFormVisible2 = obj.show;
    }
  },
  mounted() {
    this.loading = true;
    this.getCategory("0");
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>

<style scoped>
.el-card {
  border: none;
  box-shadow: none;
  position: relative;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-card .clearfix .el-button {
  padding: 10px 15px;
  position: absolute;
  top: 10px;
  right: 20px;
}

.el-pagination {
  margin: 20px 0;
  float: right;
}
</style>