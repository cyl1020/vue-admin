<template>
  <div class="add-form">
    <el-form ref="form" :model="form">
      <el-form-item
        prop="region"
        :rules="[
          { required: true, message: '分类级别不能为空'}
        ]"
      >
        <el-select v-model="form.region" width="100%" placeholder="请选择分类级别">
          <el-option label="一级分类" value="0"></el-option>
          <el-option
            v-for="(item, index) in category_first"
            :key="index"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="name"
        :rules="[
            { required: true, message: '分类名称不能为空'}
          ]"
      >
        <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqAddCategory } from "../../api";
import { mapState, mapActions } from "vuex";

export default {
  name: "AddForm",
  data() {
    return {
      form: {
        name: "",
        region: ""
      }
    };
  },
  props: {
    currentCategory: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapState(["category_first"])
  },
  // mounted() {
  //   if(Object.keys(this.currentCategory).length !== 0) {
  //     console.log(Object.keys(this.currentCategory) === 0);
  //     this.form.region = this.currentCategory.name
  //   } else {
  //     this.form.region = '一级分类'
  //   }
  // },
  methods: {
    ...mapActions(["getCategory"]),
    addForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const parentId = this.form.region;
          const categoryName = this.form.name;
          const result = await reqAddCategory(categoryName, parentId);
          if (result.status === 0) {
            this.$emit("addChange", { show: false });
            this.$refs.form.resetFields();
            this.getCategory("0");
            this.$message({
              message: "添加商品成功！",
              type: "success",
              center: true
            });
          }
        } else {
          return false;
        }
      });
    },
    Region() {
      if (Object.keys(this.currentCategory).length !== 0) {
        this.form.region = this.currentCategory._id;
      } else {
        this.form.region = "0";
      }
    }
  },
  mounted() {
    this.Region()
  },
  watch: {
    currentCategory() {
      this.Region()
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>