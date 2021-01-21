<template>
	<view>
		<load-refresh
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
		    <view class="scroll-item" @click="toView(item.rentCarId)" v-for="(item,index) in list" :key="item.index">
		    	<u-row>
					<u-col span="5" class="time">
						<view v-show="item.collectunit == 2" style="text-align: center;" class="success">审核成功</view>
						<view v-show="item.collectunit == 1" style="text-align: center;" class="auditing">审核中</view>
						<view v-show="item.collectunit == 3" style="text-align: center;" class="refuse">审核驳回</view>
					</u-col>
		    		<u-col span="7" class="time">
		    			<view style="padding-right: 10pt;">{{item.refreshTime}}</view>
		    		</u-col>
		    		<u-col span="5" @click="toView(item.rentCarId)">
		    			<view style="text-align: center;"><image :src="item.photoUrl" mode="aspectFit"></image></view>
		    		</u-col>
		    		<u-col span="6" class="border-left" @click="toView(item.rentCarId)">
		    			<view class="title u-line-2">{{item.textTitle}}</view>
		    			<view class="type"><text class="type-money">￥{{item.rentCarPrice}}</text>元/月起售</view>
		    		</u-col>
		    		<u-col span="12" class="bottom">
		    			<view class="bottom-left"><u-icon size="32" name="clock"></u-icon>{{item.carAgeTag}}</view>
		    			<view class="bottom-right"><u-icon size="30" style="vertical-align: bottom;":name="distance"></u-icon>{{item.priceTag}}</view>
		    		</u-col>
		    	</u-row>
		    </view>
		    	 <!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->
		  </view>
		</load-refresh>
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
				pageNum:1,
				distance:'../../../static/distance.png',
				list:[],
				total:0,
				auditOption: [
					{
						label: '审核中',
						value: '1'
					},
					{
						label: '审核通过',
						value: '2'
					},
					{
						label: '审核驳回',
						value: '3'
					}
				],
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			// 下拉刷新数据列表
			refresh() {
			    this.getList(1)
			},
			init(){
				this.pageNum =1;
				this.list = [];
				this.getList(1)
			},
			loadMoreList(){
				let pageNo = this.pageNum+1
				this.getList(pageNo)
			},
			getList(pageNum){
				this.$u.api.ComparyMySellCarList({pageNum:pageNum,pageSize:10,orderByColumn: 'refreshtime',
					isAsc: 'desc'}).then(res=>{
					if(res.code === 200){
						this.total = Math.ceil(res.total/10);
						let arr = res.rows
						if(pageNum === 1){
							this.list = arr
						}else {
							arr.forEach(item=>{
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
			toView(id){
				this.$u.route("/pages/mymessage/company/components/index/carSellDetail",{id:id,flag:true})
			},
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
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.scroll-item{
	background: #fff;margin: 20rpx;padding-top: 10rpx;
	border-radius: 40rpx;
	box-shadow: 0px 0px 18px 0px rgba(69, 183, 114, 0.24);
    .time{
		font-weight: bold;
		text-align: right!important;
	}
	image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	.border-left{
		border-left: 1px solid #e5e5e5;
		padding-left: 30rpx!important;
	}
	.title{
		font-weight: bold;
		font-size: 12pt;
	}
	.type{
		padding-top: 10rpx;
	}
	.type-money{
		color: #40B36C;
	}
	.bottom{
		background-color: #CDE5E3;
		padding: 5px!important;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}
	.bottom-left{
		display: inline-block;
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		
	}
	.bottom-right{
		display: inline-block;
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
	}
	.success{
		width: 162rpx;
		height: 54rpx;
		text-align: right;
		line-height: 54rpx;
		padding-right: 10rpx;
		background-image: url(@/static/success.png);
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 26rpx;
		color: #fff;
		margin-top: 20rpx;
		margin-left: 56rpx;
	}
	.auditing{
		width: 162rpx;
		height: 54rpx;
		text-align: right;
		line-height: 54rpx;
		padding-right: 20rpx;
		background-image: url(@/static/auditing.png);
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 26rpx;
		color: #fff;
		margin-top: 20rpx;
		margin-left: 56rpx;
	}
	.refuse{
		width: 162rpx;
		height: 54rpx;
		text-align: right;
		line-height: 54rpx;
		padding: 0 20rpx 0 50rpx;
		background-image: url(@/static/refuse.png);
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 26rpx;
		color: #fff;
		margin-top: 20rpx;
		margin-left: 56rpx;
	}
}

</style>
