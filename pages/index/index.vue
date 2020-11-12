<template>
	<view>
		<Driver v-if='curThemeType ==="driver"' ref="driver"></Driver>
		<Company ref="driver" v-else></Company>
		<u-modal v-model="showTips" @confirm="tipsConfirm" title="提示" :show-cancel-button="true" cancel-text="否"  confirm-text="是">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        亲，您尚未认证，是否立即去认证?
			</view>
		</u-modal>
	</view>
</template>

<script>
import Company from './company/company.vue'
import Driver from './driver/driver.vue'
export default {
	components:{
		Company,Driver
	},
	data() {
		return {
			   showTips:false
			}
	},
	onShow() {
		let token = uni.getStorageSync('token');
		let isauthencation = uni.getStorageSync('isauthencation');
		if(!isauthencation && token){
			this.showTips = true
		}
		this.$refs.driver.getList()
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

