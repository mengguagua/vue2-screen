<template>
  <Container :options="{ width: 1920, height: 1080 }" class="container">
    <header>
      <span>{{ nowTime }}</span>
    </header>
    <section>
      <div class="left">
        <TitleTag title="班列开行统计">
          <ul class="list-head">
            <li style="opacity: 0">~</li>
            <li>去程</li>
            <li>返程</li>
            <li>合计</li>
          </ul>
          <div class="list-body">
            <ul v-for="item in trainCountDate" :key="item.name">
              <li>{{ item.name }}</li>
              <li>{{ item.go }}</li>
              <li>{{ item.back }}</li>
              <li>{{ item.total }}</li>
            </ul>
          </div>
        </TitleTag>
        <TitleTag title="贸易国贸易额分析">
          <SwitchButton :options="['出口', '进口']" v-model="leftMidActive" />
          <RankingChart :chartData="leftMidData[leftMidActive]" color="blue" />
        </TitleTag>
        <TitleTag title="商品占比分析">
          <SwitchButton :options="['出口', '进口']" v-model="leftBottomActive" />
          <PieChart :chartData="leftBottomData[leftBottomActive]" />
        </TitleTag>
      </div>
      <div class="middle">
        <div class="line">
          <div class="card img1">
            <img src="@/assets/img/middle-img2.jpg">
            <div class="content">
              <div class="num"><span>{{baseData.yearCol && Number(baseData.yearCol).toLocaleString()}}</span>列</div>
              <div class="text">当年开行</div>
            </div>
          </div>
          <div class="card img1">
            <img src="@/assets/img/middle-img2.jpg">
            <div class="content">
              <div class="num"><span>{{baseData.accumulativeCol && Number(baseData.accumulativeCol).toLocaleString()}}</span>列</div>
              <div class="text">累计开行</div>
            </div>
          </div>
          <div class="card img2">
            <img src="@/assets/img/middle-img1.jpg">
            <div class="content">
              <div class="num"><span>{{baseData.yearTue && Number(baseData.yearTue).toLocaleString()}}</span>TEU</div>
              <div class="text">当年发运</div>
            </div>
          </div>
          <div class="card img2">
            <img src="@/assets/img/middle-img1.jpg">
            <div class="content">
              <div class="num"><span>{{baseData.accumulativeTue && Number(baseData.accumulativeTue).toLocaleString()}}</span>TEU</div>
              <div class="text">累计发运</div>
            </div>
          </div>
        </div>
        <div class="map"></div>
        <div class="data-line">
          <div class="data-img">
            <div class="money"><span>{{baseData.ywSourceGoods && Number(baseData.ywSourceGoods).toLocaleString()}}</span>万美元</div>
            <div class="ratio">出口义乌货源占比{{baseData.ywSourceGoodsProportion}}</div>
          </div>
          <div class="data-img">
            <div class="money"><span>{{baseData.zjSourceGoods && Number(baseData.zjSourceGoods).toLocaleString()}}</span>万美元</div>
            <div class="ratio">出口省内货源占比{{baseData.zjSourceGoodsProportion}}</div>
          </div>
          <div class="data-img">
            <div class="money"><span>{{baseData.sjqSourceGoods && Number(baseData.sjqSourceGoods).toLocaleString()}}</span>万美元</div>
            <div class="ratio">出口长三角货源占比{{baseData.sjqSourceGoodsProportion}}</div>
          </div>
        </div>
        <TitleTag class="line-bar" title="班列开行趋势">
          <LineBarChart2 :chartData="midBottomData" />
        </TitleTag>
      </div>
      <div class="right">
        <TitleTag title="贸易额趋势分析">
          <SwitchButton :options="['出口', '进口']" v-model="rightTopActive" />
          <LineBarChart :chartData="rightTopData[rightTopActive]" />
        </TitleTag>
        <TitleTag title="省内货源地热力图">
          <SwitchButton :options="['全国', '浙江']" v-model="rightMidActive" />
          <ChinaMapChart :chartData="rightMidData_china" :style="`z-index: ${rightMidActive == '全国' ? 9 : 1}`" />
          <ZhejiangMapChart :chartData="rightMidData_zhejiang" :style="`z-index: ${rightMidActive == '浙江' ? 9 : 1}`" />
        </TitleTag>
        <TitleTag title="订舱口排行">
          <RankingChart :chartData="rightBottomData" color="red" />
        </TitleTag>
      </div>
    </section>
  </Container>
</template>

