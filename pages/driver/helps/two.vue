<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="发布求租教程" :background="backgroundDri" :back-text-style="backTextStyle"
		 height='44' title-color="#FFFFFF"></u-navbar>
		<view v-for="(item,index) in list" :key="index" class="img_view">
			<u-image :src="item" mode="widthFix" @click="open(index)"></u-image>
		</view>
		<previewImage ref="previewImage" :saveBtn="false" :rotateBtn="false" :imgs="list"></previewImage>
	</view>
</template>

<script>
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	export default {
		components: {
			previewImage
		}, //注册插件
		data() {
			return {
				list: ['/static/helps/driver/qiuzu/fabu_diyibu_1.png', '/static/helps/driver/qiuzu/fabu_diyibu_2.png',
					'/static/helps/driver/qiuzu/fabu_diyibu_3.png', '/static/helps/driver/qiuzu/fabu_diyibu_4.png',
					'/static/helps/driver/qiuzu/fabu_diyibu_5.png','/static/helps/driver/zhuce/zhuce_diyibu_5.png'
				],
				backTextStyle: {
					'color': '#ffffff'
				},
			}
		},
		methods: {
			open(e) {
				this.$refs.previewImage.open(e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.img_view {
		padding-bottom: 40rpx;
	}
</style>
