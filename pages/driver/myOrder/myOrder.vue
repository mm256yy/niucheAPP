<template>
	<view>
		<u-navbar back-icon-color="#111111" title="我的订单" :background="background" title-color="#111111"></u-navbar>
		<view class="list_content">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" :up="up">
				<view class="list_item" v-for="(item,index) in dataList" :key="index" @click="toView(item.id,item.state)">
					<view class="item_time">{{item.createTime}}</view>
					<view class="item_content">
						<view class="title u-line-2">
							<text>{{item.carname}}</text>
						</view>
						<view class="money">
							<view class="title">{{item.state ==='WAITTING_DELIVERY_VEHICLE' || item.state === 'ORDER_FINISHED'?'实付':'总计'}}</view>
							<view>
								<text class="price">
									{{item.state ==='WAITTING_DELIVERY_VEHICLE' || item.state === 'ORDER_FINISHED'?item.totalprice:item.totalprice |toMoney}}
								</text><text class="unit">元</text>
							</view>
						</view>
						<view class="company">
							<view class="u-line-1">
								<text style="color: #858585;padding-right: 10rpx;">出租方</text><text style="color: #424242;">{{item.companyname}}</text>
							</view>
							<view style="color: #BCBCBC;padding-top: 10rpx;">
								<text>租期{{item.leasetime}}个月</text> <text style="padding: 0 5px;">|</text>
								<text>月租金{{item.monthlyrent}}元</text> <text style="padding: 0 5px;">|</text>
								<text>押金{{item.deposit}}元
								<!-- <text style="color:#FE3B31 ;">(需线下转账)</text> -->
								</text>
							</view>
						</view>
						<view class="order">
							<view class="num">订单号：{{item.tradeid}}</view>
							<view class="btn" :class="['btn',item.state === 'ORDER_FAILED' || item.state === 'ORDER_FINISHED'?'complete':'active']">
								{{item.state | soureText}}
							</view>
						</view>
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
				orderByColumn: '',
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				up: {
					textNoMore: '--没有更多了--'
				},
				total: 0
			}
		},
		onLoad(option) {
			let orderByColumn = option.orderByColumn;
			if (orderByColumn) {
				this.orderByColumn = orderByColumn
			} else {
				this.orderByColumn = ''
			}
		},
		filters: {
			soureText: function(value) {
				if (value === 'WAITTING_UPLOADING_MESSAGE' || value === 'REGISTER_CAR') {
					return '待验车'
				} else if (value === 'WAITTING_SIGN_CONTRACT' || value === 'DRIVER_SIGN_CONTRACT' || value === 'VALIDATE_CAR') {
					return '待签约'
				} else if (value === 'NO_PAYMENT' || value === 'COMPANY_SIGN_CONTRACT') {
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
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.page.num = 1;
				this.dataList = []
				this.upCallback()
			},
			upCallback() {
				this.$u.api.driverOrderList({
					pageNum: this.page.num,
					pageSize: this.page.size,
				},{}).then(res => {
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
			toView(id,state) {
				if (state === 'ORDER_FAILED'){
					this.$u.route('/pages/driver/myOrder/chargeback', {
						id: id
					})
				} else{
					this.$u.route('/pages/driver/myOrder/orderView', {
						id: id
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: #F5F5F5;
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
		display: flex;
	}

	.list_content {
		margin: 0 20px;

		.list_item {
			padding: 15px 0 10px;

			.item_time {
				text-align: center;
				padding-bottom: 9px;
			}

			.item_content {
				padding: 10px 12px;
				border-radius: 4px;
				background-color: #FFFFFF;

				.title {
					color: #333333;
				}

				.money {
					padding: 80rpx 0 30rpx;
					text-align: center;

					.title {
						font-size: 28rpx;
						color: #C0C0C0;
					}

					.price {
						font-size: 60rpx;
					}

					.unit {
						padding-left: 8rpx;
						font-size: 24rpx;
					}
				}

				.company {
					padding-bottom: 20rpx;
				}

				.order {
					display: flex;
					justify-content: space-between;
					align-items: baseline;

					.num {
						color: #BCBCBC;
						font-size: 28rpx;
					}

					.btn {
						width: 88px;
						height: 30px;
						line-height: 30px;
						border-radius: 15px;
						text-align: center;

					}

					.active {
						color: #FE5B00;
						border: 1px solid #FE5B00;
					}

					.complete {
						color: #C2C2C2;
						border: 1px solid #C2C2C2;
					}
				}
			}
		}
	}
</style>
