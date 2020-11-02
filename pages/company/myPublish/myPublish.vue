<template>
	<view class="wrap">
		<view style="padding-top: 38pt;">
			<u-tabs-swiper ref="uTabs" :list="list" activeColor="#ffffff" inactive-color="#e5e5e5" bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<view class="scroll-item" @click="toView()" v-for="item in 10">
						<u-row>
							<u-col span="12" class="time">
								<view style="padding-right: 10pt;">2020/09/2</view>
							</u-col>
							<u-col span="5" @click="toView()">
								<view><image :src="goodsUrl" mode="aspectFill"></image></view>
							</u-col>
							<u-col span="6" class="border-left" @click="toView()">
								<view class="title u-line-2">艾瑞泽52020款 1.5L CVT运动版CVT运动版</view>
								<view class="type"><text class="type-money">￥2700</text>元/月起租</view>
							</u-col>
							<u-col span="12" class="bottom">
								<text class="bottom-left">车龄≤3个月</text>
								<text class="bottom-right">车龄≤3个月</text>
							</u-col>
						</u-row>
					</view>
					
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						<!-- </view> -->
				</scroll-view>
			</swiper-item>
			<!-- 我的招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<view class="scroll-item" @click="toView()">
						<u-row class="" style="padding: 8pt 15pt;">
							<u-col span="11" style="padding: 5pt 0;">
								<view>2020/09/2</view>
							</u-col>
							<u-col span="1" style="padding: 5pt 0;">
								<u-icon name="reload" color="#36AB62" size="40"></u-icon>
							</u-col>
							<u-col span="12" @click="toView()" style="border-top: 1px solid #E5E5E5;padding-top: 8pt;">
								<view style="font-size: 14pt;font-weight: bold;">高薪招聘网约车司机高薪招聘网约车司机</view>
								<view>
									<text style="">月薪：</text><text style="color: #3FB26C;font-size: 18pt;">¥8000-10000</text>
								</view>
							</u-col>
						</u-row>
						<view class="bottom">
							<u-icon name="reload" style="padding-left: 15pt;"></u-icon><text class="bottom-left">车龄≤3个月</text>
						</view>
					    		
					</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
			<!-- 我的卖车 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<view class="scroll-item" @click="toView()">
						<u-row>
							<u-col span="12" class="time">
								<view style="padding-right: 10pt;">2020/09/2</view>
							</u-col>
							<u-col span="5" @click="toView()">
								<view><image :src="goodsUrl" mode="aspectFill"></image></view>
							</u-col>
							<u-col span="6" class="border-left" @click="toView()">
								<view class="title u-line-2">艾瑞泽52020款 1.5L CVT运动版CVT运动版</view>
								<view class="type"><text class="type-money">￥2700</text>元/月起租</view>
							</u-col>
							<u-col span="12" class="bottom">
								<text class="bottom-left">车龄≤3个月</text>
								<text class="bottom-right">车龄≤3个月</text>
							</u-col>
						</u-row>
					</view>
					
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						<!-- </view> -->
				</scroll-view>
			</swiper-item>
			<!-- 我的求购 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<view class="scroll-item" @click="toView()">
						<u-row class="" style="padding: 8pt 15pt;">
							<u-col span="11" style="padding: 5pt 0;">
								<view>2020/09/2</view>
							</u-col>
							<u-col span="1" style="padding: 5pt 0;">
								<u-icon name="reload" color="#36AB62" size="40"></u-icon>
							</u-col>
							<u-col span="12" @click="toView()" style="border-top: 1px solid #E5E5E5;padding: 8.5pt 0 10pt;">
								<view style="font-size: 14pt;font-weight: bold;">求购：30辆 荣威\吉利帝豪\比亚迪...</view>
								<view class="" style="padding-top: 8pt;">
									<text style="">打包价：</text><text style="color: #3FB26C;font-size: 18pt;">3万以内\3万-5万</text>
								</view>
							</u-col>
						</u-row>
					</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
				list: [{
					name: '我的租车'
				}, {
					name: '我的招聘'
				}, {
					name: '我的卖车'
				},{
					name: '我的求购'
				}],
				current: 0, 
				swiperCurrent: 0,
			}
		},
		onLoad(option) {
			let index  = Number(option.index)
			if(index){
			 this.current = index;
			 this.swiperCurrent = index;	
			}
		},
		methods: {
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
			toView(){
				console.log(11111111111111)
				this.$u.route("/pages/company/myPublish/zucheView/zucheView")
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-image: url(../../../static/lease.png);
	background-repeat: no-repeat;
	height: 100%;
	background-size: cover;
}
</style>
<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.scroll-item{
	background: #fff;margin: 20rpx;padding-top: 10rpx;
	border-radius: 40rpx;
	box-shadow: 0px 0px 18px 0px rgba(69, 183, 114, 0.24);
    .time{
		font-weight: bold;
		text-align: right!important;
	}
	image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	.border-left{
		border-left: 1px solid #7F7F7F;
		padding-left: 30rpx!important;
	}
	.title{
		font-weight: bold;
		font-size: 12pt;
	}
	.type{
		padding-top: 10rpx;
	}
	.type-money{
		color: #40B36C;
	}
	.bottom{
		background-color: #CDE5E3;
		padding: 5px!important;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}
	.bottom-left{
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		
	}
	.bottom-right{
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
	}
}



	
</style>
