<template>
	<view class="detail">
		<!-- <u-navbar z-index="4000" back-text="返回" back-icon-size="0" :title="detail.carmodeltag" :background="background" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon>
				</view>
			</view>
		 </u-navbar> -->
		 <view style="font-weight: 900;text-align: center;" class="top">
			 <view style="margin-bottom: -60rpx;font-size: 36rpx;color: #fff;position: absolute;top: 0;width: 750rpx;text-align: center;" class="room">{{detail.carmodeltag}}
			 </view>
			 <view style="font-size: 28rpx;width: 100rpx;position: fixed;top: 0;left: 0;color: #fff;" class="room" @click="back()">返回</view>
			 <u-icon style="position: fixed;top: 80rpx;right: 20rpx;" class="room" @click="share()" name="zhuanfa" color="#ffffff" size="40"></u-icon>
		 </view>
		 <kxj-previewImage ref="previewImage" :saveBtn="false" :rotateBtn="false" :imgs="detail.photourl"></kxj-previewImage>
		 <view class="wraps img">
			 <swiper class="u-swiper-indicator" style="width: 100%;height: 582rpx;" circular="true" autoplay="true" indicator-dots="true">
			 <swiper-item style="width: 100%;height: 582rpx;" v-for="(swiper, index) in detail.photourl" :key="index">
			 <image style="width: 100%;height: 582rpx;" :src="swiper" @click="preview(index)"></image>
			 </swiper-item>
			 </swiper>
			 <view v-show="viewFlag&&detail.collectunit == 2" class="success">审核成功</view>
			 <view v-show="viewFlag&&detail.collectunit == 1" class="auditing">审核中</view>
			 <view v-show="viewFlag&&detail.collectunit == 3" class="refuse">审核驳回 原因：{{detail.autidchecktext}}</view>
		 	<!-- <u-swiper height="582" bg-color="#CDE5E3" :list="detail.photourl"></u-swiper> -->
		 </view>
		 <view style="position: absolute;top: 556rpx;left: 0;margin-bottom: 140rpx;background: #f5f5f5;border-radius: 36rpx 36rpx 0px 0px;">
		 	<view class="">
		 		<view style="padding: 30rpx 40rpx;background: #fff;border-radius: 36rpx 36rpx 0px 0px;width: 100%;">
		 			<!-- <view class="tag">付费标签</view> -->
		 			<view class="name">{{detail.titletext}}</view>
		 			<view class="clear"></view>
		 			<view v-for="(item, index) in detail.pricesectionlist" :key="item.id" class="" v-show="firstCurrent === index">
		 				<view class="price"><text>{{item.packprice}}万</text>/起售</view>
		 				<view>
		 					<view v-show="detail.businesstype==1" class="type">网约车</view>
							<view v-show="detail.businesstype==2" class="type">出租车</view>
		 				</view>
		 				<view class="startNum">{{item.lowprice}}辆起售</view>
		 				<view class="clear"></view>
		 			</view>
		 			<view>
		 				<view style="margin-top: 20rpx;">
		 					<text style="width: 156rpx;height: 60rpx;line-height: 60rpx;text-align: center;
		 					border-radius: 8rpx;display: inline-block;margin-right: 12rpx;" :class="{active:index===firstCurrent,inactive:index!=firstCurrent}" v-for="(item,index) in tab" :key="index" @click="change(index)">{{item}}</text>
		 				</view>
		 			</view>
		 			<view class="clear"></view>
		 			<view class="box">
		 				<view>{{detail.systemtag}}</view>
		 			</view>
		 			<view style="font-size: 28rpx;color: #4aba75;float: left;margin-top: 23rpx;margin-left: 20rpx;">在售{{detail.carnbumber}}辆/杭州</view>
		 			<view class="clear"></view>
		 	 	</view>
		 	</view>
		 	<view style="background: #fff;padding: 36rpx 30rpx;margin-top: 20rpx;">
		 		<view style="float: left;font-size: 36rpx;font-weight: 900;color: #333;">车辆基本信息</view>
		 		<u-image @click="setting" style="float: right;margin-left: 10rpx;margin-top: 5rpx;" width="20rpx" height="26rpx" src="@/static/more.png"></u-image>
		 		<view @click="setting(detail.carModelId)" style="float: right;font-size: 26rpx;color: #999;">参数配置</view>
		 		<view class="clear"></view>
		 		<view>
		 			<view style="width: 686rpx;height: 120rpx;line-height: 120rpx;font-size: 28rpx;color: #666;border-bottom: 2rpx solid #dedede;">
		 				<view style="float: left;">综合上牌时间</view>
		 				<view v-show="detail.registrationtimeend" style="float: right;color: #353B3D;">{{detail.registrationtime}}{{detail.registrationtime&&detail.registrationtimeend?'至':''}}{{detail.registrationtimeend}}</view>
						<view v-show="!detail.registrationtimeend" style="float: right;color: #353B3D;">{{detail.registrationtime}}</view>
						<view v-show="!detail.registrationtime&&!detail.registrationtimeend" style="float: right;color: #353B3D;">暂无数据</view>
		 				<view class="clear"></view>
		 			</view>
		 			<view style="width: 686rpx;height: 120rpx;line-height: 120rpx;font-size: 28rpx;color: #666;border-bottom: 2rpx solid #dedede;">
		 				<view style="float: left;">综合行驶里程</view>
		 				<view v-show="detail.endkm" style="float: right;color: #353B3D;">{{detail.firstkm}}{{detail.firstkm&&detail.endkm?'-':''}}{{detail.endkm}}万公里</view>
		 				<view v-show="!detail.endkm" style="float: right;color: #353B3D;">{{detail.firstkm}}万公里</view>
						<view v-show="!detail.firstkm&&!detail.endkm" style="float: right;color: #353B3D;">暂无数据</view>
		 				<view class="clear"></view>
		 			</view>
		 		</view>
		 		<view style="width: 684rpx;background: #ddffea;border-radius: 4rpx;padding: 16rpx;margin-top: 32rpx;">
		 			<view style="margin-top: 10rpx;margin-left: 248rpx;font-size: 32rpx;color: #4aba75;">-车况描述-</view>
		 			<view v-show="detail.cardescribe" style="width: 652rpx;border-radius: 4rpx;background: #fff;padding: 28rpx;font-size: 28rpx;color: #555;margin-top: 28rpx;">{{detail.cardescribe}}</view>
					<view v-show="!detail.cardescribe" style="width: 652rpx;border-radius: 4rpx;background: #fff;padding: 28rpx;font-size: 28rpx;color: #555;margin-top: 28rpx;">未描述</view>
		 		</view>
		 		<view style="width: 684rpx;background: #ddffea;border-radius: 4rpx;padding: 16rpx;margin-top: 38rpx;">
		 			<view style="margin-top: 10rpx;margin-left: 248rpx;font-size: 32rpx;color: #4aba75;">-购车流程-</view>
		 			<view style="width: 652rpx;border-radius: 4rpx;background: #fff;font-size: 26rpx;color: #333;margin-top: 28rpx;height: 274rpx;padding: 68rpx 32rpx;">
		 				<view style="display: flex;justify-content: space-between;align-items: center;">
		 					<u-image width="92rpx" height="92rpx" src="@/static/selectOnline.png"></u-image>
		 					<u-image width="32rpx" height="28rpx" src="@/static/step.png"></u-image>
		 					<u-image width="92rpx" height="92rpx" src="@/static/chatOnline.png"></u-image>
		 					<u-image width="32rpx" height="28rpx" src="@/static/step.png"></u-image>
		 					<u-image width="92rpx" height="92rpx" src="@/static/viewOffline.png"></u-image>
		 					<u-image width="32rpx" height="28rpx" src="@/static/step.png"></u-image>
		 					<u-image width="92rpx" height="92rpx" src="@/static/signOffline.png"></u-image>
		 				</view>
		 				<view style="display: flex;justify-content: space-between;">
		 					<view style="margin-top: 18rpx;">线上选车</view>
		 					<view style="margin-top: 18rpx;">线上约谈</view>
		 					<view style="margin-top: 18rpx;">线下看车</view>
		 					<view style="margin-top: 18rpx;">线下签约</view>
		 				</view>
		 			</view>
		 		</view>
		 	</view>
		 </view>
		<view style="width: 100%;height:140rpx"></view>
		<view class="phone" style="width: 100%;height: 140rpx;display: flex;justify-content: space-around;align-items: center;background: #fff;" v-show="!viewFlag&&show">
			<!-- <view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<u-image width="42rpx" height="42rpx" src="@/static/service.png"></u-image>
				<view style="margin-top: 8rpx;">客服</view>
			</view> -->
			<view @click="other()" style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<u-image width="42rpx" height="42rpx" src="@/static/shop.png"></u-image>
				<view style="margin-top: 8rpx;">店铺</view>
			</view>
			<view v-if="!viewFlag&&token&&show" style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<u-image v-show="detail.iscollection === 2" @click="favorites(detail,detail.comparymainid)" width="42rpx" height="42rpx" src="@/static/favorite.png"></u-image>
				<u-image v-show="detail.iscollection === 1" @click="cancel(detail,detail.comparymainid)" width="42rpx" height="42rpx" src="@/static/favorited.png"></u-image>
				<view style="margin-top: 8rpx;">收藏</view>
			</view>
			<view style="width: 412rpx;height: 100rpx;background: linear-gradient(270deg, #63D093 0%, #58C786 50%, #3DAF6A 100%);border-radius: 16rpx;line-height: 100rpx;font-size: 36rpx;color: #fff;text-align: center;" @click="dial()">在线沟通</view>
		</view>
		<PubBottom v-if="viewFlag" :isopen="detail.isopen" :editId="driverDemandId" :ids="detail.comparymainid" :type="3"></PubBottom>
		<phone-auth :phone="detail.phone" :adverseUsermainId="detail.adverseUsermainId" :status="status" v-show="!viewFlag&&show&&open" ref="phone"></phone-auth>
		<phone-auth :ids="detail.comparyid" :title="detail.titletext" :status="status" v-show="!viewFlag&&show&&openShow" ref="other"></phone-auth>
		<ShareWX ref="shareWx" :href="shareObj.href" :title="shareObj.title" :summary="shareObj.summary" :imageUrl ="shareObj.imageUrl"></ShareWX>
	</view>
