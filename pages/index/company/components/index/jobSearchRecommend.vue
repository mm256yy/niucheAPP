<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="请选择推荐哪条招聘信息" :background="{}" :back-text-style="backTextStyle" title-width="400" title-size="36" height='98' title-color="#FFFFFF">
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
							    <view class="left">
									<u-image width="190rpx" height="190rpx" shape="circle" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
								</view>
								<view class="right">
									<view class="hailing">网约车</view>
									<view class="name">高薪招聘网约车司机高薪招聘网约车司机</view>
									<u-icon class="clock" name="clock"></u-icon>
									<view class="car">荣威/吉利/比亚迪</view>
									<view class="clear"></view>
									<view class="salary">月薪<span>2700-1000</span></view>
								</view>
								<view class="clear"></view>
							</u-radio>
				</u-radio-group>
				<view class="box">
					<view class="case">有5险</view>
					<view class="case">有电费补贴</view>
					<view class="case">有提成</view>
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
	background-image: url(@/static/lease.png);
	background-repeat: no-repeat;
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
		.wrap {
			width: 100%;
			height: calc(100vh + 10rpx);
			border-radius: 20rpx;
			background: #f5fafb;
			padding-top: 40rpx;
			margin-top: -20rpx;
		}
		.warn {
			margin-left: 84rpx;
			margin-bottom: 49rpx;
			font-size: 20rpx;
			color: #FFB400;
		}
		.list{
			width: 670rpx;
			height: 257rpx;
			font-size: 20rpx;
			margin-left: 25rpx;
			.clear {
				clear: both;
			}
			.left {
				padding: 24rpx 30rpx;
				background: #fff;
				float: left;
			}
			.right{
				width: 388rpx;
				height: 240rpx;
				padding-right: 13rpx;
				background: #fff;
				float: left;
				.hailing {
					width: 86rpx;
					height: 28rpx;
					line-height: 28rpx;
					text-align: center;
					background: #ecebeb;
					font-size: 20rpx;
					margin-top: 20rpx;
					margin-right: 2rpx;
					float: right;
				}
			}
			.name {
				font-weight: 900;
				line-height: 34rpx;
				font-size: 28rpx;
				margin-top: 58rpx;
				margin-bottom: 10rpx;
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
			.clock {
				float: left;
				font-size: 40rpx;
				margin-top: 6rpx;
			}
			.car {
				font-size: 20rpx;
				color: #7f7f7f;
				float: left;
				margin-top: 2rpx;
			}
			.salary {
				margin-top: -8rpx;
				float: left;
			}
			.salary span {
				font-size: 36rpx;
				color: #4DB171;
				font-weight: 900;
				margin-left: 6rpx;
			}
			.box {
				width: 638rpx;
				height: 60rpx;
				padding: 0 32rpx;
				background: linear-gradient(115deg,#6DD99C, #37AB63);
				margin-left: 44rpx;
				view {
					font-size: 20rpx;
					float: left;
				}
				view span {
					font-size: 36rpx;
					font-weight: 900;
				}
				.case {
					padding: 6rpx 15rpx;
					border-radius: 10rpx;
					background: #fff;
					font-weight: 900;
					color: #37AB63;
					margin-top: 8rpx;
					float: left;
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
		}
	}
</style>


