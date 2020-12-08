<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0"
		 :back-text-style="backTextStyle" title="邀请好友注册" :background="backgroundDri" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text @click="showTips">规则</text>
				</view>
			</view>
		</u-navbar>
		<view class="flex_view">
			<view>您的邀请码</view>
			<view>88888</view>
			<view style="padding-top: 30pt;">
				<u-button type="warning" shape='circle' @click="inviteFriends" style="width: 150pt;">立即邀请好友</u-button>
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
			}
		},
		methods: {
			showTips(){
				
			},
			inviteFriends(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: 'https://mp.weixinbridge.com/mp/wapredirect?url=http%3A%2F%2Fimage.neocab.cn%2F__UNI__A80C5DE_1207170912.apk',
				    title: "纽车分享",
				    // summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "http://image.neocab.cn/logo.png",
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
page {
	background-color: #F5F5F8;
}
</style>
<style lang="scss" scoped>
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
	.flex_view{
		min-height: 40vh;
		display: flex;
		justify-content: center;
		align-items:center;
		flex-direction: column;
		font-size: 12pt;
		width: 100%;
		color: #000;
	}
</style>
