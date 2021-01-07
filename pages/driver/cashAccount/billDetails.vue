<template>
	<view>
		<u-navbar back-icon-color="#111111" title="账单明细" :background="background" title-color="#111111">
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
					<view class="list_item" v-for="i in 5" @click="toView(1)">
						<view class="item">
							<text class="item_title">新用户奖励金</text>
							<text class="item_money" :style="{color:i/2 >1?'#FFA000':'#333333'}">+¥200</text>
						</view>
						<view class="item_time">2020年09月28日 11:15:33</view>
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
				popData: [{
					title: '全部',
					value: 0
				}, {
					title: '收入',
					value: 1
				}, {
					title: '支出',
					value: 2
				}],
				selectFlag: false,
				pageNum:1,
				totalPageNo:11
			}
		},
		methods: {
			showSelect() {
				this.selectFlag = true;
			},
			tapPopup(option) {
				this.selectText = option.title;
				console.log(option.value)
			},
			getList(pageNum) {
				this.$u.api.driverSideHomePage({
					pageNum: pageNum,
					pageSize: 10
				}).then(res => {
					if (res.code === 200) {
						this.total = Math.ceil(res.total / 10);
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
