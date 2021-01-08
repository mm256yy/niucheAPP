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
			<chunLei-popups v-model="selectFlag" :popData="popData" @tapPopup="tapPopup" :x="345" :y="60" placement="top-end"></chunLei-popups>
		</view>
		<view class="list_content">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<load-refresh ref="loadRefresh" :isRefresh="true" refreshType="halfCircle" refreshTime="1000" color="#04C4C4"
				 heightReduce="10" :pageNo="pageNum" :totalPageNo="totalPageNo" @loadMore="loadMoreList"
				 @refresh="refresh">
					<view class="list_item" v-for="(item,index) in list" :key="index" @click="toView(item.billingDetailsid)">
						<view class="item">
							<text class="item_title">{{item.source | soureText}}</text>
							<text class="item_money" :style="{color:item.incomingAndOutgoingState === 'ADD'?'#FFA000':'#333333'}">
								 {{item.incomingAndOutgoingState === 'ADD'?'+':'-'}}{{item.money}}</text>
						</view>
						<view class="item_time">{{item.endDisposeTime}}</view>
					</view>
				</load-refresh>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	export default {
		components: {
			chunLeiPopups
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				selectText: '全部',
				selectValue:'',
				popData: [{
					title: '全部',
					value: '’'
				}, {
					title: '收入',
					value: 'ADD'
				}, {
					title: '支出',
					value: 'SUB'
				}],
				list:[],
				selectFlag: false,
				pageNum:1,
				totalPageNo:10
			}
		},
		filters: {
		  soureText: function (value) {
		    if (value === 'SOURCE_REGISTER_AUTH') {
				return '注册-认证有礼'
			} else if (value === 'SOURCE_INVITE'){
				return '推广拉新'
			} else if (value === 'SOURCE_WITHDRAW'){
				return '提现'
			} else if (value === 'SOURCE_REFUND'){
				return '提现退款'
			}else {
				return ''
			}
		  }
		},
		mounted() {
			this.getList(1)
		},
		methods: {
			showSelect() {
				this.selectFlag = true;
			},
			tapPopup(option) {
				this.selectText = option.title;
				this.selectValue = option.value;
				this.getList(1)
			},
			getList(pageNum) {
				this.$u.api.getBillDetails({
					pageNum: pageNum,
					pageSize: 10,
					type:this.selectValue
				}).then(res => {
					if (res.code === 200) {
						this.totalPageNo = Math.ceil(res.total / 10);
						let arr = res.rows
						if (pageNum === 1) {
							this.list = res.rows
						} else {
							arr.forEach(item => {
								this.list.push(item)
							})
							this.$refs.loadRefresh.loadOver()
							this.pageNum = pageNum
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			loadMoreList() {
				let pageNo = this.pageNum + 1
				this.getList(pageNo)
			},
			refresh() {
				this.getList(1)
			},
			toView(id){
				this.$u.route('/pages/index/driver/components/index/carRentDetail',{id:id})
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
