<template>
	<view class="accountList">
		<u-navbar back-icon-color="#111111" title="账单" :background="background" title-color="#111111">
		</u-navbar>
		<view class="list_content">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" :up="up">
				<view class="box" v-for="(item,index) in dataList" :key="index" @click="toView(item.orderId)">
					<view class="flex">
						<view class="order">租赁订单</view>
						<view>{{item.updateTime}}</view>
					</view>
					<view class="flex">
						<view class="num">订单号：{{item.orderId}}</view>
						<view class="price">+{{item.entryValue}}</view>
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
		onBackPress(e) {
		        this.$u.route('/pages/company/order/checkAccount');
		
		        return true
		
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
				this.$u.api.accountList({
					pageNum: this.page.num,
					pageSize: this.page.size,
					billstate: 5
				}).then(res => {
					if (res.code === 200) {
						this.total = Math.ceil(res.total/10);
						this.mescroll.endByPage(res.rows.length, this.total);
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
		}
	}
</script>

<style lang="scss" scoped>
	.accountList{
		.list_content{
			padding: 30rpx 28rpx;
			.box{
				padding: 0 0 30rpx 0;
				border-bottom: 2rpx solid rgba(0,0,0,0.1);
				margin-bottom: 20rpx;
				.flex{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #c7c7c7;
					.order{
						font-size: 32rpx;
						color: #111;
						font-weight: 900;
					}
					.num{
						color: #939393;
						margin-top: 20rpx;
					}
					.price{
						font-size: 36rpx;
						color: #333;
						font-weight: 900;
						margin-top: 14rpx;
					}
				}
			}
		}
	}
</style>
