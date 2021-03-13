<template>
	<view class="other">
		<u-navbar back-icon-color="#111111" title="我的订单" :background="background" title-color="#111111">
		</u-navbar>
		 <view class="wrap">
			 <view style="">
			 	<u-tabs-swiper :offset="[4,0]" count="cate_count" style="position: fixed;background: #fff;" ref="uTabs" activeColor="#40B36C" :list="listTab" inactive-color="#000"
			    bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 	 swiperWidth="750"></u-tabs-swiper>
			 </view>
			 <swiper class="swiper-box" :current="swiperCurrent" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;">
			 			<alling v-if="isChildUpdate1" ref="alling"></alling>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;">
			 			<registrationing v-if="isChildUpdate2" ref="registrationing"></registrationing>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;">
			 			<signing v-if="isChildUpdate3" ref="signing"></signing>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;">
			 			<paying v-if="isChildUpdate4" ref="paying"></paying>
			 		</scroll-view>
			 	</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<mentioning v-if="isChildUpdate5" ref="mentioning"></mentioning>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<invaliding v-if="isChildUpdate6" ref="invaliding"></invaliding>
					</scroll-view>
				</swiper-item>
			 </swiper>
		 </view>
	</view>
</template>

<script>
	import alling from './all'
	import registrationing from './registration'
	import signing from './sign'
	import paying from './pay'
	import mentioning from './mention'
	import invaliding from './invalid'
	export default {
		components: {
			alling,
			registrationing,
			signing,
			paying,
			mentioning,
			invaliding
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				backTextStyle:{
					'color':'#ffffff'
				},
				listTab: [{
					name: '全部'
				}, {
					name: '商品登记'
				},{
					name: '待签约'
				}, {
					name: '待支付'
				},,{
					name: '待提车'
				}, {
					name: '失效'
				}],
				current: 0, 
				swiperCurrent: 0,
				detail: {},
				isChildUpdate1:true,
				isChildUpdate2:false,
				isChildUpdate3:false,
				isChildUpdate4:false,
				isChildUpdate5:false,
				isChildUpdate6:false,
				failedNum:'',
				waitCarMessageNum:'',
				waitDeliveryVehicleNum:'',
				waitPayNum:'',
				waitSignContractNum:'',
			}
		},
		onBackPress(e) {
		
		        uni.switchTab({
		          url: '/pages/mycenter/mycenter'
		
		        });
		
		        return true
		
		},
		onLoad(option) {
			let index = option.index;
			let obj = JSON.parse(option.obj);
			if(index){
			 this.current = index;
			 this.swiperCurrent = index;
			 this.create(index)
			}
			if(obj){
			 this.waitCarMessageNum = obj.waitCarMessageNum;
			 this.waitSignContractNum = obj.waitSignContractNum;
			 this.waitPayNum = obj.waitPayNum;
			 this.waitDeliveryVehicleNum = obj.waitDeliveryVehicleNum;
			 this.failedNum = obj.failedNum;
			 this.listTab = [{
			 	name: '全部'
			 }, {
			 	name: '商品登记',
				cate_count: this.waitCarMessageNum
			 },{
			 	name: '待签约',
				cate_count: this.waitSignContractNum
			 }, {
			 	name: '待支付',
				cate_count: this.waitPayNum
			 }, {
			 	name: '待提车',
				cate_count: this.waitDeliveryVehicleNum
			 }, {
			 	name: '失效',
			 	cate_count: this.failedNum
			 }]
			}
		},
		methods: {
			create(index){
				if(index == 0) {
				    this.isChildUpdate1 = true;
				    this.isChildUpdate2 = false;
					this.isChildUpdate3 = false;
					this.isChildUpdate4 = false;
					this.isChildUpdate5 = false;
					this.isChildUpdate6 = false;
				} else if(index == 1) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = true;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = false;
					this.isChildUpdate5 = false;
					this.isChildUpdate6 = false;
				}else if(index == 2) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = true;
				    this.isChildUpdate4 = false;
					this.isChildUpdate5 = false;
					this.isChildUpdate6 = false;
				}else if(index == 3) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = true;
					this.isChildUpdate5 = false;
					this.isChildUpdate6 = false;
				}else if(index == 4) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = false;
					this.isChildUpdate5 = true;
					this.isChildUpdate6 = false;
				}else if(index == 5) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = false;
					this.isChildUpdate5 = false;
					this.isChildUpdate6 = true;
				}
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.create(index)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			// transition(e) {
			// 	debugger
			// 	let dx = e.detail.dx;
			// 	this.$refs.uTabs.setDx(dx);
			// },
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.create(current)
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
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.swiper-box {
		flex: 1;
		margin-top: 70rpx;
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