<script>
export default {
  data() {
    return {
      nowTime: "",
      // 班列开行统计
      trainCountDate: [
        {
          name: "班列(列)",
          go: "",
          back: "",
          total: "",
        },
        {
          name: "集装箱(TEU)",
          go: "",
          back: "",
          total: "",
        },
        {
          name: "货值(亿美元)",
          go: "",
          back: "",
          total: "",
        },
        {
          name: "货物重量(万吨)",
          go: "",
          back: "",
          total: "",
        },
      ],
      // 左中数据
      leftMidActive: "出口",
      leftMidData: {
        出口: [],
        进口: [],
      },
      // 左下数据
      leftBottomActive: "出口",
      leftBottomData: {
        出口: [],
        进口: [],
      },
      // 右上数据
      rightTopActive: "出口",
      rightTopData: {
        出口: {},
        进口: {},
      },
      // 右中数据
      rightMidActive: "浙江",
      rightMidData_china: [],
      rightMidData_zhejiang: [],
      // 右下数据
      rightBottomData: [],
      // 中间部分标签基础数据
      baseData: {
        yearCol: '0',
        accumulativeCol: '0',
        yearTue: '0',
        accumulativeTue: '0',
        ywSourceGoods: '0',
        ywSourceGoodsProportion: '0',
        zjSourceGoods: '0',
        zjSourceGoodsProportion: '0',
        sjqSourceGoods: '0',
        sjqSourceGoodsProportion: '0',
      },
      // 中下数据
      midBottomData: {
        jk: [],
        ck: [],
        tb: [],
        month:[]
      },
    };
  },
  watch: {},
  async mounted() {
    setInterval(() => {
      this.nowTime =
        new Date().toLocaleString(undefined, { hour12: true }) +
        "\n" +
        new Date().toLocaleString(undefined, { weekday: "long" });
    }, 1000);
    this.mockData() // 假数据
  },
  methods: {
    // 写死数据 - 注释掉暂不删除，作为数据结构参考
    mockData() {
      // 左上数据
      Object.assign(this.trainCountDate[0], { go: "383", back: "330", total: "713", proportion: "69.16%" })
      Object.assign(this.trainCountDate[1], { go: "31840", back: "27226", total: "59066", proportion: "69.47%" })
      Object.assign(this.trainCountDate[2], { go: "11.98", back: "3.34", total: "15.32", proportion: "69.95%" })
      Object.assign(this.trainCountDate[3], { go: "24.03", back: "13.48", total: "37.52", proportion: "73.79%" })
      // 左中数据
      this.leftMidData['出口'] = [
        { name: "俄罗斯联邦", value: 30, rate: "30%" },
        { name: "乌兹别克斯坦", value: 27.12, rate: "27.12%" },
        { name: "白俄罗斯", value: 11.12, rate: "11.12%" },
        { name: "哈萨克斯坦", value: 8.12, rate: "8.12%" },
        { name: "波兰", value: 5.12, rate: "5.12%" },
      ]
      this.leftMidData['进口'] = [
        { name: "德国", value: 50.95, rate: "50.95%" },
        { name: "俄罗斯联邦", value: 11.26, rate: "11.26%" },
        { name: "乌兹别克斯坦", value: 8.40, rate: "8.40%" },
        { name: "哈萨克斯坦", value: 7.21, rate: "7.21%" },
        { name: "波兰", value: 5.14, rate: "5.14%" },
      ]
      // 左下数据
      this.leftBottomData['出口'] = [
        { name: "通信设备", value: 5.11, rate: "5.11%" },
        { name: "发动机", value: 3.14, rate: "3.14%" },
        { name: "控制阀门", value: 2.81, rate: "2.81%" },
        { name: "布匹", value: 2.8, rate: "2.8%" },
        { name: "变压器", value: 2.43, rate: "2.43%" },
        { name: "其他", value: 83.71, rate: "83.71%" },
      ]
      this.leftBottomData['进口'] = [
        { name: "汽车配件", value: 9.17, rate: "9.17%" },
        { name: "板材", value: 7.82, rate: "7.82%" },
        { name: "棉纱", value: 6.99, rate: "6.99%" },
        { name: "泵及零配件", value: 6.45, rate: "6.45%" },
        { name: "控制阀门", value: 2.89, rate: "2.89%" },
        { name: "其他", value: 66.68, rate: "66.68%" },
      ]
      // 右上数据
      this.rightTopData['出口'] = {
        mye: [11.5, 12.2, 13, 11.3, 11.2, 12.6, 16.3, 18, 12.55, 12.1, 12.48, 10.37],
        tb: [210, 220, 230, 205, 198, 222, 245, 267, 250, 235, 220, 188],
        hb: [150, 110, 90, 100, 108, 155, 120, 100, 130, 190, 95, 85],
      }
      this.rightTopData['进口'] = {
        mye: [6.5, 7.19, 10, 7.3, 6.19, 7.6, 12.3, 14, 7.55, 8.1, 7.48, 7.36],
        tb: [152, 226, 245, 169, 173, 240, 233, 215, 230, 201, 222, 168],
        hb: [104, 82, 86, 77, 87, 136, 103, 107, 108, 179, 81, 65],
      }
      // 右中数据
      this.rightMidData_china = [
        { name: "浙江", value: 200 },
        { name: "安徽", value: 200 },
        { name: "福建", value: 200 },
        { name: "山东", value: 120 },
        { name: "江苏", value: 120 },
        { name: "河南", value: 120 },
        { name: "湖北", value: 120 },
      ]
      this.rightMidData_zhejiang = [
        { name: "金华市", value: 459.1371001132},
        { name: "宁波市", value: 184.416782202068},
        { name: "温州市", value: 150.427576987386},
        { name: "绍兴市", value: 119.97371395462},
        { name: "台州市", value: 131.267806151882},
        { name: "杭州市", value: 100.009800345204},
        { name: "嘉兴市", value: 42.031730133836},
        { name: "湖州市", value: 84.964748444901},
        { name: "丽水市", value: 81.264605815071},
        { name: "衢州市", value: 93.41220543757},
        { name: "舟山市", value: 37.915334908 }
      ]
      // 右下数据
      this.rightBottomData = [
        { name: "友胜货代公司1", value: 30, rate: "30%" },
        { name: "友胜货代公司2", value: 27.12, rate: "27.12%" },
        { name: "友胜货代公司3", value: 11.12, rate: "11.12%" },
        { name: "友胜货代公司4", value: 8.12, rate: "8.12%" },
        { name: "友胜货代公司5", value: 5.12, rate: "5.12%" },
      ]
      // 中下数据
      this.midBottomData.jk = [100, 200, 300, 200, 250, 150, 100, 300, 250, 300, 320, 370]
      this.midBottomData.ck = [120, 350, 370, 300, 200, 180, 170, 382, 248, 90, 116, 230]
      this.midBottomData.tb = [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #041024;
}
header {
  width: 1920px;
  height: 89px;
  background: url(../assets/img/header.png);
  span {
    float: right;
    font-size: 18px;
    color: #a0dcff;
    margin: 55px 20px 0 0;
  }
}
section {
  width: 1920px;
  height: 990px;
  padding: 16px 16px 0;
  display: flex;
}
.left,
.right {
  width: 410px;
  flex-shrink: 0;
  > div {
    height: 35%;
    &:nth-child(1) {
      height: 30%;
    }
  }
}
.middle {
  width: 100%;
}
.SwitchButton {
  position: absolute;
  top: 12px;
  right: 0;
  z-index: 99;
}
.left {
  ul {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    font-size: 14px;
    color: #a0dcff;
    &:nth-child(even) {
      background: #051531;
    }
    li {
      float: left;
      width: 25%;
      text-align: center;
      &:nth-child(1) {
        text-align: left;
        padding-left: 10px;
        width: 24%;
      }
    }
  }
  .list-head {
    background: rgba(20, 64, 140, 0.15) !important;
    color: #fff;
  }
  .list-body {
    margin-top: 10px;
    border: 1px solid rgba(23, 42, 105, 1);
    ul {
      height: 40px;
      line-height: 40px;
    }
  }
}
.middle {
  .line {
    display: flex;
    justify-content: space-evenly;
  }
  .card {
    width: 228px;
    height: 73px;
    background-image: linear-gradient(90deg, #2250AD 0%, rgba(9,24,53,0.00) 100%);
    border-radius: 19px 0px 19px 0px;
    border: 1px solid #2654AF;
    overflow: hidden;
  }
  .card img {
    float: left;
    width: 56px;
    height: 52px;
    margin: 14px 16px 0;
  }
  .content {
    float: left;
    margin-top: 10px;
  }
  .num {
    font-size: 14px;
    color: #4CD5FF;
    font-weight: 600;
  }
  .num span {
    font-size: 22px;
    margin-right: 5px;
  }
  .text {
    font-size: 14px;
    color: #FFFFFF;
    font-weight: 600;
  }
  .map {
    margin-top: 40px;
    height: 400px;
    width: 100%;
    /*border: 1px solid #fff;*/
    background-image: url("~@/assets/img/middle-img5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .data-line {
    display: flex;
    justify-content: space-around;
  }
  .data-img {
    margin-top: -60px;
    padding-top: 100px;
    width: 200px;
    height: 250px;
    text-align: center;
    background-image: url("~@/assets/img/middle-img3.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .money {
    font-size: 16px;
    color: #6DEBEE;
    font-weight: 600;
  }
  .money span {
    font-size: 26px;
  }
  .ratio {
    font-size: 16px;
    color: #FFFFFF;
    font-weight: 600;
  }
  .line-bar {
    margin-top: 20px;
    height: 240px;
    padding: 0 30px;
  }
}
</style>
