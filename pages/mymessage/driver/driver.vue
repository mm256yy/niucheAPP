<template>
	<view :class="'driver-content'">
		<view class="wrap">
		<u-navbar height="10" back-icon-size="0" title="" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper style="position: fixed;" height="88" ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<job-search ref="search"></job-search>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	</view>
</template>

<script>
	import jobSearch from './components/index/jobSearch'
	export default {
		components: {
			jobSearch
		},
		data() {
			return {
				list: [{
					name: '招募'
				}],
			}
		},
		methods: {
			getList() {
				console.log(1)
				this.$refs.search.search()
				this.$refs.search.page()
			},
			// onreachBottomSearch() {
			// 	监听上拉触底事件
			// 	this.$refs.search.pull();
			// }
		}
	}
</script>

<style lang="scss">
page{
	// background-image: url(@/static/lease.png);
	background-repeat: no-repeat;
	height: 100%;
	background-size: cover;
	// background-position: 50% 50%;
}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
</style>
<style lang="scss" scoped>
	.driver-content{
		.u-tabs{
			background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
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
		margin-top: 80rpx;
	}
	.swiper-item {
		height: 100%;
	}
	.scroll-item{
	background: #fff;margin: 20rpx;padding-top: 30rpx;
	
	}



	
</style>
