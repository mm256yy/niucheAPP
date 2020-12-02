
<script>
		import {dirverPages,companyPages} from '@/utils/tabbar.js'
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			//设置2.4秒后主动关闭，最多设置6秒
				setTimeout(() => {
					plus.navigator.closeSplashscreen();
				}, 2400);
			// #endif
			// #ifdef APP-PLUS
			 plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) { 
			    uni.request({  
			        url: 'http://app-server.neocab.cn/app/getUrl?version='+widgetInfo.versionCode, 
					method:'POST',
			        data: {  
			            version: widgetInfo.versionCode,  
			        },  
			        success: (res) => {
						if(res.data.code === 200){
						let data = res.data.object;
						if(data.checkState === 1 ){
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
							});  
						} 
					} 
			     },
				})
			});  
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
		onShow() {
			let type = uni.getStorageSync('curThemeType');
			if (type === 'company'){
				companyPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#41B36D',
				})
			} else {
				dirverPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#FE9217',
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	// .uni-page-head{
	// 	background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	// }
</style>

