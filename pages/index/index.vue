<template>
	<view>
		<Driver v-if='curThemeType ==="driver"' ref="driver"></Driver>
		<Company ref="driver" v-else></Company>
		<OneTips ref="onetips"></OneTips>
		<PopConfig ref="popConfig" v-if="show"></PopConfig>
	</view>
</template>

<script>
import OneTips from '../../components/oneTips.vue'
import Company from './company/company.vue'
import Driver from './driver/driver.vue'
import PopConfig from '../../components/popupConfig.vue'
import {dirverPages,companyPages} from '@/utils/tabbar.js' 
export default {
	components:{
		Company,Driver,OneTips,PopConfig
	},
	data() {
		return {
			upOption:{},
			downOption:{},
			show:false
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
		this.show = true
	},
	onHide() {
		this.show = false
	},
	mounted() {
		let flag = uni.getStorageSync('oneTipsFlag');
		if(!flag){
			this.$refs.popConfig.show = true
		}
		console.log(1111)
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


