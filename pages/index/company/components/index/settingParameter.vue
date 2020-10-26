<template>
	<view class="setting">
		<view class="top">
			<view class="new">新</view>
			<view class="year">车龄：<8个月</view>
			<view class="distance">行驶里程：3-8万公里</view>
		</view>
		<view class="content">
			<u-form label-width="200" label-align="left" :model="form" ref="uForm">
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="长*宽*高(mm):"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="手机号:"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="续航里程(km):"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="轴距(mm):"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="环保标准:"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="排量(L):"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
			</u-form>
		</view>
		<view class="other">其他参数</view>
		<view class="list">
			<u-form label-width="200" label-align="left" :model="form" ref="uForm">
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="长*宽*高(mm):"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="手机号:"><u-input disabled="true" height="30" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
			</u-form>
		</view>
		<view class="more">上拉加载该公司其他信息</view>
		<view class="last">
			<view class="left">预约看车</view>
			<view class="right">下单租车</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '杭州'
				}
			}
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
    .setting {
		.top {
			width: 670rpx;
			height: 84rpx;
			background: #FFF;
			margin-left: 40rpx;
			margin-top: 42rpx;
			margin-bottom: 33rpx;
			padding: 9rpx 0;
			font-size: 28rpx;
			font-weight: 900;
			.new {
				width: 66rpx;
				height: 66rpx;
				line-height: 66rpx;
				text-align: center;
				font-size: 20rpx;
				font-weight: 900;
				color: #fff;
				border-radius: 50%;
				background: linear-gradient(115deg, #6DD99B, #37AB63);
				margin-left: 40rpx;
				float: left;
			}
			.year {
				margin-left: 25rpx;
				margin-right: 85rpx;
				float: left;
				margin-top: 18rpx;
			}
			.distance {
				float: left;
				margin-top: 18rpx;
			}
		}
	    .content {
			width: 670rpx;
			height: 485rpx;
			background: #fff;
			margin-left: 40rpx;
		}
		.other {
			margin-left: 40rpx;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			font-size: 28rpx;
			color: #7f7f7f;
		}
		.list {
			width: 670rpx;
			height: 162rpx;
			background: #fff;
			margin-left: 40rpx;
		}
		.more {
				   font-size: 20rpx;
				   color: #7f7f7f;
				   margin-top: 83rpx;
				   margin-left: 220rpx;
				   margin-bottom: 40rpx;
		}
		.last {
				   width: 100%;
				   height: 144rpx;
				   padding: 55rpx 116rpx;
				   background: linear-gradient(115deg, #6DD99B, #37AB63);
				   font-size: 36rpx;
				   font-weight: 900;
				   color: #fff;
				   .left {
					   float: left;
				   }
				   .right {
					   float: right;
				   }
		}
	}
</style>


