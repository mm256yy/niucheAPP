import Vue from 'vue'
import App from './App'
// import store from './store/store.js'
import themeMixin from './utils/mixin.js'
Vue.config.productionTip = false

// Vue.prototype.$store = store
App.mpType = 'app'
// Vue.component("list",list) // 全局注册
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);
Vue.use(themeMixin)
const app = new Vue({
    ...App
})
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)



// // http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)
app.$mount()
