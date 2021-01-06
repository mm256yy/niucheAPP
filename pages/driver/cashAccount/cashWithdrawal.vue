<template>
	<view>
		<u-navbar back-icon-color="#111111" title="提现申请" :background="background" title-color="#111111"></u-navbar>
		<view class="content_view">
			<view class="content_title">车辆月租金</view>
			<view class="content_input">
				<u-image src="@/static/￥@3x.png" height="50rpx" width="44rpx" border-radius="8"></u-image>
				<u-input v-model="form.mobile" @input="money=form.mobile" type="number" maxlength="6" :border="false" placeholder="请输入当前车辆月租金" style="padding-left: 20px;" />
			</view>
			<view class="content_tips">*请输入与您租赁合同内一致的租金金额，否则会提现失败</view>
			<view class="content_title">提现金额</view>
			<view class="content_input">
				<u-image src="@/static/￥@3x.png" height="50rpx" width="44rpx" border-radius="8"></u-image>
				<u-input v-model="form.mobile" @input="" :border="false" type="number" maxlength="5" placeholder="请输入提现金额" style="padding-left: 20px;" />
			</view>
			<view style="font-size: 12px;color:#C7C7C7 ;padding-top: 5px;">当前可提现金额<text>{{money}}</text>元</view>
			<view class="content_tips" v-show="moneyTips">*当前超过可提现金额</view>
			<u-gap height="50" bg-color="#FFFFFF"></u-gap>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="content_view">
			<view class="content_title">提现到</view>
			<view style="display: flex;justify-content: space-between;padding-bottom: 10px; border-bottom: 1px solid #DEDEDE;">
				<u-image src="@/static/zhifubao@3x.png" height="60rpx" width="60rpx" border-radius="8"></u-image>
				<view>支付宝</view>
				<u-image src="@/static/xuanzhong@3x.png" height="46rpx" width="46rpx" border-radius="8"></u-image>
			</view>
			<view class="content_input" style="align-items: baseline;padding: 10px 0;">
				<view style="color: #111111;font-weight: bold;">支付宝账号</view>
				<u-input v-model="form.mobile" :border="false" placeholder="请输入您的支付宝账户号" style="padding-left: 20px;" />
			</view>
			<view class="content_tips">
				*为保障您的合法权益，提现须上传车辆租赁合同和网约车平
				台跑单流水载图。
			</view>
		</view>
		<view style="padding: 35px 25px 0;text-align: center;">
			<u-button type="warning" shape='circle' class="btn_orange" @click="toNext">上传凭证</u-button>
		</view>
		<view style="color:#C7C7C7 ;text-align: center;padding: 10px 0;" @click="callPhone">遇到问题？</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				money: 0,
				moneyTips: false,
				form: {
					mobile: ''
				}
				//提现
			}
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '0571-87815287' 
				});
			},
			toNext(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content_view {
		margin: 0 20px;

		.content_title {
			padding: 15px 0 25px;
			color: #333333;
			font-size: 16px;
		}

		.content_input {
			display: flex;
			border-bottom: 1px solid #E0E0E0;
		}

		.content_tips {
			color: #FE3B31;
			font-size: 12px;
			padding-top: 4px;
		}
	}
	.btn_orange {
		background: linear-gradient(270deg, #FFC700 0%, #FF9000 100%);
		border-radius: 6px;
	}
</style>
