<template>
	<view :class="curThemeType ==='driver'?'driver-content':'company-content'">
	        <u-navbar :is-back="false" title="我的" :background="curThemeType ==='driver'?backgroundDri:backgroundCom" height='44' title-color="#FFFFFF">
				<view class="navbar-right" slot="right">
					<view class="message-box right-item">
						<text v-show = "curThemeType !=='driver'" @click="toAboutUs">关于</text>
						<u-icon v-show = "curThemeType ==='driver'" name="info-circle" size="38" @click="toAboutUs"></u-icon>
					</view>
				</view>
			</u-navbar>
			<MyDriver v-if='curThemeType ==="driver"'></MyDriver>
			<MyCompany v-else></MyCompany>
	
	</view>
</template>

<script>
	import {dirverPages,companyPages} from '@/utils/tabbar.js'
	import MyCompany from './company/company.vue'
	import MyDriver from './driver/driver.vue'
	export default {
		data() {
			return {

			}
		},
		mounted() {
		  // this.getUser()
		},
		filters: {
		  state: function (value) {
		    if (!value) return ''
		    if (value === 1) {
				return '已认证'
			} else if (value === 2){
				return '未认证'
			} else if (value === 3){
				return '审核中'
			} else if (value === 4){
				return '认证未通过'
			}else {return ''}
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
		},
		components:{
			MyCompany,MyDriver
		},
		methods: {
			toAboutUs(){
				this.$u.route('/pages/aboutUs/aboutUs');
			},
			
		}
	}
</script>
<style lang="scss">
page {
	background-color: #F5F5F8;
}
</style>
<style lang="scss" scoped>
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
</style>


