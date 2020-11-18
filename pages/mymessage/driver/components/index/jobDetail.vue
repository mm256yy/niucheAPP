<template>
	<view class="jobDetail">
		<view class="content">
			<view class="top">
				<u-image shape="circle" class="left" width="128rpx" height="128rpx" :src="detail.comparyLogoPhoto"></u-image>
				<view class="right">
					<view class="name u-line-1">{{detail.comparyname}}</view>
					<view v-for="(item, index) in detail.mainbusiness" :key="index" class="box u-line-1">{{item}}运营</view>
					<view class="clear"></view>
					<view class="size">公司规模：{{detail.comparyNum}}人以内</view>
					<view class="funds">注册资金：{{detail.comparyPrice}}百万</view>
					<view class="view">点击查看工商信息</view>
					<view class="clear"></view>
				</view>
			</view>
			<view class="text">{{detail.jobText}}</view>
		</view>
		<!-- <view class="ask">
			<u-image class="question" width="66rpx" height="66rpx" src="@/static/question.png"></u-image>
			<view class="problem">
				<view class="everyone">问问大家</view>
				<view class="how">谁买过？怎么样？</view>
			</view>
			<view class="small">></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			detail: {
			    type: Object,
			    default: function (){return {}}
			}
		},
		mounted() {
			
		},
		methods: {
			other() {
				this.$u.route('/pages/index/driver/components/index/other');
			}
		}
	}
</script>
<style lang="scss" scoped>
    .jobDetail {
		.content {
			width: 671rpx;
			padding: 20rpx 40rpx;
			background-color: #fff;
			margin-left: 40rpx;
			font-size: 20rpx;
			.clear{
				clear: both;
			}
			.top{
				width: 591rpx;
				background-color: #F5F5F8;
				margin-bottom: 40rpx;
			    display: flex;
			    align-items: center;
				.left{
					margin-left: 41rpx;
					margin-right: 38rpx;
					margin-top: 102rpx;
				}
				.right{
					width: 383rpx;
					.name{
						width: 383rpx;
						font-size: 36rpx;
						font-weight: 900;
						margin-top: 79rpx;
						margin-bottom: 26rpx;
					}
					.box{
						width: 383rpx;
						margin-left: 2rpx;
						margin-right: 38rpx;
					}
					.size{
						margin-top: 45rpx;
					}
					.view{
						width: 215rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
						color: #fff;
						float: right;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
					}
				}
			}
		.text {
				margin-bottom: 50rpx;
			}
		}
		.more {
			font-size: 20rpx;
		    color: #7f7f7f;
			margin-top: 83rpx;
			margin-left: 220rpx;
			margin-bottom: 70rpx;
		}
		.clear {
			clear: both;
		}
		.ask {
			width: 670rpx;
			height: 118rpx;
			padding: 26rpx 40rpx;
			background: #fff;
			margin-bottom: 40rpx;
			margin-top: 40rpx;
			margin-left: 40rpx;
			.question {
				float: left;
			}
			.problem {
				float: left;
				margin-left: 40rpx;
				.everyone {
					font-size: 28rpx;
				}
				.how {
					font-size: 20rpx;
					color: #7f7f7f;
				}
			}
			.small {
				float: right;
				margin-top: 10rpx;
				font-size: 32rpx;
				color: #7f7f7f;
			}
		}
		.last {
				   width: 100%;
				   height: 144rpx;
				   padding: 55rpx 116rpx;
				   background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
				   font-size: 36rpx;
				   font-weight: 900;
				   color: #fff;
				   display: flex;
				   justify-content: space-around;
				   align-items: center;
		}
	}
</style>


