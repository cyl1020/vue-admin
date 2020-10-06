<template>
  <div class="addform">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="ruleForm.roleName"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqAddRole } from '../../api';
export default {
  name: "AddForm",
  data() {
    return {
      ruleForm: {
        roleName: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate( async valid => {
        if (valid) {
          const result = await reqAddRole(this.ruleForm.roleName)
          if(result.status === 0 ) {
            this.$emit('addformShow', {isShow: false})
            this.$refs.ruleForm.resetFields();
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>