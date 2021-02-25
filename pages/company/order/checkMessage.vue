<template>
	<view>
		<u-navbar back-icon-color="#111111" title="验车车辆信息浏览" :background="background" title-color="#111111"></u-navbar>
		<view class="content">
			<view class="title">车辆行驶证</view>
			<u-image width="694rpx" height="386rpx" :src="detail.driverPhoto"></u-image>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">号牌号码：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">车辆类型：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">住址：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">使用性质：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">品牌型号：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">车辆识别代号：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">发动机号码：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">注册日期：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">发证日期：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.carModelName||'暂无数据'}}</view>
			</view>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="margin-top: 20rpx;" class="title">车辆铭牌（1张）</view>
			<u-image width="694rpx" height="386rpx" :src="detail.driverPhoto"></u-image>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="margin-top: 20rpx;" class="title">中控仪表盘（必填）</view>
			<u-image width="694rpx" height="386rpx" :src="detail.driverPhoto"></u-image>
			<view style="margin-top: 32rpx;">表显里程：12333333KM</view>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="margin-top: 20rpx;" class="title">车况详细登记</view>
			<view style="margin-top: 20rpx;" class="title">一.外观漆面和碰撞登记</view>
			<view style="display: flex;justify-content: space-between;">
				<view style="margin-top: 20rpx;" class="title">1.前保险杠</view>
				<view class="status">脱落</view>
			</view>
			<view style="display: flex;justify-content: space-between;">
				<u-image width="208rpx" height="208rpx" :src="detail.driverPhoto"></u-image>
				<u-image width="208rpx" height="208rpx" :src="detail.driverPhoto"></u-image>
				<u-image width="208rpx" height="208rpx" :src="detail.driverPhoto"></u-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
				  
				}
			}
		},
		mounted() {
			
		},
		methods: {

		}	
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.content{
		padding: 28rpx;
		color: #111;
		background: #fff;
	}
	.title{
		font-size: 36rpx;
		color: #111;
		margin-bottom: 20rpx;
	}
	.status{
		width: 156rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		background: #FFEBD0;
		border-radius: 8rpx;
		border: 1px solid #FF9B0F;
		font-size: 28rpx;
		color: #FF9B0F;
	}	
</style>
