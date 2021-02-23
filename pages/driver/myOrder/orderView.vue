<template>
	<view>
		<u-navbar back-icon-color="#111111" title="订单详情" :background="background" title-color="#111111">
			<view slot="" @click="refreshView">
				<u-image width="30rpx" height="30rpx" src="@/static/order/reload2x.png"></u-image>
			</view>
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
						<template v-slot:node>
							<view class="u-node">
								<view class="time">
									<view>2020-09-28</view>
									<view class="hour">11:15:33</view>
								</view>
								<u-image width="60rpx" height="60rpx" src="@/static/order/wancheng2x.png"></u-image>
							</view>
						</template>
						<template v-slot:content>
							<view style="height: 60px;">
								<view class="u-order-title">完成</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item v-show="!openFlag">

					</u-time-line-item>
					<view v-show="openFlag">
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>2020-09-28</view>
										<view class="hour">11:15:33</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/tiche2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view style="height: 60px;">
									<view class="u-order-desc">提车</view>
								</view>
							</template>
						</u-time-line-item>
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>2020-09-28</view>
										<view class="hour">11:15:33</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/zhifu2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view style="height: 60px;">
									<view class="u-order-desc">支付租金和押金</view>
								</view>
							</template>
						</u-time-line-item>

						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>2020-09-28</view>
										<view class="hour">11:15:33</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/hetong2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view style="height: 60px;">
									<view class="u-order-desc">合同签署</view>
								</view>
							</template>
						</u-time-line-item>
						<u-time-line-item nodeTop="2" style="margin: 0;">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>2020-09-28</view>
										<view class="hour">11:15:33</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/yanche2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">验车</view>
								</view>
							</template>
						</u-time-line-item>
					</view>
				</u-time-line>

			</view>
			<view style="text-align: center;width: 90%;padding: 30rpx 0 20rpx;" @click="openFlow">
				<text style="color: #333333;">{{openFlag?'收起':'展开'}}</text>
				<u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#C9C9C9"></u-icon>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="middle_content">
			<view class="company_name">企业全称</view>
			<view class="company_model">出租的品牌</view>
			<view class="content_item">
				<view class="item"><text class="title">租赁周期：</text><text>12个月（提车后开始计算）</text></view>
				<view class="item"><text class="title">每月租金：</text><text>3000元</text></view>
				<view class="item"><text class="title">车辆押金：</text><text>3000元</text></view>
				<view style="padding: 8rpx 0;">
					<text style="color: #999999;font-size: 24rpx;">押金还车后退，规则说明</text>
					<u-icon name="question-circle" color="#999999" size="32"></u-icon>
				</view>
				<view class="item"><text class="title">订单时间：</text><text>3000元</text></view>
				<view class="item"><text class="title">订单号：</text><text>3000元</text></view>
			</view>
			<view class="content_item" v-if="false">
				<view class="item"><text class="title">实付租金: </text><text>3000元</text></view>
				<view class="item"><text class="title">实付押金：</text><text>3000元</text></view>
				<view class="item"><text class="title">实际支付总和：</text><text>3000元</text></view>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="tips_content">
			<view style="font-size: 30rpx;">订单提示</view>
			<view style="padding: 8rpx 20rpx 0 0;">订单提示订单提示订单提示订单提示示订单提示订单提示订单提示订单提示订单提示订单提示订单提示</view>
		</view>
		<view class="chat_btn">
			<u-row>
				<u-col span="6" style="border-right: 1px solid #E0E0E0;">
					<view class="btn">
						<u-image width="52" height="52" src="@/static/order/lianxichuzufang2x.png"></u-image>
						<view class="text">联系出租方</view>
					</view>
				</u-col>
				<u-col span="6">
					<view class="btn">
						<u-image width="52" height="52" src="@/static/order/lianxipingtai2x.png"></u-image>
						<view class="text">联系平台</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="view_car">查看车辆信息</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<!-- 1 -->
		<view class="bottom_content" style="padding: 40rpx 60rpx;">
			<view class="btn orange">确认验车和上传车辆信息</view>
		</view>
		<!-- 2 -->
		<view class="bottom_content" style="padding: 40rpx 60rpx;">
			<view class="btn orange">签署《汽车租赁合同》</view>
		</view>
