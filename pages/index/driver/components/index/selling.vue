<template>
	<view class="selling">
		 <view class="list" @click="detail()">
		 	<view class="right">
		 		<view class="name">520520款运动版</view>
		 		<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
		 		<view class="year">车龄<3个月</view>
		 		<view class="clear"></view>
		 		<u-icon class="car" name="car" width="22" height="22"></u-icon>
		 		<view class="distance">20万公里-30万公里</view>
		 		<view class="clear"></view>
		 	</view>
		 	<u-image class="left" width="306rpx" height="226rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="clear"></view>
		 	<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		 	<view class="box">
		 		<view><span>28000</span>元/月起租</view>
		 		<view class="case">自动挡</view>
		 		<view class="case">SUV</view>
		 		<view class="case">纯电动</view>
		 	</view>
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
		.list{
			width: 679rpx;
			height: 285rpx;
			color: #000;
			font-size: 20rpx;
			margin-left: 36rpx;
			margin-top: 40rpx;
			.clear {
				clear: both;
			}
			.left {
				float: right;
			}
			.right{
				width: 373rpx;
				height: 226rpx;
				padding: 0 30rpx;
				background: #fff;
				float: left;
			}
			.name {
				font-weight: 900;
				font-size: 34rpx;
				margin-top: 63rpx;
			}
			.clock,.year {
				float: left;
				margin-top: 6rpx;
			}
			.clock {
				margin-top: 18rpx;
				color: #7f7f7f;
			}
			.car {
				float: left;
				color: #7f7f7f;
				margin-top: 4rpx;
			}
			.year {
				margin-left: 6rpx;
				margin-top: 12rpx;
				color: #7f7f7f;
			}
			.distance {
				margin-left: 6rpx;
				color: #7f7f7f;
				float: left;
			}
			.box {
				width: 679rpx;
				height: 59rpx;
				background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
				padding: 0 0 0 18rpx;
				color: #fff;
				view {
					font-size: 20rpx;
					float: left;
				}
				view span {
					font-size: 36rpx;
					font-weight: 900;
					margin-right: 19rpx;
				}
				.case {
					padding: 6rpx 14rpx;
					border-radius: 10rpx;
					background: #fff;
					font-weight: 900;
					color: #FF6501;
					margin-top: 8rpx;
					float: right;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>


