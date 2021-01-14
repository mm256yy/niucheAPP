<template>
	<view class="detail">
		<u-navbar z-index="2000" back-text="返回" back-icon-size="0" title="招聘详情" :background="backgroundDri" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
		    <view class="navbar-right" slot="right">
		    	<view class="message-box right-item">
		    		<!-- <u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon> -->
		    	</view>
		    </view>
		 </u-navbar>
		 <view class="" style="padding: 40rpx;">
			<!-- <u-image class="img" width="669rpx" height="503rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image> -->
			<view class="list">
				<!-- <view class="tag">付费标签</view> -->
				<view class="icon" v-show="token">
					<u-icon v-show="detail.isCollection === 1" @click="cancel(detail,detail.comparymainid)" class="heart" name="heart-fill" color="#FCD03C" size="40"></u-icon>
					<u-icon v-show="detail.isCollection === 2" @click="favorites(detail,detail.comparymainid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="40"></u-icon>
					<!-- <text>{{detail.collectionum}}</text> -->
				</view>
				<view class="name">高薪招聘{{detail.texttitle}}</view>
				<view class="price"><text>￥{{detail.pay}}</text>月薪</view>
				<view style="font-size: 28rpx;margin-top: 20rpx;">招聘人数：{{detail.invitepeoplenum}}人</view>
				<!-- <view style="font-size: 28rpx;" class="city">工作城市：{{detail.city}}</view> -->
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
		<view class="title">工作车型</view>
		<!-- <view class="wrap">
			<v-tabs v-model="firstCurrent" :scroll="true" lineHeight='0rpx' color="#7f7f7f" :pills="true"
			 pillsColor="#ffffff" pillsBorderRadius="0rpx" activeColor="#FF6501" :tabs="list" @change="change"></v-tabs>
			 <view v-for="(item, index) in detail.carphotolist" :key="index" class="" v-show="firstCurrent === index">
				<u-image class="img" width="100%" height="504rpx" :src="item.onephoto"></u-image>
			 </view>
		</view> -->
		<view style="float: left;margin-top: 40rpx;margin-left: 20rpx;font-size: 30rpx;font-weight: 900;">{{detail.carname}}</view>
		<view class="clear"></view>
		<u-image class="img" width="100%" height="504rpx" :src="detail.carphotolist"></u-image>
		<view class="wrapBottom">
			<view class="u-tabs-box">
			 	<u-tabs-swiper ref="uTabsBottom" bg-color="rgba(0,0,0,0.005)" font-size="28" :list="listBottom" 
				:current="currentBottom" @change="tabsChangeBottom" :is-scroll="false" :bold="true" inactive-color="#7f7f7f"
			 	swiperWidth="750" active-color="#FF6501"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrentBottom" @transition="transitionBottom" @animationfinish="animationfinishBottom">
			 	<swiper-item class="swiper-item">
			 		<job-detail :detail="detail"></job-detail>
			 	</swiper-item>
				<swiper-item class="swiper-item">
					<view scroll-y style="width: 100%;" @scrolltolower="onreachBottom">
						<company-detail :detail="detail"></company-detail>
					</view>
				</swiper-item>
			</swiper>
			<view style="padding: 40rpx;">公司地址：{{detail.city}}</view>
			<view class="phone">
				<view class="left" @click="other()">公司店铺</view>
				<view style="height: 50rpx;width: 4rpx;background: #fff;"></view>
				<view class="right" @click="dial()">拨打电话</view>
			</view>
			<view style="width: 100%;height:154rpx"></view>
			<!-- <view class="last">
				<view class="bottom">
					<view class="left">预约看车</view>
					<view class="icon-box"><u-image class="img" width="53rpx" height="45rpx" src="@/static/chat.png"></u-image></view>
					<u-image class="chat" width="96rpx" height="96rpx" src="@/static/chatDri.png"></u-image>
					<view class="right">下单租车</view>
				</view>
			</view> -->
		</view>
		<phone-auth :phone="detail.phone" :status="status" v-show="open" ref="phone"></phone-auth>
		<phone-auth :id="detail.comparyid" :status="status" v-show="openShow" ref="other"></phone-auth>
	</view>
</template>

<script>
	import jobDetail from './jobDetail'
	import companyDetail from './companyDetail'
	import phoneAuth from '@/components/phoneAuth.vue'
	export default {
		components: {
			jobDetail,
			companyDetail,
			phoneAuth
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				status: 2,
				token:'',
				driverDemandId: '',
				list: [],
				listBottom: [{
					name: '职位介绍'
					}, {
				    name: '公司介绍'
					}],
				current: 0,
				swiperCurrent: 0,
				currentBottom: 0,
				swiperCurrentBottom: 0,
				detail: {},
				firstCurrent:0,
				open:false,
				openShow:false
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
			this.token = uni.getStorageSync('token');
		},
		methods: {
			favorites(item,id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 2,
					collectionstate: 2,
					iscollection: 1
				};
				item.isCollection = 1;
				item.collectionum = item.collectionum+1;
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
					collectionstate: 2,
					iscollection: 0
				};
				item.isCollection = 2;
				item.collectionum = item.collectionum-1;
			    this.$u.api.collect(params).then(res=>{
			    	if(res.code === 200){
			    		 this.$u.toast('取消收藏成功');
			    	}else {
			    		 this.$u.toast(res.msg);
			    	}
			    })
			},
			change(index) {
				this.firstCurrent = index;
			},
			getDetail(){
				this.$u.api.detailSearch({id:this.driverDemandId}).then(res=>{
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
		// height: calc(66vh - var(--window-top));
		// height: auto;
		width: 100%;
		background: rgba(0,0,0,0.02);
	}
	.wrapBottom {
		display: flex;
		flex-direction: column;
		// height: calc(70vh - var(--window-top));
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
		background: #F5F5F8;
		.title {
			font-size: 30rpx;
			font-weight: 900;
			margin-left: 40rpx;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
			float: left;
		}	
		.list {
			width: 669rpx;
			background: #fff;
			padding: 40rpx;
			margin-top: 20rpx;
			.icon{
				float: right;
				.heart{
					margin-right: 10rpx;
					margin-top: 30rpx;
				}
			}
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
			margin-top: 10rpx;
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


