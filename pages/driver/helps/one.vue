<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="教你搞定注册教程" :background="backgroundDri"
		 :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		 <view>
			 <u-image :src="Url1" mode="widthFix" @tap="_previewImage(Url1)"></u-image>
		 </view>
		 <view class="img_title">下载APP</view>
		<view>
			<u-image :src="Url2" mode="widthFix" @tap="_previewImage(Url2)"></u-image>
		</view>
		<view class="img_title">使用手机号码进行注册登记</view>
		<view>
			<u-image :src="Url3" mode="widthFix" @tap="_previewImage(Url3)"></u-image>
		</view>
		<view class="img_title">上传注册信息，网约车人证+驾驶证 </view>
		<view>
			<u-image :src="Url4" mode="widthFix" @tap="_previewImage(Url4)"></u-image>
		</view>
		<view class="img_title">通过审核</view>
		<view>
			<u-image :src="Url5" mode="widthFix" @tap="_previewImage(Url5)"></u-image>
		</view>
		<view style="padding-top: 10pt;">
			<u-image :src="Url6" mode="widthFix" @tap="_previewImage(Url6)"></u-image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Url1:'/static/helps/zhuce_diyibu_1.png',
				Url2:'/static/helps/zhuce_diyibu_2.png',
				Url3:'/static/helps/zhuce_diyibu_3.png',
				Url4:'/static/helps/zhuce_diyibu_4.png',
				Url5:'/static/helps/zhuce_diyibu_5.png',
				Url6:'/static/helps/zhuce_diyibu_6.png',
				backTextStyle:{
					'color':'#ffffff'
				},
			}
		},
		methods: {
			_previewImage(image) {
					var imgArr = [];
					imgArr.push(image);
					//预览图片
					uni.previewImage({
						urls: imgArr,
						current: imgArr[0]
					});
				},
		}
	}
</script>

<style lang="scss" scoped>
 .img_title{
	 color: #FF9400;text-align: center;font-size: 14pt;
	 padding: 15pt 0;
 }
</style>
