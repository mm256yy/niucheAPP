
<script>
	
	import Vue from 'vue'
	import {dirverPages,companyPages} from '@/utils/tabbar.js'
	import {updateUrl} from '@/utils/constant.js'
	export default {
		onLaunch: function() {
			//初始化
			this.initSystem();
			//检测升级
			this.checkUpdate()
			//中间图标点击
			// this.midButtonTap()

		},
		onShow() {
			this.setTabBar()
		},
		methods:{
			initSystem(){
				// #ifdef APP-PLUS
					setTimeout(() => {
						plus.navigator.closeSplashscreen();
					}, 2000);
				// #endif
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				let obj = {year:year,month:month,day:day};
				 uni.setStorageSync('today', obj);
				 let type = uni.getStorageSync('curThemeType');
				 if(!type){
					 uni.setStorageSync('curThemeType', 'driver');
				 }
			},
			//检测升级
			checkUpdate(){
				const self = this
				uni.getSystemInfo({
					success: function(e) {
						// app整包更新检测
						self.appUpgrade(e.platform)
					}
				})
			},
			/**
			 * app整包更新检测
			 */
			appUpgrade(platform) {
				let that = this;
				if (platform !== 'android') {
					return
				}
				//#ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					uni.request({
					    url: updateUrl+wgtinfo.versionCode, 
						method:'POST',
					    data: {version: wgtinfo.versionCode},  
					    success: (res) => {
							if(res.data.code === 200){
							   let data = res.data.object;
							   if(data.checkState === 1 ){
								  that.showUpdateModel(data)
							   } //if
						   } //code 200
					 }
				   })//请求
				})
				//#endif
			},
			showUpdateModel(data){
				let that = this;
				uni.showModal({
					title: "下载更新提示",
					content: '检测到有新的版本，请升级',
					showCancel: false,
					confirmText: '确定',
					success: sucRes => {
						if (sucRes.confirm) {
                            that.downFile(data)
						}
					}//确定按钮
				})//model
			},
			downFile(data){
				uni.downloadFile({
					url: data.url,  
					success: (downloadResult) => {  
						if (downloadResult.statusCode === 200) {  
							plus.runtime.install(downloadResult.tempFilePath, {  
								force: false  
							}, function() {  
								console.log('install success...');  
								plus.runtime.restart();  
							}, function(e) {  
								console.error('install fail...');  
							});  
						}  
					}  
				}); //dowload
			},
			midButtonTap(){
				uni.onTabBarMidButtonTap(function(e){
				   let token = uni.getStorageSync('token');
				   if (token){
					   let role = uni.getStorageSync('role');
					   console.log(role)
					   if (role == 2){
						  uni.navigateTo({
							  url: '/pages/company/release/release'
						  });
					   } else{ 
						   uni.navigateTo({
							   url: '/pages/driver/release/release'
						   });
					   }
				   } else {
						uni.showToast({
							title:"请先登录，认证" 
						  })
					   uni.switchTab({
						   url: '/pages/mycenter/mycenter'
					   });
				   }
				})
			},
		    setTabBar(){
			  let type = uni.getStorageSync('curThemeType');
			  if (type === 'company'){
			  	companyPages.forEach(item=>{
			  		uni.setTabBarItem(item)
			  	})
			  	uni.setTabBarStyle({
			  	  selectedColor: '#46B773',
			  	})
			  } else {
			  	dirverPages.forEach(item=>{
			  		uni.setTabBarItem(item)
			  	})
			  	uni.setTabBarStyle({
			  	  selectedColor: '#FF9E00',
			  	})
			  }
		  },	
			
		},
		onHide: function() {
			console.log('App Hide')
			uni.removeStorageSync('popupFlag')
		},
	}
</script>

<style lang="scss">
	
	@import "uview-ui/index.scss";
	@font-face{
		font-family:"siyuan";
		src: url('~@/static/SourceHanSansCN-Medium.ttf');
	}
	// .uni-page-head{
	// 	background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	// }
</style>

