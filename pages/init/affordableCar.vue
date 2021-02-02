<template>
	<view>
		<u-navbar back-icon-color="#333333" :background="background" title="低价好车" title-color="#333333"></u-navbar>
		<view>
			<view class="content">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<load-refresh ref="loadRefresh" :isRefresh="true" refreshType="halfCircle" refreshTime="1000" color="#04C4C4"
					 heightReduce="10" :backgroundCover="backgroundCover" :pageNo="pageNum" :totalPageNo="total" @loadMore="loadMoreList"
					 @refresh="refresh">
						<view slot="content-list">
							<u-image src="../../static/djhc.png" height="60vh" border-radius="0" width="100%"></u-image>
							<view @click="toView(item.comparymainid)" v-for="(item,index) in list" :key="index" class="list">
								<view class="list_head u-line-2">
									<text>{{item.comparyname}}</text>
								</view>
								<view>
									<u-image :src="item.photourl" height="20vh" width="100%" border-radius="8"></u-image>
								</view>
								<view>
									<view style="padding-top: 14px;color: #303030;font-weight: bold;font-size: 12pt;">
										<text style="display: inline-block;margin-left: -6px;">【{{item.businesstype === 1 ?'网约车':'出租车'}}】</text>
										{{item.carname}} {{item.carxinghao}}
									</view>
									<view style="padding: 10px 5px;color: #666666;" class="u-line-2">
									{{item.cartype}}·{{item.power}}·≤{{item.carage}}年</view>
									<view style="padding: 0 5px 5px;color:#FF5A00;font-size: 12pt;">¥{{item.lowprice}}/月</view>
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
				backgroundCover: "linear-gradient(25deg, #FE5A00 0%, #FF7C00 84%, #FF2B00 100%)",
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
				this.$u.api.setEvent({eventId:"sy-djhcny-la",type:3})
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
			refresh() {
				this.$u.api.setEvent({eventId:"sy-djhcli-r",type:3})
				this.getList(1)
			},
			toView(id){
				this.$u.api.setEvent({eventId:"sy-djhcny-li",type:3})
				this.$u.route('/pages/index/driver/components/index/carRentDetail',{id:id})
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
