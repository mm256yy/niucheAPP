<template>
	<view>
		<u-navbar back-icon-color="#111111" title="新建订单" :background="background" title-color="#111111"></u-navbar>
		<view class="content">
			<view style="margin-top: 20rpx;">订单信息</view>
			<view style="margin-top: 20rpx;color: #bcbcbc;">订单号：2343434343</view>
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item style="width:694rpx;margin-top: -18rpx;" label="出租车辆:"><u-input placeholder="请选择" @click="toCarname()" v-model="form.carname" type="select" /></u-form-item>
				<u-form-item style="width:694rpx;margin-top: -18rpx;" label="租期:"><u-input placeholder="请选择" @click="show = true" v-model="leasetime" type="select" /></u-form-item>
				<u-form-item label="押金:" prop="deposit">
					<u-input type="number" class="input-radius" v-model="form.deposit" placeholder="请输入"/>元
				</u-form-item>
				<u-form-item label="月租金:" prop="monthlyrent">
					<u-input type="number" class="input-radius" v-model="form.monthlyrent" placeholder="请输入"/>元/月
				</u-form-item>
			</u-form>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<view style="margin-top: 60rpx;">承租人信息</view>
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item label="姓名:" prop="rentername">
					<u-input @blur="blur()" class="input-radius" v-model="form.rentername" placeholder="请输入"/>
				</u-form-item>
				<u-form-item label="身份证号:" prop="renteridcard">
					<u-input @blur="blur()" class="input-radius" v-model="form.renteridcard" placeholder="请输入"/>
				</u-form-item>
				<u-form-item label="手机号" prop="renteridphone" >
					<u-input @blur="blur()" v-model="form.renteridphone" type="number" placeholder="请输入"/>
				</u-form-item>
			</u-form>
		</view>
		<view class="bottom">
			<view @click="submit()" class="submit">新建并发起订单</view>
		</view>
	</view>
</template>

<script>
	import {phoneRule,IDNumberRule} from '@/common/rule.js'
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				show:false,
				form: {
				  carname: '',
				  leasetime: '',
				  monthlyrent: '',
				  deposit: '',
				  rentername: '',
				  renteridphone: '',
				  renteridcard: ''
				},
				rules:{
					renteridphone:phoneRule,
					renteridcard:IDNumberRule,
				},
				leasetime: '',
				select: [
					{
						label: '1个月',
						value: 1
					},
					{
						label: '3个月',
						value: 3
					},
					{
						label: '6个月',
						value: 6
					},
					{
						label: '12个月',
						value: 12
					},
				],
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
		},
		mounted() {
			const obj = uni.getStorageSync('textSelect');
			if(obj){
				this.form.carname = obj.text + ' ' + obj.textBrand + ' ' + obj.textThird;
			}
		},
		methods: {
			toCarname(){
				this.$u.route('/pages/company/order/selectBrand')
			},
			blur(){
				if(this.form.rentername&&this.form.renteridphone&&this.form.renteridcard){
					const params={
						userName: this.form.rentername,
						phone: this.form.renteridphone,
						idCard: this.form.renteridcard
					}
					this.$u.api.verify(params).then(res => {
						if(res.code === 200){
							
						 } else{
							this.$u.toast(res.msg) 
						 }
					}).catch(res=>{this.$u.toast(res.msg)})
				}
			},
			confirm(arr){
				this.form.leasetime = arr[0].value;
				this.leasetime = arr[0].label;
			},
			submit(){
				if(!this.form.leasetime||!this.form.monthlyrent||!this.form.deposit||!this.form.rentername
				||!this.form.renteridphone||!this.form.renteridcard||!this.form.carname){
					this.$u.toast('请填写完整');
					return false
				}
				this.form.monthlyrent = Number(this.form.monthlyrent)
				this.form.deposit = Number(this.form.deposit)
				this.$u.api.orderNew(this.form).then(res => {
					if(res.code === 200){
						this.$u.toast('新建订单成功');
						const obj = uni.removeStorageSync('textSelect');
						this.$u.route('/pages/company/order/order')
					 } else{
						this.$u.toast(res.msg) 
					 }
				}).catch(res=>{this.$u.toast(res.msg)})
			}
		}	
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 28rpx;
		color: #111;
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
