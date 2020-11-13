<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="租车详情" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon>
				</view>
			</view>
		</u-navbar>
		 <view class="" style="padding: 40rpx;">
			<u-image class="img" width="669rpx" height="503rpx" :src="detail.photourl"></u-image>
			<view>
				<!-- <view class="tag">付费标签</view> -->
				<view class="name">{{detail.titletext}}</view>
				<view class="price"><text>￥{{detail.packprice}}</text>元/月起租</view>
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
			 	swiperWidth="750" active-color="#40B36C"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 			<range-price :tab="tab" :detail="detail" ref="child"></range-price>
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
			<view class="more" @click="other()">上拉加载该公司其他信息</view>
			<PubBottom :isopen="detail.isopen" :id="driverDemandId" :type="type"></PubBottom>
		</view>
	</view>
</template>

<script>
	import rangePrice from './rangePrice'
	import rentcarIssue from './rentcarIssue'
	import settingParameter from './settingParameter'
	import PubBottom from '@/components/pubBottom.vue'
	export default {
		components: {
		    rangePrice,
			rentcarIssue,
			settingParameter,
			PubBottom
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
				arr: [],
				type:1
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
				this.$u.api.ComparyMySellCarForOne({cartagid:this.driverDemandId,IsRentAndSell:1}).then(res=>{
					if(res.code === 200){
						let data =res.object;
						 this.detail = data;
						 const systemtag =data.systemtag;
						 const usertag =data.usertag;
						 this.arr =systemtag.concat(usertag);
						 var text = [];
						 if(data.pricesectionlist) {
							 let list =  data.pricesectionlist;
						    list.forEach(item=>{
								console.log(item)
									text.push(item.rentCarTime)		
								
						   })
						   this.tab = text
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
				this.$u.route('/pages/index/driver/components/index/other',{id:this.detail.comparyid});
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
		}
		.price text {
			font-size: 40rpx;
			font-weight: 900;
			color: #40B36C;
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
				   padding: 55rpx 80rpx;
				   // background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
				   font-size: 36rpx;
				   font-weight: 900;
				   color: #fff;
				   display: flex;
				   justify-content: space-around;
				   align-items: center;
				  //  .icon-box {
					 // width: 96rpx;
					 // height: 96rpx;
					 // border-radius: 50%;
					 // background: #fff;
				  //  }
		}
	}
</style>


