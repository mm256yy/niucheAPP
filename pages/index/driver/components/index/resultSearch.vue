<template>
	<view class="result">
		<u-navbar back-text="返回" back-icon-size="0" title="轿车+纯电动+荣威ie5\荣威ie6" :background="backgroundDri" :back-text-style="backTextStyle" title-width="400" title-size="36" height='98' title-color="#FFFFFF">
			<view @click="clear()" class="navbar-right" slot="right">清除
			</view>
		 </u-navbar>
		 <view class="list" @click="detail()">
		 	<u-image class="left" width="264rpx" height="199rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="right">
		 		<view class="tag">付费标签</view>
		 		<view class="type">网约车</view>
		 		<!-- <u-icon class="heart" name="heart-fill" color="#FCD03C" width="19" height="18"></u-icon> -->
		 		<view class="clear"></view>
		 		<view class="name">高薪招聘高薪招聘高薪招聘...</view>
		 		<u-icon class="car" name="car" width="22" height="22"></u-icon>
		 		<view class="distance">荣威\吉利\比亚迪...</view>
		 		<view class="clear"></view>
		 	</view>
		 	<view class="clear"></view>
		 	<view class="box">
		 		<view><span>28000</span>元/月起租</view>
		 		<view class="case">自动挡</view>
		 		<view class="case">SUV</view>
		 		<view class="case">纯电动</view>
		 	</view>
		 </view>
		 <u-icon v-show="change" @click="favorites()" class="heart" name="heart-fill" color="#FFA032" size="28"></u-icon>
		 <u-icon v-show="!change" @click="favorites()" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				change: false
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
	      favorites() {
			this.change = !this.change;	
		  },
		  getList() {
			this.$u.api.getCarSystem().then(res=>{
				if(res.code === 200){
					 this.list = res.rows;
				}else {
					 this.$u.toast(res.msg);
				}
			})  
		  },
		  clear() {
				this.$u.route({url:'/pages/index/index',type:'switchTab'});
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
		color: #fff;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	.result {
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 248rpx;
		    right: 34rpx;
		}
		.list{
			width: 679rpx;
			height: 295rpx;
			color: #000;
			font-size: 20rpx;
			margin-left: 36rpx;
			margin-top: 40rpx;
			.clear {
				clear: both;
			}
			.left {
				float: left;
				margin-left: 19rpx;
				margin-top: 20rpx;
			}
			.right{
				width: 396rpx;
				height: 226rpx;
				padding: 0 30rpx;
				background: #fff;
				float: left;
			}
			.name {
				font-weight: 900;
				font-size: 28rpx;
				margin-top: 18rpx;
			}
			.car {
				float: left;
				color: #7f7f7f;
				margin-top: 23rpx;
			}
			.distance {
				margin-left: 6rpx;
				color: #7f7f7f;
				float: left;
				margin-top: 16rpx;
			}
			.tag {
				width: 179rpx;
				height: 43rpx;
				line-height: 43rpx;
				text-align: center;
				border-radius: 6rpx;
				background: #FF6501;
				font-size: 28rpx;
				color: #fff;
				font-weight: 900;
				float: left;
				margin-top: 20rpx;
			}
			.type {
				width: 86rpx;
				height: 28rpx;
				line-height: 28rpx;
				text-align: center;
				background: rgba(0,0,0,0.1);
				font-size: 20rpx;
				float: left;
				margin-left: 33rpx;
				margin-top: 28rpx;
				margin-right: 20rpx;
			}
			.box {
				width: 679rpx;
				height: 59rpx;
				background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
				padding: 0 0 0 18rpx;
				color: #fff;
				margin-top: 10rpx;
				view {
					font-size: 20rpx;
					float: left;
				}
				view span {
					font-size: 36rpx;
					font-weight: 900;
					margin-right: 19rpx;
				}
				.case {
					padding: 6rpx 14rpx;
					border-radius: 10rpx;
					background: #fff;
					font-weight: 900;
					color: #FF6501;
					margin-top: 8rpx;
					float: right;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>


