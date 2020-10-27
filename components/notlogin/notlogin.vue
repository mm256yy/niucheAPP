<template>
	<view>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="好的">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        亲，您尚未登录不能使用该功能，现在去登录
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
			let phone = uni.getStorageSync('telephone');
			if(!phone){
				this.showTips = true
			}
		},
		methods:{
			tipsConfirm(){
			   this.$u.route('/pages/login/login');
			},
		}
	}
</script>

<style lang="less">

</style>
