<template>
	<view class="result">
		<u-navbar back-text="返回" back-icon-size="0" title="轿车+纯电动+荣威ie5\荣威ie6" :background="backgroundCom" :back-text-style="backTextStyle" title-width="400" title-size="36" height='98' title-color="#FFFFFF">
			<view @click="clear()" class="navbar-right" slot="right">清除
			</view>
		 </u-navbar>
		 <view v-for="(item, index) in list" :key="index">
			 <view class="list">
			 	<u-image class="left" width="312rpx" height="231rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			 	<view class="right">
			 		<view class="city">上海</view>
			 		<view class="clear"></view>
			 		<view class="name">525520款包包</view>
			 		<view class="price">打包价<text>￥2700</text></view>
			 		<view class="case">纯电动</view>
			 		<view class="case">SUV</view>
			 		<view class="case">自动挡</view>
			 	</view>
			 	<view class="clear"></view>
			 	<u-icon class="clock" name="clock" size="28"></u-icon>
			 	<view class="year">车龄<=3个月</view>
			 	<u-icon class="clock" name="clock" size="28"></u-icon>
			 	<view class="year">20万公里-30万公里</view>
			 	<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
			 </view>
			 <u-icon v-show="item.iscollect" @click="cancel(item.id)" class="heart" name="heart-fill" color="#FFA032" size="28"></u-icon>
			 <u-icon v-show="!item.iscollect" @click="favorites(item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
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
				list: [],
				total: 0
			}
		},
		methods: {
		  favorites(id) {
		  	const params = {
		  		BeCollectedId: id,
		  		isDriveAndCompary: 1 
		  	};
		      this.$u.api.collect(params).then(res=>{
		      	if(res.code === 200){
		      		 this.$u.toast('收藏成功');
		      	}else {
		      		 this.$u.toast(res.msg);
		      	}
		      })
		  },
		  cancel(id) {
		  	const params = {
		  		BeCollectedId: id,
		  		isDriveAndCompary: 1 
		  	};
		      this.$u.api.collect(params).then(res=>{
		      	if(res.code === 200){
		      		 this.$u.toast('取消收藏成功');
		      	}else {
		      		 this.$u.toast(res.msg);
		      	}
		      })
		  },
		  getList(){
		      const params = Object.assign({
		      	pageNum: this.pagination.pageNum + 1,
		      	pageSize: 10
		      });
		  		this.$u.api.sellCar(params).then(res=>{
		  			if(res.code === 200){
		  				 this.list = res.rows;
		  				 this.total= res.total;
		  			}else {
		  				 this.$u.toast(res.msg);
		  			}
		  		})
		  },
		  search(){
		      const params = Object.assign({
		  		pageNum: 0,
		  		pageSize: 10
		  	});
		  		this.$u.api.sellCar(params).then(res=>{
		  			if(res.code === 200){
		  				 this.list = res.rows;
		  				 this.total= res.total;
		  			}else {
		  				 this.$u.toast(res.msg);
		  			}
		  		})
		  },
		  clear() {
				this.$u.route({url:'/pages/mymessage/mymessage',type:'switchTab'});
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
			top: 466rpx;
		    right: 34rpx;
		}
		.list {
			width: 702rpx;
			height: 308rpx;
			padding: 18rpx 15rpx;
			margin-left: 24rpx;
			margin-top: 24rpx;
			font-size: 20rpx;
			background-image: url(@/static/bgcarsell.png);
			background-repeat: no-repeat;
			background-size: cover;
			.clear {
				clear: both;
			}
			.left, .right {
				float: left;
			}
			.right {
				width: 360rpx;
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
				margin-top: 8rpx;
			}
			.price text {
				font-size: 36rpx;
				font-weight: 900;
				color: #40B36C;
				margin-left: 8rpx;
			}
			.case {
				padding: 6rpx 14rpx;
				border-radius: 30rpx;
				background: #40B36C;
				color: #fff;
				float: left;
				margin-right: 10rpx;
				margin-top: 10rpx;
			}
			.clock {
				margin-left: 30rpx;
				margin-top: 10rpx;
				float: left;
			}
			.year {
				margin-top: 8rpx;
				margin-right: 50rpx;
				float: left;
			}
		}
	}
</style>


