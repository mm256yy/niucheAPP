<template>
	<view class="search">
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
		    <view class="lists" v-for="(item, index) in list" :key="index">
		    	<view class="list" @click="detail(item.inviteId)">
		    		<view class="left">
		    			<view class="name">{{item.texttitle}}</view>
		    			<view class="car u-line-1">工作车辆：{{item.intentionBrand}}</view>
		    		</view>
		    		<view class="right">
		    			<view class="text">月薪</view>
		    			<view class="clear"></view>
		    			<view class="salary">￥{{item.monthprice}}</view>
		    			<view class="clear"></view>
		    		</view>
		    		<view class="clear"></view>
		    	</view>
		    	<view class="city">浙江-杭州</view>
		    	<view class="clear"></view>
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
		    getList(){
		        const params = {
		        	pageNum: 1,
		        	pageSize: 10
		        }
		    		this.$u.api.ComparyMyInviteList(params).then(res=>{
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
							 	if (item.intentionBrand){
							        item.intentionBrand = item.intentionBrand.join('/')
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
			    	pageNum: this.pageNum,
			    	pageSize: 10
			    }
					this.$u.api.ComparyMyInviteList(params).then(res=>{
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
							 	if (item.intentionBrand){
							        item.intentionBrand = item.intentionBrand.join('/')
							 	}
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			detail(id) {
				this.$u.route("/pages/company/myPublish/zhaopinView/zhaopinView",{id:id,show:false})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		.null{
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.clear{
			clear: both;
		}
		.lists{
			background: #fff;
			margin: 41rpx;
			.list {
				width: 672rpx;
				padding: 36rpx;
				font-size: 20rpx;
				border-bottom: 1rpx solid rgba(0,0,0,0.05);
				.left{
					width: 300rpx;
					float: left;
					.name{
						font-size: 36rpx;
						font-weight: 900;
						margin-bottom: 25rpx;
					}
					.car{
						width: 300rpx;
					}
				}
				.right{
					float: right;
					.text{
						float: right;
						margin-bottom: 25rpx;
						margin-top: 10rpx;
					}
					.salary{
						color: #40B36C;
						font-size: 36rpx;
						font-weight: 900;
						float: right;
					}
				}
			}
			.city{
				margin-top: 30rpx;
				float:right;
				margin-right: 60rpx;
				margin-bottom: 30rpx;
			}
		}
	}
</style>


