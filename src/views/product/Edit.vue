<template>
  <div class="edit_container">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <!-- <button v-on:click="saveHtml">保存</button> -->
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      content: '',
      editorOption: {}
    };
  },
  props: {
    detail: {
      type: String
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange(content) {
      this.$emit('edit', content)
      
    }, // 内容改变事件
    // saveHtml: function(event) {
    //   alert(this.content);
    // }
  },
  watch: {
    detail(value) {
      return this.content = value
    }
  }
};
</script>

<style scoped>
</style>