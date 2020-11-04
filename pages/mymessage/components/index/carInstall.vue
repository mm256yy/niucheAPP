<template>
	<view class="car-install">
		<view class="select">选择首付方案</view>
		<view class="box">
			<view class="left">
				<view class="price"><text>34.66</text>万元</view>
				<view>首付三成</view>
			</view>
			<view class="right">
				<view class="price"><text>8888</text>元/月</view>
				<view>期数36</view>
			</view>
			<view class="apply">立即申请</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
    .car-install {
		padding: 44rpx;
		.select {
			width: 667rpx;
			height: 60rpx;
			padding: 12rpx 37rpx;
			background: linear-gradient(115deg,#6DD99C, #37AB63);
			font-size: 28rpx;
			font-weight: 900;
			color: #fff;
		}
		.box {
			width: 667rpx;
			height: 328rpx;
			background: #fff;
			.left {
				width: 279rpx;
				height: 159rpx;
				padding: 30rpx 0;
				text-align: center;
				background: rgba(0,0,0,0.02);
				font-size: 20rpx;
				color: #7f7f7f;
				margin-left: 43rpx;
				margin-top: 40rpx;
				float: left;
				.price text {
					font-size: 46rpx;
					font-weight: 900;
					margin-right: 15rpx;
				}
			}
			.right {
				width: 275rpx;
				height: 159rpx;
				padding: 30rpx 0;
				text-align: center;
				margin-right: 40rpx;
				margin-top: 40rpx;
				font-size: 20rpx;
				background: rgba(0,0,0,0.06);
				float: right;
				.price span {
					font-size: 46rpx;
					font-weight: 900;
				}
			}
			.apply {
				width: 170rpx;
				height: 49rpx;
				line-height: 49rpx;
				text-align: center;
				border-radius: 20rpx;
				background: linear-gradient(115deg,#6DD99C, #37AB63);
				color: #fff;
				font-size: 20rpx;
				font-weight: 900;
			}
		}
	}
</style>


