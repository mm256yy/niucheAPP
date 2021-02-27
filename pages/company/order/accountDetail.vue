<template>
	<view>
		<u-navbar back-icon-color="#111111" title="账单详情" :background="background" title-color="#111111">
		</u-navbar>
		<view class="accountList">
			<view class="top">
				<view>订单租金押金</view>
				<view class="price">12990</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				detail: {}
			}
		},
		mounted() {
			
		},
		methods: {
			getDetail(){
				let token = uni.getStorageSync('token');
				if(token){
					this.$u.api.orderDetail({
						orderId:orderId
					}).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.accountList{
		padding: 0 28rpx;
		.top{
			width: 694rpx;
			height: 298rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-bottom: 2rpx solid rgba(0,0,0,0.1);
			font-size: 32rpx;
			color: #333;
			.price{
				font-size: 76rpx;
				font-weight: 900;
				margin-top: 20rpx;
			}
		}
	}
</style>
