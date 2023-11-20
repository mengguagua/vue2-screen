<template>
  <!-- 折柱混合 - 两柱一折 -->
  <v-chart :option="chartOption" :autoresize="true" />
</template>

<script>
export default {
  name: "LineBarChart2",
  props: ["chartData"],
  data() {
    return {
      chartOption: {},
    };
  },
  watch: {
    chartData: {
      handler(newVal) {
        if (newVal) {
          this.chartOption.series[0].data = newVal.jk && newVal.jk.slice(0, 12);
          this.chartOption.series[1].data = newVal.ck && newVal.ck.slice(0, 12);
          this.chartOption.series[2].data = newVal.tb && newVal.tb.slice(0, 12);
          this.chartOption.xAxis[0].data = newVal.month && newVal.month.slice(0, 12);
          let yMax1 = Math.max(...this.chartOption.series[0].data, ...this.chartOption.series[1].data)
          let yMin1 = Math.min(...this.chartOption.series[0].data, ...this.chartOption.series[1].data)
          let yMax2 = Math.max(...this.chartOption.series[2].data)
          let yMin2 = Math.min(...this.chartOption.series[2].data)
          yMax1 = Math.ceil(yMax1 / 50) * 50
          yMin1 = Math.floor(yMin1 / 50) * 50
          yMax2 = Math.ceil(yMax2 / 5) * 5
          yMin2 = Math.floor(yMin2 / 5) * 5
          this.chartOption.yAxis[0].max = yMax1
          this.chartOption.yAxis[0].min = yMin1
          this.chartOption.yAxis[0].interval = (yMax1 - yMin1) / 5
          this.chartOption.yAxis[1].max = yMax2
          this.chartOption.yAxis[1].min = yMin2
          this.chartOption.yAxis[1].interval = (yMax2 - yMin2) / 5
        } else {
          this.chartOption.series[0].data = new Array(12).fill(0);
          this.chartOption.series[1].data = new Array(12).fill(0);
          this.chartOption.series[2].data = new Array(12).fill(0);
          this.chartOption.xAxis[0].data = new Array(12).fill(0);
        }
      },
      deep: true,
    },
  },
  methods: {},
  mounted() {
    this.chartOption = {
      grid: {
        left: "3%",
        right: "3%",
        bottom: "3%",
        top: "25%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#14326D",
        borderColor: "#59EFFF",
        textStyle: {
          color: "#A0DCFF",
        },
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "rgba(1,1,1,0)",
          },
        },
      },
      legend: {
        data: ["进口", "出口", "同比"],
        textStyle: {
          color: "#fff",
        },
      },
      xAxis: [
        {
          type: "category",
          data: Array.from({length: 12}, (v, i) => ++i + '月'),
          data: this.chartData.month,
          axisPointer: {
            type: "shadow",
          },
          axisLabel: {
            color: "#fff",
            opacity: 0.9,
          },
          axisLine: {
            lineStyle: {
              color: "#03353d",
              width: 2,
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "单位/列",
          nameTextStyle: {
            color: "#fff",
            opacity: 0.9,
          },
          min: 0,
          max: 400,
          interval: 80,
          axisLabel: {
            formatter: "{value}",
            color: "#fff",
            opacity: 0.9,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#03353d",
              width: 2,
            },
          },
          splitLine: {
            show: false,
          },
        },
        {
          type: "value",
          name: "单位/%",
          nameTextStyle: {
            color: "#fff",
            opacity: 0.9,
          },
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: "{value}",
            color: "#fff",
            opacity: 0.9,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#03353d",
              width: 2,
            },
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "进口",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value && (value + "列");
            },
          },
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#00F3F3", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(0,228,228,0.1)", // 100% 处的颜色
                },
              ],
            },
          },
          data: this.chartData.jk,
        },
        {
          name: "出口",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value && (value + '列');
            },
          },
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#00B8FC", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(0,183,251,0.1)", // 100% 处的颜色
                },
              ],
            },
          },
          data: this.chartData.ck,
        },
        {
          name: "同比",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value && (value + '%');
            },
          },
          lineStyle: {
            color: "#FFB967",
          },
          itemStyle: {
            color: "#FFB967",
          },
          data: this.chartData.tb,
        },
      ],
    };
  },
};
</script>

<style lang="scss" rel="style/scss" scoped>
</style>
