<template>
  <div class="detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-back" @click="$router.go(-1)"></i>
        <span>
          商品详情
          <span
            class="status"
            :class="{color:$route.query.status!==1}"
          >{{$route.query.name}} ({{$route.query.status | status}})</span>
        </span>
      </div>
      <div class="content">
        <el-tabs tab-position="left" style="height: 300px; width: 60%;">
          <el-tab-pane label="商品名称">{{$route.query.name}}</el-tab-pane>
          <el-tab-pane label="商品描述">{{$route.query.desc}}</el-tab-pane>
          <el-tab-pane label="商品价格">{{$route.query.price}}</el-tab-pane>
          <el-tab-pane label="所属分类">
            {{pName}}
            <i class="el-icon-right" />
            {{name}}
          </el-tab-pane>
          <el-tab-pane label="商品图片" class="imgs">
            <div v-if="!$route.query.imgs || $route.query.imgs.length==0">暂无商品图片，敬请期待</div>
            <img
              v-else
              v-for="img in $route.query.imgs"
              :key="img"
              :src="img | img"
              alt
              class="img"
            />
          </el-tab-pane>
          <el-tab-pane label="商品详情">
            <div v-if="!$route.query.detail || $route.query.detail==='<p></p>\n'">暂无商品详情，敬请期待</div>
            <div v-else v-html="$route.query.detail"></div>
          </el-tab-pane>
          <el-tab-pane label="商品状态">{{$route.query.status | status}}</el-tab-pane>
        </el-tabs>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reqCategory } from "../../api";

export default {
  name: "Detail",
  data() {
    return {
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87"
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large"
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46"
        }
      ],
      pName: "",
      name: ""
    };
  },
  async activated() {
    const results = await Promise.all([
      reqCategory(this.$route.query.pCategoryId),
      reqCategory(this.$route.query.categoryId)
    ]);
    this.pName = results[0].data.name;
    this.name = results[1].data.name;
  },
  filters: {
    status(value) {
      return value == 1 ? "在售" : "已下架";
    },
    img(value) {
      return "http://localhost:5000/upload/" + value;
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

.el-card i {
  font-size: 20px;
  color: #409eff;
  margin-right: 10px;
}

.el-tabs {
  border-right: 1px dashed #409eff;
  margin-right: 50px;
}

.content {
  display: flex;
}

.content .el-tab-pane {
  width: 200px;
  line-height: 300px;
  margin: 0 auto;
  color: #409eff;
}

.content .imgs {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.content .img {
  width: 120px;
  height: 120px;
  border: 1px solid pink;
  border-radius: 5px;
  margin-bottom: 10px;
  line-height: 0;
}

.content .el-icon-right {
  margin: 0 10px;
}

.status {
  color: red;
  margin-left: 10px;
  font-size: 12px;
}

.color {
  color: #c0c0c0;
}
</style>