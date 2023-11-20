<template>
  <!-- 占比柱状图 -->
  <v-chart :option="chartOption" :autoresize="true" />
</template>

<script>
export default {
  name: "PieChart",
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
          this.chartOption.series[0].data = newVal.slice(0, 6);
        } else {
          this.chartOption.series[0].data = []
        }
      },
      deep: true,
    },
  },
  methods: {},
  mounted() {
    this.chartOption = {
      color: ['#EAB856', '#66D95F', '#157DEC', '#A684FF', '#ED6300', '#23B4FF'],
      legend: {
        selectedMode: false,
        orient: "vertical",
        height: 72,
        bottom: "3%",
        itemWidth: 10,
        itemHeight: 10,
        selectedMode: false,
        textStyle: {
          color: "#A0DCFF",
          lineHeight: 14,
          padding: [0, 8],
          rich: {
            type: {
              width: 85,
              fontSize: 12,
            },
          },
        },
        formatter: (name) => {
          for (let i = 0; i < this.chartData.length; i++) {
            const element = this.chartData[i];
            if (element.name == name) {
              name && name.length > 6 ? (name = name.slice(0, 6) + '...') : undefined;
              return `{type|${name}}${element.rate}`;
            }
          }
        },
      },
      series: [
        {
          type: "pie",
          radius: ["35%", "50%"],
          center: ["50%", "40%"],
          label: {
            show: true,
            color: 'inherit',
            formatter: (params) => {
              return params.data.rate
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 40,
          },
          hoverAnimation: false,
          data: this.chartData,
        },
      ],
    };
  },
};
</script>

<style lang="scss" rel="style/scss" scoped>
.echarts {
  background: url("../assets/img/topLeftChart.png") no-repeat;
  background-position: 50% 19%;
  background-size: 47%;
}
</style>