<!-- 		<view class="bottom_content" >	
			<u-row>
				<u-col span="5">
					<view class="btn defult">查看验车信息</view>
				</u-col>
				<u-col span="7" style="text-align: center;">
					<view class="btn orange">签署《汽车租赁合同》</view>
				</u-col>
			</u-row>
		</view> -->
        <!-- 3 -->
		<view class="bottom_content" style="position: relative;">
			<u-row>
				<u-col span="7">
					<view class="tips">*须商家签署合同才可支付</view>
					<view class="">合计<text class="money">12000</text><text style="color:#FE3B31 ;">元</text> 
					<text style="font-size: 24rpx;color: #1F87F2;padding-left: 10rpx;">明细</text>
					<u-icon :name="openFlag?'arrow-up':'arrow-down'" size="30" color="#1F87F2"></u-icon></view>
					
				</u-col>
				<u-col span="5">
					<view :class="['btn',openFlag?'orange':'defult']">支付</view>
				</u-col>
				<view class="money_abs" v-if="openFlag">月租金 <text>3000元</text> 押金 <text>10000元</text> 订金<text>-1000元</text> </view>
			</u-row>
			<view class="view_contract">
				<text class="label">查阅</text><text class="contract">《汽车租赁合同》</text>
			</view>
		</view>
		<!-- 4 -->
		<view class="bottom_content" style="padding: 40rpx 60rpx;">
			<view class="btn orange padding30">确认提车</view>
			<view class="view_contract">
				<text class="label">查阅</text><text class="contract">《汽车租赁合同》</text>
			</view>
		</view>
		<!-- 5 -->
		<view class="bottom_content" style="padding: 60rpx 0;">
			<view class="view_contract">
				<text class="label">查阅</text><text class="contract">《汽车租赁合同》</text>
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
				timestamp: 86399,//倒计时
				status: true, //状态
				openFlag: false, //展开 收起
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
			},
			openFlow() {
				this.openFlag = !this.openFlag
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
			width: 60rpx;
			height: 60rpx;
			border-radius: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.time {
				position: absolute;
				left: -100px;
				color: #000000;
				font-size: 28rpx;

				.hour {
					font-size: 24rpx;
					text-align: center;
				}
			}
		}

		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
			line-height: 30px;
			height: 30px;
		}

		.u-order-desc {
			color: #C9C9C9;
			font-size: 28rpx;
			line-height: 30px;
			height: 30px;
		}

		.u-order-time {
			color: rgb(200, 200, 200);
			font-size: 26rpx;
		}
	}

	.middle_content {
		padding: 40rpx 30rpx;

		.company_name {
			font-size: 30rpx;
		}

		.company_model {
			font-size: 30rpx;
			padding: 16rpx 0 40rpx;
		}

		.content_item {
			padding: 30rpx 0;
			border-top: 1px solid #E0E0E0;

			.item {
				padding: 14rpx 0;

				.title {
					display: inline-block;
					color: #939393;
					font-size: 28rpx;
					width: 230rpx;
				}

				.value {
					color: #333333;
				}
			}
		}
	}

	.tips_content {
		padding: 40rpx 30rpx 20rpx;
	}

	.chat_btn {
		border-top: 1px solid #E0E0E0;
		border-bottom: 1px solid #E0E0E0;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 110rpx;
			.text{
				color: #555555;padding-left: 10rpx;
			}
		}
	}
	.view_car{
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #252825;
	}
	.bottom_content{
		padding: 20rpx 20rpx 30rpx;
		.btn{
			padding: 24rpx 28rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
		}
		.padding30{
			padding: 30rpx;
		}
		.defult{
			background: #F2F2F2;
			color: #252825;
		}
		.orange{
			background: linear-gradient(270deg, #FFC600 0%, #FFA900 47%, #FF9100 100%);
			color: #FFFFFF;
		}
		.tips{
			font-size: 24rpx;
			color: #FE3B31;
		}
		.money{
			font-size: 36rpx;
			color: #FE3B31;
		}
		.money_abs{
			color: #E8541E;
			background: #FCEEE9;
			position: absolute;
			padding: 10rpx 6rpx;
			top: 2rpx;
			z-index: 20;
			left: 60rpx;
		}
		.view_contract{
			text-align: center;padding-top: 20rpx;font-size: 24rpx;
			.label{
				color:#C7C7C7
			}
			.contract{
				color: #FF9500;
			}
		}
	}
</style>
