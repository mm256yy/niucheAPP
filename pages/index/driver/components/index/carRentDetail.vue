<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="租车详情" :background="backgroundDri" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon>
				</view>
			</view>
		</u-navbar>
		 <view class="" style="padding: 40rpx;">
			<u-image class="img" width="669rpx" height="503rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view>
				<!-- <view class="tag">付费标签</view> -->
				<view class="name">520520款运动版{{detail.texttitle}}</view>
				<view class="price"><text>27000</text>元/月起租</view>
				<view class="box">
					<view v-for="(item, index) in arr" :key="index" class="text">{{item}}</view>
					<view class="clear"></view>
				</view>
		 	</view>
		</view>
		<view class="wrap">
			<view class="u-tabs-box">
			 	<u-tabs-swiper ref="uTabs" bg-color="rgba(0,0,0,0.005)" font-size="28" :list="list" 
				:current="current" @change="tabsChange" :is-scroll="false" :bold="true" inactive-color="#7f7f7f"
			 	swiperWidth="750" active-color="#FF6501"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 			<range-price :tab="tab" :detail="detail" ref="child"></range-price>
			 		</scroll-view>
			 	</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<rentcar-issue :detail="detail.carRentProblemCollection"></rentcar-issue>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<setting-parameter :detail="detail"></setting-parameter>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import rangePrice from './rangePrice'
	import rentcarIssue from './rentcarIssue'
	import settingParameter from './settingParameter'
	export default {
		components: {
		    rangePrice,
			rentcarIssue,
			settingParameter
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				driverDemandId: '',
				list: [{
					name: '租车价格'
					}, {
				    name: '租车常见问题'
					}, {
					name: '参数配置'
			    }],
				current: 0,
				swiperCurrent: 0,
				detail: {},
				tab: [],
				arr: []
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
		},
		methods: {
			getDetail(){
				this.$u.api.detailRent({driverDemandId:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						 this.detail = res.object;
						 const systemtag = this.detail.systemtag;
						 const usertag = this.detail.usertag;
						 const businesstypetag = this.detail.businesstypetag;
						 const concat =systemtag.concat(usertag);
						 this.arr = link.concat(businesstypetag);
						 var text = '';
						 if(this.detail.pricesectionlist) {
						   this.detail.pricesectionlist.forEach(item=>{
						   	if(item.lowprice && !item.highprice) {
						   		text = '≥'+item.lowprice + '辆';
						   	}
						   	if(!item.lowprice && item.highprice) {
						   		text = '≤'+item.highprice + '辆';
						   	}
						   	if(item.lowprice && item.highprice) {
						   		text = item.lowprice + '-' + item.highprice + '辆';
						   	}
						   	this.tab.push(text)						
						   })
						 }
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
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
	// background-image: url(@/static/lease.png);
	// background-repeat: no-repeat;
	height: 100%;
	overflow: scroll;
	background-size: cover;
	// background-position: 50% 50%;
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
		height: calc(80vh - var(--window-top));
		// height: auto;
		width: 100%;
		background: rgba(0,0,0,0.02);
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.detail {
		.clear {
			clear: both;
		}
		.tag {
			width: 169rpx;
			height: 41rpx;
			border-radius: 22rpx;
			line-height: 41rpx;
			text-align: center;
			background: #FF6501;
			font-size: 28rpx;
			font-weight: 900;
			color: #fff;
			margin-top: 61rpx;
		}
		.name {
			font-size: 28rpx;
			font-weight: 900;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		.price {
			font-size: 20rpx;
		}
		.price text {
			font-size: 40rpx;
			font-weight: 900;
			color: #FF6501;
			margin-right: 12rpx;
		}
	    .box .text {
			padding: 14rpx;
			border-radius: 10rpx;
			background: #ECEBEB;
			font-size: 20rpx;
			color: #7f7f7f;
			float: left;
			margin-right: 10rpx;
			margin-top: 9rpx;
		}
		.box {
			margin-top: 39rpx;
		}
		
	}
</style>


