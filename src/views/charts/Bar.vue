<template>
  <div class="bar">
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    <div class="text">注: 数据每分钟更新一次</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Bar",
  data() {
    this.chartSettings = {
      axisSite: { right: ["下单率"] },
      yAxisType: ["B", "percent"],
      yAxisName: ["数值", "比率"]
    };
    return {
      chartData: {
        columns: ["商品", "访问用户", "下单用户", "下单率"],
        rows: []
      }
    };
  },
  computed: {
    ...mapState(["rows"])
  },
  mounted() {
    this.chartData.rows = this.rows
  },
  watch: {
    rows(value) {
      this.chartData.rows = value
    }
  }
};
</script>

<style scoped>
.ve-histogram {
  margin-top: 20px;
}

.text {
  text-align: center;
  font-size: 14px;
  color: #cccccc;
}
</style>