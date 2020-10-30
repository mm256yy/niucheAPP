<template>
	<view class="selling">
		 <view class="list">
		 	<u-image class="left" width="312rpx" height="231rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="right">
		 		<view class="city">上海</view>
		 		<view class="clear"></view>
		 		<view class="name">525520款包包</view>
		 		<view class="price">打包价<span>￥2700</span></view>
		 		<view class="case">纯电动</view>
		 		<view class="case">SUV</view>
		 		<view class="case">自动挡</view>
		 	</view>
		 	<view class="clear"></view>
		 	<u-icon class="clock" name="clock" size="28"></u-icon>
		 	<view class="year">车龄<=3个月</view>
		 	<u-icon class="clock" name="clock" size="28"></u-icon>
		 	<view class="year">20万公里-30万公里</view>
		 	<u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				}
			}
		},
		methods: {
		  clear() {
				this.$u.route("pages/mymessage/mymessage")
		  	}
		}
	}
</script>
<style lang="scss" scoped>
	.selling {
		.list {
			width: 702rpx;
			height: 308rpx;
			padding: 18rpx 15rpx;
			margin-left: 24rpx;
			margin-top: 24rpx;
			font-size: 20rpx;
			background-image: url(@/static/bgcarsell.png);
			background-repeat: no-repeat;
			background-size: cover;
			.clear {
				clear: both;
			}
			.left, .right {
				float: left;
			}
			.right {
				width: 360rpx;
				padding-left: 34rpx;
			}
			.city {
				width: 96rpx;
				height: 40rpx;
				line-height: 32rpx;
				text-align: center;
				font-size: 20rpx;
				border-radius: 26rpx;
				border: 1rpx solid rgba(0,0,0,0.3);
				margin-top: 16rpx;
				margin-right: 16rpx;
				float: right;
			}
			.name {
				font-size: 28rpx;
				font-weight: 900;
				margin-top: 8rpx;
			}
			.price span {
				font-size: 36rpx;
				font-weight: 900;
				color: #40B36C;
				margin-left: 8rpx;
			}
			.case {
				padding: 6rpx 14rpx;
				border-radius: 30rpx;
				background: #40B36C;
				color: #fff;
				float: left;
				margin-right: 10rpx;
				margin-top: 10rpx;
			}
			.clock {
				margin-left: 30rpx;
				margin-top: 10rpx;
				float: left;
			}
			.year {
				margin-top: 8rpx;
				margin-right: 50rpx;
				float: left;
			}
			.heart {
				margin-top: 12rpx;
				margin-right: 20rpx;
				float: right;
			}
		}
	}
</style>


