<template>
	<view class="other">
		<u-navbar back-text="返回" back-icon-size="0" title="我的店铺" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<!-- <u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon> -->
				</view>
			</view>
		 </u-navbar>
		 <view class="top">
			 <img class="left" :src="detail.comparylogophoto" alt="">
		 	<!-- <u-image shape="circle" class="left" width="186rpx" height="186rpx" :src="detail.comparylogophoto"></u-image> -->
		 	<view class="right">
		 		<view class="name">{{detail.comparyname}}</view>
		 		<view class="address">{{detail.area}}</view>
		 	</view>
		 </view>
		 <view class="tagBox">
			 <view v-for="(item, index) in detail.mainbusiness" :key="index" class="box">{{item}}运营</view>
			 <view class="clear"></view>
		 </view>
		 <view class="wrap">
			 <view style="">
			 	<u-tabs-swiper ref="uTabs" activeColor="#40B36C" :list="listTab" inactive-color="#000"
			    bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 	 swiperWidth="750"></u-tabs-swiper>
			 </view>
			 <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottomSelling">
			 			<selling v-if="isChildUpdate1" ref="selling"></selling>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottomBuy">
			 			<buy v-if="isChildUpdate2" ref="buy"></buy>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottomRenting">
			 			<renting v-if="isChildUpdate3" ref="renting"></renting>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottomSearch">
			 			<search v-if="isChildUpdate4" ref="search"></search>
			 		</scroll-view>
			 	</swiper-item>
			 </swiper>
		 </view>
	</view>
</template>

<script>
	import selling from './selling'
	import buy from './buy'
	import renting from './renting'
	import search from './search'
	export default {
		components: {
			selling,
			buy,
			renting,
			search
		},
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				listTab: [{
					name: '在售'
				}, {
					name: '求购'
				},{
					name: '招租'
				}, {
					name: '招聘'
				}],
				current: 0, 
				swiperCurrent: 0,
				detail: {},
				isChildUpdate1:true,
				isChildUpdate2:false,
				isChildUpdate3:false,
				isChildUpdate4:false
			}
		},
		mounted() {
			this.getDetail()
		},
		methods: {
			getDetail(){
				let token = uni.getStorageSync('token');
				if(token){
					this.$u.api.getMessageCompany().then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
			create(index){
				if(index == 0) {
				    this.isChildUpdate1 = true;
				    this.isChildUpdate2 = false;
					this.isChildUpdate3 = false;
					this.isChildUpdate4 = false;
				} else if(index == 1) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = true;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = false;
				}else if(index == 2) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = true;
				    this.isChildUpdate4 = false;
				}else if(index == 3) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = true;
				}
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.create(index)
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
				this.create(current)
			},
			// scroll-view到底部加载更多
			onreachBottomSelling() {
				this.$refs.selling.pull()
			},
			onreachBottomBuy() {
				this.$refs.buy.pull()
			},
			onreachBottomRenting() {
				this.$refs.renting.pull()
			},
			onreachBottomSearch() {
				this.$refs.search.pull()
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F8;
	}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.u-tabs-box {
		position:sticky;
		top: 0;
		left: 0;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 400rpx);
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.other {
		background-color: #F5F5F8;
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 42rpx;
		    right: 34rpx;
		}
		.tagBox{
			margin-left: 36rpx;
			margin-right: 36rpx;
			.box {
				padding: 8rpx;
				border-radius: 10rpx;
				background: rgba(0,0,0,0.1);
				color: #7f7f7f;
				float: left;
				margin-right: 10rpx;
				margin-bottom: 19rpx;
				font-size: 20rpx;
			}
		}
		.top {
			width: 666rpx;
			margin-left: 42rpx;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			.left{
				width: 186rpx;
				height: 186rpx;
				border-radius: 50%;
			}
			.right {
				padding: 30rpx 42rpx;
				font-size: 20rpx;
				.name {
					font-size: 36rpx;
					font-weight: 900;
					margin-bottom: 17rpx;
				}
			}
		}
		.clear {
			clear: both;
		}
		.list {
			width: 702rpx;
			height: 308rpx;
			padding: 38rpx;
			margin-left: 24rpx;
			margin-top: 24rpx;
			font-size: 20rpx;
			background-image: url(@/static/bgbuying.png);
			background-repeat: no-repeat;
			background-size: cover;
			.clear {
				clear: both;
			}
			.left {
				margin-top: 19rpx;
			}
			.left, .right {
				float: left;
			}
			.right {
				width: 494rpx;
				padding-left: 34rpx;
			}
			.city {
				width: 96rpx;
				height: 40rpx;
				line-height: 32rpx;
				text-align: center;
				font-size: 20rpx;
				border-radius: 26rpx;
				border: 1rpx solid rgba(0,0,0,0.3);
				margin-top: 16rpx;
				margin-right: 16rpx;
				float: right;
			}
			.name {
				font-size: 28rpx;
				font-weight: 900;
				margin-top: 20rpx;
			}
			.type {
				font-size: 20rpx;
				color: #7f7f7f;
				margin-top: 8rpx;
			}
			.type span {
				margin-left: 22rpx;
			}
			.price {
				margin-top: 9rpx;
			}
			.price text {
				font-size: 36rpx;
				font-weight: 900;
				color: #40B36C;
				margin-left: 8rpx;
			}
			.year {
				float: left;
			}
			.chat {
				float: right;
			}
		}
	}
</style>
