<template>
	<view>
		<u-navbar back-icon-color="#111111" title="订单详情" :background="background" title-color="#111111"></u-navbar>
		<view class="head_content">
			<u-image width="80rpx" height="80rpx" src="@/static/order/wancheng2x.png"></u-image>
			<view style="padding-left: 20rpx;">
				<view class="title">{{form.state === 'ORDER_FAILED' ?'失效订单':'退单成功'}}</view>
				<view class="time">{{form.createTime}}</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="middle_content">
			<view class="company_name">{{form.companyname}}</view>
			<view class="company_model">{{form.carname}}</view>
			<view class="content_item">
				<view class="item"><text class="title">租赁周期：</text><text>{{form.leasetime}}个月（提车后开始计算）</text></view>
				<view class="item"><text class="title">每月租金：</text><text>{{form.monthlyrent}}元</text></view>
				<view class="item"><text class="title">车辆押金：</text><text>{{form.deposit}}元</text><text>（另须线下支付）</text></view>
				<view style="padding: 8rpx 0;" @click="showTips = true">
					<text style="color: #999999;font-size: 24rpx;">押金退还规则说明</text>
					<u-icon name="question-circle" color="#999999" size="32"></u-icon>
				</view>
				<view class="item"><text class="title">订单时间：</text><text>{{form.createTime}}</text></view>
				<view class="item"><text class="title">订单号：</text><text>{{form.tradeid}}</text></view>
			</view>
		</view>

		<view class="bottom_content">
			<view class="btn orange" @click="callPhone">联系平台</view>
		</view>
		<u-modal v-model="showTips" :show-confirm-button="false" title="">
			<view class="slot_content">
				<view class="slot_tips" style="padding:0 20rpx 30rpx;">
					<view>1. 押金会全额退还吗？什么情况下扣押金?</view>
					<view class="tips_text">租赁过程中，若您有未缴纳的费用或者违约金，租赁公司会在还车后结算时从押金中扣除，剩余费用全额退还。</view>
					<view>2. 押金什么时候退还?</view>
					<view class="tips_text">还车后，押金将会有租赁公司根据实际结算情况在30个工作日内退还，具体的到账时间因支付渠道不同存在差异，预计1-7个工作日到账。</view>
					<view>3. 押金是由谁收取和退还?</view>
					<view class="tips_text">押金是租赁公司收取和退还，平台提供线上支付和退还的能力。</view>
				</view>
				<view style="padding: 15px 20px 0;text-align: center;">
					<u-button type="warning" shape='circle' class="btn_orange" @click="showTips=false">好的</u-button>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				id:'',
				showTips: false,
				form:{
					
				}
			}
		},
		onLoad(option) {
			let id = option.id;
			if (id){
				this.id =id;
			}
		},
		mounted() {
			this.getInfo()
		},
		methods: {
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: '0571-87815287'
				});
			},
			getInfo(){
				//获取页面数据
				this.$u.api.driverOrderView({id:this.id}).then(res=>{
					if (res.code === 200) {
						 this.form = res.object;
					} else {
						 this.$u.toast(res.msg);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.head_content {
		padding: 40rpx 30rpx;
		display: flex;
		align-items: center;

		.title {
			color: #111111;
			font-size: 30rpx;
			font-weight: 600;
			padding-bottom: 10rpx;
		}

		.time {
			font-size: 26rpx;
			color: #C7C7C7;
		}
	}

	.middle_content {
		padding: 40rpx 30rpx;

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

	.bottom_content {
		position: fixed;
		bottom: 10rpx;
		width: 100%;
		border-top: 1px solid #E0E0E0;
		padding: 40rpx 60rpx;

		.btn {
			padding: 24rpx 28rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
		}

		.orange {
			background: linear-gradient(270deg, #FFC600 0%, #FFA900 47%, #FF9100 100%);
			color: #FFFFFF;
		}
	}

	.slot_content {
		padding: 15px 0;

		.slot_tips {
			color: #333333;
			font-size: 28rpx;
			border-bottom: 1rpx solid #E0E0E0;

			.tips_text {
				padding: 10rpx 0;
				text-indent: 20rpx;
			}
		}
	}
</style>
