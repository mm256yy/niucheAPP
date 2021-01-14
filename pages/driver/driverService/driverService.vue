<template>
	<!-- 司机服务页面 -->
	<view class="">
		<u-navbar back-icon-color="#333333" title="司机服务" title-size="36" :background="background" title-color="#333333"></u-navbar>
		<!-- 下拉刷新的 -->
		<view class="">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<load-refresh ref="loadRefresh" :isRefresh="true" refreshType="halfCircle" refreshTime="1000" color="#FF9500"
				 heightReduce="10" :backgroundCover="backgroundCover" :pageNo="pageNum" :totalPageNo="total" @refresh="xiaLa"
				 @loadMore="loadMore">
					<view slot="content-list">
						<!-- 导航栏切换 -->
						<view class="serviceList">
							<view :class="index == 1 ? 'serviceList_1' : ''" @click="tapSwitch(1)">
								<text>行业动态</text>
								<view class="garden" v-if="index == 1"></view>
							</view>
							<view :class="index == 2 ?' serviceList_1' : ''" @click="tapSwitch(2)">
								<text>活动大全</text>
								<view class="garden" v-if="index == 2"></view>
							</view>
							<view :class="index == 3 ? 'serviceList_1' : ''" @click="tapSwitch(3)">
								<text>接单分享</text>
								<view class="garden" v-if="index == 3"></view>
							</view>
							<view :class="index == 4 ? 'serviceList_1' : ''" @click="tapSwitch(4)">
								<text>大神分享</text>
								<view class="garden" v-if="index == 4"></view>
							</view>
						</view>
						<view>
							<service :index="index" :driveList="driList" :activList="activList" :orderList="orderList" :shareList="shareList"
							 @neiClick="neiClick"></service>
						</view>
					</view>
				</load-refresh>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import service from "./components/service.vue" // 司机子组件
	import loadRefresh from "@/components/load-refresh/load-refresh.vue" // 下拉刷新组件
	export default {
		components: {
			service,
			loadRefresh
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				index: '',
				driList: [], // 行业动态数据
				shareList: [], // 大神接口数据
				orderList: [], // 接单接口数据
				activList: [], // 活接口数据
				backgroundCover: '#FFFFFF',
				pageNum: 1,
				total: 0,
			}
		},
		onLoad(option) {
			this.index = parseInt(option.index);
			console.log(this.index, '----------');
			this.getList(1);
		},
		methods: {
			neiClick(id) {
				this.$u.route('/pages/driver/driverService/serviceText', {
					id: id,
					index: this.index
				})
			},
			// 上拉刷新
			xiaLa() {
				console.log('上拉刷新了', '--------')
				this.pageNum = 1
				this.getList(this.pageNum)
			},
			// 下拉加载
			loadMore() {
				let pageNo = this.pageNum + 1
				let that = this
				setTimeout(function() {
					// uni.stopPullDownRefresh();
					that.getList(pageNo)
				}, 700);
				console.log('下拉加载了')
			},
			tapSwitch(e) {
				this.index = e
				this.getList(1)
			},
			getList(pageNum) {
				if (this.index == 1) { // 行业动态接口
					this.$u.api.driverDynamic({ // driverActivitie 是 httpapi.js 的声明的样式
						pageNum: pageNum,
						pageSize: 10
					}).then(res => {
						if (res.code === 200) { // 成功的动态码
							this.total = Math.ceil(res.total / 10); // 数据的总页数
							let arr = res.rows // 声明 arr 接收接口数据
							if (pageNum === 1) {
								this.driList = res.rows
							} else {
								arr.forEach(item => { // 循环遍历 声明的 arr
									this.driList.push(item)
								})
								this.$refs.loadRefresh.loadOver() // 加载结束
								this.pageNum = pageNum // 重新赋值页数
							}
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else if (this.index == 2) { // 活动大全接口
					this.$u.api.driverActivities({ // driverActivitie 是 httpapi.js 的声明的样式
						pageNum: pageNum,
						pageSize: 10
					}).then(res => { // 成功调用的
						if (res.code === 200) {
							this.total = Math.ceil(res.total / 10); // 数据的总页数
							let arr = res.rows
							if (pageNum === 1) {
								this.activList = res.rows
							} else {
								arr.forEach(item => { // 循环遍历 声明的 arr
									this.activList.push(item)
								})
								this.$refs.loadRefresh.loadOver() // 加载结束
								this.pageNum = pageNum // 重新赋值页数
							}
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else if (this.index == 3) { // 接单分享接口
					this.$u.api.driverOrder({
						pageNum: pageNum,
						pageSize: 10
					}).then(res => {
						if (res.code === 200) {
							this.total = Math.ceil(res.total / 10);
							let arr = res.rows
							if (pageNum === 1) {
								this.orderList = res.rows
							} else {
								arr.forEach(item => {
									this.orderList.push(item)
								})
								this.$refs.loadRefresh.loadOver()
								this.pageNum = pageNum
							}
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else if (this.index == 4) { // 大神分享接口
					this.$u.api.driverShare({
						pageNum: pageNum,
						pageSize: 10
					}).then(res => {
						if (res.code === 200) {
							this.total = Math.ceil(res.total / 10);
							let arr = res.rows
							if (pageNum === 1) {
								this.shareList = res.rows
							} else {
								arr.forEach(item => {
									this.shareList.push(item)
								})
								this.$refs.loadRefresh.loadOver()
								this.pageNum = pageNum
							}
						} else {
							this.$u.toast(res.msg);
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
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

	/* 切换栏样式 */
	.serviceList {
		height: 108rpx;
		font-size: 32rpx;
		font-family: Apple LiSung Light;
		color: #999999;
		border-bottom: 2rpx solid #DEDEDE;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.serviceList_1 {
			position: relative;
			font-weight: 700;
			font-size: 36rpx;
			color: #111111;

			.garden {
				position: absolute;
				left: 50%;
				bottom: -14rpx;
				width: 44rpx;
				height: 44rpx;
				border-radius: 22rpx;
				transform: translate(-50%, 0);
				background: linear-gradient(143deg, #FFFFFF 0%, #FF9500 100%);
				opacity: 0.8;
				z-index: -2;
			}
		}
	}
</style>
