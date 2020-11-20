<template>
	<view :class="'driver-content'"> 
		<view class="wrap">
		<u-navbar height="44" back-icon-size="0" title="租车" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
		<!-- <view class="title">租车</view> -->
		<scroll-view scroll-y style="height: 100%;width: 100%;" @down="onPullDownRefreshRent()" @scrolltolower="onreachBottomRent">
			<view>
				<car-rent ref="rent"></car-rent>
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	import carRent from './components/index/carRent'
	export default {
		components: {
			carRent
		},
		data() {
			return {
				list: [{
					name: '租车'
				}]
			}
		},
		methods: {
			getList() {
				this.$refs.rent.search()
			},
			// scroll-view到底部加载更多
			onreachBottomRent() {
				//监听上拉触底事件
				this.$refs.rent.pull();
			},
			onPullDownRefreshRent() {
				this.$refs.rent.refresh();
			},
			// 下拉刷新
			onPullDownRefresh(){
				debugger
				console.log('刷新中');
				setTimeout(function(){
					uni.stopPullDownRefresh();
					console.log("OK了")
				},2000)
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #F5F5F8;
	overflow: hidden;
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
	.company-content{
		.u-tabs{
			background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
		}
	}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
	margin-bottom: 120rpx;
	.title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
		color: #fff;
		font-size: 30rpx;
		font-weight: 900;
		position: fixed;
		top: 88rpx;
		left: 0;
	}
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.scroll-item{
	background: #fff;margin: 20rpx;padding-top: 10rpx;
	border-radius: 40rpx;
	box-shadow: 0px 0px 18px 0px rgba(69, 183, 114, 0.24);
    .time{
		font-weight: bold;
		text-align: right!important;
	}
	image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	.border-left{
		border-left: 1px solid #7F7F7F;
		padding-left: 30rpx!important;
	}
	.title{
		font-weight: bold;
		font-size: 12pt;
	}
	.type{
		padding-top: 10rpx;
	}
	.type-money{
		color: #40B36C;
	}
	.bottom{
		background-color: #CDE5E3;
		padding: 5px!important;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}
	.bottom-left{
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		width: 35%;
		display: inline-block;
		
	}
	.bottom-right{
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
		width: 50%;
		display: inline-block;
	}
}



	
</style>
