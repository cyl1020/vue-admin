<template>
  <div class="upload">
    <el-upload
      action="/api/manage/img/upload"
      list-type="picture-card"
      accept="iamge/*"
      name="image"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList | imgs"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { reqDeleteImg } from "../../api";

export default {
  name: "Upload",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  props: {
    fileList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    async handleRemove(file, fileList) {
      const result = await reqDeleteImg(file.name);
      if (result.status === 0) {
        this.$message({
          message: "删除图片成功!",
          type: "success",
          center: true
        });
        this.$emit('deleteFile', file)
      } else {
        this.$message({
          message: "删除图片失败!",
          type: "error",
          center: true
        });
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleChange(file, fileList) {
      if (file.status === "success") {
        const result = file.response;
        if (result.status === 0) {
          this.$message({
            message: "上传图片成功!",
            type: "success",
            center: true
          });
          const { name, url } = result.data;
          file = fileList[fileList.length - 1];
          file.name = name;
          file.url = url;
          this.$emit("file", file);
        } else {
          this.$message({
            message: "上传图片失败!",
            type: "warning",
            center: true
          });
        }
      }
    }
  },
  filters: {
    imgs(value) {
      if (value) {
        return value.map(img => ({
          name: img,
          url: "http://localhost:5000/upload/" + img
        }));
      } else {
        return []
      }
    }
  }
};
</script>

<style scoped>
</style>