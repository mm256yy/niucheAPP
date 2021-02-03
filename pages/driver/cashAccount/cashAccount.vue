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
			<view style="font-size: 30px;padding: 10px 0;font-weight: bold;">{{totalAssets}}</view>
			<u-image src="@/static/accountIn.png" height="272rpx" width="96%" border-radius="0" @click="toInviteFri"></u-image>
		</view>
		<view style="padding: 15px 25px 0;text-align: center;margin-top: 20px;">
			<!-- <u-button type="warning" shape='circle' class="btn_orange" @click="applyAccount">提现申请</u-button> -->
			<u-button type="warning" shape='circle' class="btn_orange" @click="applyTest">提现申请</u-button>
		</view>
		<u-modal v-model="showTips" :show-confirm-button="false" title="">
			<view class="slot_content">
				<view class="slot_tips" style="padding: 0 10px;">
					{{tipsText}}
				</view>
				<view style="padding: 15px 20px 0;text-align: center;">
					<u-button type="warning" shape='circle' class="btn_orange" @click="showTips=false">好的</u-button>
				</view>
			</view>
		</u-modal>
		<u-modal v-model="showTipsOne" :show-confirm-button="false" title="">
			<view class="slot_content">
				<view class="slot_tips">
					当前账户金额仅限从纽车平台租赁的车辆进行抵扣，其他渠道途径无法申请提现。
				</view>
				<view style="padding: 15px 20px 0;text-align: center;">
					<u-button type="warning" shape='circle' class="btn_orange" @click="showTipsOne=false">好的</u-button>
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
				showTipsOne:false,
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
			} else{
				this.initMoney()
			}
		},
		onShow() {
            this.getAccount()
		},
		methods: {
			applyTest(){
				this.showTipsOne = true
			},
			billDetails() {
				this.$u.route('/pages/driver/cashAccount/billDetails')
			},
			toInviteFri(){
				this.$u.route("/pages/driver/inviteFriends/inviteFriends")
			},
			initMoney(){
				this.$u.api.listUserMessage().then(res=>{
					if(res.code === 200){
						let data = res.object;
						if (data.account){
							 this.totalAssets = data.account; 
						} else{
							this.totalAssets = 0
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			getAccount() {
				if (this.totalAssets>0) {
					this.$u.api.getCashFlag().then(res => {
						if (res.code === 200) {
							let data = res.object
							if(data.state === 1){
								this.flag = true;
							} else {
								this.tipsText = data.text
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
					this.showTips = true;
					return false
				}
				this.showTips = false;
				this.$u.route('/pages/driver/cashAccount/cashWithdrawal',{money:this.totalAssets})
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
