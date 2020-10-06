<template>
  <div class="update-form">
    <el-form :model="form" ref="form">
      <el-form-item
        label="分类名称"
        prop="name"
        :label-width="formLabelWidth"
        :rules="[
          { required: true, message: '分类名称不能为空'}
        ]"
      >
        <el-input v-model="form.name" autocomplete="off" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqUpdateCategory } from "../../api";
import { mapActions } from "vuex";

export default {
  name: "UpdateForm",
  data() {
    return {
      form: {
        name: ""
      },
      formLabelWidth: "90px"
    };
  },
  props: {
    row: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    ...mapActions(["getCategory"]),
    updateForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const categoryId = this.row._id;
          const categoryName = this.form.name;
          const result = await reqUpdateCategory(categoryId, categoryName);
          if (result.status === 0) {
            this.$emit("updateChange", { show: false });
            this.getCategory(this.row.parentId);
            this.$refs.form.resetFields();
            this.$message({
              message: `修改商品 "${this.row.name}"为 "${categoryName}" 成功！`,
              type: "success",
              center: true
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.form.name = this.row.name;
  },
  watch: {
    row(value) {
      return (this.form.name = this.row.name);
    }
  }
};
</script>

<style scoped>
</style>