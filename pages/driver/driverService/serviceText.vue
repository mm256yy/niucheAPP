<template>
	<view class="">
		<view class="">
			<!-- <u-navbar @click="returns" back-icon-color="#333333" title-size="36" :title="content.title" title-width="200rpx" :background="background"
			 title-color="#333333">
				<view class="navber" slot="right" @click="share(content.titlePhoto)">
					<u-icon name="zhuanfa" color="#333333" size="44"></u-icon>
				</view>
			</u-navbar> -->
			<view class="driver_nei">
				<view style="line-height: 140rpx;">
					<sundeheng-custom bgColor="bg-white" :isBack="true" @rightcli='rightcli'>
						<block slot="content" style="margin-top: 1140rpx;"> {{content.title}} </block>
						<block slot="right">
							<u-icon name="zhuanfa" color="#333333" size="40"></u-icon>
						</block>
					</sundeheng-custom>
				</view>
			</view>
		</view>
		<view class="">
			<view style="padding: 28rpx;">
				<image style=" width:100%;height:100%;background-size:100% 100%;" :src="content.titlePhoto"></image>
			</view>
			<view class="box_1" v-html="content.text"></view>
		</view>
	</view>
</template>

<script>
	export default {
		comments: {},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				id: '',
				value: '',
				content: '',
				index: ''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.index = option.index
			this.driverContent()
		},
		watch: {
			'config': {
				handler(newVal, oldVal) {
					this.init()
				},
				deep: true
			}
		},
		methods: {
			returns() {
				console.log("888888	")
				uni.reLaunch({
					url: '/pages/driver/driverService/driverService'
				});
			},
			share(url) { // 分享的
				console.log('分享了')
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: shareUrl + this.id,
					title: "看车租车上纽车APP",
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					imageUrl: "http://niuche-default.neocab.cn/256_256.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			driverContent() {
				if (this.index == 1) {
					this.$u.api.contentDynamic({
						uuid: this.id
					}).then(res => {
						if (res.code === 200) {
							this.content = res.object
							console.log(this.content, '111')
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else if (this.index == 2) {
					this.$u.api.contentActivities({
						uuid: this.id
					}).then(res => {
						if (res.code === 200) {
							this.content = res.object
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else if (this.index == 3) {
					this.$u.api.contentOrder({
						uuid: this.id
					}).then(res => {
						if (res.code === 200) {
							this.content = res.object
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else if (this.index == 4) {
					this.$u.api.contentShare({
						uuid: this.id
					}).then(res => {
						if (res.code === 200) {
							this.content = res.object
						} else {
							this.$u.toast(res.msg);
						}
					})
				}
			},
			inviteFriends() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: shareUrl + this.id,
					title: "看车租车上纽车APP",
					summary: "限时推广拉新，享更多福利，点击即可领取！",
					imageUrl: "http://niuche-default.neocab.cn/256_256.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.navber {
		margin-right: 34rpx;
	}

	.ceshi {
		font-size: 40rpx;
	}

	.driver_nei {
		margin-top: 30rpx;
		font-size: 40rpx;
		height: 88rpx;
	}

	// .driver_nei >>> .cu-bar {
	// 	background-color: #000000;
	// }
	.box_1 {
		font-size: 32rpx;
		padding: 0rpx 22rpx 0rpx 30rpx;
	}
</style>
