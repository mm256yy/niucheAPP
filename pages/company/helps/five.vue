<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="车辆租赁教程" :background="backgroundCom"
		 :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		 <view>
			 <u-image :src="Url1" mode="widthFix" @tap="_previewImage(Url1)"></u-image>
		 </view>
		<view class="img_view">
			<u-image :src="Url2" mode="widthFix" @tap="_previewImage(Url2)"></u-image>
		</view>
		<view class="img_view">
			<u-image :src="Url3" mode="widthFix" @tap="_previewImage(Url3)"></u-image>
		</view>
		<view class="img_view">
			<u-image :src="Url4" mode="widthFix" @tap="_previewImage(Url4)"></u-image>
		</view>
		<view>
			<u-image :src="Url5" mode="widthFix" @tap="_previewImage(Url5)"></u-image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Url1:'/static/helps/cheliang_diyibu_1.png',
				Url2:'/static/helps/cheliang_diyibu_2.png',
				Url3:'/static/helps/cheliang_diyibu_3.png',
				Url4:'/static/helps/cheliang_diyibu_4.png',
				Url5:'/static/helps/cheliang_diyibu_5.png',
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
 .img_view{
	 padding: 15pt 0;
 }
</style>
