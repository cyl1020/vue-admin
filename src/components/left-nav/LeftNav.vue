<template>
  <div class="left-nav">
    <div class="left-nav-header">
      <img src="../../assets/images/logo-cyl.png" alt />
      <h1>源隆后台</h1>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <div v-for="(item, index) in menuList" :key="index">
        <div v-if="item.children">
          <el-submenu
            :index="item.key"
            v-if=" user.username==='admin' || (menus && menus.includes(item.key))"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="(children, index) in item.children" :key="index">
              <el-menu-item
                :index="children.key"
                @click="goAndHeader(children.key, children.title)"
                v-if=" user.username==='admin' || (menus && menus.includes(children.key))"
              >
                <i :class="children.icon"></i>
                <span>{{children.title}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item
            v-if=" user.username==='admin' || item.isPublic || (menus && menus.includes(item.key))"
            :index="item.key"
            @click="goAndHeader(item.key, item.title)"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import menuList from "../../config/menuconfig";

export default {
  name: "LeftNav",
  data() {
    return {
      menuList: [],
      defaultActive: "",
    };
  },
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    menus() {
      return this.user.role.menus.map((menu) => "/admin" + menu);
    },
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(111);
    // },
    // handleClose(key, keyPath) {
    //   console.log(111);
    // },
    goAndHeader(url, header) {
      this.$router.replace(url).catch(() => {});
      this.$store.commit("header", header);
    },
  },
  activated() {
    this.menuList = menuList;
    let path = this.$route.path;
    //这一步是为了让product里面的detail和addorupdate在刷新的时候能不返回首页,方法不是很好，有点投机取巧
    if (path.indexOf("/admin/product") === 0) {
      path = "/admin/product";
    }
    this.menuList.forEach((item) => {
      if (item.children) {
        const list = item.children.find((menu) => menu.key === path);
        if (list) {
          this.defaultActive = list.key;
          this.$store.commit("header", list.title);
        }
      } else {
        if (item.key === path) {
          const list = item;
          if (list) {
            this.defaultActive = list.key;
            this.$store.commit("header", list.title);
          }
        }
      }
    });
  },
  deactivated() {
    this.defaultActive = "";
  },
};
</script>

<style scoped>
.left-nav {
  width: 100%;
  /* height: 100%; */
  position: relative;
  left: 1px;
}

.left-nav .left-nav-header {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #003668;
  position: sticky;
  top: 0;
  z-index: 99;
  /* overflow-x: hidden; */
}

.left-nav .left-nav-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0px 15px;
}

.left-nav .left-nav-header h1 {
  color: #fff;
  font-size: 20px;
  margin-bottom: 0;
  font-weight: 100;
}

.left-nav .el-menu-vertical-demo {
  height: 100%;
  overflow: hidden;
}
</style>