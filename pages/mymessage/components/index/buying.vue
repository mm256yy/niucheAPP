<template>
	<view class="buying">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:230rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="行驶里程" @click="show = true" v-model="form.ageDriver" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:230rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="打包价" @click="show = true" v-model="form.ageDriver" type="select" /></u-form-item>
			</u-form>
			<view class="icon"><u-icon name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
		</view>
		<!-- <view class="wrap">
			<u-swiper width="672" height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view class="list" @click="detail()">
			<view class="year">刷新时间：刚刚</view>
			<u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon>
			<view class="clear"></view>
			<u-image class="left" width="125rpx" height="125rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="name">求购：30辆 荣威\吉利帝豪\比亚迪...</view>
				<view class="type">金华诚信租车行<span>金华</span></view>
				<view class="price">打包价:<span>2700</span></view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="list" @click="detail()">
			<view class="year">刷新时间：刚刚</view>
			<u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon>
			<view class="clear"></view>
			<u-image class="left" width="125rpx" height="125rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="name">求购：30辆 荣威\吉利帝豪\比亚迪...</view>
				<view class="type">金华诚信租车行<span>金华</span></view>
				<view class="price">打包价:<span>2700</span></view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="list" @click="detail()">
			<view class="year">刷新时间：刚刚</view>
			<u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon>
			<view class="clear"></view>
			<u-image class="left" width="125rpx" height="125rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="name">求购：30辆 荣威\吉利帝豪\比亚迪...</view>
				<view class="type">金华诚信租车行<span>金华</span></view>
				<view class="price">打包价:<span>2700</span></view>
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				list: [{
										image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
										title: '昨夜星辰昨夜风，画楼西畔桂堂东'
									},
									{
										image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
										title: '身无彩凤双飞翼，心有灵犀一点通'
									},
									{
										image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
										title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
									}
								],
				form: {
				ageDriver: '',
				},
				list: [
									{
										value: '1',
										label: '江'
									},
									{
										value: '2',
										label: '湖'
									}
								]
			}
		},
		onReady() {
		    
		},
		mounted() {
			
		},
		methods: {
		    confirm(arr){
				this.form.ageDriver = arr[0].label;
		    },
			detail() {
				this.$u.route("/pages/mymessage/components/index/buyingDetail")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.buying {
		.wrap {
			padding: 40rpx;
		}
		.middle-content .u-form {
			width: 621rpx;
			height: 71rpx;
			border-radius: 40rpx 0 0 40rpx;
			margin-left: 39rpx;
			background-color: #CDE5E3;
			margin-top: 30rpx;
			float: left;
		}
		.icon {
			width: 51rpx;
			height: 71rpx;
			line-height: 71rpx;
			text-align: center;
			border-radius: 0 0 20rpx 0;
			background: linear-gradient(115deg, #37AB63, #6DD99C);
			float: left;
			margin-top: 30rpx;
		}
		.line {
			width: 1rpx;
			height: 27rpx;
			margin-top: 22rpx;
			float: left;
			margin-left: 40rpx;
			background: rgba(0,0,0,0.2);
		}
		.clear {
			clear: both;
		}
		.list {
			width: 702rpx;
			height: 308rpx;
			padding: 38rpx;
			margin-left: 24rpx;
			margin-top: 24rpx;
			font-size: 20rpx;
			background-image: url(@/static/bgbuying.png);
			background-repeat: no-repeat;
			background-size: cover;
			.clear {
				clear: both;
			}
			.left {
				margin-top: 19rpx;
			}
			.left, .right {
				float: left;
			}
			.right {
				width: 494rpx;
				padding-left: 34rpx;
			}
			.city {
				width: 96rpx;
				height: 40rpx;
				line-height: 32rpx;
				text-align: center;
				font-size: 20rpx;
				border-radius: 26rpx;
				border: 1rpx solid rgba(0,0,0,0.3);
				margin-top: 16rpx;
				margin-right: 16rpx;
				float: right;
			}
			.name {
				font-size: 28rpx;
				font-weight: 900;
				margin-top: 20rpx;
			}
			.type {
				font-size: 20rpx;
				color: #7f7f7f;
				margin-top: 8rpx;
			}
			.type span {
				margin-left: 22rpx;
			}
			.price {
				margin-top: 9rpx;
			}
			.price span {
				font-size: 36rpx;
				font-weight: 900;
				color: #40B36C;
				margin-left: 8rpx;
			}
			.year {
				float: left;
			}
			.heart {
				float: right;
			}
		}
	}
</style>
