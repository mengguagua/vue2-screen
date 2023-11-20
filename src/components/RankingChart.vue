<template>
  <!-- 排名柱状图 -->
  <v-chart :option="chartOption" :autoresize="true" @click="hadleClick" />
</template>

<script>
export default {
  name: "RankingChart",
  props: ["chartData", "color"],
  data() {
    return {
      colorSystem: {
        blue: {
          yAxisColor: "#52DAF4",
          barColor: ["#14349E", "#5AF0FF"],
        },
        red: {
          yAxisColor: "#F5A623",
          barColor: ["#FF605A", "#FFA350"],
        },
      },
      chartOption: {},
    };
  },
  watch: {
    chartData: {
      handler(newVal) {
        if (newVal) {
          this.chartOption.series[0].data = newVal.slice(0, 5);
        } else {
          this.chartOption.series[0].data = new Array(5).fill({
            name: "",
            value: 0,
            rate: "",
          });
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.chartOption = {
      grid: {
        left: "0%",
        right: "0%",
        bottom: "-5%",
        top: "7%",
        containLabel: true,
      },
      xAxis: {
        show: false,
        type: "value",
        boundaryGap: [0, 0.2],
      },
      yAxis: [
        {
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: this.colorSystem[this.color].yAxisColor,
              fontSize: 20,
              fontWeight: 700,
              fontStyle: "italic",
            },
            margin: 16,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: ["01", "02", "03", "04", "05"],
        },
      ],
      series: [
        {
          type: "bar",
          barCategoryGap: 45,
          barWidth: 11,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: this.colorSystem[this.color].barColor[0], // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: this.colorSystem[this.color].barColor[1], // 100% 处的颜色
                },
              ],
            },
          },
          label: {
            color: "#fff",
            show: true,
            position: [0, "-20px"],
            textStyle: {
              fontSize: 14,
            },
            formatter: (p) => {
              return `${p.name}     ${p.data.rate}`;
            },
          },
          showBackground: true,
          backgroundStyle: {
            color: "#103B7B",
          },
          data: this.chartData
        },
      ],
    };
  },
  methods: {
    hadleClick(params) {
      this.$emit('click', params.data)
    }
  },
};
</script>

<style lang="scss" rel="style/scss" scoped>
</style>