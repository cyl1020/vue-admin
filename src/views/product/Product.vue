<template>
  <div class="product">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="input">
          <el-select v-model="form.region" width="100%" placeholder="请选择搜索类型">
            <el-option label="按商品名称搜索" value="productName"></el-option>
            <el-option label="按商品描述搜索" value="productDesc"></el-option>
          </el-select>
          <el-input placeholder="请输入搜索关键字" v-model="select" @keyup.enter.native="search"></el-input>
          <el-button type="primary" @click="search">
            <i class="el-icon-search"></i>
            <span>搜索</span>
          </el-button>
        </span>
        <el-button type="primary" class="button" @click="$router.push('/admin/product/addorupdate')">
          <i class="el-icon-plus"></i>
          <span>添加商品</span>
        </el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="product.list"
        border
        style="width: 100%"
        :header-cell-style="{background: '#FAFAFA', color: '#000'}"
      >
        <el-table-column prop="name" label="商品名称" width="150px"></el-table-column>
        <el-table-column prop="desc" label="商品描述"></el-table-column>
        <el-table-column prop="price" label="价格" width="150px"></el-table-column>
        <el-table-column label="状态" width="220px">
          <template slot-scope="scope">
            <span class="status" :class="{color: scope.row.status!==1}">{{scope.row.status | status}}</span>
            <el-button
              type="primary"
              @click="changeStatus(scope.$index, scope.row)"
            >{{scope.row.status | option}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.$index, scope.row)">详情</el-button>
            <el-button type="text" @click="addorupdate(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next, jumper, total"
        :total="product.total"
        background
        :current-page.sync="pageNum"
        @current-change="changepage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { reqProduct, updateStatus, reqSearchProducts } from "../../api";

export default {
  name: "Product",
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      product: {},
      form: {
        region: "productName"
      },
      select: "",
      loading: false,
    };
  },
  methods: {
    async getProduct(pageNum, pageSize) {
      this.loading = true
      const result = await reqProduct(pageNum, pageSize);
      if (result.status === 0) {
        this.loading = false
        this.product = result.data;
        this.product.list.forEach(item => (item.price = "￥" + item.price));
      } else {
        this.$message("产品数据请求失败了!");
      }
    },
    changepage(currentpage) {
      this.pageNum = currentpage
      this.getProduct(currentpage, this.pageSize);
    },

    async changeStatus(index, product) {
      const status = product.status === 1 ? 2 : 1;
      const result = await updateStatus(product._id, status);
      if (result.status === 0) {
        this.$message({
          message: `<span style="font-weight:900; color:orange">${product.name}</span>状态更新为${product.status === 1 ? `<span style="color:gray">已下架</span>` : `<span style="color:red">在售</span>`}`,
          type: "success",
          center: true,
          dangerouslyUseHTMLString: true
        });
        this.getProduct(this.pageNum, this.pageSize);
      } else {
        this.$message({
          message: `<span style="color:red">${product.name}</span>状态更新失败`,
          type: "error",
          center: true,
          dangerouslyUseHTMLString: true
        });
      }
    },

    async search() {
      const { pageSize } = this;
      const searchName = this.select;
      const searchType = this.form.region;
      const result = await reqSearchProducts({
        pageNum: 1,
        pageSize,
        searchName,
        searchType
      });
      if(searchName==='') {
        this.pageNum = 1
      }
      if (result.status === 0 && result.data.list.length > 0) {
        this.product = result.data;
        this.product.list.forEach(item => (item.price = "￥" + item.price));
        this.$message({
          message: "搜索商品成功！",
          type: "success",
          center: true
        });
        this.select = ''
      } else {
        this.$message({
          message: '暂无搜索商品，请更换关键字!',
          type: "warning",
          center: true
        }),
        this.select = ''
      }
    },

    detail(index, product) {
      this.$router.push({
        path: '/admin/product/detail',
        query: product
      })
    },

    addorupdate(index, product) {
      this.$router.push({
        path: '/admin/product/addorupdate',
        query: product
      })
    }
  },
  activated() {
    this.getProduct(this.pageNum, this.pageSize);
  },
  filters: {
    status(value) {
      return value === 1 ? "在售" : "已下架";
    },
    option(value) {
      return value === 1 ? "下架" : "上架";
    }
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

.el-card .clearfix .button {
  padding: 10px 15px;
  position: absolute;
  top: 20px;
  right: 20px;
}

.el-table .status {
  border: 1px solid #409eff;
  color: red;
  border-radius: 5px;
  padding: 9px 20px;
  margin: 0 15px;
}

.el-table .color {
  color: #c0c0c0;
}

.el-pagination {
  margin: 20px 0;
  float: right;
}
</style>