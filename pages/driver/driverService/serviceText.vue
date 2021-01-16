<template>
	<view class="">
		<u-navbar back-icon-color="#333333" title-size="36" :title="title"  :background="background" title-color="#333333">
			<view class="navber" slot="right" @click="share(content.titlePhoto)">
				<u-icon name="zhuanfa" color="#333333" size="44"></u-icon>		
			</view>
		</u-navbar>
		<view class="">
			<view class="box_1" v-html="content.text"></view>
		</view>
		<view class="">
			<ShareWX ref="shareWx" :href="shareObj.href" :title="shareObj.title" :summary="shareObj.summary" :imageUrl ="shareObj.imageUrl"></ShareWX>
		</view>
		
	</view>
</template>

<script>
	import {shareUrl} from '@/utils/constant.js'
	import ShareWX from '@/components/shareWx/shareWx.vue'
	import {shareArticleUrl} from "@/utils/constant.js"
	export default {
		components:{
			ShareWX
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				id: '',
				title:'2',
				content: {
				},
				shareObj:{
					href:'',
					title:'赚租金上纽车APP',
					summary:'注册认证就送100元，成为纽车推广人，赚租金，上不封顶！',
					imageUrl:'http://niuche-default.neocab.cn/256_256.png'
				},
				shareUrl:shareUrl,
				value: false
			}
		},
		onLoad(option) {
			this.index = option.index
			let shareId = option.ids;
			if (shareId) {
				this.id = shareId;
				this.shareObj.href = this.shareUrl + shareId;
			}
		},
		onShow() {
			this.driverContent()
		},
		methods: {
			share(url) { // 分享的
				console.log('分享了')
				 this.$refs.shareWx.shareShow()
				 this.shareObj.title = this.title
				 this.shareObj.imageUrl = url
			},
			// inviteFriends() {
			// 	this.$refs.shareWx.shareShow()
			// },
			initId() {
				this.$u.api.listUserMessage().then(res => {
					if (res.code === 200) {
						let data = res.object;
						if (data.shareId) {
							this.shareId = data.shareId;
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			driverContent() {
				if (this.index == 1) {
					this.$u.api.contentDynamic({
						uuid: this.id
					}).then(res => {
						if (res.code === 200) {
							this.content = res.object
							this.title = res.object.title;
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
	.box_1 {
		font-size: 32rpx;
		padding: 20rpx 28rpx;
	}
	.box_1 /deep/ img {
		display: block;
		max-width: 100%;
		border-radius: 12rpx;
		margin: 20rpx 0;
	}
</style>
