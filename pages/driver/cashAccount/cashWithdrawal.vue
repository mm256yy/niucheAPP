<template>
	<view>
		<u-navbar back-icon-color="#111111" title="提现申请" :background="background" title-color="#111111"></u-navbar>
		<view class="content_view">
			<view class="content_title">车辆月租金</view>
			<view class="content_input">
				<u-image src="@/static/￥@3x.png" height="50rpx" width="44rpx" border-radius="8"></u-image>
				<u-input v-model="form.rent" @input="rentMoney" type="number" maxlength="6" :border="false" placeholder="请输入当前车辆月租金" style="padding-left: 20px;" />
			</view>
			<view class="content_tips">*请输入与您租赁合同内一致的租金金额，否则会提现失败</view>
			<view class="content_title">提现金额</view>
			<view class="content_input">
				<u-image src="@/static/￥@3x.png" height="50rpx" width="44rpx" border-radius="8"></u-image>
				<u-input v-model="form.money" @input="moneyInput" :border="false" type="number" maxlength="7" placeholder="请输入提现金额" style="padding-left: 20px;" />
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
				<u-input v-model="form.billingAccount" maxlength="100" :border="false" placeholder="请输入您的支付宝账户号" style="padding-left: 20px;" />
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
		<u-modal v-model="showTips" :show-confirm-button="false" title="支付宝账户确认">
			<view class="slot_content">
				<view class="slot_tips">
					您的支付宝帐户为<text style="display: inline-block;font-weight: bold;color: #333;">{{form.billingAccount}}</text>，
					请您认真核对，如因错误造成的损失平台不承担，点击“确认”表示您已知晓相关责任！
				</view>
				<view style="display: flex;justify-content: space-around;padding: 10px 0 0;">
					<view @click="showTips=false" class="slot_btn" style="background: #F2F2F2;color: #5F5E5F;">修改</view>
					<view class="slot_btn" @click="toNextRoute" style="background: linear-gradient(270deg, #FFC200 0%, #FFB900 41%, #FF9A00 100%);color: #FFFFFF;">确认</view>
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
				money: 0,
				totalMoney:0,//账户金额
				moneyTips: false,
				showTips:false,
				form: {
					rent:'',
					money: '',
					billingAccount:''
				}
				//提现
			}
		},
		onLoad(option) {
			let money = option.money;
			if (money){
				this.totalMoney = money
			} else{
				this.initMoney()
			}
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '0571-87815287' 
				});
			},
			initMoney(){
				this.$u.api.listUserMessage().then(res=>{
					if(res.code === 200){
						let data = res.object;
						if (data.account){
							 this.totalMoney = data.account; 
						} else{
							this.totalMoney = 0
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			rentMoney(v){
				let amountFlag = this.$u.test.amount(v);
				if(amountFlag){
                     let keMoney =  Math.floor(v*0.1);
					 if (keMoney <this.totalMoney){
						 this.money = keMoney;
					 } else {
						 this.money = Math.floor(this.totalMoney*0.1);
					 }
				} else{
					this.money = 0
					this.$u.toast('车辆月租金输入有误,请重新输入')
					this.form.rent = ''
				}
			},
			moneyInput(val){
				let amountFlag = this.$u.test.amount(val);
				if(amountFlag && val<=this.money){
					 this.moneyTips = false;
				} else{
					this.moneyTips = true;
				}
			},
			toNext(){
				let rent = this.form.rent;
				if (rent === '' || rent == 0){
					this.$u.toast('车辆月租金输入不合法')
					return false
				}
				if(this.moneyTips){
					this.$u.toast('提现金额大于可提现金额')
					return false
				}
				if(this.form.billingAccount === ''){
					this.$u.toast('请填写支付宝账号')
					return false
				}
				this.showTips = true;
			},
			toNextRoute(){
				this.showTips = false;
				this.$u.route('/pages/driver/cashAccount/runningSingle',{rent:this.form.rent,money:this.form.money,billingAccount:this.form.billingAccount})
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
	.slot_content {
		padding: 15px 0;
		.slot_tips {
			color: #939393;
			font-size: 14px;
			padding: 0 20px 15px;
			border-bottom: 1rpx solid #E0E0E0;
		}

	}
	.slot_btn{
		width: 100px;padding: 8px;text-align: center;font-size: 14px;
		border-radius: 4px;
	}
</style>
