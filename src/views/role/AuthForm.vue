<template>
  <div class="authform">
    <el-form label-position="right" label-width="80px" :model="formLabelAlign">
      <el-form-item label="角色名称">
        <el-input v-model="formLabelAlign.name" disabled></el-input>
      </el-form-item>
    </el-form>
    <el-tree ref="tree" :data="treeconfig" show-checkbox node-key="key" :default-expand-all="true"></el-tree>
  </div>
</template>

<script>
import treeconfig from "../../config/treeconfig";
import { reqUpdateRole } from '../../api';
import storageUtils from "../../utils/storageUtils";

export default {
  name: "AuthForms",
  data() {
    return {
      treeconfig: [],
      formLabelAlign: {
        name: "",
      }
    };
  },
  props: {
    auth: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    setCheckedKeys(key) {
      this.$refs.tree.setCheckedKeys(key);
    },
    async getCheckedKeys() {
      const _id = this.auth._id
      const menu1 =this.$refs.tree.getCheckedKeys()
      const menu2 = this.$refs.tree.getHalfCheckedKeys()
      const menus = [...menu1, ...menu2]
      const auth_time = Date.now()
      const auth_name = storageUtils.getUser().username;
      
      const role = { _id, menus, auth_time, auth_name }
      const result = await reqUpdateRole(role)
      if(result.status === 0) {
        this.$emit('authformShow', {isShow: false})
      }
    }
  },
  mounted() {
    this.treeconfig = treeconfig;
    this.formLabelAlign.name = this.auth.name;
    this.setCheckedKeys(this.auth.menus);
  },
  watch: {
    auth(value) {
      this.formLabelAlign.name = value.name;
      if (value.menus) {
        this.setCheckedKeys(value.menus);
      }
    }
  }
};
</script>

<style scoped>
</style>