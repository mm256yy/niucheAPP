<template>
	<view>
		<u-navbar back-icon-color="#111111" title="对账中心" :background="background" title-color="#111111">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text style="color: #333;" @click="bind">支付宝账号绑定</text>
				</view>
			</view>
		</u-navbar>
		<view class="list_content">
			<view class="accountBg">
				<view style="display: flex;justify-content: center;align-items: center;">
					<view>
						<view class="total">实际到账总计</view>
						<view class="money">{{obj.totalPrice}}</view>
					</view>
				</view>
				<view @click="toAccount()" class="account">
					<view style="display: flex;">
						<u-image width="32" height="34" src="@/static/order/bill.png"></u-image>
						<view class="text">账单</view>
					</view>
					<u-image width="12" height="24" src="@/static/order/right.png"></u-image>
				</view>
			</view>
			<view class="title">途中金额</view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" :up="up">
				<view@click="toView(item.orderId)" class="list_item" v-for="(item,index) in dataList" :key="index">
					<view class="order">
						<view class="num">订单号：{{item.orderId}}</view>
						<view>+{{item.entryValue}}</view>
					</view>
					<view class="company">
						<view style="color: #939393;padding-top: 10rpx;">
							<!-- <text>押金：10000.00元</text><text style="padding: 0 5px;">|</text> -->
							<text>月租金：{{item.rentMoney}}元</text>
						</view>
					</view>
					<view style="display: flex;margin-top: 16rpx;justify-content: space-between;">
						<view class="message">信息服务费：-{{item.serviceMoney}}</view>
						<view class="status">{{item.orderState | soureText}}</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				dataList: [],
				page: {
					num: 1,
					size: 10 // 每页数据的数量,默认10
				},
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				up: {
					textNoMore: '--没有更多了--'
				},
				total: 0,
				obj:{}
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
		mounted() {
			// this.downCallback()
			this.getTotal();
		},
		methods: {
			getTotal(){
				this.$u.api.total({
				}).then(res=>{
					if(res.code === 200){
			            this.obj = res.object;
					}else {
						this.$u.toast(res.msg);
					}
				})
			},
			toAccount(){
				this.$u.route('/pages/company/order/accountList')
			},
			showSelect() {
				this.selectFlag = true;
			},
			tapPopup(option) {
				this.selectText = option.title;
				this.selectValue = option.value;
				this.page.num = 1;
				this.dataList = []
				this.upCallback()
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.page.num = 1;
				this.dataList = []
				this.upCallback()
			},
			upCallback() {
				this.$u.api.accountList({
					pageNum: this.page.num,
					pageSize: this.page.size,
					billstate: 6
				}).then(res => {
					if (res.code === 200) {
						this.total = res.total;
						this.mescroll.endByPage(res.rows.length, res.total);
						this.page.num = this.page.num + 1
						this.dataList = this.dataList.concat(res.rows);
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			toView(id) {
				this.$u.route('/pages/company/order/accountDetail', {
					id: id
				})
			},
			bind() {
				this.$u.route('/pages/company/order/accountBind', {
					id: this.obj.userMainId,
					businessName: this.obj.businessName
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accountBg{
		width: 684rpx;
		height: 328rpx;
		background-image: url(@/static/order/accountBg.png);
		background-repeat: no-repeat;
		background-size: cover;
		color: #FFDB00;
		padding: 54rpx 40rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		display: flex;
	}
	
	.total{
		font-size: 32rpx;
		color: rgba(255,255,255,0.7);
	}
	.money{
		font-size: 60rpx;
		color: #fff;
		margin-top: 20rpx;
		text-align: center;
	}
	.deposit{
		font-size: 24rpx;
		color: #fff;
		margin-left: 168rpx;
		margin-bottom: 10rpx;
		text{
			font-size: 26rpx;
			font-weight: 900;
			margin-left: 52rpx;
		}
	}
	
	.account{
		height: 76rpx;
		border-top: 2rpx solid rgba(255,255,255,0.3);
		margin-top: 36rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.text{
			margin-left: 10rpx;
			color: rgba(255,255,255,0.8);
			font-size: 28rpx;
		}
	}
	
	.title{
		font-size: 36rpx;
		color: #111;
		margin-top: 50rpx;
		font-weight: 700;
	}
	
	.order{
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		color: #333;
	}
	
	.num{
		font-size: 30rpx;
		color: #020202;
	}
	
	.message{
		font-size: 26rpx;
		color: #939393;
	}
	
	.status{
		font-size: 28rpx;
		color: #48B976;
		font-weight: 700;
	}
	
	.list_item{
		padding: 30rpx 0 36rpx;
		border-bottom: 2rpx solid rgba(0,0,0,0.1);
	}

	.list_content {
		margin: 18rpx 34rpx;

		.list_item {
			.item_time {
				text-align: center;
				padding-bottom: 9px;
			}
			.item_content {
				padding: 10px 12px;
				border-radius: 4px;
				background-color: #FFFFFF;
				.title{
					color: #333333;
				}
				.money{
					padding:80rpx 0 30rpx;
					text-align: center;
					.title{
						font-size: 28rpx;
						color: #C0C0C0;
					}
					.price{
						font-size: 60rpx;
					}
					.unit{
						padding-left: 8rpx;
						font-size: 24rpx;
					}
				}
				.company{
					padding-bottom: 20rpx;
				}
				.order{
					display: flex;
					justify-content: space-between;
					.num{
						color: #BCBCBC;
						font-size: 28rpx;
					}
					.btn{
						width: 88px;
						height: 30px;
						line-height: 30px;
						border-radius: 15px;
						text-align: center;

					}
					.active{
						color: #FE5B00;
						border: 1px solid #FE5B00;
					}
					.complete{
						color: #C2C2C2;
						border: 1px solid #C2C2C2;
					}
				}
			}
		}
	}
</style>
