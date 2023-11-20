<template>
  <!-- 排名柱状图 -->
  <v-chart :option="chartOption" :autoresize="true" />
</template>

<script>
export default {
  name: "ChinaMapChart",
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
          this.chartOption.series[0].data = newVal.map(item => {
            return {
              name: item.name,
              value: Math.log(Number(item.value))
            }
          });
          let dataArr = this.chartOption.series[0].data.map(item => item.value)
          let max = Math.max(...dataArr)
          let min = Math.min(...dataArr)
          max = Math.ceil(max)
          min = Math.min(min)
          this.chartOption.visualMap.min = min
          this.chartOption.visualMap.max = max
        } else {
          this.chartOption.series[0].data = [];
        }
      },
      deep: true,
    },
  },
  methods: {},
  mounted() {
    this.chartOption = {
      //控制显示左下角
      visualMap: {
        show: true,
        type: "continuous", // 定义为连续型viusalMap
        left: "8%", // visualMap组件离容器右侧的距离。
        bottom: "0%", // visualMap组件离容器下侧的距离
        orient: "vertical", // 如何放置visualMap组件
        itemWidth: 18, //图形的宽度，即长条的宽度。
        itemHeight: 53, //图形的高度，即长条的高度。
        min: 0,
        max: 100,
        hoverLink: false,
        text: ["高", "低"],
        textGap: 5,
        textStyle: {
          color: "#A0DCFF",
        },
        inRange: {
          color: ["#A5DAFB", "#81C2EC", "#DEF145", "#FFCA01", "#FE7512", "#FE4400"],
        },
      },
      geo: {
        map: "china", // 与引用进来的地图js名字一致
        zoom: 1, //设置地图放大
        roam: false, // 禁止缩放平移
        aspectScale: 0.8,
        layoutCenter: ["50%", "53%"], // 地图位置
        layoutSize: "125%",
        silent: true,
        label: {
          show: true,
          color: "#FFF"
        },
        itemStyle: {
          areaColor: "#A5DAFB",
          borderWidth: 0,
        },
      },
      series: [
        // 热力图
        {
          type: 'map',
          geoIndex: 0,
          data: this.chartData,
        },
      ],
    };
  },
};
</script>

<style lang="scss" rel="style/scss" scoped>
.echarts {
  position: absolute;
  top: 0;
  left: 0;
  background: #041024;
}
</style>