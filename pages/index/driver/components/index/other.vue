<template>
	<view class="other">
		<u-navbar back-text="返回" back-icon-size="0" title="公司简称" :background="backgroundDri" :back-text-style="backTextStyle" height='98' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon>
				</view>
			</view>
		 </u-navbar>
		 <view class="top">
		 	<u-image shape="circle" class="left" width="185rpx" height="186rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="right">
		 		<view class="name">万兴租车有限公司</view>
		 		<view class="address">北京朝阳区</view>
				<view class="box">网约车运营</view>
				<view class="box">网约车运营</view>
				<view class="clear"></view>
		 	</view>
		 	<view class="clear"></view>
		 </view>
		 <view class="wrap">
			 <view style="">
			 	<u-tabs-swiper ref="uTabs" activeColor="#FF6501" :list="listTab" inactive-color="#000"
			    bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 	 swiperWidth="750"></u-tabs-swiper>
			 </view>
			 <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 			<selling></selling>
			 		</scroll-view>
			 	</swiper-item>
			 	<swiper-item class="swiper-item">
			 		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 			<view v-for="(item, index) in list" :key="index">
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
									<view><text>￥28000</text>月薪</view>
									<view class="case">自动挡</view>
									<view class="case">SUV</view>
									<view class="case">纯电动</view>
								</view>
							</view>
							<u-icon v-show="item.iscollect&&list.length" @click="cancel(item.id)" class="heart" name="heart-fill" color="#FFA032" size="28"></u-icon>
							<u-icon v-show="!item.iscollect&&list.length" @click="favorites(item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
						</view>
			 		</scroll-view>
			 	</swiper-item>
			 </swiper>
		 </view>
	</view>
</template>

<script>
	import selling from './selling'
	export default {
		components: {
			selling
		},
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				listTab: [{
					name: '租车'
				}, {
					name: '招聘'
				}],
				current: 0, 
				swiperCurrent: 0,
				pagination: {
				  pageNum: 0, 
				  pageSize: 10
				},
				list: [],
				total: 0
			}
		},
		mounted() {
			
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
					this.$u.api.getCarSystem(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total= res.total;
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			search(){
			    const params = Object.assign(this.form, {
					pageNum: 0,
					pageSize: 10
				});
					this.$u.api.getCarSystem(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total = res.total;
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			detail() {
				this.$u.route("/pages/mymessage/components/index/buyingDetail")
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.u-tabs-box {
		position:sticky;
		top: 0;
		left: 0;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 400rpx);
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.other {
		.top {
			width: 666rpx;
			height: 186rpx;
			margin-left: 42rpx;
			margin-top: 40rpx;
			margin-bottom: 60rpx;
			.left {
				float: left;
			}
			.right {
				width: 481rpx;
				height: 186rpx;
				padding: 30rpx 42rpx;
				float: left;
				font-size: 20rpx;
				.name {
					font-size: 36rpx;
					font-weight: 900;
					margin-bottom: 17rpx;
				}
				.box {
					width: 139rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					border-radius: 10rpx;
					background: rgba(0,0,0,0.1);
					color: #7f7f7f;
					float: left;
					margin-right: 10rpx;
					margin-top: 19rpx;
				}
			}
		}
		.clear {
			clear: both;
		}
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 154rpx;
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
</style>
