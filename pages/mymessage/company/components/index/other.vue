<template>
	<view class="other">
		<u-navbar back-text="返回" back-icon-size="0" title="吉利 帝豪" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon>
				</view>
			</view>
		 </u-navbar>
		 <view class="top">
		 	<u-image class="left" width="185rpx" height="186rpx" :src="detail.comparylogophoto"></u-image>
		 	<view class="right">
		 		<view class="name">{{detail.comparyname}}</view>
		 		<view class="address">{{detail.area}}</view>
				<view v-for="(item, index) in detail.mainbusiness" :key="index" class="box">{{item}}运营</view>
				<view class="clear"></view>
		 	</view>
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
			 			<selling :id="driverDemandId" v-if="isChildUpdate1" ref="selling"></selling>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottomBuy">
			 			<buy :id="driverDemandId" v-if="isChildUpdate2" ref="buy"></buy>
			 		</scroll-view>
			 	</swiper-item>
			 </swiper>
		 </view>
	</view>
</template>

<script>
	import selling from './selling'
	import buy from './buy'
	export default {
		components: {
			selling,
			buy
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
				}],
				current: 0, 
				swiperCurrent: 0,
				detail: {},
				isChildUpdate1:true,
				isChildUpdate2:false,
				driverDemandId: ''
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.driverDemandId = id;
			}
		},
		mounted() {
			this.getDetail()
			// this.$refs.selling.getDetail()
		},
		methods: {
			getDetail(){
			    const params = {
					id: this.driverDemandId
				}
					this.$u.api.MessageCompany(params).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				if(index == 0) {
				    this.isChildUpdate1 = true;
				    this.isChildUpdate2 = false;
				} else if(index == 1) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = true;
				}
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
			onreachBottomSelling() {
				this.$refs.selling.pull()
			},
			onreachBottomBuy() {
				this.$refs.buy.pull()
			},
			details() {
				this.$u.route("/pages/mymessage/components/index/buyingDetail")
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 42rpx;
		    right: 34rpx;
		}
		.top {
			width: 666rpx;
			height: 186rpx;
			margin-left: 42rpx;
			margin-top: 40rpx;
			margin-bottom: 60rpx;
			.left {
				float: left;
			}
			.right {
				width: 481rpx;
				height: 186rpx;
				padding: 30rpx 42rpx;
				float: left;
				font-size: 20rpx;
				.name {
					font-size: 36rpx;
					font-weight: 900;
					margin-bottom: 17rpx;
				}
				.box {
					width: 139rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					border-radius: 10rpx;
					background: rgba(0,0,0,0.1);
					color: #7f7f7f;
					float: left;
					margin-right: 10rpx;
					margin-top: 19rpx;
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
