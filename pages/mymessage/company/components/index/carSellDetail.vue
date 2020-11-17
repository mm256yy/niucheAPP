<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" :title="detail.carmodeltag" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon>
				</view>
			</view>
		 </u-navbar>
		 <view class="">
			<u-image class="img" width="100%" height="503rpx" :src="detail.photourl"></u-image>
			<view style="padding: 40rpx;">
				<!-- <view class="tag">付费标签</view> -->
				<view class="name">{{detail.titletext}}</view>
				<view class="price"><text>￥{{detail.packprice}}</text>打包价</view>
				<view class="collect" v-if="!viewFlag">
					<u-icon v-show="detail.isCollection === 1" @click="cancel(detail,detail.comparyid)" class="heart" name="heart-fill" color="#40B36C" size="28"></u-icon>
					<u-icon v-show="detail.isCollection === 2" @click="favorites(detail,detail.comparyid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
					<text>{{detail.collectnum}}</text>
				</view>
				<view class="clear"></view>
				<view class="box">
					<view v-for="(item, index) in arr" :key="index" class="text">{{item}}</view>
					<view class="clear"></view>
				</view>
		 	</view>
		</view>
		<view style="padding: 20rpx 40rpx;">价格区间</view>
		<range-price :tab="tab" :detail="detail"></range-price>
		<view style="padding: 20rpx 40rpx;">参数配置</view>
		<setting-parameter :detail="detail"></setting-parameter>
		<view class="phone">
			<view class="left" @click="other()">公司其他</view>
			<view class="right">拨打电话</view>
		</view>
		<view style="width: 100%;height:144rpx"></view>
		<!-- <view class="last">
			<view class="left">预约看车</view>
			<u-image class="img" width="96rpx" height="96rpx" src="@/static/chat-box.png"></u-image>
			<view class="right">下单租车</view>
		</view> -->
		<PubBottom v-if="viewFlag" :isopen="detail.isopen" :id="driverDemandId" :type="3"></PubBottom>
		<!-- <view class="wrap">
			<view class="u-tabs-box">
			 	<u-tabs-swiper ref="uTabs" bg-color="rgba(0,0,0,0.005)" font-size="28" :list="listTab" 
				:current="current" @change="tabsChange" :is-scroll="false" :bold="true" inactive-color="#7f7f7f"
			 	swiperWidth="750" active-color="#40B36C"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 			<range-price :tab="tab" :detail="detail"></range-price>
			 		</scroll-view>
			 	</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<rentcar-issue :detail="detail.problem"></rentcar-issue>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<setting-parameter :detail="detail"></setting-parameter>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view> -->
	</view>
</template>

<script>
	import rangePrice from './rangePrice'
	import rentcarIssue from './rentcarIssue'
	import settingParameter from './settingParameter'
	import carInstall from './carInstall'
	import PubBottom from '@/components/pubBottom.vue'
	export default {
		components: {
		    rangePrice,
			rentcarIssue,
			settingParameter,
			carInstall,
			PubBottom
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				driverDemandId: '',
				listTab: [{
					name: '价格区间'
					}, {
				    name: '租车常见问题'
					}, {
					name: '参数配置'
			    }],
				current: 0,
				swiperCurrent: 0,
				detail:{},
				tab: [],
				arr: [],
				viewFlag:false//发布页详情true,列表页详情false
			}
		},
		onLoad(option) {
			let id = option.id;
			let flag = option.flag;
			if(id){
			 this.driverDemandId = id;
			}
			if(flag){
				this.viewFlag =true
			}
		},
		mounted() {
			this.getDetail()
		},
		methods: {
			favorites(item,id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 2,
					collectionstate: 3,
					iscollection: 1
				};
				item.iscollection = 1;
			    this.$u.api.collect(params).then(res=>{
			    	if(res.code === 200){
			    		 this.$u.toast('收藏成功');
			    	}else {
			    		 this.$u.toast(res.msg);
			    	}
			    })
			},
			cancel(item,id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 2,
					collectionstate: 3,
					iscollection: 0
				};
				item.iscollection = 2;
			    this.$u.api.collect(params).then(res=>{
			    	if(res.code === 200){
			    		 this.$u.toast('取消收藏成功');
			    	}else {
			    		 this.$u.toast(res.msg);
			    	}
			    })
			},
			getDetail(){
					this.$u.api.detailSellCar({id: this.driverDemandId}).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
							 const systemtag = this.detail.systemtag;
							 const usertag = this.detail.usertag;
							 this.arr =systemtag.concat(usertag);
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
							
			},
			other() {
				this.$u.route('/pages/mymessage/company/components/index/other',{
					id:this.detail.comparyid,
					title:this.detail.titletext
					});
			},
			phone() {
				uni.makePhoneCall({ phoneNumber: '18748412671' });
			}
		}
	}
</script>
<style lang="scss" scoped>
page{
	// background-image: url(@/static/lease.png);
	// background-repeat: no-repeat;
	height: 100%;
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
		height: calc(66vh - var(--window-top));
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
		background-color: #F5F5F8;
		.img{
			margin-top: 40rpx;
		}
		color: #7f7f7f;
		.clear {
			clear: both;
		}
		.tag {
			width: 169rpx;
			height: 41rpx;
			border-radius: 22rpx;
			line-height: 41rpx;
			text-align: center;
			background: #40B36C;
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
			float: left;
		}
		.price text {
			font-size: 40rpx;
			font-weight: 900;
			color: #40B36C;
			margin-right: 12rpx;
		}
		.collect {
			float: right;
			.heart {
				margin-right: 6rpx;
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
		.more {
			width: 100%;
			text-align: center;
			font-size: 20rpx;
			color: #7f7f7f;
			margin-top: 83rpx;
			margin-bottom: 40rpx;
		}
		.last {
				   width: 100%;
				   height: 144rpx;
				   padding: 55rpx 116rpx;
				   background: linear-gradient(115deg, #6DD99B, #37AB63);
				   font-size: 36rpx;
				   font-weight: 900;
				   color: #fff;
				   display: flex;
				   justify-content: space-around;
				   align-items: center;
		}
		.phone{
			width: 100%;
			height: 144rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: linear-gradient(115deg, #6DD99B, #37AB63);
			font-size: 36rpx;
			font-weight: 900;
			color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>


