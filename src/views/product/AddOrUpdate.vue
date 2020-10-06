<template>
  <div class="addorupdate">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-back" @click="$router.go(-1)"></i>
        <span>{{title}}</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            :autosize="{ minRows: 2, maxRows: 6 }"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input type="text" v-model.number="ruleForm.price" clearable>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="_id">
          <el-cascader :props="props" v-model="ruleForm._id" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="商品图片">
          <Upload
            v-model="ruleForm.imgs"
            :fileList="ruleForm.imgs"
            @file="file"
            @deleteFile="deleteFile"
          />
        </el-form-item>
        <el-form-item label="商品详情" class="edit">
          <Edit v-model="ruleForm.detail" :detail="ruleForm.detail" @edit="edit" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')" v-show="!isUpdate">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Upload from "./Upload";
import Edit from "./Edit";
import { reqCategorys, reqAddOrUpdateProduct } from "../../api";

export default {
  name: "AddOrUpdate",
  components: {
    Upload,
    Edit
  },
  data() {
    return {
      ruleForm: {
        name: "",
        desc: "",
        price: "",
        _id: [],
        imgs: [],
        detail: ""
      },
      title: "",
      isUpdate: false,
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "change"
          }
        ],
        desc: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "change"
          }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字", trigger: "change" }
        ],
        _id: [{ required: true, message: "请选择商品分类", trigger: "blur" }]
      },
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          // const { level } = node;
          // setTimeout(() => {
          //   const nodes = Array.from({ length: level + 1 }).map(item => ({
          //     value: ++id,
          //     label: `选项${id}`,
          //     leaf: level >= 1
          //   }));
          //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          //   resolve(nodes);
          // }, 1000);
          let id = 0;
          let level = 0;
          if (node.level !== 0) {
            id = node.value;
            level = 2;
          }
          const result = await reqCategorys(id);
          if (result.status === 0) {
            const response = result.data;
            const nodes = response.map(item => ({
              value: item._id,
              label: item.name,
              leaf: level > 1
            }));
            resolve(nodes);
          }
        }
      }
    };
  },
  methods: {
    file(file) {
      if (
        Object.keys(this.$route.query).length !== 0 &&
        this.ruleForm.imgs !== []
      ) {
        this.ruleForm.imgs.push(file.name);
      } else {
        this.ruleForm.imgs = [file.name];
      }
    },

    deleteFile(file) {
      this.ruleForm.imgs.findIndex((item, index) => {
        if (item === file.name) {
          this.ruleForm.imgs.splice(index, 1);
        }
      });
    },

    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { name, desc, price, _id, imgs, detail } = this.ruleForm;
          let pCategoryId, categoryId;
          if (_id.length === 1) {
            pCategoryId = "0";
            categoryId = _id[0];
          } else {
            pCategoryId = _id[0];
            categoryId = _id[1];
          }
          const product = {
            name,
            desc,
            price,
            imgs,
            detail,
            pCategoryId,
            categoryId
          };
          if (this.isUpdate) {
            product._id = this.$route.query._id;
          }
          const result = await reqAddOrUpdateProduct(product);
          if (result.status === 0) {
            this.$router.replace("/admin/product");
            if (this.isUpdate) {
              this.$message({
                message: "更新商品成功!",
                type: "success",
                center: true
              });
            } else {
              this.$message({
                message: "添加商品成功!",
                type: "success",
                center: true
              });
            }
          }
        } else {
          this.$message({
            message: `${this.isUpdate ? '更新' : '添加'}商品失败!`,
            type: "error",
            center: true
          });
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    edit(content) {
      this.ruleForm.detail = content.html;
    }
  },
  activated() {
    if (Object.keys(this.$route.query).length !== 0) {
      this.isUpdate = true;
      this.title = "修改商品";
      this.ruleForm.name = this.$route.query.name;
      this.ruleForm.price = this.$route.query.price.slice(1) * 1;
      this.ruleForm.desc = this.$route.query.desc;
      this.ruleForm._id[0] = this.$route.query.pCategoryId;
      this.ruleForm._id[1] = this.$route.query.categoryId;
      this.ruleForm.imgs = this.$route.query.imgs;
      this.ruleForm.detail = this.$route.query.detail;
    } else {
      this.title = "添加商品";
      this.ruleForm.name = "";
      this.ruleForm.price = 0;
      this.ruleForm.desc = "";
      this.ruleForm._id = [];
      this.ruleForm.imgs = [];
      this.ruleForm.detail = "";
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-card i {
  font-size: 20px;
  color: #409eff;
  margin-right: 10px;
}

.el-form {
  width: 50%;
}

.el-form .edit {
  width: 160%;
}

.el-cascader {
  width: 100%;
}
</style>