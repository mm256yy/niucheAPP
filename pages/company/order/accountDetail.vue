<template>
	<view class="accountDetail">
		<u-navbar back-icon-color="#111111" title="账单详情" :background="background" title-color="#111111">
		</u-navbar>
		<view class="accountList">
			<view class="top">
				<view>订单租金</view>
				<view class="price">￥{{obj.rentMoney | toMoney}}</view>
			</view>
			<view class="flex">
				<view class="key">当前状态：</view>
				<view class="value">{{obj.state | soureText}}</view>
			</view>
			<view class="flex">
				<view class="key">来源：</view>
				<view class="value">租赁订单</view>
			</view>
			<view class="flex">
				<view class="key">订单号：</view>
				<view class="value">{{obj.orderId}}</view>
			</view>
			<!-- <view class="flex">
				<view class="key">押金：</view>
				<view class="value">￥10000.00</view>
			</view> -->
			<view class="flex">
				<view class="key">月租金：</view>
				<view class="value">￥{{obj.rentMoney}}</view>
			</view>
			<view class="flex">
				<view class="key">信息服务费：</view>
				<view class="value">-￥{{obj.serviceMoney}}</view>
			</view>
			<view class="flex">
				<view class="key">对账单号：</view>
				<view class="value">{{obj.reconciliationId}}</view>
			</view>
			<view class="flex">
				<view class="key">入账时间：</view>
				<view class="value">{{obj.inReconciliationTime}}</view>
			</view>
			<view class="view" @click="toDetail(obj.orderId)">
				<view>查看订单详情</view>
				<u-image width="18" height="28" src="@/static/order/rightDark.png"></u-image>
			</view>
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
				obj: {}
			}
		},
		filters: {
			soureText: function(value) {
				if (value === 'WAITTING_UPLOADING_MESSAGE' || value === 'VALIDATE_CAR') {
					return '商品登记'
				} else if (value === 'WAITTING_SIGN_CONTRACT' || value === 'COMPANY_SIGN_CONTRACT' || value === 'REGISTER_CAR') {
					return '待签约'
				} else if (value === 'NO_PAYMENT' || value === 'DRIVER_SIGN_CONTRACT') {
					return '待支付'
				} else if (value === 'WAITTING_DELIVERY_VEHICLE') {
					return '待提车'
				} else if (value === 'ORDER_FINISHED') {
					return '完成'
				} else if (value === 'ORDER_FAILED') {
					return '失效'
				} else {
					return ''
				}
			},
			toMoney:function(s,type){
			        if (/[^0-9\.]/.test(s)) return "0";
			        if (s == null || s == "") return "0";
			        s = s.toString().replace(/^(\d*)$/, "$1.");
			        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
			        s = s.replace(".", ",");
			        var re = /(\d)(\d{3},)/;
			        while (re.test(s))
			            s = s.replace(re, "$1,$2");
			        s = s.replace(/,(\d\d)$/, ".$1");
			        if (type == 0) {// 不带小数位(默认是有小数位)
			            var a = s.split(".");
			            if (a[1] == "00") {
			                s = a[0];
			            }
			        }
			        return s;
			   }
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.getDetail(id)
			}
		},
		methods: {
			getDetail(id){
				let token = uni.getStorageSync('token');
				if(token){
					this.$u.api.accountDetail({
						orderId:id
					}).then(res=>{
						if(res.code === 200){
							 this.obj = res.object;
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
			toDetail(id) {
				this.$u.route('/pages/company/order/orderDetail', {
					id: id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
	}
	accountDetail{
		background: #fff;
	}
	.accountList{
		padding: 0 28rpx;
		.top{
			width: 694rpx;
			height: 298rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-bottom: 2rpx solid rgba(0,0,0,0.1);
			font-size: 32rpx;
			color: #333;
			margin-bottom: 40rpx;
			.price{
				font-size: 76rpx;
				font-weight: 900;
				margin-top: 20rpx;
			}
		}
		.flex{
			display: flex;
			view{
				margin-top: 20rpx;
				font-size: 28rpx;
			}
			.key{
				width: 168rpx;
				color: #939393;
			}
			.value{
				color: #333;
			}
		}
		.view{
			width: 694rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
