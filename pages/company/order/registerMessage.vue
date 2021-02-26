<template>
	<view>
		<u-navbar back-icon-color="#111111" title="商品信息登记" :background="background" title-color="#111111"></u-navbar>
		<view class="content">
			<view style="margin-top: 20rpx;">车辆信息</view>
			<view style="margin-top: 20rpx;color: #bcbcbc;">车辆车型：新建订单所填车型</view>
			<u-form :model="form" ref="uForm" label-width="200" :border-bottom="false">
				<u-form-item label="车身颜色:"><u-input class="input-radius" placeholder="请选择" @click="show = true" v-model="leasetime" type="select" /></u-form-item>
				<u-form-item label="车牌号:"><u-input class="input-radius" placeholder="请选择" @click="show = true" v-model="leasetime" type="select" /></u-form-item>
				<u-form-item label="车架号:" prop="deposit">
					<u-input class="input-radius" v-model="form.deposit" maxlength="10" placeholder="请输入"/>元
				</u-form-item>
				<u-form-item label="发动机号:" prop="monthlyrent">
					<u-input class="input-radius" v-model="form.monthlyrent" maxlength="10" placeholder="请输入"/>元/月
				</u-form-item>
				<u-form-item label="初次登记日期" prop="birthday">
					<u-input v-model="form.birthday"
					 class="input-radius" :disabled="true" @click="showPicker('birthday')" placeholder="请选择"/>
					<u-icon class="iconAbs" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
				<u-form-item label="表显里程:" prop="deposit">
					<u-input class="input-radius" v-model="form.deposit" maxlength="10" placeholder="请输入"/>KM
				</u-form-item>
			</u-form>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-picker v-model="show" mode="time" :end-year="today.year" :params="params" @confirm="dataChange"></u-picker>
			<view style="margin-top: 30rpx;margin-bottom: 10rpx;">租赁及费用信息</view>
			<view class="item"><text class="title">押金: </text><text>文案文案{{detail.monthlyrent}}</text></view>
			<view class="item"><text class="title">固定月租: </text><text>文案文案{{detail.monthlyrent}}</text></view>
			<view class="item"><text class="title">固定租期: </text><text>文案文案{{detail.monthlyrent}}</text></view>
			<view class="item"><text class="title">付款方式: </text><text>按月支付{{detail.monthlyrent}}</text></view>
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item label="起租日期" prop="birthday">
					<u-input v-model="form.birthday"
					 class="input-radius" :disabled="true" @click="showPicker('birthday')" placeholder="请选择"/>
					<u-icon class="iconAbs" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
				<u-form-item label="到期日期" prop="birthday">
					<u-input v-model="form.birthday"
					 class="input-radius" :disabled="true" @click="showPicker('birthday')" placeholder="请选择"/>
					<u-icon class="iconAbs" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
			</u-form>
			<view class="tip">*提车日期，以订单提车状态为准！</view>
		</view>
		<view class="room">
		</view>
		<view class="bottom">
			<view class="submit">提交</view>
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
				  leasetime: '',
				  monthlyrent: '',
				  deposit: '',
				  rentername: '',
				  renteridphone: '',
				  renteridcard: '',
				  carname: ''
				},
				detail:{},
				leasetime: '',
				pickerName:'',
				params: {
					year: true,month: true,day: true,hour: false,minute: false,second: false
				},
				today:{},
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
			showPicker(name){
				this.pickerName = name;
				this.show = true;
			},
			dataChange(obj){
				let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
				this.form[this.pickerName] = companyDate;
			},
			confirm(arr){
				this.form.leasetime = arr[0].value;
				this.leasetime = arr[0].label;
			},
			submit(){
				if(this.form.leasetime&&this.form.monthlyrent&&this.form.deposit&&this.form.rentername
				&&this.form.renteridphone&&this.form.renteridcard&&this.form.carname){
					this.$u.toast('请填写完整');
					return false
				}
				this.$u.api.orderNew(this.form).then(res => {
					if(res.code === 200){
						this.$u.toast('新建订单成功');
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
