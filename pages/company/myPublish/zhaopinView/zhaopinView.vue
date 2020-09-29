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
						<u-tag text="雪月夜" type="info" size="mini" style="margin-right: 5pt;margin-top: 5pt;" v-for="it in 10" :key="it"/>
					</u-col>
				</u-row>
		 	</view>
			<view>
                 <v-tabs v-model="current" :scroll="false" bgColor="#40B36C" lineHeight='0rpx' color="#ffffff" :pills="true" pillsColor="#ffffff" pillsBorderRadius="0rpx" activeColor="#000000" :tabs="['12个月', '6个月', '3个月','1个月']"></v-tabs>
			     <view class="" style="padding-top: 10pt;" v-show="current === 0">

				 </view>
				 <view class="" v-show="current === 1">
				 	<view v-for="index in 10" :key="index">
				 		index
				 	</view>
				 </view>
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
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
			},
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


