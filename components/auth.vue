<template>
	<view>
		<u-modal v-model="showTips" @confirm="tipsConfirm" title="提示" :show-cancel-button="true" cancel-text="否"  confirm-text="是">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        亲，您尚未认证，是否立即去认证?
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTips:false
			};
		},
		mounted() {
			let isauthencation = uni.getStorageSync('isauthencation');
			let token = uni.getStorageSync('token');
			if(!isauthencation && token){
				this.showTips = true
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
	}
</script>

<style lang="less">

</style>
