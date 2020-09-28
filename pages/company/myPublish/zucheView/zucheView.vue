<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="预览" :background="{}" :back-text-style="backTextStyle" height='98' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon>
				</view>
			</view>
		 </u-navbar>
		 <view class="" style="padding: 10pt;">
			<view>
				<image :src="goodsUrl" style="width: 100%;" mode="aspectFill"></image>
			</view>
			<view class="">	
				<u-row gutter="16">
					<u-col span="12">
						<view>艾瑞泽52020款 1.5L CVT运动版</view>
					</u-col>
					<u-col span="10">
						<text>¥2700</text><text>元/月起租</text>
					</u-col>
					<u-col span="2">
						<u-icon name="heart-fill" color="#3FB26C" size="36"></u-icon>636
					</u-col>
					<u-col :span="12">
						<u-tag text="雪月夜" type="info" size="mini" v-for="it in 10" style="margin-right: 5pt;margin-top: 5pt;" :key="it"/>
					</u-col>
				</u-row>
		 	 </view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
			}
		},
		methods: {
			shared(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
		}
	}
</script>
<style lang="scss">
page{
	background-image: url(@/static/lease.png);
	background-repeat: no-repeat;
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
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
</style>


