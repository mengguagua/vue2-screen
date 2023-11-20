/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import { Message } from 'element-ui'
Vue.use(VueAxios, axios)

const Api = {}
Api.install = () => {
  let apiCancelTokens = [] // 存放请求cancelToken
  // request请求拦截处理
  Vue.axios.interceptors.request.use((config) => {
    // 添加取消请求用的cancelToken
    config.cancelToken = new Vue.axios.CancelToken((c) => {
      apiCancelTokens.push(c)
    })
    if (config.method === 'get') {
      config.params = Object.assign({ t: Date.now() }, config.params)
    }
    return config
  }, error => Promise.reject(error))

  // response响应拦截处理
  Vue.axios.interceptors.response.use((res) => {
    // 如果来自获取跳转地址接口，直接跳转登录
    if (res.config.url && res.config.url.indexOf('/xxx/loginurl') != -1) {
      window.location.href = res.data.other;
      return
    }
    // 登陆校验不通过，请求获取跳转地址接口
    if (res.headers['permission-status'] == "1") {
      Vue.axios.get(`/xxx/loginurl`)
      return
    }
    // if (res.headers['permission-status'] == '1') {
    //   window.location.href = res.headers['redirect-url'];
    // }
    // 请求成功，但是接口报错时
    // if (res.data.status !== '0') {
      // let msg = res.data.message || '获取数据失败'
      // Message({
      //   message: msg,
      //   type: 'error'
      // })
      // 取消大屏报错提示
      // console.error(res.data)
      // return Promise.reject(res.data)
    // }
    return res.data
  }, (err) => {
    // 判断请求是否被取消
    if (Vue.axios.isCancel(err)) {
      console.log('Request canceled', err.message)
    } else {
      // 如果请求未被取消，则处理错误信息
      // Message({
      //   message: `${err.config.apiName || '获取数据'}失败`,
      //   type: 'error'
      // })
      // 取消大屏报错提示
      console.error(`${err.config.apiName || '获取数据'}失败`)
    }
    return Promise.reject(err)
  })

  // 接口列表
  Vue.prototype.Api = {
    // 取消页面当前请求
    apiRequsetCancel () {
      // 依次取消请求
      apiCancelTokens.forEach((cancel) => {
        cancel('请求被取消');
      });
      // 清空cancelToken
      apiCancelTokens = [];
    },
    // 示例接口
    exampleApi(req) {
      return Vue.axios.get('/xxx', {params: req});
    },
  }
}

export default Api
