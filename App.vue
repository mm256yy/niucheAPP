<script>
		import {dirverPages,companyPages} from '@/utils/tabbar.js'
	export default {
		onLaunch: function() {
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
					   if (role === 2){
						  uni.navigateTo({
						      url: '/pages/company/release/release'
						  });
					   } else{
						   uni.navigateTo({
						       url: '/pages/driver/release/release'
						   });
					   }
				   } else {
					   this.$u.toast("未登录不能发布信息，1.5秒后跳转我的页面")
					   setTimeout(function(){
						   this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
					   },1500)
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

