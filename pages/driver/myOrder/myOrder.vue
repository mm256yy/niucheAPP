<template>
	<view>
		<u-navbar back-icon-color="#111111" title="我的订单" :background="background" title-color="#111111"></u-navbar>
		<view class="list_content">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" :up="up">
				<view class="list_item" v-for="(item,index) in dataList" :key="index" @click="toView(item.billingDetailsid)">
					<view class="item_time">2021年3月18日 08点08分08秒</view>
					<view class="item_content">
						<view class="title u-line-2">
							<text>车辆品牌车辆品牌车系年款型号车辆品牌车系年款型号车系年款型号</text>
						</view>
						<view class="money">
							 <view class="title">{{index>5?'总计':'实付'}}</view>
							 <view><text class="price">{{item.totalprice}}</text><text class="unit">元</text></view>
						</view>
						<view class="company">
							<view><text style="color: #858585;padding-right: 10rpx;">出租方</text><text style="color: #424242;">{{item.companyname}}</text></view>
							<view style="color: #BCBCBC;padding-top: 10rpx;">
								<text>租期12个月</text> <text style="padding: 0 5px;">|</text>
								<text>租期12个月</text> <text style="padding: 0 5px;">|</text>
								<text>押金8000元</text>
							</view>
						</view>
						<view class="order">
							<view class="num">订单号：239888888888</view>
							<view class="btn" :class="['btn',index>5?'active':'complete']">待验车</view>
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
				if (value === 'SOURCE_REGISTER_AUTH') {
					return '注册-认证有礼'
				} else if (value === 'SOURCE_INVITE') {
					return '推广拉新'
				} else if (value === 'SOURCE_WITHDRAW') {
					return '提现'
				} else if (value === 'SOURCE_REFUND') {
					return '提现退款'
				} else {
					return ''
				}
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
				this.$u.api.getBillDetails({
					pageNum: this.page.num,
					pageSize: this.page.size,
					type: this.selectValue
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
				this.$u.route('/pages/driver/myOrder/orderView', {
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
