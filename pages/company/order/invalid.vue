<template>
	<view>
		<view class="list_content">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" :up="up">
				<view class="list_item" v-for="(item,index) in dataList" :key="index" @click="toView(item.id)">
					<view class="item_time">{{item.createTime}}</view>
					<view class="item_content">
						<view class="title u-line-2">
							<text>{{item.carname}}</text>
						</view>
						<view class="money">
							 <view class="title">总计</view>
							 <view><text class="price">{{item.totalprice|toMoney}}</text><text class="unit">元</text></view>
						</view>
						<view class="company">
							<view><text style="color: #858585;padding-right: 10rpx;">承租人</text><text style="color: #424242;">{{item.rentername}}</text></view>
							<view style="color: #BCBCBC;padding-top: 10rpx;">
								<text>租期{{item.leasetime}}个月</text> <text style="padding: 0 5px;">|</text>
								<text>月租金{{item.monthlyrent}}元</text>
								<!-- <text>押金{{item.deposit}}元</text> -->
							</view>
						</view>
						<view class="order">
							<view class="num">订单号：{{item.tradeid}}</view>
							<view class="btn complete">
								失效
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
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				up: {
					textNoMore: '--没有更多了--'
				},
				total: 0
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
			}
		},
		mounted() {
			// this.downCallback()
		},
		methods: {
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
				this.$u.api.orderList({
					pageNum: this.page.num,
					pageSize: this.page.size,
					state: '4',
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
				this.$u.route('/pages/company/order/invalidation', {
					id: id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
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

	.list_content {
		margin: 0 40rpx;

		.list_item {
			padding: 30rpx 0 20rpx;
			.item_time {
				text-align: center;
				padding-bottom: 18rpx;
			}
			.item_content {
				padding: 20rpx 24rpx;
				border-radius: 8rpx;
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
						height: 62rpx;
						line-height: 62rpx;
						color: #BCBCBC;
						font-size: 28rpx;
					}
					.btn{
						width: 176rpx;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 30rpx;
						text-align: center;

					}
					.active{
						color: #FE5B00;
						border: 2rpx solid #FE5B00;
					}
					.complete{
						color: #C2C2C2;
						border: 2rpx solid #C2C2C2;
					}
				}
			}
		}
	}
</style>
