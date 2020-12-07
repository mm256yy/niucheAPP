<template>
	<view>
		<Driver v-if='curThemeType ==="driver"' ref="driver"></Driver>
		<Company ref="driver" v-else></Company>
		<OneTips ref="onetips"></OneTips>
	</view>
</template>

<script>
import OneTips from '../../components/oneTips.vue'
import Company from './company/company.vue'
import Driver from './driver/driver.vue'
import {dirverPages,companyPages} from '@/utils/tabbar.js' 
export default {
	components:{
		Company,Driver,OneTips
	},
	data() {
		return {
			upOption:{},
			downOption:{},
			}
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
		if(this.$refs.driver != undefined){
			this.$refs.driver.getList()
		}	
	},
	mounted() {
		let flag = uni.getStorageSync('oneTipsFlag');
		if(!flag){
			this.$refs.onetips.show = true
		}
	},
	methods:{
		tipsConfirm(){
			let role = uni.getStorageSync('role');
			if (role === 2) {
				this.$u.route('/pages/company/identityAuth/identityAuth')
			} else {
				this.$u.route('/pages/driver/drivingLicense/drivingLicense')
			}
		},
	}
			
};
</script>
<style lang="scss">
page {
	background-color: #F5F5F8;
}
</style>


