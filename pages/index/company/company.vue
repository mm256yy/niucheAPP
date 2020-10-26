<template>
	<view :class="'driver-content'">
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#FF6501" ref="tabs" :list="list" inactive-color="#ffffff" bg-color="#FE9217;" 
				:current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<car-rent></car-rent>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<job-search></job-search>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<car-sell></car-sell>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<buying></buying>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import buying from './components/index/buying'
    import carRent from './components/index/carRent'
	import carSell from './components/index/carSell'
	import jobSearch from './components/index/jobSearch'
export default {
	components: {
	    buying,
		carRent,
		carSell,
		jobSearch
	  },
	data() {
		return {
			list: [
				
				{
					name: '租车'
				},
				{
					name: '求职'
				},
				{
					name: '卖车'
				},
				{
					name: '求购'
				}
			],
			current: 0,
			swiperCurrent: 0
		};
	},
	methods: {
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.tabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view到底部加载更多
		onreachBottom() {
						
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
	.driver-content{
		.u-tabs{
			padding-top: 20pt;
			background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
		}
	}
	.company-content{
		.u-tabs{
			padding-top: 20pt;
			background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
		}
	}
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
</style>
