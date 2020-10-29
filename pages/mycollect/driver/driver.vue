<template>
	<view :class="'driver-content'"> 
		<view class="wrap">
		<u-navbar  back-icon-size="0" title="收藏" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<u-card padding="0" :border="false" @click="toView(item.id)" v-for="item in list" :key="item.id">
<!-- 						<view class="card-head" slot="head">
			              <text>发起是你</text><text>发起是你</text>
					    </view>	 -->
						<view class="" slot="body" style="padding:10rpx 20rpx;">
							<view class="u-body-item u-flex ">
								<image :src="goodsUrl"></image>
							  <view class="u-line-4" style="padding-left: 15pt;width: 100%;">
								  <view style="text-align: right;"><u-tag text="网约车" type="info" class="tag-style" size="mini"/></view>
								<view>高薪招聘网约车司机高薪招聘网约车司...</view>
								<view style="color: #7F7F7F;"><u-icon name="tags" size="28"></u-icon>荣威\吉利\比亚迪...</view>
							  </view>
							</view>
						</view>
						<view class="bg-foot" slot="foot" style="">
							<view style="color: #FFFFFF;">
							<text style="font-size: 16pt;">¥2700</text>
							<text style="font-size: 10pt;padding-left: 10pt;">月租</text>
							</view> 
							<view style="margin-top: 5pt;">
							 <u-tag text="纯电动" type="warning" size="mini" class="tag-style"/>
							  <u-tag text="SUV" type="warning" size="mini" class="tag-style"/>
							   <u-tag text="自动挡" type="warning" size="mini" class="tag-style"/>
							</view> 
						</view>
					</u-card>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
			</swiper-item>
			<!-- 我的招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					
    
					    		
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
				list: [{
					name: '在售'
				}, {
					name: '求购'
				}],
				current: 0, 
				swiperCurrent: 0,
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
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log(this.list)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color:#f5f5f8 ;
	}
.driver-content{
	.u-tabs{
		background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
	}
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
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
background: #fff;margin: 20rpx;padding-top: 30rpx;

}
 .u-card-wrap {
 	background-color: $u-bg-color;
 	padding: 1px;
 }
 .card-head{
 	background-color: #FE9B1C;padding:5pt 8pt;color: #FFFFFF;
 }
 .u-body-item {
 	font-size: 32rpx;
 	color: #333;
 	padding: 20rpx 10rpx;
 }
 .u-body-item image {
 	width: 180rpx;
 	flex: 0 0 180rpx;
 	height: 150rpx;
 	border-radius: 8rpx;
 	margin-left: 12rpx;
 }
 .bg-foot{
	 display: flex;justify-content: space-between;
	 align-items: center;
	 padding:10rpx 20rpx;
	 background-image: url(@/static/driver-bg.png);
	 background-repeat: no-repeat;
	 background-size: cover;
 }
.tag-style{
	background-color: #FFFFFF;
	margin-right: 8pt;margin-bottom: 5pt;
}

	
</style>
