<template>
	<!-- 司机服务页面 -->
	<view class="">
		<view class="navbar">
			<u-navbar back-icon-color="#333333" title="司机服务" title-size="36" :background="background" title-color="#333333"></u-navbar>
			<!-- 导航栏切换 -->
			<view class="serviceList">
				<view v-for="(item,index) in valueList" :key="index">
					<view class="" :class="indexs == index ? 'serviceList_1' : ''" @click="tapSwitch(index)">
						<text> {{item}} </text>
						<view class="garden" v-if="indexs == index"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 下拉刷新的 -->
		<view style="margin-top: 132rpx;">
			<load-refresh :scroll-top="scrollTop" ref="loadRefresh" :isRefresh="true" refreshType="halfCircle" refreshTime="1000"
			 color="#FF9500" heightReduce="10" :backgroundCover="backgroundCover" :pageNo="pageNum" :totalPageNo="total"
			 @refresh="xiaLa" @loadMore="loadMore">
				<view slot="content-list">
					<service :index="indexs" :driveList="driList" :activList="activList" :orderList="orderList" :shareList="shareList"
					 @neiClick="neiClick"></service>
				</view>
			</load-refresh>
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
				valueList: ['行业动态', '活动大全', '接单分享', '大神分享'],
				indexs: 0,
				driList: [1], // 行业动态数据
				shareList: [], // 大神接口数据
				orderList: [], // 接单接口数据
				activList: [], // 活接口数据
				backgroundCover: '#FFFFFF',
				pageNum: 1,
				total: 0,
				obj: [{
					api: 'driverDynamic',
					list: ''
				}],
				arrList: [],
				scrollTop: -1,
				oldScrollTop: 0
			}
		},
		onLoad(option) {
			this.indexs = parseInt(option.index);
			this.getList(1);
		},
		methods: {
			neiClick(id) {
				this.$u.route('/pages/driver/driverService/serviceText', {
					ids: id,
					index: this.indexs
				})
			},
			// 上拉刷新
			xiaLa() {
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
			},
			tapSwitch(e) {
				this.indexs = e
				this.getList(1)
				this.scrollTop = -1
			},
			interface(pageNum, res) {
				if (res.code === 200) { // 成功的动态码
					this.total = Math.ceil(res.total / 10); // 数据的总页数
					let arr = res.rows // 声明 arr 接收接口数据
					if (pageNum === 1) {
						this.arrList = res.rows
					} else {
						arr.forEach(item => { // 循环遍历 声明的 arr
							this.arrList.push(item)
						})
						this.$refs.loadRefresh.loadOver() // 加载结束
						this.pageNum = pageNum // 重新赋值页数
					}
					return this.arrList
				} else {
					this.$u.toast(res.msg);
				}
			},
			getList(pageNum) {
				if (this.indexs == 0) { // 行业动态接口
					this.$u.api.driverDynamic({ // driverActivitie 是 httpapi.js 的声明的接口
						pageNum: pageNum,
						pageSize: 10
					}).then(res => {
						console.log(pageNum)
						this.driList = this.interface(pageNum, res)
					})
				} else if (this.indexs == 1) { // 活动大全接口
					this.$u.api.driverActivities({ // driverActivitie 是 httpapi.js 的声明的接口
						pageNum: pageNum,
						pageSize: 10
					}).then(res => { // 成功调用的
						this.activList = this.interface(pageNum, res)
					})
				} else if (this.indexs == 2) { // 接单分享接口
					this.$u.api.driverOrder({
						pageNum: pageNum,
						pageSize: 10
					}).then(res => {
						this.orderList = this.interface(pageNum, res)
					})
				} else if (this.indexs == 3) { // 大神分享接口
					this.$u.api.driverShare({
						pageNum: pageNum,
						pageSize: 10
					}).then(res => {
						this.shareList = this.interface(pageNum, res)
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 切换栏样式 */
	.serviceList {
		width: 100%;
		position: fixed;
		left: 0;
		top:  calc(0 var(--window-top)); // 自适应高度切换栏高度
		height: 108rpx;
		font-size: 32rpx;
		background-color: #FFFFFF;
		color: #999999;
		border-bottom: 2rpx solid #DEDEDE;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 11;

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
