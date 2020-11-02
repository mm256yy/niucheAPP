<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="请选择推荐哪条招聘信息" :background="backgroundCom" :back-text-style="backTextStyle" title-width="400" title-size="36" height='98' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
			</view>
		 </u-navbar>
		 <view class="wrap">
			<view class="warn">请注意，只能选择1条哦！</view>
			<view class="list">
				<u-radio-group v-model="value" @change="radioGroupChange">
							<u-radio
							    active-color="#37AB63"
								@change="radioChange" 
								v-for="(item, index) in list" :key="index" 
								:name="item.id"
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
									<view class="salary">月薪<span>￥2700-￥1000</span></view>
								</view>
								<view class="clear"></view>
								<view class="box">
									<view class="case">有5险</view>
									<view class="case">有电费补贴</view>
									<view class="case">有提成</view>
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
			// height: 257rpx;
			font-size: 20rpx;
			margin-left: 30rpx;
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
					height: 30rpx;
					border-radius: -8rpx;
					line-height: 30rpx;
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
				margin-bottom: 20rpx;
				view {
					font-size: 20rpx;
					float: left;
				}
				view span {
					font-size: 36rpx;
					font-weight: 900;
				}
				.case {
					padding: 2rpx 15rpx;
					border-radius: 10rpx;
					background: #fff;
					font-size: 20rpx;
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
			margin-top: 200rpx;
		}
	}
</style>


