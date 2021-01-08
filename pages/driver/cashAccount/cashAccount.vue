<template>
	<view>
		<u-navbar back-icon-color="#FFFFFF" title="我的账户" :background="{}" title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text @click="billDetails">账单</text>
				</view>
			</view>
		</u-navbar>
		<view class="my_account">
			<view>总资产(元）</view>
			<view style="font-size: 30px;padding: 10px 0;">15888888</view>
			<u-image src="@/static/cheliangzulin@3x.png" height="190rpx" border-radius="0"></u-image>
		</view>
		<view style="padding: 15px 25px 0;text-align: center;">
			<u-button type="warning" shape='circle' class="btn_orange" @click="applyAccount">提现申请</u-button>
		</view>
		<u-modal v-model="showTips" :show-confirm-button="false" title="">
			<view class="slot_content">
				<view class="slot_tips">
					{{tipsText}}
				</view>
				<view style="padding: 15px 20px 0;text-align: center;">
					<u-button type="warning" shape='circle' class="btn_orange" @click="showTips=false">好的</u-button>
				</view>
			</view>
		</u-modal>
		<Auth ref="auth"></Auth>
	</view>
</template>

<script>
	import Auth from '@/components/auth.vue'
	export default {
		components:{
			Auth
		},
		data() {
			return {
				totalAssets: 0,
				showTips: false,
				tipsText: '您无余额可提现！',
				flag:false,//是否可提现
			};
		},
		onLoad(option) {
			let money = option.money;
			if(money){
				this.totalAssets = option.money;
			}
		},
		onShow() {
            this.getAccount()
		},
		methods: {
			billDetails() {
				this.$u.route('/pages/driver/cashAccount/billDetails')
			},
			getAccount() {
				if (this.totalAssets>0) {
					this.$u.api.getCashFlag().then(res => {
						if (res.code === 200) {
							if(res.object === 1){
								this.flag = true;
							} else {
								this.flag = false;
							}
						} else {
							this.$u.toast(res.msg);
						}
					})
				} 
			},
			applyAccount() {
				if(this.totalAssets === 0){
					this.tipsText = '您无余额可提现！'
					this.showTips = true;
					return false
				}
				if(!this.flag){
					this.tipsText = '对不起，每月只能1次申请提现！'
					this.showTips = true;
					return false
				}
				this.showTips = false;
				this.$u.route('/pages/driver/cashAccount/cashWithdrawal')
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: url(../../../static/zanghu@3x.png);
		background-repeat: no-repeat;
		height: 333px;
		background-size: 100%;
		background-color: #F5F5F5;
	}

	/deep/ .u-border-bottom:after {
		border-bottom-width: 0;
	}
</style>
<style lang="scss" scoped>
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}

	.my_account {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 333px;
		color: #FFFFFF;
	}

	.btn_orange {
		background: linear-gradient(270deg, #FFC700 0%, #FF9000 100%);
		border-radius: 6px;
	}

	.slot_content {
		padding: 15px 0;
		.slot_tips {
			color: #333333;
			text-align: center;
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 40px;
			border-bottom: 1rpx solid #E0E0E0;
		}
	}
</style>
