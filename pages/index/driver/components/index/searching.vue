<template>
	<view class="searching">
		<load-refresh
		  v-show="list.length"
		  ref="loadRefresh"
		  :pageNo='pageNum'
		  :totalPageNo='total'
		  :isRefresh="true"
		  refreshType="halfCircle"
		  refreshTime="1000"
		  color="#FF6501"
		  heightReduce="10"
		  backgroundCover="#F3F5F5"
		  @loadMore="loadMore" 
		  @refresh="refresh">
		  <view slot="content-list">
		    <view class="last">
		    	<view class="lists" v-for="(item, index) in list" :key="index">
		    		<view class="list" @click="detail(item.mainid)">
						<img style="width: 264rpx;height: 199rpx;" v-show="!item.photoUrl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif" alt="">
						<img style="width: 264rpx;height: 199rpx;" v-show="item.photoUrl" class="left" :src="item.photoUrl" alt="">
		    				<!-- <u-image class="left" width="264rpx" height="199rpx" :src="item.photoUrl"></u-image> -->
		    				<view class="right">
		    					<!-- <view class="tag">付费标签</view> -->
		    					<view v-show="item.workname == '网约车司机'" class="type">网约车</view>
		    					<view v-show="item.workname == '出租车司机'" class="type">出租车</view>
		    					<!-- <u-icon class="heart" name="heart-fill" color="#FCD03C" width="19" height="18"></u-icon> -->
		    					<view class="clear"></view>
		    					<view class="name u-line-2">高薪招聘{{item.workname}}</view>
		    					<!-- <u-icon class="car" name="car" width="22" height="22"></u-icon> -->
		    					<u-image class="car" width="22rpx" height="22rpx" src="@/static/pinpai.png"></u-image>
		    					<view class="distance u-line-1">{{item.intentionBrand}}</view>
		    					<view class="clear"></view>
		    				</view>
		    				<view class="clear"></view>
		    				<view class="box">
		    					<view><text>￥{{item.highmonthprice}}</text>月薪</view>
		    					<!-- <view class="case">自动挡</view>
		    					<view class="case">SUV</view>
		    					<view class="case">纯电动</view> -->
		    				</view>
		    		</view>
		    		<!-- <u-icon v-show="item.isCollection === 1" @click="cancel(item,item.companyMainId)" class="heart" name="heart-fill" color="#FCD03C" size="28"></u-icon> -->
		    		<!-- <u-icon v-show="item.isCollection === 2" @click="favorites(item,item.companyMainId)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
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
				  pageNum: 0, 
				  pageSize: 10
				},
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				iconType: 'flower',
				pageNum: 1
			}
		},
		props: {
			ids: {
			    type: String,
			    default: ''
			}
		},
		mounted() {
			this.pageNum = 1;
			this.getList()
		},
		methods: {
			// 上划加载更多
			      loadMore() {
					  this.getPage()
			        // 请求新数据完成后调用 组件内loadOver()方法
			        // 注意更新当前页码 currPage
			        this.$refs.loadRefresh.loadOver()
			      },
			// 下拉刷新数据列表
			refresh() {
				this.pageNum = 1;
			    this.getList()
			},
			// favorites(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 1,
			// 		collectionstate: 2,
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
			// 		collectionstate: 2,
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
			    	id: this.ids,
					pageNum: 1,
					pageSize: 10
			    }
					this.$u.api.detailOtherSearching(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total = Math.ceil(res.total/10);
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
							 this.list.forEach(item=>{
							    if (item.intentionBrand){
							       item.intentionBrand = item.intentionBrand.split(',').join('/')
							    }
							 								
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			getPage(){
				this.pageNum = this.pageNum + 1;
			    const params = {
			    	id: this.ids,
					pageNum: this.pageNum,
					pageSize: 10
			    }
					this.$u.api.detailOtherSearching(params).then(res=>{
						if(res.code === 200){
							 this.total = Math.ceil(res.total/10);
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
							    if (item.intentionBrand){
							       item.intentionBrand = item.intentionBrand.split(',').join('/')
							    }
							 								
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
		  clear() {
				this.$u.route("pages/mymessage/mymessage")
		  	},
			detail(id) {
				this.$u.route("/pages/mymessage/driver/components/index/jobSearchDetail",{id:id})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.searching {
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
				margin-top: 20rpx;
				background: #fff;
				.left {
					float: left;
					margin-left: 19rpx;
					margin-top: 20rpx;
				}
				.right{
					width: 396rpx;
					height: 226rpx;
					background: #fff;
					float: left;
					padding-left: 30rpx;
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
					width: 260rpx;
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
					padding: 4rpx;
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


