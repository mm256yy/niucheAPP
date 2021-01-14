<template>
	<view>
		<u-navbar back-icon-color="#111111" title="账单" :background="background" title-color="#111111">
			<view class="navbar-right" slot="right">
				<view class="right-item" @click="showSelect">
					<text>{{selectText}}</text>
					<u-icon :name="selectFlag?'arrow-up':'arrow-down'"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view>
			<chunLei-popups v-model="selectFlag" :popData="popData" @tapPopup="tapPopup" :x="345" :y="70" placement="top-end"></chunLei-popups>
		</view>
		<view class="list_content">
			<!-- <scroll-view scroll-y style="height: 100%;width: 100%;"> -->
<!-- 				<load-refresh ref="Refresh" :isRefresh="true" refreshType="halfCircle" refreshTime="1000"
					 heightReduce="60" :pageNo="pageNum" :totalPageNo="total" @loadMore="loadMoreList"
					 @refresh="refresh"> -->
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" :up="up">
				<view class="list_item" v-for="(item,index) in dataList" :key="index" @click="toView(item.billingDetailsid)">
					<view class="item">
						<text class="item_title">{{item.source | soureText}}</text>
						<text class="item_money" :style="{color:item.incomingAndOutgoingState === 'ADD'?'#FFA000':'#333333'}">
							{{item.incomingAndOutgoingState === 'ADD'?'+':'-'}}{{item.money}}</text>
					</view>
					<view class="item_time">{{item.endDisposeTime}}</view>
				</view>
			</mescroll-body>
			<!-- </scroll-view> -->
		</view>
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
			chunLeiPopups
		},
		mixins: [MescrollMixin],
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				selectText: '全部',
				selectValue: '',
				popData: [{
					title: '全部',
					value: ''
				}, {
					title: '收入',
					value: 'ADD'
				}, {
					title: '支出',
					value: 'SUB'
				}],
				dataList: [],
				page: {
					num:1,
					size: 10 // 每页数据的数量,默认10
				},
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				up:{
					textNoMore:'--没有更多了--'
				},
				selectFlag: false,
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
				this.$u.api.getBillDetails({
					pageNum: this.page.num,
					pageSize: this.page.size,
					type: this.selectValue
				}).then(res => {
					if (res.code === 200) {
						this.total = res.total;
						this.mescroll.endByPage(res.rows.length, res.total);
						this.page.num = this.page.num+1
						this.dataList=this.dataList.concat(res.rows);
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			toView(id) {
				this.$u.route('/pages/driver/cashAccount/billDetailView', {
					id: id
				})
			}
		}
	}
</script>

<style lang="scss">
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		// color: #ffffff;
		display: flex;
	}

	.list_content {
		margin: 0 20px;

		.list_item {
			padding: 15px 0 10px;
			border-bottom: 1px solid #E0E0E0;

			.item {
				display: flex;
				justify-content: space-between;
				padding-bottom: 10px;

				.item_title {
					font-size: 16px;
					color: #111111;
				}

				.item_money {
					font-size: 18px;
				}
			}

			.item_time {
				font-size: 12px;
				color: #C7C7C7;
			}
		}

	}
</style>
