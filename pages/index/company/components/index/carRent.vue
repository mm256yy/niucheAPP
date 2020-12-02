<template>
	<view class="carRent">
		<view class="middle-content">
			<!-- <u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item style="width:240rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="选择驾龄" @click="show = true" v-model="driverAgeKey" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:240rpx;margin-left:60rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="showType = true" v-model="businessTypeKey" type="select" /></u-form-item>
			</u-form>
			<view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select v-model="showType" mode="single-column" :list="selectType" @confirm="confirmType"></u-select> -->
			<u-dropdown>
				<u-dropdown-item @change="change()" v-model="form.driverAge" title="选择驾龄" :options="select"></u-dropdown-item>
				<u-dropdown-item @change="changeType()" v-model="businessType" title="业务类型" :options="selectType"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="tagBox">
			<view v-show="driverAgekey" class="selectTag">{{driverAgekey}}</view>
			<view v-show="businesstypekey" class="selectTag">{{businesstypekey}}</view>
			<view v-show="driverAgekey||businesstypekey" class="clearNull" @click="clear()">清空</view>
			<view class="clear"></view>
		</view>
		<view v-show="driverAgekey||businesstypekey" style="width: 100%;height: 50rpx;"></view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<load-refresh
		  style="margin-top: 80rpx;"
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
		    <view>
		    	<view class="list" v-for="(item, index) in list" :key="index" @click="detail(item.driverDemandId)">
		    		<u-image v-show="item.headphoto" shape="circle" class="left" width="190rpx" height="190rpx" :src="item.headphoto"></u-image>
		    		<u-image v-show="!item.headphoto" shape="circle" class="left" width="190rpx" height="190rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image>
		    		<!-- <u-image shape="circle" class="left" width="190rpx" height="190rpx" :src="item.headphoto"></u-image> -->
		    		<view class="right">
		    			<view class="time">刷新时间：{{item.updateTimeStr}}</view>
		    			<view class="clear"></view>
		    			<view class="name">{{item.drivername}}</view>
		    			<view class="year">驾龄{{item.driverAgeTag}}年</view>
		    			<view v-show="item.onlinecarcardis == 0" class="type">未认证</view>
		    			<view v-show="item.onlinecarcardis == 1"  class="type">网约车认证</view>
		    			<view v-show="item.onlinecarcardis == 2"  class="type">出租车认证</view>
		    			<view class="clear"></view>
		    			<u-image class="img" width="22rpx" height="22rpx" src="@/static/pinpai.png"></u-image>
		    			<view class="car u-line-1"> {{item.carCard}}</view>
		    			<view class="clear"></view>
		    			<!-- <u-image class="chat" width="38rpx" height="32rpx" src="@/static/chat.png"></u-image> -->
		    		</view>
		    	</view>
		    	<!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->
		    </view>
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
				show:false,
				showType:false,
				iconType: 'flower',
				// list: [{
				// 						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				// 					},
				// 					{
				// 						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
				// 						title: '身无彩凤双飞翼，心有灵犀一点通'
				// 					},
				// 					{
				// 						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
				// 						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				// 					}
				// 				],
				form: {
				  driverAge: '',
				  businessType: 0,
				  type: 1
				},
				driverAgekey: '',
				businesstypekey: '',
				businessType: '',
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				total: 0,
				select: [
					{
						label: '3年及以上',
						value: '3'
					},
					{
						label: '不限',
						value: '0'
					},
				],
				selectType: [
					{
						label: '网约车',
						value: '1'
					},
					{
						label: '出租车',
						value: '2'
					},
					{
						label: '不限',
						value: '0'
					}
				],
				list: [],
				status: 'loadmore',
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
			this.search()
		},
		methods: {
			page() {
			    this.pageNum = 1;	
			},
			// 上划加载更多
			      loadMore() {
			        this.getList()
			        // 请求新数据完成后调用 组件内loadOver()方法
			        // 注意更新当前页码 currPage
			        this.$refs.loadRefresh.loadOver()
			      },
			// 下拉刷新数据列表
			refresh() {
				this.pageNum = 1;
			    this.search()
			},
			change(){
				this.search()
				this.add()
			},
			changeType(){
				this.search()
				this.add()
			},
			add(){
				this.select.forEach(item=>{
					if(item.value === this.form.driverAge){
					    this.driverAgekey = item.label;
					}
				})
				this.selectType.forEach(item=>{
					if(item.value === this.businessType){
					    this.businesstypekey = item.label;
					}
				})
			},
			// transform(str) {
			// 	return str.replace(/,/g,'\');
			// },
			getList(){
				this.pageNum = this.pageNum + 1;
				this.form.businessType=this.businessType==''?0:this.businessType;
			    const params = Object.assign(this.form, {
			    	pageNum: this.pageNum,
			    	pageSize: 10,
					condition: this.form.driverAge ? 2:'',
					orderByColumn: 'a.updateTime',
					isAsc: 'desc'
			    });
					this.$u.api.askWork(params).then(res=>{
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
								 if (item.carCard){
									item.carCard = item.carCard.split(',').join('/')
								 }
								 if (item.updateTime){
								 	item.updateTimeStr = this.timeZ(item.updateTime)
								 }
								
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			search(){
				this.form.businessType=this.businessType==''?0:this.businessType;
			    const params = Object.assign(this.form, {
					pageNum: 1,
					pageSize: 10,
					condition: this.form.driverAge ? 2:'',
					orderByColumn: 'a.updateTime',
					isAsc: 'desc'
				});
				
					this.$u.api.askWork(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total = res.total;
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
							 this.list.forEach(item=>{
								 if (item.carCard){
									item.carCard = item.carCard.split(',').join('/')
								 }
								 if (item.updateTime){
								 	item.updateTimeStr = this.timeZ(item.updateTime)
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
		    confirm(arr){
				this.form.driverAge = arr[0].value;
				this.driverAgeKey = arr[0].label;
				this.search()
		    },
			confirmType(arr){
				this.form.businessType = arr[0].value;
				this.businessTypeKey = arr[0].label;
				this.search()
			},
			pull() {
				let len = this.list.length;
				 if (len < this.total){
					 this.getList()
				 }else{
					this.status = 'nomore'
				}
			},
			detail(id) {
				this.$u.route("/pages/index/company/components/index/carRentDetail",{id:id})
			},
			clear(){
				this.driverAgekey='';
				this.businesstypekey='',
				this.form.driverAge='';
				this.form.businessType='';
				this.businessType='';
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carRent {
		.tagBox{
			width: 100%;
			padding: 10rpx 100rpx 10rpx 80rpx;
			position: fixed;
			top: 70rpx;
			left: 0;
			z-index: 1;
			background-color: #f5f5f8;
			.selectTag{
				padding: 4rpx 8rpx;
				border-radius: 20rpx;
				border: 1rpx solid rgba(0,0,0,0.1);
				float: left;
				font-size: 24rpx;
				margin-right: 40rpx;
			}
			.selectTag:last-child{
				margin-right: 0;
			}
			.clearNull{
				float: right;
			}
		}
		.null{
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.wrap {
			padding: 40rpx;
		}
		.middle-content{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2;
			background-color: #f5f5f8;
			/deep/ .u-dropdown__content {
			    overflow: visible;
			}
		}
		.middle-content .u-form {
			width: 686rpx;
			height: 71rpx;
			border-radius: 40rpx;
			margin-left: 39rpx;
			background-color: #CDE5E3;
			margin-top: 30rpx;
			float: left;
		}
		.icon {
			width: 51rpx;
			height: 71rpx;
			line-height: 71rpx;
			text-align: center;
			border-radius: 0 0 20rpx 0;
			background: linear-gradient(115deg, #37AB63, #6DD99C);
			float: left;
			margin-top: 30rpx;
		}
		.line {
			width: 1rpx;
			height: 27rpx;
			margin-top: 22rpx;
			float: left;
			margin-left: 60rpx;
			background: rgba(0,0,0,0.2);
		}
		.clear {
			clear: both;
		}
		.list {
			width: 702rpx;
			height: 286rpx;
			margin-left: 24rpx;
			background-image: url(@/static/bgrentcar.png);
			background-repeat: no-repeat;
			background-size: cover;
		}
		.list .left {
			float: left;
			margin-left: 49rpx;
			margin-top: 42rpx;
		}
		.list .right {
			width: 460rpx;
			padding: 0 36rpx;
			float: left;
		}
		.list .right .name {
			font-weight: 900;
			font-size: 28rpx;
			margin-top: 16rpx;
		}
		.list .right .time {
			font-size: 24rpx;
			float: right;
			margin-top: 39rpx;
		}
		.list .right .year {
			padding: 4rpx 16rpx;
			border-radius: 12rpx;
			background: #37AB63;
			font-size: 24rpx;
			color: #fff;
			float: left;
			margin-top: 14rpx;
		}
		.list .right .type {
			padding: 4rpx 16rpx;
			margin-left: 8rpx;
			line-height: 30rpx;
			text-align: center;
			border-radius: 12rpx;
			background: #37AB63;
			font-size: 24rpx;
			color: #fff;
			float: left;
			margin-top: 14rpx;
		}
		.list .right {
			.img {
				float: left;
				margin-top: 14rpx;
			}
			.car {
				width: 362rpx;
				color: #7f7f7f;
				font-size: 24rpx;
				margin-top: 16rpx;
				margin-left: 4rpx;
				float: left;
			}
		}
		.list .right .chat {
			float: right;
			margin-top: 16rpx;
		}
	}
</style>
