<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="教你搞定注册教程" :background="backgroundCom" :back-text-style="backTextStyle"
		 height='44' title-color="#FFFFFF"></u-navbar>
		<view v-for="(item,index) in list" :key="index">
			<view>
				<u-image :src="item.url" mode="widthFix" @click="open(index)"></u-image>
			</view>
			<view class="img_title">{{item.text}}</view>
		</view>
		<previewImage ref="previewImage" :saveBtn="false" :rotateBtn="false" :imgs="imgs"></previewImage>
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
				list: [{
						text: '下载APP',
						url: '/static/helps/company/zhuce/jiaoni_diyibu_1.png'
					},
					{
						text: '使用手机号码进行注册登记',
						url: '/static/helps/company/zhuce/jiaoni_diyibu_2.png'
					},
					{
						text: '公司认证,营业执照-公司姓名,注册资本等信息,公司logo-经营场所-公司简称,企业联系人身份认证-身份证-工作证明文件 ',
						url: '/static/helps/company/zhuce/jiaoni_diyibu_3.png'
					},
					{
						text: '提交审核',
						url: '/static/helps/company/zhuce/jiaoni_diyibu_4.png'
					},
					{
						text: '',
						url: '/static/helps/driver/zhuce/zhuce_diyibu_5.png'
					}
				],
				imgs: [],
				backTextStyle: {
					'color': '#ffffff'
				},
			}
		},
		mounted() {
			this.imgs = [];
			let list = this.list;
			list.forEach(item => {
				this.imgs.push(item.url)
			})
		},
		methods: {
			open(e) {
				this.$refs.previewImage.open(e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.img_title {
		color: #06B465;
		text-align: center;
		font-size: 14pt;
		padding: 15pt;
	}
</style>
