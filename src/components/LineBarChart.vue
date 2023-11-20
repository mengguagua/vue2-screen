<template>
  <!-- 折柱混合 - 一柱两折 -->
  <v-chart :option="chartOption" :autoresize="true" />
</template>

<script>
export default {
  name: "LineBarChart",
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
          this.chartOption.series[0].data = newVal.mye && newVal.mye.slice(0, 12);
          this.chartOption.series[1].data = newVal.tb && newVal.tb.slice(0, 12);
          this.chartOption.series[2].data = newVal.hb && newVal.hb.slice(0, 12);
          this.chartOption.xAxis.data = newVal.month && newVal.month.slice(0, 12);
          let yMax1 = Math.max(...this.chartOption.series[0].data)
          let yMin1 = Math.min(...this.chartOption.series[0].data)
          let yMax2 = Math.max(...this.chartOption.series[1].data, ...this.chartOption.series[2].data)
          let yMin2 = Math.min(...this.chartOption.series[1].data, ...this.chartOption.series[2].data)
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
          this.chartOption.xAxis.data = new Array(12).fill(0);
        }
      },
      deep: true,
    },
  },
  methods: {},
  mounted() {
    this.chartOption = {
      grid: {
        left: "0%",
        right: "0%",
        bottom: "5%",
        top: "22%",
        containLabel: true,
      },
      legend: {
        top: "3%",
        left: "25%",
        data: ['同比', '环比'],
        itemGap: 15,
        textStyle: {
          color: "#A0DCFF"
        }
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
      xAxis: {
        type: "category",
        // data: Array.from({length: 12}, (v, i) => ++i + '月'),
        data:  this.chartData.month,
        axisLabel: {
          interval: 0,
          color: "#A0DCFF",
          rotate: 40
        },
        axisLine: {
          lineStyle: {
            color: "#396381"
          }
        },
        axisTick: {
          show: false
        },
      },
      yAxis: [
        {
          type: "value",
          name: "万美元",
          min: 0,
          max: 20,
          interval: 4,
          nameGap: 10,
          nameTextStyle: {
            color: "#A0DCFF"
          },
          axisLabel: {
            color: "#A0DCFF"
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#396381"
            }
          }
        },
        {
          type: "value",
          name: "%",
          min: 0,
          max: 500,
          interval: 100,
          nameGap: 10,
          nameTextStyle: {
            color: "#A0DCFF"
          },
          axisLabel: {
            color: "#A0DCFF"
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#396381"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#396381"
            }
          }
        },
      ],
      series: [
        {
          name: "贸易额",
          type: "bar",
          barWidth: 8,
          tooltip: {
            valueFormatter: function (value) {
              return value && (value + "万美元");
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
                  color: "#43B4F8", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#094278", // 100% 处的颜色
                },
              ],
            },
          },
          data: this.chartData.mye,
        },
        {
          name: "同比",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value && (value + "%");
            },
          },
          lineStyle: {
            color: "#ED6300"
          },
          itemStyle: {
            color: "#ED6300",
          },
          data: this.chartData.tb,
        },
        {
          name: "环比",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value && (value + "%");
            },
          },
          lineStyle: {
            color: "#66D95F"
          },
          itemStyle: {
            color: "#66D95F",
          },
          data: this.chartData.hb,
        },
      ],
    };
  },
};
</script>

<style lang="scss" rel="style/scss" scoped>
</style>
