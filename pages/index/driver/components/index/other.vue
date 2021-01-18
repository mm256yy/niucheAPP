<template>
	<view class="other">
		<u-navbar back-text="返回" back-icon-size="0" :title="detail.comparyname" :background="backgroundDri" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<!-- <u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon> -->
				</view>
			</view>
		 </u-navbar>
		 <view style="background: #fff;margin-left: 38rpx;margin-right: 38rpx;padding: 30rpx 40rpx;margin-top: 40rpx;">
			<view class="top">
						 <!-- <image class="left" :src="detail.comparylogophoto" mode="aspectFill"></image> -->
				<!-- <u-image  :src="detail.comparylogophoto"></u-image> -->
				<u-avatar :src="detail.comparylogophoto" mode="circle" size="large" ></u-avatar>
						<!-- <img class="left" :src="detail.comparylogophoto" alt=""> -->
				<view class="right">
					<view class="name">{{detail.comparyname}}</view>
					<view class="address">{{detail.area}}</view>
				</view>		
			</view>
			 <view v-for="(item, index) in detail.mainbusiness" :key="index" class="box">{{item}}运营</view>
			 <view class="clear"></view>
		 </view>
		 <view class="wrap">
			 <view style="">
			 	<u-tabs-swiper ref="uTabs" activeColor="#FF6501" :list="listTab" inactive-color="#000"
			    bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 	 swiperWidth="750"></u-tabs-swiper>
			 </view>
			 <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;">
			 			<renting v-if="isChildUpdate1" :ids="driverDemandId" ref="renting"></renting>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;">
			 			<searching v-if="isChildUpdate2" :ids="driverDemandId" ref="searching"></searching>
			 		</scroll-view>
			 	</swiper-item>
			 </swiper>
		 </view>
		 <view style="width: 100%;height: 1000rpx;"></view>
		 <!-- <view class="phone" @click="phone()">拨打电话</view> -->
	</view>
</template>

<script>
	import renting from './renting'
	import searching from './searching'
	export default {
		components: {
			renting,
			searching
		},
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				listTab: [{
					name: '租车'
				}, {
					name: '招聘'
				}],
				current: 0, 
				swiperCurrent: 0,
				pagination: {
				  pageNum: 0, 
				  pageSize: 10
				},
			    detail: {},
				driverDemandId: '',
				isChildUpdate1:true,
				isChildUpdate2:false
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.driverDemandId = id;
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.getList()
			setTimeout(function(){
				uni.stopPullDownRefresh();
			},2000)
		},
		mounted() {
			this.getDetail()
		},
		methods: {
			getList() {
				if(this.$refs.renting != undefined){
					this.$refs.renting.getList()
				}
				if(this.$refs.searching != undefined){
					this.$refs.searching.getList()
				}
			},
			getDetail(){
			    const params = {
					id: this.driverDemandId
				}
					this.$u.api.messageCompany(params).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			create(index){
				if(index == 0) {
				    this.isChildUpdate1 = true;
				    this.isChildUpdate2 = false;
				} else if(index == 1) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = true;
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
			// onreachBottomRenting() {
			// 	this.$refs.renting.pull()
			// },
			// onreachBottomSearching() {
			// 	this.$refs.searching.pull()
			// },
			details() {
				this.$u.route("/pages/mymessage/components/index/buyingDetail")
			},
			phone() {
				uni.makePhoneCall({ phoneNumber: '18748412671' });
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
		height: calc(72vh - var(--window-top));
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
		.top {
			display: flex;
			align-items: center;
			.left{
				width: 100px;
				height: 100px;
				// border-radius: 50%;
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
		.box {
			padding: 8rpx;
			line-height: 36rpx;
			text-align: center;
			border-radius: 10rpx;
			background: rgba(0,0,0,0.1);
			color: #7f7f7f;
			float: left;
			margin-left: 10rpx;
			margin-right: 10rpx;
			margin-bottom: 19rpx;
			font-size: 20rpx;
		}
		.clear {
			clear: both;
		}
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 154rpx;
		    right: 34rpx;
		}
		.list{
			width: 679rpx;
			height: 295rpx;
			color: #000;
			font-size: 20rpx;
			margin-left: 36rpx;
			margin-top: 40rpx;
			background: #fff;
			.clear {
				clear: both;
			}
			.left {
				float: left;
				margin-left: 19rpx;
				margin-top: 20rpx;
			}
			.right{
				width: 396rpx;
				height: 226rpx;
				background: #fff;
				float: left;
				margin-left: 20rpx;
			}
			.name {
				font-weight: 900;
				font-size: 28rpx;
				margin-top: 18rpx;
			}
			.car {
				float: left;
			}
			.distance {
				margin-left: 6rpx;
				color: #7f7f7f;
				float: left;
				margin-top: 16rpx;
			}
			.tag {
				width: 179rpx;
				height: 43rpx;
				line-height: 43rpx;
				text-align: center;
				border-radius: 6rpx;
				background: #FF6501;
				font-size: 28rpx;
				color: #fff;
				font-weight: 900;
				float: left;
				margin-top: 20rpx;
			}
			.type {
				width: 86rpx;
				height: 28rpx;
				line-height: 28rpx;
				text-align: center;
				background: rgba(0,0,0,0.1);
				font-size: 20rpx;
				float: left;
				margin-left: 33rpx;
				margin-top: 28rpx;
				margin-right: 20rpx;
			}
			.box {
				width: 679rpx;
				height: 59rpx;
				background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
				padding: 0 0 0 18rpx;
				color: #fff;
				margin-top: 10rpx;
				view {
					font-size: 20rpx;
					float: left;
				}
				view text {
					font-size: 36rpx;
					font-weight: 900;
					margin-right: 19rpx;
				}
				.case {
					padding: 6rpx 14rpx;
					border-radius: 10rpx;
					background: #fff;
					font-weight: 900;
					color: #FF6501;
					margin-top: 8rpx;
					float: right;
					margin-right: 10rpx;
				}
			}
		}
		.phone{
			width: 100%;
			height: 144rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
			font-size: 36rpx;
			font-weight: 900;
			color: #fff;
			margin-top: 40rpx;
		}
	}
</style>
