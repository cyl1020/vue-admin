<template>
  <div class="header">
    <div class="header-top">
      <span class="welcome">
        欢迎你,
        <span style="color: red">{{user.username}}</span>
      </span>
      <el-button type="text" @click="open">退出</el-button>
    </div>
    <div class="header-bottom">
      <div class="left">{{this.$store.state.header}}</div>
      <div class="right">
        <span>{{current_time | filter_time}}</span>
        <span>泸州天气</span>
        <span v-if="dayPictureUrl && weather">
          <img :src="dayPictureUrl" alt />
          <span class="weather">{{weather}}</span>
        </span>
        <span v-else>天气信息请求失败</span>
      </div>
    </div>
  </div>
</template>

<script>
import storageUtils from "../../utils/storageUtils";
import { formateDate } from "../../utils/dateUtils";
import { reqWeather } from "../../api";

export default {
  name: "Header",
  data() {
    return {
      current_time: Date.now(),
      dayPictureUrl: "",
      weather: ""
    };
  },
  props: {
    user: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    open() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          storageUtils.removeUser(); //清除内存中的user
          this.$store.commit("login", ""); //清除vuex中的user
          this.$store.commit("error", ""); //清除vuex中的错误消息
          // this.$store.commit("header", '首页');
          // this.$store.commit("path", '/admin/home');
          this.$router.replace("/login");
          this.$message({
            center: true,
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            center: true,
            type: "info",
            message: "已取消退出"
          });
        });
    },
    getTime() {
      this.timer = setInterval(() => {
        this.current_time = Date.now();
      }, 1000);
    }
  },
  async mounted() {
    this.getTime && this.getTime();
    const result = await reqWeather("泸州");
    const { dayPictureUrl, weather } = result;
    this.dayPictureUrl = dayPictureUrl;
    this.weather = weather;
  },
  filters: {
    filter_time(value) {
      return formateDate(value);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100%;
}

.header-top,
.header-bottom {
  height: 50%;
  background-color: #fff;
  border-bottom: 1px solid #1890ff;
  font-size: 14px;
  line-height: 40px;
  text-align: right;
  padding-right: 40px;
}

.header-top .welcome {
  margin-right: 30px;
}

.header-top .el-button:hover {
  color: red;
}

.header-bottom {
  border-bottom: none;
  display: flex;
}

.header-bottom .left {
  width: 25%;
  text-align: center;
  font-size: 20px;
  position: relative;
}

.header-bottom .left::after {
  content: "";
  border-top: 12px solid #fff;
  border-right: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 12px solid transparent;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.header-bottom .right {
  width: 75%;
  text-align: right;
}

.header-bottom .right img {
  width: 30px;
  height: 20px;
  margin: 0 10px;
  position: relative;
  top: 5px;
}

.header-bottom .right span {
  margin: 0 5px;
}

.header-bottom .right .weather {
  margin-right: 0;
}
</style>