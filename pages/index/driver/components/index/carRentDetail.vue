<template>
	<view class="detail">
		<u-navbar z-index="2000" back-text="返回" back-icon-size="0" title="租车详情" :background="backgroundDri" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<!-- <u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon> -->
				</view>
			</view>
		</u-navbar>
		 <view class="">
			 <view class="wraps img">
			 	<u-swiper height="503" bg-color="#CDE5E3" mode="dot" :list="detail.photourl"></u-swiper>
			 </view>
<!-- 			 <view style="padding: 5px 10px;">
			 	<text class="list_tag" v-for="(tag,i) in tagList" :key="i">{{tag.tabValue}}</text>
			 </view> -->
			 <view style="position: relative;" v-if="tagList.length>0">
				 <u-image src="@/static/dipian@2x.png" height="140rpx" border-radius="8"></u-image>
				 <view style="position: absolute;top: 5px;left: 10px;color: #fff;" class="u-line-2">
					 	<text class="list_tag" v-for="(tag,i) in tagList" :key="i">{{tag.tabValue}}</text>
	<!-- 					 <view v-for="(tag,index) in tagList" :key="index" style="font-size: 14px;display: inline-block;">
							 {{tag.tabValue}} 
							 <text style="display: inline-block;padding:2px 5px;font-size: 14px;" v-show="index<tagList.length-1">•</text>
						 </view> -->
				 </view>
			 </view>
			<view style="padding: 4px 40rpx">
				<!-- <view class="tag">付费标签</view> -->
				<view class="name u-line-2">
				  <text v-show="detail.businesstypetag == 1">[网约车]</text>
				  <text v-show="detail.businesstypetag == 2">[出租车]</text>
				{{detail.texttitle}}</view>
				<view class="price"><text>￥{{detail.rentprice}}</text>元/月起租</view>
				<view class="collect" v-if="token">
					<u-icon v-show="detail.iscollect === 1" @click="cancel(detail,detail.comparymainid)" class="heart" name="heart-fill" color="#FCD03C" size="40"></u-icon>
					<u-icon v-show="detail.iscollect === 2" @click="favorites(detail,detail.comparymainid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="40"></u-icon>
					<!-- <text>{{detail.collectnum}}</text> -->
				</view>
				<view class="clear"></view>
				<view class="box">
					<view v-show="item!=''" v-for="(item, index) in detail.systemtag" :key="index" class="text">{{item}}</view>
					<view class="clear"></view>
				</view>
		 	</view>
		</view>
		<view style="padding: 20rpx 40rpx;">价格区间</view>
		<range-price :tab="tab" :detail="detail"></range-price>
		<view style="padding: 20rpx 40rpx;">参数配置</view>
		<setting-parameter :detail="detail"></setting-parameter>
		<view style="padding: 40rpx;">公司地址：{{detail.comparyarea}}</view>
		<view class="phone">
			<view class="left" @click="other()">公司店铺</view>
			<view style="height: 50rpx;width: 4rpx;background: #fff;"></view>
			<view class="right" @click="dial()">拨打电话</view>
		</view>
		<!-- <view class="phone" @click="phone()">拨打电话</view> -->
		<view style="width: 100%;height:154rpx"></view>
		<!-- <view class="wrap">
			<view class="u-tabs-box">
			 	<u-tabs-swiper ref="uTabs" bg-color="rgba(0,0,0,0.005)" font-size="28" :list="list" 
				:current="current" @change="tabsChange" :is-scroll="false" :bold="true" inactive-color="#7f7f7f"
			 	swiperWidth="750" active-color="#FF6501"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 			<range-price :tab="tab" :detail="detail"></range-price>
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
			<view class="more" @click="other()">上拉加载该公司其他信息</view>
			<view class="phone" @click="phone()">拨打电话</view>
			<view class="last">
				<view class="bottom">
					<view class="left">预约看车</view>
					<view class="icon-box"><u-image class="img" width="53rpx" height="45rpx" src="@/static/chat.png"></u-image></view>
					<u-image class="chat" width="96rpx" height="96rpx" src="@/static/chatDri.png"></u-image>
					<view class="right">下单租车</view>
				</view>
			</view>
		</view> -->
		<phone-auth :phone="detail.phone" :status="status" v-show="open" ref="phone"></phone-auth>
		<phone-auth :id="detail.comparyid" :status="status" v-show="openShow" ref="other"></phone-auth>
	</view>
