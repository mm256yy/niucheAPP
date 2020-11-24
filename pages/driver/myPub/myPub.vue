<template>
	<view :class="'driver-content'"> 
		<view class="wrap">
		<u-navbar :back-text-style="backTextStyle"  back-icon-size="0" title="我的发布" 
		:background="backgroundDri" title-color="#FFFFFF">
		<view class="navbar-right">
			<view class="message-box right-item">
				<text  @click="toCenter">返回</text>
			</view>
		</view>
		</u-navbar>
		<view style="">
			<u-tabs-swiper ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<load-refresh
					  ref="loadRefresh"
					  :isRefresh="true"
					  refreshType="halfCircle"
					  refreshTime="1000"
					  color="#04C4C4"
					  heightReduce="10"
					  backgroundCover="#F3F5F5"
					  @loadMore="loadMore" 
					  @refresh="refreshed">
					  <view slot="content-list">
					    <view style="margin:10pt;background-color: #FFFFFF;" @click="toView(item)" v-for="item in zcList" :key="item.driverDemandId">
					    	<view class="card-head">
					    		<text style="color:#7E7E7E;">刷新时间:{{item.updateTimeStr}}</text><u-icon name="reload"
					    		 @click="refresh(item)" color="#FE9B1C" size="28"></u-icon>
					    	</view>
					    	<view class="card-head" style="border-bottom: 0;">
					           <text>意向品牌</text>
					    			<u-subsection style="" :current="item.isOpen" @change="switchChange(item)"
					    			 vibrateShort button-color="#FE9B1C" active-color="#fff" :list="['不公开', '公开']"></u-subsection>
					    	</view>
					    	<view  style="padding:5rpx 20rpx;">
					    	<u-tag :text="obj" type="info" style="color: #000000;" mode="plain" shape="circle" class="tag-style"
					    	 v-for="(obj,index) in item.carCardList" :key="index"/>
					    	</view>
					    </view>
					        <!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->
					  </view>
					</load-refresh>
				</scroll-view>
			</swiper-item>
			<!-- 我的招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottomed">
					<load-refresh
					  ref="loadRefresh"
					  :isRefresh="true"
					  refreshType="halfCircle"
					  refreshTime="1000"
					  color="#04C4C4"
					  heightReduce="10"
					  backgroundCover="#F3F5F5"
					  @loadMore="loadMore" 
					  @refresh="refreshed">
					  <view slot="content-list">
					    <view style="margin:10pt;background-color: #FFFFFF;" @click="toView2(item)" v-for="item in qzList" :key="item.id">
					    	<view class="card-head">
					    		<text style="color:#7E7E7E;">刷新时间:{{item.updateTimeStr}}</text>
					    		<u-icon name="reload" color="#FE9B1C" size="28"  @click="refresh(item)"></u-icon>
					    	</view>
					    	<view class="card-head" style="border-bottom: 0;">
					    		<view style="color: #000000;">
					    			  <view style="font-size: 16pt;">{{item.businessType == 1 ?'网约车':'出租车'}}</view>
					    			  <!-- <view class="u-line-2">工作车辆: {{item.carCards}}  </view> -->
					    		</view>
					            <view style="width: 50%;">
					    			<u-subsection style="width: 100%;" :current="item.isOpen" @change="switchChange(item)"
					    			 button-color="#FE9B1C" active-color="#fff" :list="['不公开', '公开']"></u-subsection>
					    			<view style="font-size: 14pt;color:#FE9B1C ;">¥{{item.monthprice | prices}}月薪</view>
					    		</view>
					    	</view>
					    </view>
					    		 <!-- <u-loadmore :status="status1" :icon-type="iconType" :load-text="loadText" /> -->
					  </view>
					</load-refresh>
				</scroll-view>
			</swiper-item>
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
				backTextStyle:{
					'color':'#ffffff'
				},
				list: [{
					name: '我的租车'
				}, {
					name: '我的求职'
				}],
				zcList:[],
				qzList:[],
				current: 0, 
				swiperCurrent: 0,
				pageNum:1,
				total:0,
				pageNum1:1,
				total1:0,
				status: 'loadmore',
				status1:'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				}
			}
		},
		onLoad(option) {
			let index  = Number(option.index);
			if(index){
			 this.current = index;
			 this.swiperCurrent = index;	
			}
		},
		onShow() {
			 this.init(this.current)
		},
		filters: {
		  prices: function (value) {
				if (value === 0) {
					return '6000以内'
				} else if (value === 1){
					return '6000-8000'
				} else if (value === 2){
					return '8000-10000'
				} else if (value === 3){
					return '10000以上'
				}else {
					return ''
				}
		  }
		},
		methods: {
			// 下拉刷新数据列表
			refreshed() {
			    this.init(this.current)
			},
			init(index){
				if (index === 0){
					this.zcList = [];
					this.getList(1)
				}else{
					this.qzList = [];
					this.getPageList(1)
				}
			},
			tabsChange(index) {
				this.swiperCurrent = index;
				this.init(index)
			},
			toCenter(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
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
			getList(pageNum){
				this.status = 'loading';
				this.$u.api.listUserWanted({pageNum:pageNum,pageSize:10,orderByColumn:'updateTime',isAsc:'desc'}).then(res=>{
					if(res.code === 200){
						this.total = res.total
						this.setList(res.rows);
						let len = res.rows.length;
						if(len<this.total){
							this.status = 'loadmore'
						} else{
							this.status = 'nomore'
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			getPageList(pageNum){
				this.status1 = 'loading';
				this.$u.api.listUserJobWanted({pageNum:pageNum,pageSize:10,orderByColumn:'updateTime',isAsc:'desc'}).then(res=>{
					if(res.code === 200){
						this.total1 = res.total
						this.setPageList(res.rows);
						let len = res.rows.length;
						if(len<this.total1){
							this.status1 = 'loadmore'
						} else{
							this.status1 = 'nomore'
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			setPageList(arr){
				arr.forEach(item=>{
					if (item.carCard){
						item.carCardList = item.carCard.split(',');
					}
					item.updateTimeStr = this.timeZ(item.updateTime)
					item.refreshFlag = true;
					item.switchFlag = true;
					this.qzList.push(item)
				})
				
			},
			setList(arr){
				arr.forEach(item=>{
					if (item.carCard){
						item.carCardList = item.carCard.split(',');
					}
					item.updateTimeStr = this.timeZ(item.updateTime)
					item.refreshFlag = true;
					item.switchFlag = true;
					this.zcList.push(item)
				})
				console.log(this.zcList)
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
			switchChange(item){
				item.switchFlag = false
				let isOpen = item.isOpen=== 0?1:0;
				this.$u.api.updateUserWantedState({driverDemandId:item.driverDemandId,isOpen:isOpen}).then(res=>{
					if(res.code === 200){
						item.switchFlag = true
						 this.$u.toast(res.msg);
					}else {
						this.$u.toast(res.msg);
					}
				})
			},
			refresh(item){
				item.refreshFlag = false
				this.$u.api.refreshUserJobWanted({driverDemandId:item.driverDemandId}).then(res=>{
					if(res.code === 200){
						item.refreshFlag = true;
						item.updateTimeStr = '刚刚'
						 this.$u.toast(res.msg);
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			toView(item){
				//判断点击的不是刷新或开关
				if (item.refreshFlag && item.switchFlag){
					this.$u.route("/pages/driver/myPub/children/children",{id:item.driverDemandId})
				}
			},
			toView2(item){
				//判断点击的不是刷新或开关
				if (item.refreshFlag && item.switchFlag){
					//我的求职
					this.$u.route("/pages/driver/myPub/children/index",{id:item.driverDemandId})
				}
			},
			onreachBottom() {
                 let len = this.zcList.length;
				 if (len < this.total){
					let page = this.pageNum+1;
					 this.getList(page)
				 }else{
					this.status = 'nomore'
				}
			},
			onreachBottomed() {
				let len = this.qzList.length;
				if (len < this.total1){
				let page = this.pageNum1+1;
				  this.getPageList(page)
				} else{
					this.status1 = 'nomore'
				}
			}
		},
	}
</script>
<style lang="scss">
	page{
		background-color:#f5f5f8 ;
	}
</style>
<style lang="scss" scoped>

.driver-content{
	.u-tabs{
		background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
	}
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
/deep/ .u-subsection{
	// padding: 0!important;
	width:45%;
	border-radius: 20px!important;
}
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
background: #fff;margin: 20rpx;padding-top: 30rpx;

}
 .u-card-wrap {
 	background-color: $u-bg-color;
 	padding: 1px;
 }
 .card-head{
 	display: flex;justify-content: space-between;
 	align-items: center;
	border-bottom: 1px solid #E5E5E5;
	padding:20rpx 20rpx;
 }
.tag-style{
	background-color: #FFFFFF;
	margin-right: 8pt;margin-bottom: 5pt;
}
	.navbar-right {
		// margin-left: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	
</style>
