<template>
	<view>
		<u-popup v-model="showShare" mode="bottom">
			<u-row justify="around" style="padding: 30rpx 0;">
				<u-col span="4" style="text-align: center;" @click="shared('WXSenceTimeline')">
					<view><u-icon :name="pengyouquan" size="60"></u-icon></view>
					<view>朋友圈</view>
				</u-col>
				<u-col span="4" style="text-align: center;" @click="shared('WXSceneSession')">
					<view><u-icon :name="weixin" size="60"></u-icon></view>
					<view>微信好友</view>
				</u-col>
				<u-col span="4" style="text-align: center;" @click="copyd">
					<view><u-icon :name="fuzhi" size="60"></u-icon></view>
					<view>复制链接</view>
				</u-col>
			</u-row>
			<!-- <view style="text-align: center;padding: 10rpx 0;">取消</view> -->
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pengyouquan:'../../static/pengyouquan.png',
				weixin:'../../static/weixin.png',
				fuzhi:'../../static/fuzhi.png',
				showShare:true
			}
		},
		props: {
		  href: {
		    type: String,
		    required: true,
		  }
		},
		methods: {
			shared(scene){
				let href = this.href;
				uni.share({
				    provider: "weixin",
				    scene: scene,
				    type: 0,
				    href: href,
				    title: "纽车分享",
				    // summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			copyd(){
				uni.setClipboardData({
				    data: 'hello',
				    success: function () {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style>

</style>
