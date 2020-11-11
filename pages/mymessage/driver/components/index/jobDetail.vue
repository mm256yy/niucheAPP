<template>
	<view class="jobDetail">
		<view class="ask">
			<u-image class="question" width="66rpx" height="66rpx" src="@/static/question.png"></u-image>
			<view class="problem">
				<view class="everyone">问问大家</view>
				<view class="how">谁买过？怎么样？</view>
			</view>
			<view class="small">></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
    .jobDetail {
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
	}
</style>


