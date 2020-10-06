<template>
  <div class="home">
    <div class="update">注 : 数据每分钟更新一次</div>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户权限</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
          </div>
          <div class="message">当前登录用户拥有以下权限：</div>
          <div
            v-if="user.username==='admin'"
            style="color:red;font-size:30px;line-height:120px;text-align:center"
          >欢迎你，终极管理员</div>
          <div v-else-if="button1.length === 0" style="color:red;line-height:120px;text-align:center">当前登录用户权限为空，请联系管理员</div>
          <el-button v-for="item in button1" :key="item.path" :type="item.type" round>{{item.label}}</el-button>
        </el-card>
      </el-carousel-item>
      <el-carousel-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <span style="color: red; font-size: 20px">{{user.username}}</span> , 欢迎使用源隆后台
            </span>
            <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
          </div>
          <div class="info">
            <div class="info-left">
              <div style="color:orange;font-size:20px">基本信息</div>
              <div>用户名称：{{user.username}}</div>
              <div>
                <span v-if="user.phone">用户手机号：{{user.phone}}</span>
                <span v-else>用户手机号：去完善</span>
              </div>
              <div>
                <span v-if="user.email">用户邮箱：{{user.email}}</span>
                <span v-else>用户邮箱：去完善</span>
              </div>
            </div>
            <div class="info-right">
              <div style="color:red;font-size:20px">信息完善度</div>
              <el-progress type="dashboard" :percentage="info" color="orange"></el-progress>
            </div>
          </div>
        </el-card>
      </el-carousel-item>
      <el-carousel-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>后台热度</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
          </div>
          <div class="rate">
            <el-progress type="circle" :percentage="88" color="red"></el-progress>
            <div class="rate-right">
              <div style="margin-right: 10px">
                <p>实用度</p>
                <p>流畅度</p>
                <p>满意度</p>
              </div>
              <div>
                <el-rate
                  v-model="value1"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <el-rate
                  v-model="value2"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <el-rate
                  v-model="value3"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
              </div>
            </div>
          </div>
        </el-card>
      </el-carousel-item>
      <el-carousel-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品标签</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
          </div>
          <el-tag
            style="margin: 8px"
            v-for="tag in tags"
            :key="tag.name"
            :type="tag.type"
          >{{tag.name}}</el-tag>
        </el-card>
      </el-carousel-item>
      <el-carousel-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>活动进度</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
          </div>
          <el-steps :space="200" :active="1" align-center finish-status="success">
            <el-step title="已完成"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
          </el-steps>
          <div style="margin-top: 40px">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="60"></el-progress>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
import storageUtils from "../../utils/storageUtils";
import treeList from "../../config/treeconfig";
export default {
  name: "Home",
  data() {
    return {
      value1: 4.5,
      value2: 4.6,
      value3: 4.9,
      tags: [],
      button1: [],
      user: {}
    };
  },
  computed: {
    ...mapState(["rows"]),
    info() {
      let allcount = 3;
      let count = 1;
      if (this.user.phone && this.user.email) {
        count += 2;
      } else if (this.user.phone || this.user.email) {
        count += 1;
      }
      return parseFloat(count / allcount).toFixed(4) * 100;
    }
  },
  methods: {
    getUser() {
      this.timer = setInterval(() => {
        this.user = storageUtils.getUser();
      }, 60000);
    }
  },
  activated() {
    this.button1 = [];
    this.tags = this.rows;
    const user = storageUtils.getUser();
    this.user = user;
    this.getUser();
    const menus = user.role.menus;
    //这个方法有点蠢，有时间在完善
    menus.forEach(menu => {
      treeList[0].children.forEach(item => {
        if (item.children) {
          item.children.forEach(children => {
            if (children.key === menu) {
              const label = children.label;
              const path = "/admin" + children.key;
              let index = Math.floor(Math.random() * 4);
              this.button1.push({
                label,
                path,
                type: ["primary", "success", "info", "warning", "danger"][index]
              });
            }
          });
        } else {
          if (item.key === menu) {
            const label = item.label;
            const path = "/admin" + item.key;
            let index = Math.floor(Math.random() * 5);
            this.button1.push({
              label,
              path,
              type: ["primary", "success", "info", "warning", "danger"][index]
            });
          }
        }
      });
    });
  },
  deactivated() {
    clearInterval(this.timer);
  },
  watch: {
    rows(value) {
      this.tags = value;
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  background-image: url("../login/images/bg.jpg");
}

.update {
  margin-left: 10px;
  font-size: 14px;
  color: #ececec;
}

.el-carousel {
  padding: 40px 0;
}

.el-card {
  height: 100%;
  background-color: #dbdbdb;
}

.rate,
.info {
  display: flex;
  justify-content: space-evenly;
}

.info-left {
  width: 50%;
}

.info-right {
  position: relative;
}

.info-left div,
.info-right div {
  line-height: 36px;
}

.info-right .el-progress {
  position: absolute;
  left: 50%;
  margin-left: -63px;
}

.rate-right {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.message {
  font-size: 14px;
  color: #929191;
  position: relative;
  top: -15px;
}

.el-button {
  margin: 3px;
}
</style>