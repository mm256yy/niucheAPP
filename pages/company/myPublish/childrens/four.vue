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
		    <view class="scroll-item"  v-for="item in list" :key="item.askToShopId">
		    	<u-row class="" style="padding: 8pt 15pt;" >
		    		<u-col span="11" style="padding: 5pt 0;" @click="toView(item.askToShopId)">
		    			<view >{{item.refreshTime}}</view>
		    		</u-col>
		    		<u-col span="1" style="padding: 5pt 0;">
		    			<u-icon name="reload" color="#36AB62" size="40" @click="reload(item)"></u-icon>
		    		</u-col>
		    		<u-col span="12" @click="toView(item.askToShopId)" style="border-top: 1px solid #E5E5E5;padding: 8.5pt 0 10pt;">
		    			<view class="u-line-2" style="font-size: 12pt;font-weight: bold;" @click="toView(item.askToShopId)">
		    				求购：{{item.inviteCar}}</view>
		    			<view class="" style="padding-top: 8pt;">
		    				<text style="">打包价：</text><text style="color: #3FB26C;font-size: 16pt;">{{item.packprice}}</text>
		    			</view>
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
				list:[],
				total:0,
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
			getList(pageNum){
				this.$u.api.ComparyMyAskToShopList({pageNum:pageNum,pageSize:10,orderByColumn: 'refreshtime',
					isAsc: 'desc'}).then(res=>{
					if(res.code === 200){
						this.total = Math.ceil(res.total/10);
						let arr = res.rows
						if(pageNum === 1){
							arr.forEach(item=>{
								item.reloadFlag = true;
							})
							this.list = arr
						}else {
							arr.forEach(item=>{
								item.reloadFlag = true;
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
				this.$u.route("/pages/company/myPublish/qiugouView/qiugouView",{id:id,flag:true})
			},
			reload(item){
				item.reloadFlag = false
				this.$u.api.MyIssueRefresh({comparyMainId:item.comparyMainId,BusinessState:4}).then(res=>{
					if(res.code === 200){
						item.reloadFlag = true
						this.$u.toast('刷新成功')
					}else {
						item.reloadFlag = false
						 this.$u.toast(res.msg);
					}
				})
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
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		
	}
	.bottom-right{
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
	}
}

</style>
