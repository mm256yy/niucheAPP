<template>
	<view>
		<u-navbar back-icon-color="#111111" title="商品信息登记" :background="background" title-color="#111111"></u-navbar>
		<view class="content">
			<view style="margin-top: 20rpx;">车辆信息</view>
			<view style="margin-top: 20rpx;color: #bcbcbc;">{{detail.carname}}</view>
			<u-form :model="form" ref="uForm" label-width="200" :border-bottom="false">
				<u-form-item label="车身颜色:"><u-input class="input-radius" placeholder="请输入" v-model="form.color" /></u-form-item>
				<u-form-item label="车牌号:"><u-input class="input-radius" placeholder="请输入" v-model="form.numberPlate" /></u-form-item>
				<u-form-item label="车架号:" prop="deposit">
					<u-input class="input-radius" v-model="form.numberFrame" placeholder="请输入"/>
				</u-form-item>
				<u-form-item label="发动机号:" prop="monthlyrent">
					<u-input class="input-radius" v-model="form.numberEngine" placeholder="请输入"/>
				</u-form-item>
				<u-form-item label="初次登记日期" prop="registration">
					<u-input v-model="form.registration"
					 class="input-radius" :disabled="true" @click="showPicker('registration')" placeholder="请选择"/>
					<u-icon class="iconAbs" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
				<u-form-item label="表显里程:" prop="km">
					<u-input type="number" class="input-radius" v-model="form.km" placeholder="请输入"/>KM
				</u-form-item>
			</u-form>
			<u-picker v-model="show" mode="time" :end-year="today.year" :params="params" @confirm="dataChange"></u-picker>
			<view style="margin-top: 30rpx;margin-bottom: 10rpx;">租赁及费用信息</view>
			<view class="item"><text class="title">押金: </text><text>{{detail.deposit}}元</text></view>
			<view class="item"><text class="title">固定月租: </text><text>{{detail.monthlyrent}}元</text></view>
			<view class="item" v-show="detail.leasetime == 1"><text class="title">固定租期: </text><text>1个月</text></view>
			<view class="item" v-show="detail.leasetime == 3"><text class="title">固定租期: </text><text>3个月</text></view>
			<view class="item" v-show="detail.leasetime == 6"><text class="title">固定租期: </text><text>6个月</text></view>
			<view class="item" v-show="detail.leasetime == 12"><text class="title">固定租期: </text><text>12个月</text></view>
			<view class="item"><text class="title">付款方式: </text><text>按月支付</text></view>
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item label="起租日期" prop="startRentDate">
					<u-input v-model="form.startRentDate"
					 class="input-radius" :disabled="true" @click="showPicker('startRentDate')" placeholder="请选择"/>
					<u-icon class="iconAbs" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
				<u-form-item label="到期日期" prop="endRentDate">
					<u-input v-model="form.endRentDate"
					 class="input-radius" :disabled="true" @click="showPicker('endRentDate')" placeholder="请选择"/>
					<u-icon class="iconAbs" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
			</u-form>
			<view class="tip">*提车日期，以订单提车状态为准！</view>
		</view>
		<view class="room">
		</view>
		<view class="bottom">
			<view @click="submit()" class="submit">提交</view>
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
				form: {
				  color: '',
				  numberPlate: '',
				  numberFrame: '',
				  numberEngine: '',
				  registration: '',
				  km: '',
				  endRentDate: '',
				  orderId: '',
				  startRentDate: '',
				  orderId: '',
				  registerInfo: ''
				},
				detail:{},
				leasetime: '',
				pickerName:'',
				params: {
					year: true,month: true,day: true,hour: false,minute: false,second: false
				},
				today:{},
				detail: {}
			}
		},
		onLoad(option) {
			let detail = JSON.parse(option.detail);
			if(detail){
			 this.detail = detail;
			 this.form.orderId = this.detail.tradeid;
			 this.form.registerInfo = this.detail.carname;
			}
		},
		methods: {
			showPicker(name){
				this.pickerName = name;
				this.show = true;
			},
			dataChange(obj){
				let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
				this.form[this.pickerName] = companyDate;
			},
			submit(){
				if(!this.form.color||!this.form.numberPlate||!this.form.numberFrame||!this.form.numberEngine
				||!this.form.registration||!this.form.km||!this.form.endRentDate||!this.form.startRentDate){
					this.$u.toast('请填写完整');
					return false
				}
				this.$u.api.registerAdd(this.form).then(res => {
					if(res.code === 200){
						this.$u.toast('商品信息登记成功');
						this.$u.route('/pages/company/order/orderList')
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
	.item{
		padding: 14rpx 0;
	}
	.title{
		color: #bcbcbc;
		margin-right: 20rpx;
	}
	.tip{
		font-size: 24rpx;
		color: #fe3b31;
		padding: 18rpx 0;
	}
	.room{
		width: 100%;
		height: 140rpx;
	}
</style>
