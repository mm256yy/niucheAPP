<template>
	<view :class="'company-content'"> 
		<view class="wrap">
		<u-navbar back-text="返回"  back-icon-size="0" :back-text-style="backTextStyle" title="我的拼单记录" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<u-card padding="0" @click="toView(item.id)" v-for="item in list" :key="item.id">
						<view class="card-head" slot="head">
                          <text>发起{{item.launchTime}}</text><text>{{item.state}}</text>
					    </view>	
						<view class="" slot="body" style="padding:10rpx 30rpx;">
							<view class="u-body-item u-flex ">
							  <image :src="item.logosrc"></image>
							  <view class="u-line-3" style="padding-left: 15pt;">
								<view>{{item.carModel}}{{item.power}}</view>
								<view>{{item.price}}</view>
							  </view>
							</view>
						</view>
						<view class="" slot="foot" style="padding: 20rpx;text-align: right;">
							<u-tag :text="item.companyName" type="info" class="tag-style" size="mini"/>
						</view>
					</u-card>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{'color':'#ffffff'},
				goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
				list:[],
			}
		},
		methods: {
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
	height: 100%;
	background-color: #f7f7f7;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
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
	background: #fff;margin: 20rpx;padding-top: 30rpx;
}
.u-card-wrap { 
	background-color: $u-bg-color;
	padding: 1px;
}
.card-head{
	display: flex;justify-content: space-between;background-color: #FE9B1C;padding:5pt 8pt;color: #FFFFFF;
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



	
</style>
