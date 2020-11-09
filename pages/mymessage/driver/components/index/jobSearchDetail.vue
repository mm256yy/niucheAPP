<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="招聘详情" :background="backgroundDri" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
		    <view class="navbar-right" slot="right">
		    	<view class="message-box right-item">
		    		<u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon>
		    	</view>
		    </view>
		 </u-navbar>
		 <view class="" style="padding: 40rpx;">
			<!-- <u-image class="img" width="669rpx" height="503rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image> -->
			<view class="list">
				<!-- <view class="tag">付费标签</view> -->
				<view class="name">高薪招聘{{detail.texttitle}}</view>
				<view class="price"><text>￥{{detail.pay}}</text>月薪</view>
				<view class="city">工作城市：{{detail.city}}<text>招聘：{{detail.invitepeoplenum}}人</text></view>
				<!-- <view class="box">
					<view class="text">帆帆帆帆66</view>
					<view class="text">帆帆帆帆</view>
					<view class="text">帆帆帆帆</view>
					<view class="text">帆帆帆帆</view>
					<view class="text">帆帆帆帆</view>
					<view class="text">帆帆帆帆</view>
					<view class="text">帆帆帆帆</view>
					<view class="clear"></view>
				</view> -->
		 	</view>
		</view>
		<view class="title">车型</view>
		<view class="wrap">
			<v-tabs v-model="firstCurrent" :scroll="false" lineHeight='0rpx' color="#7f7f7f" :pills="true" pillsColor="#ffffff" pillsBorderRadius="0rpx" activeColor="#40B36C" :tabs="list"></v-tabs>
			 <view v-for="(item, index) in detail.carphotolist" :key="index" class="" v-show="firstCurrent === index">
				<u-image class="img" width="671rpx" height="504rpx" :src="item.neionephoto"></u-image>
			 </view>
			<!-- <view class="u-tabs-box">
			 	<u-tabs-swiper ref="uTabs" bg-color="rgba(0,0,0,0.005)" font-size="28" :list="list" 
				:current="current" @change="tabsChange" :is-scroll="false" :bold="true" inactive-color="#7f7f7f"
			 	swiperWidth="750" active-color="#FF6501"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 671rpx;width: 100%;" @scrolltolower="onreachBottom">
			 			<u-image class="img" width="671rpx" height="504rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			 		</scroll-view>
			 	</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 671rpx;width: 100%;" @scrolltolower="onreachBottom">
						<u-image class="img" width="671rpx" height="504rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 671rpx;width: 100%;" @scrolltolower="onreachBottom">
						<u-image class="img" width="671rpx" height="504rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 671rpx;width: 100%;" @scrolltolower="onreachBottom">
						<u-image class="img" width="671rpx" height="504rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 671rpx;width: 100%;" @scrolltolower="onreachBottom">
						<u-image class="img" width="671rpx" height="504rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
					</scroll-view>
				</swiper-item>
			</swiper> -->
		</view>
		<view class="wrapBottom">
			<view class="u-tabs-box">
			 	<u-tabs-swiper ref="uTabsBottom" bg-color="rgba(0,0,0,0.005)" font-size="28" :list="listBottom" 
				:current="currentBottom" @change="tabsChangeBottom" :is-scroll="false" :bold="true" inactive-color="#7f7f7f"
			 	swiperWidth="750" active-color="#FF6501"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrentBottom" @transition="transitionBottom" @animationfinish="animationfinishBottom">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 			<job-detail ref="child"></job-detail>
			 		</scroll-view>
			 	</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<company-detail></company-detail>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import jobDetail from './jobDetail'
	import companyDetail from './companyDetail'
	export default {
		components: {
			jobDetail,
			companyDetail
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				driverDemandId: '',
				list: [],
				listBottom: [{
					name: '职位详情'
					}, {
				    name: '公司介绍'
					}],
				current: 0,
				swiperCurrent: 0,
				currentBottom: 0,
				swiperCurrentBottom: 0,
				detail: ''
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
				this.$u.api.detailSearch({id:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						 this.detail = res.object;
						 if(this.detail.carphotolist) {
						   this.detail.carphotolist.forEach(item=>{
						       this.list.push(item.carBrandAndModel)						
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
			tabsChangeBottom(index) {
				this.swiperCurrentBottom = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			transitionBottom(e) {
				let dx = e.detail.dx;
				this.$refs.uTabsBottom.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			animationfinishBottom(e) {
				let current = e.detail.current;
				this.$refs.uTabsBottom.setFinishCurrent(current);
				this.swiperCurrentBottom = current;
				this.currentBottom = current;
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
	background-size: cover;
	// background-position: 50% 50%;
	background: rgba(0,0,0,0.02);
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
		// height: calc(100vh - var(--window-top));
		// height: auto;
		height: 671rpx;
		width: 100%;
	}
	.wrapBottom {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		// height: auto;
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.detail {
		.title {
			font-size: 36rpx;
			font-weight: 900;
			margin-left: 40rpx;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
		}	
		.list {
			width: 669rpx;
			background: #fff;
			padding: 40rpx;
			margin-top: 20rpx;
		}
		.clear {
			clear: both;
		}
		.tag {
			width: 179rpx;
			height: 43rpx;
			line-height: 43rpx;
			text-align: center;
			background: #FF6501;
			font-size: 28rpx;
			font-weight: 900;
			color: #fff;
			margin-top: -60rpx;
		}
		.name {
			font-size: 36rpx;
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
		.city {
			font-size: 20rpx;
			margin-top: 18rpx;
			text {
				margin-left: 157rpx;
			}
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
		.img {
			margin-left: 40rpx;
			margin-top: 40rpx;
		}
	}
</style>


