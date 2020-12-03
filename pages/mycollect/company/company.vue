<template>
	<view class="company-content"> 
		<view class="wrap">
		<u-navbar  back-icon-size="0" title="在售" :background="backgroundCom" title-color="#FFFFFF"></u-navbar>
<!-- 		<view style="">
			<u-tabs-swiper style="position: fixed;" ref="uTabs" activeColor="#ffffff" :list="tablist" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view> -->
		<!-- <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"> -->
			<!-- <swiper-item class="swiper-item"> -->
			    <load-refresh
				v-show="list.length"
			      ref="loadRefresh"
			      :isRefresh="true"
			      refreshType="halfCircle"
			      refreshTime="1000"
			      color="#04C4C4"
			      heightReduce="10"
			      backgroundCover="#F3F5F5"
			     :pageNo="pageNum"
			     :totalPageNo="total"
			     @loadMore="loadMoreList" 
			     @refresh="refresh">
			      <view slot="content-list">
			        <scroll-view scroll-y style="height: 100%;width: 100%;">
			        	<view class="scroll-item" @click="toView(item)" v-for="(item,index) in list" :key='item.demandid'>
			        		<view class="time">
			        			<view class="padding15">{{item.comparyArea}}</view>
			        		</view>
			        		<view class="img">
			        			<view><image :src="item.photoUrl" mode="aspectFit"></image></view>
			        		</view>
			        		<view class="border-left">
			        			<view class="title u-line-2">{{item.carText}}</view>
			        			<view class="type"><text>打包价</text><text class="type-money">￥{{item.packprice}}</text></view>
			        			<view class="u-line-1"><u-tag :text="it" type="success" mode="dark" v-for="(it,i) in item.carSystemTag" 
			        			:key="i" class="tag-style" v-show="it.length<7"/></view>
			        		</view>
			        		<view class="bottom">
			        	        <view class="bottom-left"><u-icon size="32" name="clock"></u-icon>{{item.carAge}}</view>
			        	        <view class="bottom-right"><u-icon size="30" style="vertical-align: bottom;":name="distance"></u-icon>{{item.km}}</view>
			        			<u-icon name="heart-fill" color="#3FB26C" size="36" @click="collectOr(item,index)"></u-icon>
			        		</view>
			        	</view>
			        		 <!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->
			        </scroll-view>
			      </view>
			    </load-refresh>
				<view class="null" v-show="!list.length">
					<view>
						<u-image width="371" height="171rpx" src="@/static/null.png"></u-image>
						<view style="width: 371rpx;text-align: center;margin-top: 20rpx;">亲，当前空空如也</view>
					</view>
				</view>
			<!-- </swiper-item> -->
			<!-- 我的招聘 -->
		<!-- 	<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom1">
				<load-refresh
				  ref="loadRefresh"
				  :isRefresh="true"
				  refreshType="halfCircle"
				  refreshTime="1000"
				  color="#04C4C4"
				  heightReduce="10"
				  backgroundCover="#F3F5F5"
				  @loadMore="loadMore" 
				  @refresh="refresh">
				  <view slot="content-list">
				    <view class="scroll-item" @click="toView1(item)" v-for="item in list1" :key='item.demandid'>
				    		<view class="zplist">
				    			<view style="padding: 5pt 0;">
				    				<text class="zplist-time">刷新时间：{{item.refreshtimeStr}}</text>
				    				<u-icon name="heart-fill" color="#36AB62" size="40" @click="collectOr1(item,index)"></u-icon>
				    			</view>
				    			<view class="zplist-carName">
				    				<view class="zplist-qg u-line-1">求购：{{item.intentioncarbrandnum}}辆 {{item.teXtTile}}</view>
				    				<view style="color: #7F7F7F;padding-top: 5pt;">
				    					<text>{{item.comparyName}}</text><text style="padding-left: 10pt;">{{item.comparyArea}}</text>
				    				</view>
				    				<view>
				    					<text>打包价：</text><text class="zplist-price">{{item.packprice}}</text>
				    				</view>
				    			</view>
				    		</view>
				    	</view>
				    			<u-loadmore :status="status1" :icon-type="iconType" :load-text="loadText" />
				    </scroll-view>
				  </view>
				</load-refresh>
			</swiper-item> -->
		</swiper>
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
				tablist: [{
					name: '在售'
				}],
				distance:'../../static/distance.png',
				current: 0,
				swiperCurrent: 0,
				pageNum:0,
				pageNum1:0,
				list:[],
				list1:[],
				total:0,
				total2:0,
				status: 'loadmore',
				status1: 'loadmore',
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
			if (token){
				this.init()
			}
		},
		onShow() {
			this.pageNum = 1;
		},
		methods: {
			// 下拉刷新数据列表
			refresh() {
			    let token = uni.getStorageSync('token');
			    if (token){
			    	this.getList(1)
			    }
			},
			tabsChange(index) {
				this.swiperCurrent = index;
				console.log(index)
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			init(){
				this.pageNum = 1;
				this.list = [];
				// this.list1 = [];
				this.getList(1)
				// this.getList1(1)
			},
			collectOr(item,index){
				item.collectFlag = false;
				const params = {
				     BeCollectedId: item.comparymainid,
				     isDriveAndCompary: 2,//公司2
				     collectionstate: 3,
				     iscollection: 0
				    };
				   this.$u.api.collect(params).then(res=>{
					if(res.code === 200){
						this.list.splice(index,1)
						item.collectFlag = true;
					   this.$u.toast('取消收藏成功');
					}else {
					  item.collectFlag = false;
					  this.$u.toast(res.msg);
					}
				   })
			},
			collectOr1(item,index){
				item.collectFlag = false;
				const params = {
				     BeCollectedId: item.comparymainid,
				     isDriveAndCompary: 2,//公司2
				     collectionstate: 4,
				     iscollection: 0
				    };
				   this.$u.api.collect(params).then(res=>{
					if(res.code === 200){
						this.list1.splice(index,1)
						item.collectFlag = true;
					  this.$u.toast('取消收藏成功');
					}else {
					  this.$u.toast(res.msg);
					}
				   })
			},
			getList(pageNum){
				this.$u.api.MyCollectionSell({pageNum:pageNum,pageSize:10,isSellAndAsktoShop:3}).then(res=>{
					if(res.code === 200){
						this.total = Math.ceil(res.total/10);
						let arr = res.rows
						if(pageNum === 1){
							this.list = res.rows
							this.list.forEach(item=>{
								item.collectFlag = true;
							})
						}else {
							arr.forEach(item=>{
								item.collectFlag = true;
								this.list.push(item)
							})
							this.$refs.loadRefresh.loadOver()
							this.pageNum =pageNum
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			getList1(pageNum){
				this.status1 = 'loading';
				this.$u.api.MyCollectionSell({pageNum:pageNum,pageSize:10,isSellAndAsktoShop:4}).then(res=>{
					if(res.code === 200){
						this.total2 = res.total
						let arr = res.rows
						arr.forEach(item=>{
							item.collectFlag = true;
							item.refreshtimeStr = this.timeZ(item.refreshtime)
							this.list1.push(item)
						})
						let len = this.list1.length;
						if(len<this.total2){
							this.status1 = 'loadmore'
						} else{
							this.status1 = 'nomore'
						}
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
					// console.log(timeDiff)
				 }
			},
			toView(item){
				if (item.collectFlag){
					this.$u.route("/pages/mymessage/company/components/index/carSellDetail",{id:item.demandid})
				}
			},
			toView1(item){
				if (item.collectFlag){
					this.$u.route("/pages/mymessage/company/components/index/buyingDetail",{id:item.demandid})
				}
			},
			loadMoreList(){
				let pageNo = this.pageNum+1
				this.getList(pageNo)
			},
		}
	}
</script>

<style lang="scss">
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
</style>
<style lang="scss" scoped>
	.company-content{
		.u-tabs{
			background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
		}
		// padding-bottom: 10px;
	}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
	margin-top: 80rpx;
}
.swiper-item {
	height: 100%;
}
.null{
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}
.scroll-item{
	background: #fff;margin: 20rpx;padding-top: 10rpx;
	border-radius: 40rpx;
	box-shadow: 0px 0px 18px 0px rgba(69, 183, 114, 0.24);
    .time{
		font-weight: bold;
		text-align: right;
	}
	.padding15{
		padding-right: 15pt;
	}
	.img{
		display: inline-block;width:40% ;
		border-right: 1px solid #CDE5E3;
		text-align: center;
		margin-bottom: 5pt;
	}
	image {
		width: 220rpx;
		height: 220rpx;
		border-radius: 10rpx;
	}
	.border-left{
		padding-left: 30rpx;
		display: inline-block;width:55% ;
	}
	.title{
		font-weight: bold;
		font-size: 12pt;
	}
	.type{
		padding-top: 10rpx;
	}
	.type-money{
		font-size: 14pt;
		color: #40B36C;
	}
	.bottom{
		background-color: #CDE5E3;
		padding: 5px;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}
	.bottom-left{
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		width: 35%;
		display: inline-block;
		
	}
	.bottom-right{
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
		width: 50%;
		display: inline-block;
	}
	.zplist{
		padding: 8pt 10pt;
	}
	.zplist-time{
		width: 90%;display: inline-block;
	}
	.zplist-carName{
		border-top: 1px solid #E5E5E5;padding-top: 8pt;
	}
	.zplist-qg{
		font-size: 14pt;font-weight: bold;
	}
	.zplist-price{
		color: #40B36C;font-size: 18pt;
	}
	.tag-style{
		margin-right: 5pt;margin-bottom: 3pt;
	}
}



	
</style>
