<template>
	<view class="result">
		<view class="wrap">
			<u-navbar back-text="返回" back-icon-size="0" :title="title" :background="backgroundCom" :back-text-style="backTextStyle" title-width="400" title-size="36" height='44' title-color="#FFFFFF">
				<view @click="clear()" class="navbar-right" slot="right">清除
				</view>
			 </u-navbar>
			 <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 	<view class="last">
			 		<view class="lists" v-for="(item, index) in list" :key="index">
			 			<view class="list" @click="detail(item.demandid)">
			 				<u-image class="left" width="312rpx" height="231rpx" :src="item.photoUrl"></u-image>
			 				<view class="right">
			 					<view class="city">{{item.comparyarea}}</view>
			 					<view class="clear"></view>
			 					<view class="name u-line-2">{{item.carBrand}}{{item.carText}}</view>
			 					<view class="price">打包价<text>￥{{item.packPrice}}</text></view>
			 					<view v-for="(items, index) in item.carSystemTag" :key="index" class="case">{{items}}</view>
			 				</view>
			 				<view class="clear"></view>
			 				<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
			 				<view class="year">{{item.carAge}}</view>
			 				<u-image class="img" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
			 				<view class="year">{{item.km}}</view>
			 				<view class="clear"></view>
			 				<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
			 			</view>
			 			<!-- <u-icon v-show="item.iscollection === 1" @click="cancel(item,item.demandid)" class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
			 			<!-- <u-icon v-show="item.iscollection === 2" @click="favorites(item,item.demandid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
			 		</view>
			 	</view>
				<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
			 </scroll-view>
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
				total: 0,
				iconType: 'flower',
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				form: {},
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				title: ''
			}
		},
		onLoad(option) {
			let form = JSON.parse(option.form);
			if(form){
			 this.form = form;
			}
		    let title = option.title;
			if(title){
			 this.title = title;
			}
		},
		mounted() {
			this.search()
		},
		methods: {
			// favorites(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 2,
			// 		collectionstate: 3,
			// 		iscollection: 1
			// 	};
			// 	item.iscollection = 1;
			//     this.$u.api.collect(params).then(res=>{
			//     	if(res.code === 200){
			//     		 this.$u.toast('收藏成功');
			//     	}else {
			//     		 this.$u.toast(res.msg);
			//     	}
			//     })
			// },
			// cancel(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 2,
			// 		collectionstate: 3,
			// 		iscollection: 0
			// 	};
			// 	item.iscollection = 2;
			//     this.$u.api.collect(params).then(res=>{
			//     	if(res.code === 200){
			//     		 this.$u.toast('取消收藏成功');
			//     	}else {
			//     		 this.$u.toast(res.msg);
			//     	}
			//     })
			// },
			getList(){
			    const params = Object.assign(this.form, {
			    	pageNum: this.pagination.pageNum + 1,
			    	pageSize: 10
			    });
					this.$u.api.sellCar(params).then(res=>{
						if(res.code === 200){
							 this.total= res.total;
							 let arr = res.rows
							 arr.forEach(item=>{
							 	this.list.push(item)
							 })
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
							 this.list.forEach(item=>{
							 	if(item.carSystemTag){
							 		if(item.carSystemTag){
							 			if(item.carSystemTag.length > 2) {
							 				item.carSystemTag = item.carSystemTag.slice(0,2); 
							 			}else if(item.carSystemTag.length <= 2){
							 			    if(item.carUserTag) {
							 			    	const arr = item.carSystemTag.concat(item.carUserTag);
							 			    	if(arr.length > 2) {
							 			    		item.carSystemTag = arr.slice(0,2);
							 			    	} 
							 			    }
							 			} 
							 		}
								}
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			search(){
			    const params = Object.assign(this.form, {
					pageNum: 1,
					pageSize: 10
				});
					this.$u.api.sellCar(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total= res.total;
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
							 this.list.forEach(item=>{
								 if(item.carSystemTag){
									if(item.carSystemTag.length > 2) {
										item.carSystemTag = item.carSystemTag.slice(0,2); 
									}else if(item.carSystemTag.length <= 2){
								        if(item.carUserTag) {
								        	const arr = item.carSystemTag.concat(item.carUserTag);
								        	if(arr.length > 2) {
								        		item.carSystemTag = arr.slice(0,2);
								        	} 
								        }
									} 
								 }							
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			pull() {
				let len = this.list.length;
				 if (len < this.total){
					 this.getList()
				 }else{
					this.status = 'nomore'
				}
			},
			onreachBottom() {
				this.pull()
			},
			clear() {
			   this.$u.route({url:'/pages/mymessage/mymessage',type:'switchTab'});
		    }
		}
	}
</script>
<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
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
		.last .lists:last-child {
			margin-bottom: 1000rpx;
		}
		.clear {
			clear: both;
		}
		.lists {
			width: 702rpx;
			// height: 308rpx;
			position: relative;
			.heart {
				margin-top: 14rpx;
				margin-right: 20rpx;
				position: absolute;
				top: 250rpx;
			    right: 0rpx;
			}
			.list {
				width: 702rpx;
				// height: 308rpx;
				padding: 18rpx 15rpx;
				margin-left: 24rpx;
				margin-top: 24rpx;
				font-size: 20rpx;
				background-image: url(@/static/bgcarsell.png);
				background-repeat: no-repeat;
				background-size: cover;
				.left, .right {
					float: left;
				}
				.right {
					width: 360rpx;
					padding-left: 34rpx;
				}
				.city {
					padding: 4rpx 14rpx;
					font-size: 20rpx;
					border-radius: 22rpx;
					border: 1rpx solid rgba(0,0,0,0.3);
					margin-top: 16rpx;
					margin-right: 16rpx;
					float: right;
				}
				.name {
					font-size: 28rpx;
					line-height: 34rpx;
					font-weight: 900;
					margin-top: 6rpx;
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
					margin-top: 6rpx;
				}
				.clock {
					margin-left: 30rpx;
					margin-top: 20rpx;
					margin-right: 4rpx;
					float: left;
				}
				.img {
					float: left;
					margin-top: 16rpx;
					margin-right: 4rpx;
				}
				.year {
					margin-top: 14rpx;
					margin-right: 50rpx;
					float: left;
				}
			}
		}
	}
</style>


