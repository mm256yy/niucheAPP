const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	const config = {
		// baseUrl: 'http://161.189.168.218:9007',
		loadingText: '努力加载中~',
		method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		// header: {
		// 	'content-type': 'application/x-www-form-urlencoded'
		// },
	};
	Vue.prototype.$u.http.setConfig(config);
	
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		
		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
              if (config.url === '/user/login/login'){
				  	uni.removeStorageSync('token');
			  }
			 const token = uni.getStorageSync('token');
			 if (token) {
			 	config.header.Authorization = token;
			 }  

		
		
		// config.header.Token = '1111';
		
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if(config.url == '/user/login/login') config.header.noToken = true;
		// // 最后需要将config进行return
		// return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
	
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		
		if(res.code == 200) {
			return res;
		} else if(res.code == 401) {
			uni.clearStorage('token')
			setTimeout(() => {
			  vm.$u.route('/pages/user/login')
			}, 1000)
			return false;
		}else if(res.code == 500) {
			vm.$u.toast(res.msg);
			return false;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return res;
		}
	}
}

export default {
	install
}