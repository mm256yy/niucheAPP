<template>
	<view class="result">
		<u-navbar back-text="返回" back-icon-size="0" title="轿车+纯电动+荣威ie5\荣威ie6" :background="backgroundDri" :back-text-style="backTextStyle" title-width="400" title-size="36" height='44' title-color="#FFFFFF">
			<view @click="clear()" class="navbar-right" slot="right">清除
			</view>
		 </u-navbar>
		 <view v-for="(item, index) in list" :key="index">
			 <view class="list" @click="detail()">
			 	<u-image class="left" width="264rpx" height="199rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			 	<view class="right">
			 		<view class="tag">付费标签</view>
			 		<view class="type">网约车</view>
			 		<!-- <u-icon class="heart" name="heart-fill" color="#FCD03C" width="19" height="18"></u-icon> -->
			 		<view class="clear"></view>
			 		<view class="name">高薪招聘高薪招聘高薪招聘...</view>
			 		<!-- <u-icon class="car" name="car" width="22" height="22"></u-icon> -->
					<u-image class="car" width="22rpx" height="22rpx" src="@/static/pinpai.png"></u-image>
			 		<view class="distance">荣威\吉利\比亚迪...</view>
			 		<view class="clear"></view>
			 	</view>
			 	<view class="clear"></view>
			 	<view class="box">
			 		<view><text>￥28000</text>元/月起租</view>
			 		<view class="case">自动挡</view>
			 		<view class="case">SUV</view>
			 		<view class="case">纯电动</view>
			 	</view>
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
				pagination: {
				  pageNum: 0, 
				  pageSize: 10
				},
				list: [],
				total: 0
			}
		},
		onLoad(option) {
			let form = JSON.parse(option.form);
			if(form){
			 this.form = form;
			}
		},
		mounted() {
			const token = this.token;
			if(token) {
				this.form.islogin = 1
			}else{
				this.form.islogin = 0
			}
			this.search()
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
		.lists {
			width: 679rpx;
			position: relative;
			.heart {
				position: absolute;
				margin-top: 14rpx;
				position: absolute;
				top: 8rpx;
			    right: -16rpx;
			}
			.list{
				width: 679rpx;
				// height: 295rpx;
				color: #000;
				font-size: 20rpx;
				margin-left: 36rpx;
				margin-top: 40rpx;
				background: #fff;
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
					font-size: 34rpx;
					margin-top: 20rpx;
				}
				.car {
					float: left;
					margin-top: 18rpx;
					margin-right: 4rpx;
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
					float: right;
					margin-left: 33rpx;
					margin-top: 20rpx;
					margin-right: 30rpx;
				}
				.box {
					width: 679rpx;
					height: 59rpx;
					background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
					padding: 0 0 0 18rpx;
					color: #fff;
					margin-top: 10rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view {
						font-size: 20rpx;
						float: left;
					}
					view text {
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
	}
</style>


