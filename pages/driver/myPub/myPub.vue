<template>
	<view :class="'driver-content'"> 
		<view class="wrap">
		<u-navbar  back-icon-size="0" title="" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<u-card title="1111" :padding="0" :foot-border-top="false" @click="toView(item.id)" v-for="item in list" :key="item.id">
						<view class="card-head" slot="head">
							<text style="color:#7E7E7E;">刷新时间:刚刚</text><u-icon name="reload" color="#FE9B1C" size="28"></u-icon>
						</view>
						<view class="card-head"  slot="body" style="border-bottom: 0;">
                           <text>意向品牌</text>
							<u-switch v-model="checked" active-color="#FE9B1C"></u-switch>
						</view>
						<view  slot="foot" style="padding:5rpx 20rpx;">
						<u-tag text="吉利" type="info" style="color: #000000;" mode="plain" shape="circle" class="tag-style"/>
						</view>
					</u-card>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
			</swiper-item>
			<!-- 我的招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<u-card title="1111" :padding="0" :foot-border-top="false" @click="toView(item.id)" v-for="item in list" :key="item.id">
						<view class="card-head" slot="head">
							<text style="color:#7E7E7E;">刷新时间:刚刚</text><u-icon name="reload" color="#FE9B1C" size="28"></u-icon>
						</view>
						<view class="card-head"  slot="body" style="border-bottom: 0;">
							<view style="color: #000000;">
								  <view style="font-size: 16pt;">意向品牌</view>
								  <view>工作车辆: 荣威\吉利\比亚迪...  </view>
							</view>
					        <view>
								<u-switch v-model="checked" active-color="#FE9B1C"></u-switch>
								<view style="font-size: 14pt;color:#FE9B1C ;">¥2700月薪</view>
							</view>
						</view>
					</u-card>
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
				list: [{
					name: '我的租车'
				}, {
					name: '我的求职'
				}],
				current: 0, 
				swiperCurrent: 0,
				checked:true
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
 	display: flex;justify-content: space-between;
 	align-items: center;
	border-bottom: 1px solid #E5E5E5;
	padding:20rpx 20rpx;
 }
.tag-style{
	background-color: #FFFFFF;
	margin-right: 8pt;margin-bottom: 5pt;
}

	
</style>