</template>

<script>
	import rangePrice from './rangePrice'
	import rentcarIssue from './rentcarIssue'
	import settingParameter from './settingParameter'
	import phoneAuth from '@/components/phoneAuth.vue'
	export default {
		components: {
		    rangePrice,
			rentcarIssue,
			settingParameter,
			phoneAuth
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				status: 2,
				token:'',
				open:false,
				openShow:false,
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
				rentList:[{name: '0',text:'3000以内（含3000）' },{name: '1',text:'3000以上' }],
				ageList:[{name: '0',text:'1年内' },{name: '1',text:'1年-3年' },{name: '2',text:'3年-5年' },{name: '3',text:'5年以上' }],
				tagList:[]
			}
		},
		onLoad(option) {
			let id = option.id;
			let tags = option.tags;
			if(tags){
				this.tagList = eval(tags)
			}
			if(id){
			 this.driverDemandId = id;
			}
		},
		mounted() {
			this.getDetail()
			this.token = uni.getStorageSync('token');
		},
		methods: {
			favorites(item,id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 2,
					collectionstate: 1,
					iscollection: 1
				};
				item.iscollect = 1;
				item.collectnum = item.collectnum+1;
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
					collectionstate: 1,
					iscollection: 0
				};
				item.iscollect = 2;
				item.collectnum = item.collectnum-1;
			    this.$u.api.collect(params).then(res=>{
			    	if(res.code === 200){
			    		 this.$u.toast('取消收藏成功');
			    	}else {
			    		 this.$u.toast(res.msg);
			    	}
			    })
			},
			getDetail(){
				this.$u.api.detailRent({id:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						 this.detail = res.object;
						 var text = '';
						 if(this.detail.carRentPriceCollection) {
						   this.detail.carRentPriceCollection.forEach(item=>{
						   	if(item.carrenttime){
								text = item.carrenttime;
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
				this.openShow = true;
				this.open = false;
				this.status = 4;
				this.$refs.other.getStatus()
			},
			dial() {
				this.openShow = false;
				this.open = true;
				this.status = 1;
				this.$refs.phone.getStatus()
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
}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
	.list_tag {
		display: inline-block;
		padding: 2px 4px;
		font-size: 12px;
		margin-right: 6px;
		margin-bottom: 6px;
		background: linear-gradient(270deg, #FFC400 0%, #FFB200 54%, #FF9900 100%);
		color: #FFFFFF;
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
		height: calc(85vh - var(--window-top));
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
		background: #F5F5F8;
		.img{
			margin-top: 40rpx;
		}
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
			float: left;
		}
		.price text {
			font-size: 40rpx;
			font-weight: 900;
			color: #FF6501;
			margin-right: 12rpx;
		}
		.collect {
			float: right;
			.heart {
				margin-right: 6rpx;
				margin-top: 10rpx;
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
				   // padding: 55rpx 80rpx;
				   background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
				   font-size: 36rpx;
				   font-weight: 900;
				   color: #fff;
				   display: flex;
				   justify-content: space-around;
				   align-items: center;
				  .bottom {
					  line-height: 96rpx;
					  .left {
						  float: left;
						  margin-right: 70rpx;
					  }
					  .chat {
						  float: left;
						  margin-right: 70rpx;
					  }
					  .right {
						  float: left;
					  }
				  }
		}
		.phone{
			width: 100%;
			height: 144rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
			font-size: 36rpx;
			font-weight: 900;
			color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 20;
		}
	}
</style>


