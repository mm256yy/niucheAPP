<template>
	<view>
		<u-navbar back-icon-color="#111111" title="订单详情" :background="background" title-color="#111111">
			<view slot="" @click="refreshView">刷新</view>
			<view class="navbar-right" slot="right">
				<view class="message-box right-item" @click="chargeback" v-if="status">退单</view>
			</view>
		</u-navbar>
		<view class="content">
			<view class="count_down">剩余<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd"></u-count-down>
			</view>
			<view style="margin:16rpx 80rpx 0;display: flex;justify-content:center;width: 90%;">
				<u-time-line>
					<u-time-line-item nodeTop="2">
						<!-- 此处自定义了左边内容，用一个图标替代 -->
						<template v-slot:node>
							<view class="u-node">
								<!-- 此处为uView的icon组件 -->
								<view class="time">
									<view>2020-09-28</view>
									<view style="font-size: 24rpx;text-align: center;">11:15:33</view>
								</view>
								<u-image width="52rpx" height="52rpx" src="@/static/qianyue@2x.png"></u-image>
							</view>
						</template>
						<template v-slot:content>
							<view style="height: 52px;">
								<view class="u-order-title">完成</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="u-order-desc">提车</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
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
				timestamp: 86399,
				status: true, //状态
			}
		},
		methods: {
			refreshView() {
				console.log(222)
			},
			chargeback() {
				console.log('退单')
			},
			countEnd() {
				console.log(2221)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #333333;
		display: flex;
	}

	.content {

		.count_down {
			text-align: center;
			padding: 40rpx 0 20rpx;
			color: #FE5B00;
		}

		.u-node {
			width: 52rpx;
			height: 52rpx;
			border-radius: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #d0d0d0;
			.time{
				position: absolute;left: -100px;color: #000000;font-size: 28rpx;
			}
		}
         
		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
		}

		.u-order-desc {
			color: rgb(150, 150, 150);
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}

		.u-order-time {
			color: rgb(200, 200, 200);
			font-size: 26rpx;
		}
	}
</style>