</template>

<script>
	import rangePrice from './rangePrice'
	import rentcarIssue from './rentcarIssue'
	import carInstall from './carInstall'
	import PubBottom from '@/components/pubBottom.vue'
	import phoneAuth from '@/components/phoneAuth.vue'
	import kxjPreviewImage from '@/components/kxj-previewImage/kxj-previewImage.vue'
	import {
		shareViewUrl
	} from '@/utils/constant.js'
	import ShareWX from '@/components/shareWx/shareWx.vue'
	export default {
		components: {
		    rangePrice,
			rentcarIssue,
			carInstall,
			PubBottom,
			phoneAuth,
			kxjPreviewImage,
			ShareWX
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				status: 2,
				token:'',
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
				viewFlag:false,//发布页详情true,列表页详情false
				show:true,
				open:false,
				openShow:false,
				firstCurrent:0,
				businesstype:'',
				shareId: '',
				shareObj:{
					href:'',
					title:'',
					summary:'',
					imageUrl:''
				},
				shareUrl:shareViewUrl,
				type:true,
				background: {
					'background-image': 'background: linear-gradient(270deg,rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%);'
				},
				kmOption:[{text: '小于2万公里',value: '2'},{text: '大于2小于等于5万公里',value: '5'},{text: '大于5小于等于10万公里',value: '10'},
						{text: '大于10小于等于20',value: '20'},{name: '大于20小于等于30万公里',value: '30'},{text: '大于30小于等于50万公里',value: '50'},
						{text: '大于50小于等于70万公里',value: '70'},{text: '大于70万公里',value: '>70'}],
			}
		},
		onLoad(option) {
			let shareId = option.id;
			if (shareId) {
				this.shareId = shareId;
				this.shareObj.href = this.shareUrl + shareId + '&type=' + this.type;
			}
			let id = option.id;
			let flag = option.flag;
			if(id){
			 this.driverDemandId = id;
			}
			if(flag){
				this.viewFlag =true
			}
			if(option.show){
				this.show = false
			}
		},
		mounted() {
			this.getDetail()
			this.token = uni.getStorageSync('token');
		},
		methods: {
			share() {
				this.$refs.shareWx.shareShow()
			},
			back(){
				uni.navigateBack()
			},
			preview(e){
				this.$refs.previewImage.open(e)
			},
			setting(id) {
				this.$u.route("/pages/mymessage/company/components/index/setting",{id:id})
			},
			change(index) {
				this.firstCurrent = index;
			},
			favorites(item,id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 2,
					collectionstate: 3,
					iscollection: 1
				};
				item.iscollection = 1;
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
					collectionstate: 3,
					iscollection: 0
				};
				item.iscollection = 2;
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
					this.$u.api.detailSellCar({id: this.driverDemandId}).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
							 if(this.detail.businesstype == 1){
								 this.businesstype="网约车"
							 }
							 if(this.detail.businesstype == 2){
							 	this.businesstype="出租车"
							 }
							 this.shareObj.title = this.detail.titletext;
							 this.shareObj.summary = '￥' + this.detail.packprice + '/起售|' + this.businesstype;
							 this.shareObj.imageUrl = this.detail.photourl[0];
							 this.kmOption.forEach(item=>{
							    if(item.value == this.detail.carkm){
							    	this.detail.carkm = item.text;
							    }
							 })
							 if(this.detail.systemtag){
								 this.detail.systemtag.splice(1,2)
								 this.detail.systemtag = this.detail.systemtag.join('/')
							 }
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
				this.openShow = true;
				this.open = false;
				this.status = 3;
				this.$refs.other.getStatus()
			},
			jumpOther(){
				this.$u.route('/pages/mymessage/company/components/index/other',{
					id:this.detail.comparyid,
					title:this.detail.titletext
					});
			},
			jumpPhone(){
				if(this.detail.phone){
					uni.makePhoneCall({ phoneNumber: this.detail.phone });
				}else{
					this.$u.toast('未获取到手机号');
				}
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
	.wraps /deep/ .uni-swiper-dots-horizontal {
	  bottom: 60rpx !important;
	 }
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.success{
		width: 162rpx;
		height: 54rpx;
		text-align: right;
		line-height: 54rpx;
		padding-right: 10rpx;
		position: absolute;
		top: 200rpx;
		left: 28rpx;
		background-image: url(@/static/success.png);
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 26rpx;
		color: #fff;
	}
	.auditing{
		width: 162rpx;
		height: 54rpx;
		text-align: right;
		line-height: 54rpx;
		padding-right: 20rpx;
		position: absolute;
		top: 200rpx;
		left: 28rpx;
		background-image: url(@/static/auditing.png);
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 26rpx;
		color: #fff;
	}
	.refuse{
		width: 452rpx;
		height: 54rpx;
		line-height: 54rpx;
		position: absolute;
		top: 200rpx;
		left: 28rpx;
		background-image: url(@/static/refuse.png);
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 26rpx;
		color: #fff;
		padding-left: 50rpx;
	}
	.detail {
		background-color: #F5F5F8;
		.top{
			width: 100%;
			height: 200rpx;
			line-height: 200rpx;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 20;
			background-image: url(@/static/detailBg.png);
			background-repeat: no-repeat;
			background-size: cover;
		}
		// .room{
		// 	margin-top: calc(var(--status-bar-height) + 20rpx);
		// }
		.wraps{
			width: 100%;
			height: 494rpx;
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
			font-size: 42rpx;
			font-weight: 900;
			color: #111;
			margin-bottom: 20rpx;
		}
		.price {
			font-size: 28rpx;
			font-weight: 900;
			color: #FE5B00;
			float: left;
		}
		.price text {
			font-size: 42rpx;
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
			font-size: 28rpx;
			color: #797979;
			margin-top: 22rpx;
			float: left;
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
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 20;
			border-top: 1rpx solid #dedede;
		}
		.bgType{
			position: absolute;
			top: 0;
			left: 296rpx;
		}
		.type{
			width: 116rpx;
			height: 48rpx;
			line-height: 48rpx;
			text-align: center;
			background-image: url(@/static/type.png);
			background-repeat: no-repeat;
			background-size: cover;
			// background-position: 50% 50%;
			font-size: 28rpx;
			font-weight: 500;
			color: #FFFFFF;
			float: left;
			margin-left: 20rpx;
		}
		.startNum{
			width: 150rpx;
			height: 48rpx;
			line-height: 48rpx;
			text-align: center;
			background: #F2F2F2;
			border-radius: 8rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #646364;
			float: left;
			margin-left: 38rpx;
		}
		.inactive{
			border: 1rpx solid #D9DEDF;
			font-size: 26rpx;
			color: #999;
		}	
		.active{
			background-image: url(@/static/bgTab.png);
			background-repeat: no-repeat;
			height: 100%;
			background-size: cover;
			background-position: 50% 50%;
			font-size: 26rpx;
			color: #4ABA75;
		}
	}
</style>



