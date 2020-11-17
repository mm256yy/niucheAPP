<template>
	<view class="renting">
		 <view class="last">
		 	<view class="lists" v-for="(item, index) in list" :key="index">
		 		<view class="list" @click="detail(item.demandid)">
		 			<u-image class="left" width="312rpx" height="231rpx" :src="item.photoUrl"></u-image>
		 			<view class="right">
						<view v-show="item.businesstype == 1" class="city">网约车</view>
						<view v-show="item.businesstype == 2" class="city">出租车</view>
		 				<view class="clear"></view>
		 				<view class="name u-line-2">{{item.textTitle}}</view>
		 				<view class="price">打包价<text>{{item.rentCarPrice}}</text></view>
		 				<view v-for="(items, index) in item.systemok" :key="index" class="case">{{items}}</view>
		 			</view>
		 			<view class="clear"></view>
		 			<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
		 			<view class="year">{{item.carAgeTag}}</view>
		 			<u-image class="img" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
		 			<view class="year">{{item.priceTag}}</view>
					<view class="clear"></view>
		 			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		 		</view>
		 		<!-- <u-icon v-show="item.iscollection === 1" @click="cancel(item,item.demandid)" class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		 		<!-- <u-icon v-show="item.iscollection === 2" @click="favorites(item,item.demandid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
		 	</view>
		 </view>
		 <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
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
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				}
			}
		},
		mounted() {
			let token = uni.getStorageSync('token');
			if(token){
				this.getList()
			}
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
		        const params = {
					pageNum: 1,
					pageSize: 10
		    	}
		    		this.$u.api.ComparyMyRentCarList(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
							 this.total = res.total;
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
							 this.list.forEach(item=>{
							    if(item.systemok){
							        if(item.systemok.length > 2) {
							        	item.systemok = item.systemok.slice(0,2); 
							        }else if(item.systemok.length <= 2){
							        	if(item.userok) {
							        		const arr = item.systemok.concat(item.userok);
							        		if(arr.length > 2) {
							        			item.systemok = arr.slice(0,2);
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
			getPage(){
			    const params = {
					pageNum: this.pagination.pageNum + 1,
					pageSize: 10
				}
					this.$u.api.ComparyMySellCarList(params).then(res=>{
						if(res.code === 200){
							 this.total = res.total;
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
							    if(item.systemok){
							        if(item.systemok.length > 2) {
							        	item.systemok = item.systemok.slice(0,2); 
							        }else if(item.systemok.length <= 2){
							        	if(item.userok) {
							        		const arr = item.systemok.concat(item.userok);
							        		if(arr.length > 2) {
							        			item.systemok = arr.slice(0,2);
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
					 this.getPage()
				 }else{
					this.status = 'nomore'
				}
			},
			detail(id) {
				this.$u.route("/pages/mymessage/company/components/index/carSellDetail",{id:id})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.renting {
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
					margin-top: 18rpx;
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



