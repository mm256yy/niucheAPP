<template>
	<view>
		<Driver v-if='curThemeType ==="driver"' ref="driver"></Driver>
	    <Company ref="driver" v-else></Company>
		</view>
	</template>
	
	<script>
	import Company from '../mymessage/company/company.vue'
	import Driver from './driver/driver.vue'
	import {dirverPages,companyPages} from '@/utils/tabbar.js'
	export default {
		components:{
			Company,Driver
		},
		data() {
			return {
		        
				}
		},
		onShow() {
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
			if(this.$refs.driver != undefined){
				this.$refs.driver.getList()
			}
		}	
	};
	</script>
	
<style lang="scss">
page {
	background-color: #fff;
}
</style>
	