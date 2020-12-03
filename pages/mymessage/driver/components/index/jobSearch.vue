<template>
	<view class="jobSearch">
		<view class="middle-content">
			<!-- <u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:280rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="月薪区间" @click="show = true" v-model="priceid" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:220rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="showType = true" v-model="businessType" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:60rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="筛选" @click="filter" type="text" :disabled="true" /></u-form-item>
				<view class="clear"></view>
			</u-form>
			<view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select v-model="showType" mode="single-column" :list="selectType" @confirm="confirmType"></u-select> -->
			<u-dropdown style="width: 50rpx;">
				<u-dropdown-item @change="change()" v-model="priceid" title="月薪区间" :options="select"></u-dropdown-item>
				<u-dropdown-item @change="changeType()" v-model="businessType" title="业务类型" :options="selectType"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="tagBox">
			<view v-show="priceidkey" class="selectTag">{{priceidkey}}</view>
			<view v-show="businesstypekey" class="selectTag">{{businesstypekey}}</view>
			<view v-show="priceidkey||businesstypekey" class="clearNull" @click="clear()">清空</view>
			<view class="clear"></view>
		</view>
		<view v-show="priceidkey||businesstypekey" style="width: 100%;height: 50rpx;"></view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<load-refresh
		  style="margin-top: 100rpx;"
		  v-show="list.length"
		  :pageNo='pageNum'
		  :totalPageNo='Math.ceil(this.total/10)'
		  ref="loadRefresh"
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
		    		<view class="list" @click="detail(item.companyMainId)">
						<img style="width: 264rpx;height: 199rpx;" v-show="!item.photoUrl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif" alt="">
						<img style="width: 264rpx;height: 199rpx;" v-show="item.photoUrl" class="left" :src="item.photoUrl" alt="">
		    			<!-- <u-image v-show="item.photoUrl" class="left" width="264rpx" height="199rpx" :src="item.photoUrl"></u-image>
		    			<u-image v-show="!item.photoUrl" class="left" width="264rpx" height="199rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image> -->
		    				<!-- <u-image class="left" width="264rpx" height="199rpx" :src="item.photoUrl"></u-image> -->
		    				<view class="right">
		    					<!-- <view class="tag">付费标签</view> -->
		    					<view v-show="item.texttitle == '网约车司机'" class="type">网约车</view>
		    					<view v-show="item.texttitle == '出租车司机'" class="type">出租车</view>
		    					<!-- <u-icon class="heart" name="heart-fill" color="#FCD03C" width="19" height="18"></u-icon> -->
		    					<view class="clear"></view>
		    					<view class="name u-line-2">高薪招聘{{item.texttitle}}</view>
		    					<!-- <u-icon class="car" name="car" width="22" height="22"></u-icon> -->
		    					<u-image class="car" width="22rpx" height="22rpx" src="@/static/pinpai.png"></u-image>
		    					<view class="distance u-line-1">{{item.intentionBrand}}</view>
		    					<view class="clear"></view>
		    				</view>
		    				<view class="clear"></view>
		    				<view class="box">
		    					<view><text>￥{{item.pay}}</text>月薪</view>
		    					<!-- <view class="case">自动挡</view>
		    					<view class="case">SUV</view>
		    					<view class="case">纯电动</view> -->
		    				</view>
		    		</view>
		    		<!-- <u-icon v-show="item.isCollection === 1" @click="cancel(item,item.companyMainId)" class="heart" name="heart-fill" color="#FCD03C" size="28"></u-icon> -->
		    		<!-- <u-icon v-show="item.isCollection === 2" @click="favorites(item,item.companyMainId)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
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
				  businessType: '',
				  startPriceid: '',
				  endPriceid: '',
				  islogin: ''
				},
				priceidkey: '',
				businesstypekey: '',
				priceid: '',
				businessType: 100,
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				total: 0,
				select: [
					{
						label: '6000以内',
						value: '1'
					},
					{
						label: '6000-8000',
						value: '2'
					},
					{
						label: '8000-10000',
						value: '3'
					},
					{
						label: '10000以上',
						value: '4'
					},
					{
						label: '不限',
						value: '5'
					},
				],
				selectType: [
					{
						label: '网约车',
						value: '网约车司机'
					},
					{
						label: '出租车',
						value: '出租车司机'
					},
					{
						label: '不限',
						value: ''
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
			const token = uni.getStorageSync('token');
			if(token) {
				this.form.islogin = 1
			}else{
				this.form.islogin = 0
			}
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
			    const token = uni.getStorageSync('token');
			    if(token) {
			    	this.form.islogin = 1
			    }else{
			    	this.form.islogin = 0
			    }
				this.pageNum = 1;
			    this.search()
			},
			change(){
				if(this.priceid == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '6000';
				}
				if(this.priceid == 2) {
					this.form.startPriceid = '6000';
					this.form.endPriceid = '8000';
				}
				if(this.priceid == 3) {
					this.form.startPriceid = '8000';
					this.form.endPriceid = '10000';
				}
				if(this.priceid == 4) {
					this.form.startPriceid = '10000';
					this.form.endPriceid = '';
				}
				if(this.priceid == 5) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				this.search()
				this.add()
			},
			changeType(){
				this.search()
				this.add()
			},
			add(){
				this.select.forEach(item=>{
					if(item.value === this.priceid){
					    this.priceidkey = item.label;
					}
				})
				this.selectType.forEach(item=>{
					if(item.value === this.businessType){
					    this.businesstypekey = item.label;
					}
				})
			},
			// favorites(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 1,
			// 		collectionstate: 2,
			// 		iscollection: 1
			// 	};
			// 	item.isCollection = 1;
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
			// 	item.isCollection = 2;
			//     this.$u.api.collect(params).then(res=>{
			//     	if(res.code === 200){
			//     		 this.$u.toast('取消收藏成功');
			//     	}else {
			//     		 this.$u.toast(res.msg);
			//     	}
			//     })
			// },
		    getList(){
				this.pageNum = this.pageNum + 1;
				this.form.businessType=this.businessType==100?'':this.businessType;
		        const params = Object.assign(this.form, {
		        	pageNum: this.pageNum,
		        	pageSize: 10,
					orderByColumn: 'm.refreshtime',
					isAsc: 'desc'
		        });
		    		this.$u.api.homeSearch(params).then(res=>{
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
							       item.intentionBrand = item.intentionBrand.split(',').join('/')
							    }
							 								
							 })
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
				this.form.businessType=this.businessType==100?'':this.businessType;
		        const params = Object.assign(this.form, {
		    		pageNum: 1,
		    		pageSize: 10,
					orderByColumn: 'm.refreshtime',
					isAsc: 'desc'
		    	});
		    		this.$u.api.homeSearch(params).then(res=>{
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
							    if (item.intentionBrand){
							       item.intentionBrand = item.intentionBrand.split(',').join('/')
							    }
							 								
							 })
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    confirm(arr){
		    	this.priceid = arr[0].label;
		    	const priceid = arr[0].value;
		    	if(priceid == 1) {
		    		this.form.startPriceid = '';
		    		this.form.endPriceid = '6000';
		    	}
		    	if(priceid == 2) {
		    		this.form.startPriceid = '6000';
		    		this.form.endPriceid = '8000';
		    	}
		    	if(priceid == 3) {
		    		this.form.startPriceid = '8000';
		    		this.form.endPriceid = '10000';
		    	}
		    	if(priceid == 4) {
		    		this.form.startPriceid = '10000';
		    		this.form.endPriceid = '';
		    	}
		    	if(priceid == 5) {
		    		this.form.startPriceid = '';
		    		this.form.endPriceid = '';
		    	}
				this.search()
		    },
		    confirmType(arr){
		    	this.businessType = arr[0].label;
		    	this.form.businessType = arr[0].value;
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
				this.$u.route("/pages/mymessage/driver/components/index/jobSearchDetail",{id:id})
			},
			filter() {
				this.$u.route("/pages/mymessage/driver/components/index/filterSearch")
			},
			clear(){
				this.priceidkey='';
				this.businesstypekey='',
				this.businessType=100;
				this.priceid='';
				this.form.businessType='';
				this.form.startPriceid='';
				this.form.endPriceid='';
				const token = uni.getStorageSync('token');
				if(token) {
					this.form.islogin = 1
				}else{
					this.form.islogin = 0
				}
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jobSearch {
		.tagBox{
			width: 100%;
			padding: 10rpx 100rpx 10rpx 80rpx;
			position: fixed;
			top: 220rpx;
			left: 0;
			z-index: 1;
			background-color: #f5f5f8;
			.selectTag{
				padding: 4rpx 8rpx;
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
			top: 140rpx;
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
			border: 1rpx solid rgba(0,0,0,0.1);
			margin-left: 39rpx;
			margin-top: 30rpx;
			float: left;
		}
		.icon {
			width: 51rpx;
			height: 71rpx;
			line-height: 71rpx;
			text-align: center;
			border-radius: 0 0 20rpx 0;
			background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
			float: left;
			margin-top: 30rpx;
		}
		.line {
			width: 1rpx;
			height: 27rpx;
			margin-top: 22rpx;
			float: left;
			margin-left: 40rpx;
			background: rgba(0,0,0,0.2);
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
				margin-bottom: 20rpx;
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
