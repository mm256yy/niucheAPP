<template>
	<view :class="'driver-content'"> 
		<view class="wrap">
		<u-navbar  back-icon-size="0" title="" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<car-rent ref="rent"></car-rent>
				</scroll-view>
			</swiper-item>
		</swiper>
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
		    onreachBottom() {
		    	this.$refs.rent.pull()
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
