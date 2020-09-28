import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//司机
import driver from './modules/driver.js'
//公司
import company from './modules/company.js'
//主题
import theme from './modules/theme'
import user from './modules/user.js'
import getters from './getters.js'
const store = new Vuex.Store({
	 modules: {
		user,
	    driver,
	    company,
        theme
	  },
	  getters
})

export default store
