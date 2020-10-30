<template>
	<view :class="'company-content'"> 
		<view class="wrap">
		<u-navbar  back-icon-size="0" title="收藏" :background="backgroundCom" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<view class="scroll-item" @click="toView()" v-for="itm in 5" :key='itm'>
						<view class="time">
							<view class="padding15">上海</view>
						</view>
						<view class="img" @click="toView()">
							<view><image :src="goodsUrl" mode="aspectFill"></image></view>
						</view>
						<view class="border-left" @click="toView()">
							<view class="title u-line-2">艾瑞泽52020款 1.5L CVT运动版CVT运动版</view>
							<view class="type"><text>打包价</text><text class="type-money">￥2700</text></view>
							<view><text>纯电动</text><text>Suv</text><text>自动挡</text></view>
						</view>
						<view class="bottom">
							<text class="bottom-left" >车龄≤3个月</text>
							<text class="bottom-right">车龄≤3个月</text>
							<u-icon name="heart-fill" color="#3FB26C" size="36"></u-icon>
						</view>
					</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
			<!-- 我的招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<view class="scroll-item" @click="toView()" v-for="item in 7" :key='item'>
						<view class="zplist">
							<view style="padding: 5pt 0;">
								<text class="zplist-time">刷新时间：刚刚</text>
								<u-icon name="heart-fill" color="#36AB62" size="40"></u-icon>
							</view>
							<view class="zplist-carName">
								<view class="zplist-qg">求购：30辆 荣威\吉利帝豪\比亚迪...</view>
								<view class="">
									<text>金华诚信租车行     金华</text>
								</view>
								<view>
									<text>打包价：</text><text class="zplist-price">3万以内/3-5万</text>
								</view>
							</view>
						</view>
    
					    		
					</view>
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
	// background-image: url(@/static/lease.png);
	background-repeat: no-repeat;
	height: 100%;
	background-size: cover;
	// background-position: 50% 50%;
}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
</style>
<style lang="scss" scoped>
	.company-content{
		.u-tabs{
			background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
		}
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
	background: #fff;margin: 20rpx;padding-top: 10rpx;
	border-radius: 40rpx;
	box-shadow: 0px 0px 18px 0px rgba(69, 183, 114, 0.24);
    .time{
		font-weight: bold;
		text-align: right;
	}
	.padding15{
		padding-right: 15pt;
	}
	.img{
		display: inline-block;width:40% 
	}
	image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	.border-left{
		border-left: 1px solid #7F7F7F;
		padding-left: 30rpx;
		display: inline-block;width:55% ;
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
		padding: 5px;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}
	.bottom-left{
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		width: 35%;
		display: inline-block;
		
	}
	.bottom-right{
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
		width: 50%;
		display: inline-block;
	}
	.zplist{
		padding: 8pt 10pt;
	}
	.zplist-time{
		width: 90%;display: inline-block;
	}
	.zplist-carName{
		border-top: 1px solid #E5E5E5;padding-top: 8pt;
	}
	.zplist-qg{
		font-size: 14pt;font-weight: bold;
	}
	.zplist-price{
		color: #3FB26C;font-size: 18pt;
	}
}



	
</style>
