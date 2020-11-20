<template>
	<view class="renting">
		<view class="last">
			<view class="lists" v-for="(item, index) in list" :key="index">
				<view class="list" @click="detail(item.id)">
					<view class="right">
						<view class="name u-line-2">
						  <text v-show="item.businesstypetag == 1">[网约车]</text>
						  <text v-show="item.businesstypetag == 2">[出租车]</text>
						{{item.cartext}}</view>
						<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
						<view class="year">{{item.carage}}</view>
						<view class="clear"></view>
						<u-image class="car" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
						<view class="distance">{{item.carkm}}万公里</view>
						<view class="clear"></view>
					</view>
					<u-image class="left" width="306rpx" height="226rpx" :src="item.onephoto"></u-image>
					<view class="clear"></view>
					<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
					<view class="box">
						<view><text>￥{{item.carrentprice}}</text>元/月起租</view>
						<view>
							<view v-for="(items, index) in item.systemok" :key="index" class="case">{{items}}</view>
						</view>
					</view>
				</view>
				<!-- <u-icon v-show="item.iscollection === 1" @click="cancel(item,item.id)" class="heart" name="heart-fill" color="#FCD03C" size="28"></u-icon> -->
				<!-- <u-icon v-show="item.iscollection === 2" @click="favorites(item,item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
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
				  pageNum: 0, 
				  pageSize: 10
				},
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				iconType: 'flower'
			}
		},
		props: {
			id: {
			    type: String,
			    default: ''
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			// favorites(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 1,
			// 		collectionstate: 1,
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
			// 		isDriveAndCompary: 1,
			// 		collectionstate: 1,
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
			    	id: this.id,
					pageNum: 1,
					pageSize: 10
			    }
					this.$u.api.detailOtherRenting(params).then(res=>{
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
			    	id: this.id,
					pageNum: this.pagination.pageNum + 1,
					pageSize: 10
			    }
					this.$u.api.detailOtherRenting(params).then(res=>{
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
		  clear() {
				this.$u.route("pages/mymessage/mymessage")
		  	}
		}
	}
</script>
<style lang="scss" scoped>
	.renting {
		.last .lists:last-child {
			margin-bottom: 90rpx;
		}
		.clear {
			clear: both;
		}
		.lists {
			width: 679rpx;
			// height: 285rpx;
			position: relative;
			.heart {
				position: absolute;
				margin-top: 14rpx;
				margin-right: 20rpx;
				position: absolute;
				top: 2rpx;
			    right: -36rpx;
			}
			.list{
				width: 679rpx;
				// height: 285rpx;
				color: #000;
				font-size: 20rpx;
				margin-left: 36rpx;
				margin-top: 40rpx;
				background: #fff;
				.left {
					float: right;
					margin-top: 20rpx;
					margin-bottom: 6rpx;
				}
				.right{
					width: 363rpx;
					height: 226rpx;
					padding: 0 30rpx;
					background: #fff;
					float: left;
				}
				.name {
					font-weight: 900;
					font-size: 34rpx;
					margin-top: 20rpx;
					margin-bottom: 6rpx;
				}
				.clock,.year {
					float: left;
					margin-top: 6rpx;
				}
				.clock {
					margin-top: 18rpx;
					color: #7f7f7f;
				}
				.car {
					float: left;
					margin-top: 14rpx;
				}
				.year {
					margin-left: 6rpx;
					margin-top: 12rpx;
					color: #7f7f7f;
				}
				.distance {
					margin-left: 6rpx;
					margin-top: 12rpx;
					color: #7f7f7f;
					float: left;
				}
				.box {
					width: 679rpx;
					height: 59rpx;
					background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
					padding: 0 0 0 18rpx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view {
						font-size: 20rpx;
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
						margin-right: 10rpx;
						float: left;
					}
				}
			}
		}
	}
</style>


