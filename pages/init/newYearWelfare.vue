<template>
	<view>
		<u-navbar back-icon-color="#333333" title="新春福利" :background="background" title-color="#333333"></u-navbar>
		<view>
			<view class="content">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<load-refresh ref="loadRefresh" :isRefresh="true" refreshType="halfCircle" refreshTime="1000" color="#04C4C4"
					 heightReduce="10" :backgroundCover="backgroundCover" :pageNo="pageNum" :totalPageNo="total" @loadMore="loadMoreList"
					 @refresh="refresh">
						<view slot="content-list">
							<u-image src="../../static/xcfl.png" height="66vh" border-radius="0" width="100%"></u-image>
							<view @click="toView(item)" v-for="(item,index) in list" :key="index" class="list">
								<view class="list_head">
									<text>{{item.companyName}}</text><text>{{item.comparyarea}}</text>
								</view>
								<view style="background: #FFFFFF;">
									<u-image :src="item.photoUrl" height="20vh" width="100%" border-radius="8"></u-image>
								</view>
								<view>
									<view style="padding: 10px 0 5px;">
										<text class="list_tag" v-for="(tag,i) in item.tagList" :key="i">{{tag.tabValue}}</text>
									</view>
									<view style="padding: 5px 0;color: #303030;font-weight: bold;font-size: 12pt;">
										【{{item.businesstype === 1 ?'网约车':'出租车'}}】{{item.carBrand}} {{item.carText}}
									</view>
									<view style="padding: 0 5px 5px;color: #FF5A00;font-size: 12pt;">{{item.packPrice}}元/月</view>
								</view>
							</view>
						</view>
					</load-refresh>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default {
		components: {
			loadRefresh
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				backgroundCover: "linear-gradient(153deg, #DB001D 0%, #FA3401 100%)",
				list: [],
				pageNum: 1,
				total: 0,
			}
		},
		mounted() {
			this.getList(1)
		},
		methods: {
			loadMoreList() {
				let pageNo = this.pageNum + 1
				this.getList(pageNo)
			},
			getList(pageNum) {
				this.$u.api.getYearWelfare({
					pageNum: pageNum,
					pageSize: 10,
					orderByColumn: "newyear.sort",
					isAsc: "desc"
				}).then(res => {
					if (res.code === 200) {
						this.total = Math.ceil(res.total / 10);
						let arr = res.rows
						if (pageNum === 1) {
							arr.forEach(item => {
								let tags = item.params;
								if (tags.length > 0) {
									item.tagList = eval(tags)
								}

							})
							this.list = arr

						} else {
							arr.forEach(item => {
								let tags = item.params;
								if (tags.length > 0) {
									item.tagList = eval(tags)
								}
								this.list.push(item)
							})
							this.$refs.loadRefresh.loadOver()
							this.pageNum = pageNum
						}
						console.log(arr)
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			refresh() {
				this.getList(1)
			},
			toView(item) {
				this.$u.route('/pages/index/driver/components/index/carRentDetail', {
					id: item.comparymainid,
					tags: item.params
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.list {
		padding: 13px 14px;
		margin: 10pt;
		border-radius: 4px;
		background-color: #FFFFFF;
	}

	.list_head {
		display: flex;
		justify-content: space-between;
		padding-bottom: 8pt;
		color: #474747;
	}

	.list_tag {
		display: inline-block;
		padding: 2px 4px;
		font-size: 12px;
		margin-right: 6px;
		margin-bottom: 6px;
		background: linear-gradient(270deg, #FFC400 0%, #FFB200 54%, #FF9900 100%);
		color: #FFFFFF;
	}
</style>
