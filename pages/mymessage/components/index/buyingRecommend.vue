<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="请选择推荐哪条信息？" :background="backgroundCom" :back-text-style="backTextStyle" title-width="400" title-size="36" height='98' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
			</view>
		 </u-navbar>
		 <view class="wrap">
			<view class="warn">请注意，只能选择1条哦！</view>
			<view class="list">
				<u-radio-group v-model="value" @change="radioGroupChange">
							<u-radio 
								@change="radioChange" 
								v-for="(item, index) in list" :key="index" 
								:name="item.id"
							>
							    <view class="top">
									<view class="city">杭州</view>
								</view>
								<view class="clear"></view>
								<view class="right">
									<view class="name">52020款斤斤计较经济界</view>
									<u-icon class="clock" name="clock"></u-icon>
									<view class="year">车龄<3个月</view>
									<view class="clear"></view>
									<u-icon class="car" name="car" width="42" height="37"></u-icon>
									<view class="distance">20万公里-30万公里</view>
									<view class="clear"></view>
								</view>
								<u-image class="left" width="305rpx" height="226rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
								<view class="clear"></view>
								<view class="box">
									<view class="price">打包价<span>￥28000</span></view>
									<view class="case">自动挡</view>
									<view class="case">SUV</view>
									<view class="case">纯电动</view>
									<view class="clear"></view>
								</view>
							</u-radio>
				</u-radio-group>
			</view>
		 </view>
		 <view class="bottom" @click="recommend()">
			 <view>确定</view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form: {
					name: '杭州'
				},
				list: [{
					id: 0,
					name: '看看'
				},
				{
					id: 1,
					name: '照顾'
				},
				{
					id: 2,
					name: '看看'
				},
				{
					id: 3,
					name: '照顾'
				},
				{
					id: 4,
					name: '看看'
				},
				{
					id: 5,
					name: '照顾'
				},
				{
					id: 6,
					name: '看看'
				},
				{
					id: 7,
					name: '照顾'
				}],
				value: 0
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(e);
				console.log(this.value)
			}
		}
	}
</script>
<style lang="scss" scoped>
page{
	// background-image: url(@/static/lease.png);
	// background-repeat: no-repeat;
	// height: 100%;
	height: auto;
	background-size: cover;
	// background-position: 50% 50%;
}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		// height: calc(90vh - var(--window-top));
		// height: auto;
		width: 100%;
		// background: rgba(0,0,0,0.02);
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.detail {
		background: #f5fafb;
		.warn {
			margin-left: 84rpx;
			margin-bottom: 49rpx;
			margin-top: 49rpx;
			font-size: 20rpx;
			color: #FFB400;
		}
		.list{
			width: 690rpx;
			// height: 352rpx;
			color: #fff;
			font-size: 20rpx;
			margin-left: 30rpx;
			.top {
				width: 638rpx;
				height: 66rpx;
				background: #fff;
			}
			.city {
				width: 80rpx;
				height: 32rpx;
				line-height: 32rpx;
				text-align: center;
				border-radius: 10rpx;
				background: rgba(0,0,0,0.2);
				float: right;
				font-size: 20rpx;
				color: #000;
				margin-top: 21rpx;
				margin-right: 21rpx;
			}
			.clear {
				clear: both;
			}
			.left {
				float: right;
			}
			.right{
				width: 334rpx;
				height: 226rpx;
				padding: 0 30rpx;
				background: #fff;
				float: left;
			}
			.name {
				font-weight: 900;
				font-size: 28rpx;
				line-height: 36rpx;
				color: #000;
			}
			.special {
				width: 73rpx;
				height: 34rpx;
				line-height: 34rpx;
				text-align: center;
				border-radius: 16rpx;
				background: orange;
				font-size: 10rpx;
				float: left;
				margin-left: 16rpx;
				margin-top: 8rpx;
			}
			.clock,.year,.car,.distance {
				float: left;
				margin-top: 6rpx;
			}
			.clock {
				font-size: 40rpx;
				margin-top: 18rpx;
			}
			.car {
				font-size: 36rpx;
				margin-top: 18rpx;
			}
			.year,.distance {
				margin-left: 10rpx;
				margin-top: 10rpx;
				color: #7f7f7f;
				font-size: 20rpx;
			}
			.box {
				width: 638rpx;
				height: 60rpx;
				background: linear-gradient(115deg,#6DD99C, #37AB63);
				padding: 0 0 0 18rpx;
				margin-bottom: 20rpx;
				.price {
					font-size: 20rpx;
					float: left;
				}
				.price span {
					font-size: 36rpx;
					font-weight: 900;
					margin-left: 12rpx;
				}
				.case {
					width: 96rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					border-radius: 10rpx;
					background: #fff;
					font-size: 20rpx;
					font-weight: 900;
					color: #37AB63;
					margin-top: 8rpx;
					float: right;
					margin-right: 10rpx;
				}
			}
		}
		.bottom {
			width: 750rpx;
			height: 125rpx;
			line-height: 125rpx;
			text-align: center;
			color: #fff;
			font-size: 40rpx;
			font-weight: 900;
			background: linear-gradient(115deg,#6DD99C, #37AB63);
			margin-top: 200rpx;
		}
	}
</style>


