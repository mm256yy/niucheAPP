<template>
	<view class="message">
		<u-navbar back-text="返回" back-icon-size="0" title="我的通知" title-width="300" height='44' title-color="#000000">
		</u-navbar>
		<scroll-view scroll-y style="height: 100%;width: 100%;">
						 <load-refresh
						   ref="loadRefresh"
						   :pageNo='pageNum'
						   :totalPageNo='total'
						   :isRefresh="true"
						   refreshType="halfCircle"
						   refreshTime="1000"
						   color="#04C4C4"
						   heightReduce="10"
						   backgroundCover="#F3F5F5" 
						   @refresh="refresh">
						   <view slot="content-list">
						     <view v-if="item.state==2" class="contentno" v-for="(item, index) in list" :key="index">
						     	<view class="list">
						     		<view style="width: 14rpx;height: 14rpx;border-radius: 50%;background-color: #ff5644;"></view>
						     		<view class="title">{{item.title}}</view>
						     		<view class="time">{{item.begintime}}</view>
						     	</view>
						     	<view class="text">{{item.content}}</view>
						     </view>
						     <view v-if="item.state==1" class="content" v-for="(item, index) in list" :key="index">
						     	<view class="list">
						     		<view class="title">{{item.title}}<text class="time">{{item.begintime}}</text></view>
						     	</view>
						     	<view class="text">{{item.content}}</view>
						     </view>
						   </view>
						   </load-refresh>
		</scroll-view>
	</view>
</template>

<script>
	import {format} from '@/common/rule.js'
	export default {
		data() {
			return {
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				list: [],
				pageNum: 1,
				total:0
			}
		},
		mounted() {
			this.getList();
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
			getList(){
				this.$u.api.viewMessage(this.pagination).then(res=>{
					if(res.code === 200){
						 this.list = res.rows;
						 this.total = Math.ceil(res.total/10);
						 this.list.forEach(item=>{
						 	item.begintime = format(item.begintime, 'yyyy-MM-dd HH:mm')
						 })
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			getPage(){
				this.pageNum = this.pageNum + 1;
				this.$u.api.viewMessage({
					pageNum: this.pageNum,
					pageSize: 10
				}).then(res=>{
					if(res.code === 200){
						this.total = Math.ceil(res.total/10);
						let arr = res.rows
						arr.forEach(item=>{
							this.list.push(item)
						})
						 this.list.forEach(item=>{
						 	item.begintime = format(item.begintime, 'yyyy-MM-dd HH:mm')
						 })
					}else {
						 this.$u.toast(res.msg);
					}
				})
			}
	    },
	}
</script>
<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
  .message{
	  display: flex;
	  flex-direction: column;
	  height: calc(100vh - var(--window-top));
	  width: 100%;
	  .content{
	  		  width: 100%;
	  		  border-radius: 30rpx;
	  		  background-color: #fff;
	  		  padding: 30rpx;
	  		  display: flex;
	  		  flex-direction: column;
			  margin-top: 20rpx;
	  		 .list{
	  			 display: flex;
	  			 align-items: center;
	  			 margin-top: 20rpx;
	  			 font-family: PingFangSC-Medium, PingFang SC;
	  			 .title{ 
	  				 font-size: 30rpx;
	  				 font-weight: 900;
	  				 color: #666666;
	  				 margin-left: 12rpx;
	  				 margin-right: 20rpx;
	  			 }
	  			 .time{
	  				font-size: 24rpx;
	  				font-weight: 400;
	  				color: #C7C7C7;
					margin-left: 40rpx;
	  			 }
	  		 }
	  		 .text{
	  		 				font-size: 26rpx;
	  		 				font-weight: 500;
	  		 				color: #999999;
	  		 				margin-top: 20rpx;
	  		 }
	  }
	  .contentno{
	  		  width: 100%;
	  		  border-radius: 30rpx;
	  		  background-color: #fff;
	  		  padding: 30rpx;
	  		  display: flex;
	  		  flex-direction: column;
	  		  margin-top: 20rpx;
	  		 .list{
	  			 display: flex;
	  			 align-items: center;
	  			 margin-top: 20rpx;
	  			 font-family: PingFangSC-Medium, PingFang SC;
	  			 .title{ 
	  				 font-size: 30rpx;
	  				 font-weight: 900;
	  				 color: #111111;
	  				 margin-left: 12rpx;
	  				 margin-right: 20rpx;
	  			 }
	  			 .time{
	  				font-size: 24rpx;
	  				font-weight: 400;
	  				color: #C7C7C7; 
	  			 }
	  		 }
	  		 .text{
	  		 				font-size: 26rpx;
	  		 				font-weight: 500;
	  		 				color: #666666;
	  		 				margin-top: 20rpx;
	  		 }
	  }
  }
</style>


