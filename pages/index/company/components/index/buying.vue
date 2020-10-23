<template>
	<view class="buying">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item style="width:180rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="选择驾龄" @click="show = true" v-model="form.ageDriver" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:180rpx;margin-left:60rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="show = true" v-model="form.ageDriver" type="select" /></u-form-item>
			</u-form>
			<view class="icon"><u-icon name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
		</view>
		<view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view>
		<view class="list" @click="detail()">
			<u-image class="left" width="190rpx" height="190rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="time">刷新时间：刚刚</view>
				<view class="clear"></view>
				<view class="name">X司机</view>
				<view class="year">驾龄4年</view>
				<view class="type">网约车认证</view>
				<view class="clear"></view>
				<view class="car">荣威/吉利/比亚迪....</view>
				<u-icon class="chat" name="chat"></u-icon>
			</view>
		</view>
		<view class="list">
			<u-image class="left" width="190rpx" height="190rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="time">刷新时间：刚刚</view>
				<view class="clear"></view>
				<view class="name">X司机</view>
				<view class="year">驾龄4年</view>
				<view class="type">网约车认证</view>
				<view class="clear"></view>
				<view class="car">荣威/吉利/比亚迪....</view>
				<u-icon class="chat" name="chat"></u-icon>
			</view>
		</view>
		<view class="list">
			<u-image class="left" width="190rpx" height="190rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="time">刷新时间：刚刚</view>
				<view class="clear"></view>
				<view class="name">X司机</view>
				<view class="year">驾龄4年</view>
				<view class="type">网约车认证</view>
				<view class="clear"></view>
				<view class="car">荣威/吉利/比亚迪....</view>
				<u-icon class="chat" name="chat"></u-icon>
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
				this.$u.route("/pages/index/company/components/index/detail")
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
			margin-left: 60rpx;
			background: rgba(0,0,0,0.2);
		}
		.clear {
			clear: both;
		}
		.list {
			width: 702rpx;
			height: 190rpx;
			margin-left: 24rpx;
			margin-bottom: 24rpx;
		}
		.list .left {
			float: left;
		}
		.list .right {
			width: 512rpx;
			padding: 0 36rpx;
			float: left;
		}
		.list .right .name {
			font-weight: 900;
			font-size: 28rpx;
			margin-top: 6rpx;
		}
		.list .right .time {
			font-size: 16rpx;
			float: right;
			margin-top: 6rpx;
		}
		.list .right .year {
			width: 130rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			border-radius: 12rpx;
			background: #37AB63;
			font-size: 10rpx;
			color: #fff;
			float: left;
			margin-top: 6rpx;
		}
		.list .right .type {
			margin-left: 8rpx;
			width: 160rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			border-radius: 12rpx;
			background: #37AB63;
			font-size: 10rpx;
			color: #fff;
			float: left;
			margin-top: 6rpx;
		}
		.list .right .car {
			color: #7f7f7f;
			font-size: 20rpx;
			margin-top: 6rpx;
		}
		.list .right .chat {
			float: right;
			margin-top: 6rpx;
		}
	}
</style>
