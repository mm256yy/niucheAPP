<template>
	<view class="">
		<u-navbar back-icon-color="#333333" title-size="36" :title="title"  :background="background" title-color="#333333">
			<view class="navber" slot="right" @click="share()">
				<u-icon name="zhuanfa" color="#333333" size="44"></u-icon>
			</view>
		</u-navbar>
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
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				id: '',
				value: '',
				title:'2',
				content: {
				},
				index: ''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.index = option.index
		},
		onShow() {
			this.driverContent()
		},
		methods: {
			share() { // 分享的
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
							this.title = res.object.title;
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
							this.title = res.object.title;
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
							this.title = res.object.title;
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
							this.title = res.object.title;
						} else {
							this.$u.toast(res.msg);
						}
					})
				}
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
