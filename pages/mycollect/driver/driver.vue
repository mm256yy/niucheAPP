<template>
	<view :class="'driver-content'"> 
		<view class="wrap">
		<u-navbar  back-icon-size="0" :back-text-style="backTextStyle" back-text="返回" title="收藏" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper style="position: fixed;" ref="uTabs" activeColor="#ffffff" :list="tablist" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
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
					    <view  @click="toView(item)" v-for="(item,index) in list" :key="item.id" style="margin:10pt;background-color: #FFFFFF;">
					      <view  style="padding:10rpx 20rpx;">
					    		<view class="u-body-item u-flex ">
					    		  <view class="u-line-4" style="width: 100%;">
					    			 <view class="u-line-2">{{item.texttitle}}</view>
					    			 <view style="color: #7F7F7F;">
					    				 <u-icon name="clock" size="28"></u-icon>
					    				 <text>{{item.carage}}</text>
					    			 </view>
					    			 <view style="color: #7F7F7F;">
					    				 
					    				  <!-- <u-icon :name="distance" style="vertical-align: middle;" size="30"></u-icon> -->
					    				  <text>{{item.carkm}}</text>
					    			 </view>
					    		  </view>
					    		   <view>
					    			   <view style="text-align: right;">
					    				  <u-tag :text="item.businesstype === 1?'网约车':'出租车'" type="info" class="tag-style" size="mini"/>
					    				  <u-icon name="heart-fill" color="#FE9B1C" size="28" @click="collectOr(item,index)"></u-icon>
					    			    </view>
					    		   	<image :src="item.photourl" mode="aspectFit"></image>
					    		   </view>
					    		</view>
					    	</view>
					    	<view class="bg-foot">
					    		<view style="color: #FFFFFF;">
					    		<text style="font-size: 16pt;">¥{{item.rentprice}}</text>
					    		<text style="font-size: 10pt;padding-left: 8pt;">月租</text>
					    		</view> 
					    		<view style="margin-top: 5pt;">
					    			<u-tag :text="it" type="warning" size="mini" v-for="(it,i) in item.systemtag"
					    			:key="i" class="tag-style" v-show="it.length<7"/>
					    		</view> 
					    	</view>
					    	
					    </view>
					  </view>
					</load-refresh>
					<view class="null" v-show="!list.length">
						<view>
							<u-image width="371" height="171rpx" src="@/static/null.png"></u-image>
							<view style="width: 371rpx;text-align: center;margin-top: 20rpx;">亲，当前空空如也</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 我的招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<load-refresh
					  v-show="list1.length"
					  ref="loadRefresh1"
					  :isRefresh="true"
					  refreshType="halfCircle"
					  refreshTime="1000"
					  color="#04C4C4"
					  heightReduce="10"
					  backgroundCover="#F3F5F5"
					  :pageNo="pageNum1"
					  :totalPageNo="total2"
					  @loadMore="loadMoreList" 
					  @refresh="refresh">
					  <view slot="content-list">
					    <view style="margin:10pt;background-color: #FFFFFF;"  @click="toView1(item)"  v-for="(item,index) in list1" :key="item.id">
					    	<view  style="padding:10rpx 20rpx;">
					    		<view class="u-body-item u-flex ">
					    			<image :src="item.photourl" mode="aspectFit"></image>
					    		  <view class="u-line-4" style="padding-left: 15pt;width: 100%;">
					    			  <view style="text-align: right;">
					    				  <u-tag :text="item.businesstype === 1?'网约车':'出租车'"  type="info" class="tag-style" size="mini"/>
					    				  <u-icon name="heart-fill" color="#FE9B1C" size="28" @click="collectOr1(item,index)"></u-icon>
					    			   </view>
					    			  <view class="u-line-2">{{item.texttitle}}</view>
					    			 <view style="color: #7F7F7F;" class="u-line-2"><u-icon name="tags" size="28"></u-icon>
					    			  <text v-for="(car,index) in item.intentionBrand" :key="index">{{car}} {{index>0?'/':''}}</text>
					    			 </view>
					    		  </view>
					    		</view>
					    	</view>
					    	<view class="bg-foot">
					    		<view style="color: #FFFFFF;">
					    		<text style="font-size: 16pt;">¥{{item.pay}}</text>
					    		<text style="font-size: 10pt;padding-left: 10pt;">月薪</text>
					    		</view> 
					    	</view>
					    </view>
					  </view>
					</load-refresh>
					<view class="null" v-show="!list1.length">
						<view>
							<u-image width="371" height="171rpx" src="@/static/null.png"></u-image>
							<view style="width: 371rpx;text-align: center;margin-top: 20rpx;">亲，当前空空如也</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	<!-- <Auth></Auth> -->
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
		import Auth from '@/components/auth.vue'
	export default {
		components: {
			loadRefresh,Auth
		},
		data() {
			return {
				backTextStyle:{'color':'#ffffff'},
				tablist: [{
					name: '租车'
				}, {
					name: '招聘'
				}],
				distance:'../../static/distance.png',
			    current: 0,
				swiperCurrent: 0,
				pageNum:1,
				pageNum1:1,
				list:[],
				list1:[],
				total:0,
				total2:0,
				}
			},
				mounted() {
					let token = uni.getStorageSync('token');
					if (token){
						this.init(this.current)
					}
				},
				methods: {
					// 下拉刷新数据列表
					refresh() {
					    let token = uni.getStorageSync('token');
					    if (token){
					    	if (this.swiperCurrent === 0){
					    		this.getList(1)
					    	} else {
					    		this.getList1(1)
					    	}
					    }
					},
					tabsChange(index) {
						this.swiperCurrent = index;
						this.init(index)
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
					init(index){
						this.pageNum =1
						this.pageNum1 = 1
						if (index === 0){
							this.list = [];
							this.getList(1)
						} else {
							this.list1 = [];
							this.getList1(1)
						}
					},
					collectOr(item,index){
						item.collectFlag = false;
						const params = {
						     BeCollectedId: item.pubMainComparyId,
						     isDriveAndCompary: 2,//公司2
						     collectionstate: 1,
						     iscollection: 0
						    };
						   this.$u.api.collect(params).then(res=>{
							if(res.code === 200){
								this.list.splice(index,1)
								item.collectFlag = true;
							   this.$u.toast('取消收藏成功');
							}else {
							  this.$u.toast(res.msg);
							}
						   })
					},
					collectOr1(item,index){
						item.collectFlag = false;
						const params = {
						     BeCollectedId: item.pubMainComparyId,
						     isDriveAndCompary: 2,//公司2
						     collectionstate: 2,
						     iscollection: 0
						    };
						   this.$u.api.collect(params).then(res=>{
							if(res.code === 200){
								this.list1.splice(index,1)
								item.collectFlag = true;
							  this.$u.toast('取消收藏成功');
							}else {
							 item.collectFlag = true;
							  this.$u.toast(res.msg);
							}
						   })
					},
		
					getList(pageNum){
						console.log(pageNum)
						this.$u.api.DriverMyCollectionRent({pageNum:pageNum,pageSize:10,IsRentCarAndInvite:1}).then(res=>{
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
						this.$u.api.DriverMyCollectionRent({pageNum:pageNum,pageSize:10,IsRentCarAndInvite:2}).then(res=>{
							if(res.code === 200){
								this.total2 = Math.ceil(res.total/10);
								let arr = res.rows
								if(pageNum === 1){
									this.list1 = res.rows
									this.list1.forEach(item=>{
										item.collectFlag = true;
									})
								} else {
									arr.forEach(item=>{
										item.collectFlag = true;
										this.list1.push(item)
									})
									this.$refs.loadRefresh1.loadOver()
									this.pageNum1 =pageNum
								}
							}else {
								 this.$u.toast(res.msg);
							}
						})
					},
					toView(item){
						if (item.collectFlag){
							this.$u.route("/pages/index/driver/components/index/carRentDetail",{id:item.pubMainComparyId})
						}
					},
					toView1(item){
						if (item.collectFlag){
							this.$u.route("/pages/mymessage/driver/components/index/jobSearchDetail",{id:item.pubMainComparyId})
						}
					},
					loadMoreList(){
						if(this.current === 0) {
							let pageNo = this.pageNum+1
							this.getList(pageNo)
						} else{
							let pageNo = this.pageNum1+1
							this.getList1(pageNo)
						}
					},
				}
			}
</script>
<style lang="scss">
.driver-content{
	.u-tabs{
		background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
	}
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
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
background: #fff;margin: 20rpx;padding-top: 30rpx;

}
 .u-card-wrap {
 	background-color: $u-bg-color;
 	padding: 1px;
 }
 .card-head{
 	background-color: #FE9B1C;padding:5pt 8pt;color: #FFFFFF;
 }
 .u-body-item {
 	font-size: 32rpx;
 	color: #333;
 	padding: 20rpx 10rpx;
 }
 .u-body-item image {
 	width: 180rpx;
 	flex: 0 0 180rpx;
 	height: 150rpx;
 	border-radius: 8rpx;
 	margin-left: 12rpx;
 }
 .bg-foot{
	 display: flex;justify-content: space-between;
	 align-items: center;
	 padding:10rpx 20rpx;
	 background-image: url(@/static/driver-bg.png);
	 background-repeat: no-repeat;
	 background-size: cover;
 }
.tag-style{
	background-color: #FFFFFF;
	margin-right: 8pt;margin-bottom: 5pt;
}

	
</style>
