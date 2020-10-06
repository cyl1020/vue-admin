<template>
  <div class="pie">
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    <div class="text">注: 数据每分钟更新一次</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Pie",
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      chartData: {
        columns: ["商品", "下单用户"],
        rows: []
      }
    };
  },
  computed: {
    ...mapState(["rows"])
  },
  mounted() {
    this.chartData.rows = this.rows;
  },
  watch: {
    rows(value) {
      this.chartData.rows = value;
    }
  }
};
</script>

<style scoped>
.ve-pie {
  margin-top: 20px;
}

.text {
  text-align: center;
  font-size: 14px;
  color: #cccccc;
}
</style>