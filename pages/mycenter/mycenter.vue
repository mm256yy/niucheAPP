

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
			<MyDriver ref="searchDri" v-if='curThemeType ==="driver"'></MyDriver>
			<MyCompany ref="searchCom" v-else></MyCompany>
             <u-modal v-model="showTips" @confirm="tipsConfirm" title="提示" :show-cancel-button="true" cancel-text="否"  confirm-text="是">
             	<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
                     亲，您尚未认证，是否立即去认证?
             	</view>
             </u-modal>
	</view>
</template>

<script>
	import {dirverPages,companyPages} from '@/utils/tabbar.js'
	import MyCompany from './company/company.vue'
	import MyDriver from './driver/driver.vue'
	export default {
		data() {
			return {
				showTips:false
			}
		},
		onShow() {
			let type = uni.getStorageSync('curThemeType');
			let token = uni.getStorageSync('token');
			let isauthencation = uni.getStorageSync('isauthencation');
			if(!isauthencation && token){
				this.showTips = true
			}
			this.curThemeType = type
			if (type === 'company'){
				companyPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#41B36D',
				})
				if (token && this.$refs.searchCom){
					this.$refs.searchCom.getUser()
				}
			} else {
				dirverPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#FE9217',
				})
				if (token && this.$refs.searchDri){
					this.$refs.searchDri.getUser()
				}
			}
			
		},
		components:{
			MyCompany,MyDriver
		},
		methods: {
			toAboutUs(){
				this.$u.route('/pages/aboutUs/aboutUs');
			},
			tipsConfirm(){
				let role = uni.getStorageSync('role');
				if (role === 2) {
					this.$u.route('/pages/company/identityAuth/identityAuth')
				} else {
					this.$u.route('/pages/driver/drivingLicense/drivingLicense')
				}
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


