<template>
  <div class="admin">
    <el-container>
      <el-aside width="200px">
        <LeftNav :user="user"/>
      </el-aside>
      <el-container>
        <el-header height="80px">
          <Header :user="user" />
        </el-header>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <el-footer height="60px">推荐使用谷歌浏览器，可以获得更佳页面操作体验</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../../components/header/Header";
import LeftNav from "../../components/left-nav/LeftNav";

import storageUtils from "../../utils/storageUtils";
import { mapActions } from 'vuex';

export default {
  name: "Admin",
  data() {
    return {
      user: {}
    };
  },
  components: {
    Header,
    LeftNav
  },
  methods: {
    ...mapActions(["vCharts"]),
    vcharts() {
      this.timer = setInterval(() => {
        this.vCharts()
      }, 60000);
    }
  },
  activated() {
    this.vCharts()
    this.vcharts()
    const user = storageUtils.getUser();
    this.user = user;
    if (!user || !user._id) {
      this.$router.replace("/login");
    }
  },
  deactivated() {
    clearInterval(this.timer)
  }
};
</script>

<style scoped>
.admin {
  height: 100%;
  width: 100%;
}

.el-container {
  height: 100%;
  background-color: #e9eef3;
}

.el-header {
  padding: 0;
  color: #333;
}

.el-footer {
  text-align: center;
  line-height: 40px;
  color: #cccccc;
  font-size: 14px;
}

.el-aside {
  width: 200px;
  background-color: #001529;
  overflow-x: hidden;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-main {
  background-color: #fff;
  color: #333;
  margin: 20px;
  padding: 0;
}
</style>