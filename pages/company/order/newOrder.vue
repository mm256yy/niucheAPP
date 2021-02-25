<template>
	<view>
		<u-navbar back-icon-color="#111111" title="新建订单" :background="background" title-color="#111111"></u-navbar>
		<view class="content">
			<view style="margin-top: 20rpx;">订单信息</view>
			<view style="margin-top: 20rpx;color: #bcbcbc;">订单号：2343434343</view>
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item style="width:694rpx;margin-top: -18rpx;" label=""><u-input placeholder-style="color:#000;" placeholder="租期:" @click="show = true" v-model="timeRent" type="select" /></u-form-item>
				<u-form-item label="押金:" prop="name">
					<u-input class="input-radius" v-model="form.name" maxlength="10" placeholder="请输入"/>元
				</u-form-item>
				<u-form-item label="月租金:" prop="name">
					<u-input class="input-radius" v-model="form.name" maxlength="10" placeholder="请输入"/>元/月
				</u-form-item>
			</u-form>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<view style="margin-top: 20rpx;">承租人信息</view>
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item label="姓名:" prop="name">
					<u-input class="input-radius" v-model="form.name" maxlength="10" placeholder="请输入"/>
				</u-form-item>
				<u-form-item label="身份证号:" prop="name">
					<u-input class="input-radius" v-model="form.name" maxlength="10" placeholder="请输入"/>
				</u-form-item>
				<u-form-item label="手机号" prop="telephone" >
					<u-input v-model="form.name" type="number" placeholder="请输入"/>
				</u-form-item>
			</u-form>
		</view>
		<view class="bottom">
			<view class="submit">新建并发起订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				form: {
				  value: 0
				},
				timeRent: '',
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
		mounted() {
			
		},
		methods: {
			confirm(arr){
				this.form.value = arr[0].value;
				this.timeRent = arr[0].label;
				this.search()
			},
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
