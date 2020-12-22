<template>
	<view>
		<Driver v-if='curThemeType ==="driver"' ref="driver"></Driver>
		<CollectCompany ref="collectRef" v-else></CollectCompany>
	</view>
</template>

<script>
import CollectCompany from '../mycollect/company/company.vue'
import Driver from './driver/driver.vue'
import {dirverPages,companyPages} from '@/utils/tabbar.js'
export default {
	components:{
		CollectCompany,Driver
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
			if(this.$refs.driver !=undefined){
				this.$refs.driver.getList()
			}
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
