<template>
	<view> 
		<CollectDriver v-if='curThemeType ==="driver"'></CollectDriver>
		<CollectCompany v-else></CollectCompany>
		<NotLogin></NotLogin>
	</view>
</template>

<script>
import 	CollectCompany from './company/company.vue'
import 	CollectDriver from './driver/driver.vue'
import NotLogin from '@/components/notlogin/notlogin.vue'
import {dirverPages,companyPages} from '@/utils/tabbar.js'
export default {
	components:{
		CollectCompany,CollectDriver,NotLogin
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
	data() {
		return {

		}
	},

}
</script>


<style lang="scss" scoped>



	
</style>
