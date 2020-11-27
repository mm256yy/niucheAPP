<template>
	<view class="buy">
		<load-refresh
		  v-show="list.length"
		  ref="loadRefresh"
		  :pageNo='pageNum'
		  :totalPageNo='Math.ceil(this.total/10)'
		  :isRefresh="true"
		  refreshType="halfCircle"
		  refreshTime="1000"
		  color="#04C4C4"
		  heightReduce="10"
		  backgroundCover="#F3F5F5"
		  @loadMore="loadMore" 
		  @refresh="refresh">
		  <view slot="content-list">
		    <view class="last">
		    	<view class="lists" v-for="(item, index) in list" :key="index">
		    		<view class="list" @click="detail(item.askToShopId)">
		    			<view class="year">刷新时间：{{item.refreshtimeStr}}</view>
		    			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    			<view class="clear"></view>
		    			<u-image class="left" width="125rpx" height="125rpx" :src="item.photoUrl"></u-image>
		    			<view class="right">
		    				<view class="name u-line-1">求购:{{item.intentioncarbrandnum}}辆{{item.teXtTile}}</view>
		    				<view class="type">{{item.comparyname}}<text>{{item.area}}</text></view>
		    				<view class="price">打包价:<text>{{item.packprice}}</text></view>
		    				<!-- <u-image class="chat" width="38rpx" height="32rpx" src="@/static/chat.png"></u-image> -->
		    			</view>
		    			<view class="clear"></view>
		    		</view>
		    		<!-- <u-icon v-show="item.iscollection === 1" @click="cancel(item,item.demandid)" class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    		<!-- <u-icon v-show="item.iscollection === 2" @click="favorites(item,item.demandid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
		    	</view>
		    </view>
		    <!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->
		  </view>
		</load-refresh>
		<view class="null" v-show="!list.length">
			<view>
				<u-image width="371" height="171rpx" src="@/static/null.png"></u-image>
				<view style="width: 371rpx;text-align: center;margin-top: 20rpx;">亲，当前空空如也</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default {
		components: {
			loadRefresh
		},
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
				},
				pageNum: 1
			}
		},
		mounted() {
			this.pageNum = 1;
			let token = uni.getStorageSync('token');
			if(token){
				this.getList()
			}
		},
		methods: {
			// 上划加载更多
			      loadMore() {
			        let token = uni.getStorageSync('token');
			        if(token){
			        	this.getPage()
			        }
			        // 请求新数据完成后调用 组件内loadOver()方法
			        // 注意更新当前页码 currPage
			        this.$refs.loadRefresh.loadOver()
			      },
			// 下拉刷新数据列表
			refresh() {
			    let token = uni.getStorageSync('token');
			    if(token){
					this.pageNum = 1;
			    	this.getList()
			    }
			},
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
			getPage(){
				this.pageNum = this.pageNum + 1;
				const params = {
					pageNum: this.pageNum,
					pageSize: 10
				}
					this.$u.api.ComparyMyAskToShopList(params).then(res=>{
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
							 	if (item.refreshtime){
							 		item.refreshtimeStr = this.timeZ(item.refreshtime)
							 	}
							 								
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
		    getList(){
		        const params = {
		    		pageNum: 1,
		    		pageSize: 10
		    	}
		    		this.$u.api.ComparyMyAskToShopList(params).then(res=>{
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
		    				 	if (item.refreshtime){
									let date = new Date(item.refreshtime)
		    				 		item.refreshtimeStr = this.timeZ(date.getTime())
		    				 	}
		    				 								
		    				 })
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
			timeZ(value){
				let nowTime = new Date().getTime();
				let oneDay= 86400000;
				let timeDiff = nowTime-value;//时间差
				let tian =parseInt(timeDiff/oneDay);
				let day6 = oneDay*6;
				if(timeDiff>day6){
					return this.$u.timeFormat(value, 'yyyy-mm-dd');
				} else if (timeDiff>oneDay && timeDiff < day6){
					return tian+"天前"
				} else if (timeDiff<oneDay){
					return '刚刚'
				} else {
					console.log(timeDiff)
				 }
			},
			detail(id) {
				this.$u.route("/pages/mymessage/company/components/index/buyingDetail",{id:id})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.buy {
		.null{
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
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
				top: 24rpx;
			    right: 0rpx;
			}
			.list {
				width: 702rpx;
				height: 286rpx;
				padding: 38rpx;
				margin-left: 24rpx;
				margin-top: 24rpx;
				font-size: 20rpx;
				background-image: url(@/static/bgrentcar.png);
				background-repeat: no-repeat;
				background-size: cover;
				.left {
					margin-top: 10rpx;
				}
				.left, .right {
					float: left;
				}
				.right {
					width: 494rpx;
					padding-left: 34rpx;
					.chat {
						float: right;
						margin-top: 6rpx;
					}
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
				.type {
					font-size: 20rpx;
					color: #7f7f7f;
					margin-top: 8rpx;
				}
				.type text {
					margin-left: 22rpx;
				}
				.price {
					margin-top: 9rpx;
				}
				.price text {
					font-size: 36rpx;
					font-weight: 900;
					color: #40B36C;
					margin-left: 8rpx;
				}
				.year {
					float: left;
				}
			}
		}
	}
</style>


