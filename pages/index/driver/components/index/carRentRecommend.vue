<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="请选择要推荐的租车信息" :background="backgroundCom" :back-text-style="backTextStyle" title-width="400" title-size="36" height='98' title-color="#FFFFFF">
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
								:name="item.name"
								:disabled="item.disabled"
							>
								<view class="right">
									<view class="name">吴司机</view>
									<u-icon class="clock" name="clock"></u-icon>
									<view class="year">驾龄4年</view>
									<view class="clear"></view>
									<u-icon class="car" name="car" width="42" height="37"></u-icon>
									<view class="type">杭州出租车认证</view>
									<view class="clear"></view>
								</view>
										<u-image class="left" width="305rpx" height="226rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
										<view class="clear"></view>
							</u-radio>
				</u-radio-group>
				<view class="box">
					<view><span>28000</span>元/月起租</view>
					<view class="case">自动挡</view>
					<view class="case">SUV</view>
					<view class="case">纯电动</view>
				</view>
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
				goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
				current: 0,
				firstCurrent:0,
				form: {
					name: '杭州'
				},
				list: [
								{
									name: 'apple',
									disabled: false
								}
							],
							// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
							value: 'orange',
			}
		},
		methods: {
		recommend() {
				this.$u.route("/pages/index/company/components/index/recommend")
			},
			shared(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
			
		}
	}
</script>
<style lang="scss" scoped>
page{
	// background-image: url(@/static/lease.png);
	// background-repeat: no-repeat;
	height: 100%;
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
	.detail {
		height: 100vh;
		background: #f5fafb;
		.wrap {
			width: 100%;
			// height: calc(100vh + 10rpx);
			border-radius: 20rpx;
			// background: #f5fafb;
			padding-top: 40rpx;
			margin-top: -20rpx;
		}
		.warn {
			margin-left: 84rpx;
			margin-bottom: 49rpx;
			margin-top: 35rpx;
			font-size: 20rpx;
			color: #FFB400;
		}
		.list{
			width: 670rpx;
			height: 257rpx;
			color: #fff;
			font-size: 20rpx;
			margin-left: 30rpx;
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
				font-size: 34rpx;
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
			.clock,.year,.car,.type {
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
			.year,.type {
				margin-left: 10rpx;
				margin-top: 10rpx;
				color: #7f7f7f;
			}
			.box {
				width: 638rpx;
				height: 60rpx;
				background: linear-gradient(115deg,#6DD99C, #37AB63);
				margin-left: 44rpx;
				padding: 0 0 0 18rpx;
				view {
					font-size: 20rpx;
					float: left;
				}
				view span {
					font-size: 36rpx;
					font-weight: 900;
				}
				.case {
					padding: 6rpx 14rpx;
					border-radius: 10rpx;
					background: #fff;
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


