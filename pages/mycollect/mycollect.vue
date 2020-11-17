<template>
	<view> 
		<CollectDriver ref="collectRef" v-if='curThemeType ==="driver"'></CollectDriver>
		<CollectCompany ref="collectRef" v-else></CollectCompany>
		<!-- <NotLogin></NotLogin> -->
	</view>
</template>

<script>
import 	CollectCompany from './company/company.vue'
import 	CollectDriver from './driver/driver.vue'
import {dirverPages,companyPages} from '@/utils/tabbar.js'
export default {
	components:{
		CollectCompany,CollectDriver,NotLogin
	},
	onShow() {
		let type = uni.getStorageSync('curThemeType');
		let token = uni.getStorageSync('token');
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
		if(token){
			if(this.$refs.collectRef !=undefined){
				this.$refs.collectRef.init()
			}
		}
	},
	data() {
		return {

		}
	},

}
</script>


<style lang="scss">
page {
	background-color: #F5F5F8;
}
</style>
