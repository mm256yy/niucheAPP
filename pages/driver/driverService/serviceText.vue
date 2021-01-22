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
	import ShareWX from '@/components/shareWx/shareWx.vue' // 引入组件
	import {shareArticleUrl} from "@/utils/constant.js" // 文章的 URL 地址
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
				title:'',
				content: {
				},
				shareObj:{
					href:'', // 地址
					title:'赚租金上纽车APP', // 标题
					summary:'注册认证就送100元，成为纽车推广人，赚租金，上不封顶！', // 分享部分内容
					imageUrl:'http://niuche-default.neocab.cn/256_256.png'
				},
				shareArticleUrl:shareArticleUrl, // 存储地址
				index: ''
			}
		},
		onLoad(option) {
			this.index = option.index
			let shareId = option.ids;
			if (shareId) {
				this.id = shareId;
				this.shareObj.href = this.shareArticleUrl + shareId+'&index='+this.index;
			}
		},
		onShow() {
			this.driverContent()
		},
		methods: {
			share(url) { // 分享的
				console.log('分享了')
				this.shareObj.title = this.title
				this.shareObj.imageUrl = url
				this.$refs.shareWx.shareShow()
			},
			interface(res) { // 接口数据
				if (res.code === 200) {
					this.content = res.object
					this.title = res.object.title
				} else {
					this.$u.toast(res.msg);
				}
			},
			driverContent() {
				if (this.index == 0) {
					this.$u.api.contentDynamic({
						uuid: this.id
					}).then(res => {
						this.interface(res)
					})
				} else if (this.index == 1) {
					this.$u.api.contentActivities({
						uuid: this.id
					}).then(res => {
						this.interface(res)
					})
				} else if (this.index == 2) {
					this.$u.api.contentOrder({
						uuid: this.id
					}).then(res => {
						this.interface(res)
					})
				} else if (this.index == 3) {
					this.$u.api.contentShare({
						uuid: this.id
					}).then(res => {
						this.interface(res)
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
