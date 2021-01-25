import Vue from 'vue'
import App from './App'
// import store from './store/store.js'
import themeMixin from './utils/mixin.js'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
Vue.config.productionTip = false
let WebIM = require("utils/WebIM")["default"];

let conn = {
	closed: false,
	curOpenOpt: {},
	open(opt) {
		this.curOpenOpt = opt;
		WebIM.conn.open(opt);
		this.closed = false;
	},
	reopen() {
		if (this.closed) {
			//this.open(this.curOpenOpt);
			WebIM.conn.open(this.curOpenOpt);
			this.closed = false;
		}
	}
};

Vue.prototype.$im = WebIM;
Vue.prototype.$conn = conn;
// Vue.prototype.$store = store
App.mpType = 'app'
// Vue.component("list",list) // 全局注册
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
