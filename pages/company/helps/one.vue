<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="教你搞定注册教程" :background="backgroundCom"
		 :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		 <view>
			 <image :src="shopLogoUrl"  @tap="_previewImage(shopLogoUrl)" mode="widthFix" >
		 </view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopLogoUrl:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-6.png',
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

<style>

</style>
