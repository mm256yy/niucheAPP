<template>
	<view>
		<view style="padding-top: 38pt;">
			<u-tabs-swiper ref="uTabs" :list="list" activeColor="#ffffff" inactive-color="#e5e5e5" bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
					{{item.name}}
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '我的租车'
				}, {
					name: '我的招聘'
				}, {
					name: '我的卖车'
				},{
					name: '我的求购'
				}],
				tabs: [{
					name: '我的租车'
				}, {
					name: '我的招聘'
				}, {
					name: '我的卖车'
				},{
					name: '我的求购'
				}],
				current: 0, 
				swiperCurrent: 0,
			}
		},
		onLoad(option) {
			let index  = Number(option.index)
			console.log(index)
			this.current = index;
			this.swiperCurrent = index;
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-image: url(../../../static/lease.png);
	background-repeat: no-repeat;
	height: 100%;
}
</style>
