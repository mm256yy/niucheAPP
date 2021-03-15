<template>
	<view>
		<u-navbar back-icon-color="#111111" title="支付宝账号绑定" :background="background" title-color="#111111"></u-navbar>
		<view class="content">
			<u-form :model="form" ref="uForm" label-width="180" :border-bottom="false">
				<u-form-item label="支付宝账号:" prop="aliPayId">
					<u-input @input="input" class="input-radius" v-model="form.aliPayId" placeholder="输入你支付宝收款账号"/>
					<text>{{first}}/3</text>
				</u-form-item>
				<u-form-item label="姓名:" prop="userName">
					<u-input class="input-radius" v-model="form.userName" placeholder="你在支付宝认证的姓名"/>
				</u-form-item>
				<view style="margin-top: 36rpx;">验证金额：</view>
				<u-form-item label="￥" prop="checkMoney">
					<u-input class="input-radius" v-model="form.checkMoney" placeholder="请输入"/>
					<view v-if="num" @click="getMoney()" class="get">获取验证金额</view>
					<view v-else class="disabled">已获取验证金额</view>
				</u-form-item>
			</u-form>
			<view class="tip">*验证金额：是由纽车平台向你的支付宝账号随机汇的微小金额，仅做账号有效性验证，无须退还</view>
			<view class="warn">*请如实填写信息，否则造成收款失败</view>
		</view>
		<view v-show="first<3" class="bottom">
			<view v-show="disabled" class="submit" @click="submit()">绑定</view>
			<view v-show="!disabled" class="disable">绑定</view>
		</view>
		<view v-show="first>=3" class="bottom">
			<view class="disable">绑定</view>
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
				show:false,
				num:true,
				disabled:true,
				id:'',
				BusinessName:'',
				first:1,
				disable: false,
				form: {
				  aliPayId:'',
				  userName: '',
				  checkMoney: '',
				},
				leasetime: '',
				select: [
					{
						label: '1个月',
						value: '0'
					},
					{
						label: '3个月',
						value: '1'
					},
					{
						label: '6个月',
						value: '2'
					},
					{
						label: '12个月',
						value: '3'
					},
				],
			}
		},
		onLoad(option) {
			let id = option.id;
			let BusinessName = option.businessName;
			if(id){
			 this.id = id;
			}
			if(BusinessName){
			 this.BusinessName = BusinessName;
			}
		},
		mounted() {
			this.getNumber()
		},
		methods: {
			input(){
				if(this.first >= 3){
					this.$u.toast('支付宝账号24小时内最多可变更3次');
					return false;
				}
				const aliPayId = uni.getStorageSync('aliPayId');
				if(this.form.aliPayId !== aliPayId){
					this.num = true;
				}
			},
			getMoney(){
				if(this.first >= 3){
					this.$u.toast('支付宝账号24小时内最多可变更3次');
					return false;
				}
				if(!this.form.aliPayId){
					this.$u.toast('支付宝账号不能为空');
					return false;
				}
				if(!this.form.userName){
					this.$u.toast('姓名不能为空');
					return false;
				}
				this.num = false;
				const params = {
					companyName:this.BusinessName,
					payeeAccount:this.form.aliPayId,
					realname:this.form.userName,
					userMainId:this.id
				};
				this.$u.api.getMoney(params).then(res => {
					if(res.code === 200){
						this.$u.toast('获取验证金额成功');
						this.getNumber()
					 } else{
						this.$u.toast(res.msg)
						this.getNumber()
					 }
				})
			},
			getNumber(){
				this.$u.api.getNum({}).then(res => {
							if(res.code === 200){
								this.first = res.object;
								uni.setStorageSync('aliPayId', this.form.aliPayId);
							 } else{
								this.$u.toast(res.msg) 
							 }
						})
			},
			submit(){
				if(this.form.alipayAccount&&this.form.monthlyrent&&this.form.money){
					this.$u.toast('请填写完整');
					return false
				}
				this.disabled = false;
				const params = Object.assign(this.form, {
					userMainId:this.id
				});
				this.$u.api.accountBind(params).then(res => {
					if(res.code === 200){
						this.disabled = true;
						this.$u.toast('支付宝绑定成功');
						this.$u.route('/pages/company/order/checkAccount')
					 }else if(res.code === 100){
						 this.disabled = true;
						 this.$u.toast('验证金额错误3次，请明天重试');
					 }else{
						 this.disabled = true;
						this.$u.toast(res.msg) 
					 }
				})
			}
		}	
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 28rpx;
		color: #111;
	}
	.get{
		width: 210rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #FFFFFF;
		border-radius: 8rpx;
		border: 2rpx solid #D9DEDF;
		font-size: 28rpx;
		color: #5BBF84;
	}
	.disabled{
		width: 210rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #FFFFFF;
		border-radius: 8rpx;
		border: 2rpx solid #D9DEDF;
		font-size: 28rpx;
		color: #959595;
	}
	.tip{
		font-size: 22rpx;
		color: #151b33;
		margin-top: 60rpx;
	}
	.warn{
		font-size: 22rpx;
		color: #FE3B31;
		margin-top: 26rpx;
	}
	.bottom{
		width: 100%;
		height: 140rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		border-top: 2rpx solid rgba(0,0,0,0.08);
		.submit{
			width: 600rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background: linear-gradient(270deg, #63D094 0%, #5BC98A 49%, #3EB06B 100%);
			border-radius: 12rpx;
			margin-top: 20rpx;
			margin-left: 75rpx;
			font-size: 36rpx;
			color: #fff;
		}
	}
</style>
