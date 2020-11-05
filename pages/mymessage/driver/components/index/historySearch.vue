<template>
	<view class="history">
		<u-navbar back-text="返回" back-icon-size="0" title="历史筛选记录" :background="backgroundDri" :back-text-style="backTextStyle" title-width="400" title-size="36" height='98' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
			</view>
		 </u-navbar>
		 <view class="rent">最近6条历史记录</view>
		 <view class="del">删除记录</view>
		 <view class="list">
			<view class="name">荣威</view>
			<view class="total">
				<text>有136条结果</text>
				<u-image class="img" width="23rpx" height="23rpx" src="@/static/arrow.png"></u-image></view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				}
			}
		},
		mounted() {
		   this.getList()	
		},
		methods: {
		   getList() {
			   this.$u.api.getCarSystem().then(res=>{
			   	if(res.code === 200){
			   		 this.list = res.rows;
			   		 this.total= res.total;
			   	}else {
			   		 this.$u.toast(res.msg);
			   	}
			   })
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
	.history {
		height: 100vh;
		background: rgba(0,0,0,0.03);
		padding: 80rpx 49rpx;
		font-size: 28rpx;
		.list {
			width: 650rpx;
			padding: 27rpx 40rpx;
			background: #fff;
			margin-top: 41rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.name {
				width: 340rpx;
			}
			.img {
				float: right;
			}
		}
		.rent {
			font-size: 36rpx;
			float: left;
			margin-bottom: 41rpx;
		}
		.del {
			width: 168rpx;
			height: 49rpx;
			border-radius: 20rpx;
			line-height: 49rpx;
			text-align: center;
			background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
			font-size: 32rpx;
			color: #fff;
			float: right;
			margin-bottom: 41rpx;
		}
	}
</style>


