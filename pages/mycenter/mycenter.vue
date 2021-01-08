

<template>
	<view :class="curThemeType ==='driver'?'driver-content':'company-content'">
	        <!-- <u-navbar :is-back="false" title="我的" :background="curThemeType ==='driver'?backgroundDri:backgroundCom" height='44' title-color="#FFFFFF">
				<view class="navbar-right" slot="right">
					<view class="message-box right-item">
						<text v-show = "curThemeType !=='driver'" @click="toAboutUs">关于</text>
						<u-icon v-show = "curThemeType ==='driver'" name="info-circle" size="38" @click="toAboutUs"></u-icon>
					</view>
				</view>
			</u-navbar> -->
			<MyDriver ref="searchDri" :authFlag="authFlag" :tokenFlag='tokenFlag' v-if='curThemeType ==="driver"'></MyDriver>
			<MyCompany ref="searchCom" :authFlag="authFlag" :tokenFlag='tokenFlag' v-else></MyCompany>
             <u-modal v-model="showTips" @confirm="tipsConfirm" title="提示" @cancel="setNum" :show-cancel-button="true" cancel-text="否"  confirm-text="是">
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
				showTips:false,
				authFlag:1,
				tokenFlag:false,
			}
		},
		onShow() {
			this.showTips = false;
			let type = uni.getStorageSync('curThemeType');
			let token = uni.getStorageSync('token');
			
			if(token){
			  this.tokenFlag = true;	
			} else{
			  this.tokenFlag = false;
			}
			this.curThemeType = type
			if (type === 'company'){
				companyPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#46B773',
				})
				if (token){
					if (this.$refs.searchCom){
						this.$refs.searchCom.getUser()
					}
					this.$u.api.getStatus().then(res=>{
						 if (res.code === 200) {
							 let Num = uni.getStorageSync('loginNum')
							 let data = res.object;
							 let flag = Number(data.checkstate)
							 this.authFlag = flag
							 if(flag === 0 && !Num){
							 	this.showTips = true
							 }
						 }
					})
				}
			} else {
				dirverPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#FF9E00',
				})
				if (token){
					if (this.$refs.searchDri){
						this.$refs.searchDri.getUser()
					}
					this.$u.api.getStatus().then(res=>{
						 if (res.code === 200) {
							 let Num = uni.getStorageSync('loginNum')
							 let data = res.object;
							 let flag = data.driverphotostate
							  this.authFlag = flag
							 if(flag === 0 && !Num){
							 	this.showTips = true
							 }
						 }
					})
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
			setNum(){
				 uni.setStorageSync('loginNum',true)
			}
			
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


