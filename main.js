import Vue from 'vue'
import App from './App'
// import store from './store/store.js'
import themeMixin from './utils/mixin.js'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
Vue.config.productionTip = false
import tim from '@/common/tim/tim.js'
import commen from '@/common/commen.js'
import TIM from 'tim-js-sdk'
import store from './store/index.js'


Vue.config.productionTip = false
Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.$store = store
Vue.prototype.$commen = commen
App.mpType = 'app'
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);
Vue.use(themeMixin)
Vue.component('mescroll-body', MescrollBody)
const app = new Vue({
    ...App
})


import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)



// // http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)
app.$mount()
