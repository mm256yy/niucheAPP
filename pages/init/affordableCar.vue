<template>
	<view>
		<u-navbar back-icon-color="#333333" title="低价好车" title-color="#333333"></u-navbar>
		<view>
			<view class="content">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<load-refresh ref="loadRefresh" :isRefresh="true" refreshType="halfCircle" refreshTime="1000" color="#04C4C4"
					 heightReduce="10" :backgroundCover="backgroundCover" :pageNo="pageNum" :totalPageNo="total" @loadMore="loadMoreList"
					 @refresh="refresh">
						<view slot="content-list">
							<u-image src="../../static/djhc.png" height="60vh" border-radius="0" width="100%"></u-image>
							<view @click="toView(item)" v-for="(item,index) in 10" :key="index" class="list">
								<view class="list_head">
									<text>公司全称</text><text>省市</text>
								</view>
								<view>
									<u-image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F10947089586%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611305581&t=56dd45b3a8b5f22628db05254b46c42f"
									 height="20vh" width="100%"></u-image>
								</view>
								<view>
									<view style="padding-top: 14px;color: #303030;font-weight: bold;">【网约车】品牌+车系+年款型号</view>
									<view style="padding: 10px 5px;color: #666666;">车类型·变速箱·燃料·车龄</view>
									<view style="padding: 0 5px 5px;color: #FF5A00;">2000以内/月</view>
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
				backgroundCover: "linear-gradient(25deg, #FE5A00 0%, #FF7C00 84%, #FF2B00 100%)",
				list: [1, 2, 3],
				pageNum: 1,
				total: 0,
			}
		},
        mounted() {
        	// this.getList(1)
        },
		methods: {
			loadMoreList() {
				let pageNo = this.pageNum + 1
				this.getList(pageNo)
			},
			getList(pageNum) {
				console.log(pageNum)
				this.$u.api.DriverMyCollectionRent({
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
			refresh() {
				this.getList(1)
			}
		}
	}
</script>
<style lang="scss">
	page {
		// background: linear-gradient(25deg, #FE5A00 0%, #FF7C00 84%, #FF2B00 100%);;
	}
</style>
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
</style>
