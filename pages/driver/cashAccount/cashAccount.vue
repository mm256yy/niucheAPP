<template>
	<view>
		<u-navbar back-text="" title="我的现金账户" :background="backgroundDri" title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text @click="billDetails">账单明细</text>
				</view>
			</view>
		</u-navbar>
		<view class="">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                 totalAssets:0,
			};
		},
		methods:{
			billDetails(){
				this.$u.route('/pages/driver/cashAccount/billDetails')
			},
		}
	}
</script>

<style lang="scss">
.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		// color: #ffffff;
		display: flex;
	}

</style>
