<template>
	<view class="accountDetail">
		<u-navbar back-icon-color="#111111" title="账单详情" :background="background" title-color="#111111">
		</u-navbar>
		<view class="accountList">
			<view class="top">
				<view>订单租金押金</view>
				<view class="price">12990</view>
			</view>
			<view class="flex">
				<view class="key">当前状态：</view>
				<view class="value">已入账</view>
			</view>
			<view class="flex">
				<view class="key">来源：</view>
				<view class="value">租赁订单</view>
			</view>
			<view class="flex">
				<view class="key">订单号：</view>
				<view class="value">1234567890</view>
			</view>
			<view class="flex">
				<view class="key">押金：</view>
				<view class="value">￥10000.00</view>
			</view>
			<view class="flex">
				<view class="key">月租金：</view>
				<view class="value">￥3000.00</view>
			</view>
			<view class="flex">
				<view class="key">信息服务费：</view>
				<view class="value">-￥10.00</view>
			</view>
			<view class="flex">
				<view class="key">对账单号：</view>
				<view class="value">1234567890</view>
			</view>
			<view class="flex">
				<view class="key">入账时间：</view>
				<view class="value">2020.09.28 11:15:33</view>
			</view>
			<view class="view">
				<view>查看订单详情</view>
				<u-image width="12" height="24" src="@/static/order/rightDark.png"></u-image>
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
	page{
		background: #fff;
	}
	accountDetail{
		background: #fff;
	}
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
			margin-bottom: 40rpx;
			.price{
				font-size: 76rpx;
				font-weight: 900;
				margin-top: 20rpx;
			}
		}
		.flex{
			display: flex;
			view{
				margin-top: 20rpx;
				font-size: 28rpx;
			}
			.key{
				width: 168rpx;
				color: #939393;
			}
			.value{
				color: #333;
			}
		}
		.view{
			width: 694rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
