<template>
	<view class="companyDetail">
		<view class="content">
			<view class="text">{{detail.comparyIntroduce}}</view>
			<!-- <view>为什么要加入T3出行？</view>
			<view>更高的收入，多劳多得</view>
			<view>我们提供（基础+提成+奖励+补贴）的薪酬体系，更有新人专享的保底薪资，每月发放5次薪水，只要够努力，
			就一定能打拼出属于自己的一片新天地；</view>
			<view>司机薪资架构</view>
			<view>基本工资、辛勤劳作奖励、流水奖励</view>
			<view>冲单奖励、缴纳社保、充电补贴等。</view>
			<view>更多的尊重，视你如家人</view>
			<view>实力强大的合规平台，为每位司机提供完整的晋升体系和五险福利，让你时刻感受一家人的关怀和温暖；</view>
			<view>更好的服务，无后顾之忧</view>
			<view>我们提供全新的合规车辆，无需租金，车险和保养都由我们承担</view>
			<view>更高的收入，多劳多得</view>
			<view>更高的收入，多劳多得</view>
			<view>更高的收入，多劳多得</view> -->
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
    .companyDetail {
		.content {
			width: 671rpx;
			padding: 20rpx 40rpx;
			background: #fff;
			margin-left: 40rpx;
			font-size: 20rpx;
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


