import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Api from './service/api';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mixin from '@/plugins/mixin';
// 扫描components下所有组件进行注册，优化import（build时按依赖引用也不会有冗余）
import './components/global.js';
// echarts
import * as echarts from 'echarts';
import ECharts from 'vue-echarts';
// 导入地图
import china from './plugins/echarts/map/china.json'
import zhejiangMap from './plugins/echarts/map/province/zhejiang.json'

echarts.registerMap('china', china)
echarts.registerMap('zhejiang', zhejiangMap);

Vue.use(ElementUI);
Vue.use(Api);
Vue.mixin(mixin);
Vue.component('v-chart', ECharts)

router.beforeEach((to, from, next) => {
  app && app.Api.apiRequsetCancel();
  next();
});

let app= new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
