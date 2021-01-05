<template>
	<view class="jobSearch">
		<view class="middle-content">
			<u-mask z-index="2" :show="showMask" @click="hideMask">
			</u-mask>
			<list-tags v-show="show" :list="select" :active="current" @onClick="getData"></list-tags>
			<list-tags v-show="showType" :list="selectType" :active="currentType" @onClick="getDataType"></list-tags>
			<view class="middle-content">
				<view style="width: 100%;height: 100rpx;">
					<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
						<u-form-item style="padding: 6rpx 18rpx;margin-top: -18rpx;float: left;
						background: #F8F9FB;border-radius: 4px;width: 130rpx;" label="">
						<view style="float: left;">杭州</view>
						<u-image style="float: left;margin-top: -50rpx;margin-left: 14rpx;" width="18rpx" height="22rpx" src="@/static/city.png"></u-image>
						</u-form-item>
						<u-form-item style="padding: 6rpx 21rpx;margin-top: -18rpx;float: left;
					    background: #F8F9FB;border-radius: 4px;width: 134rpx;margin-right: 42rpx;margin-left: 42rpx;" label="">
						<u-input :custom-style="style" v-show="!show" disabled placeholder-style="color:#000;" placeholder="租金" @click="toggle()"  v-model="priceidkey" /><text v-show="!show" class='triangle'></text>
						<u-input :custom-style="styleActive" v-show="show" disabled placeholder-style="color:#FF9500;" placeholder="租金" @click="toggle()"  v-model="priceidkey" /><text v-show="show" class='triangleActive'></text></u-form-item>
						<u-form-item style="padding: 6rpx 21rpx;margin-top: -18rpx;float: left;
					    background: #F8F9FB;border-radius: 4px;width: 180rpx;" label="">
						<u-input :custom-style="style" v-show="!showType" disabled placeholder-style="color:#000;" placeholder="业务类型" @click="toggleType()" v-model="businesstypekey" /><text v-show="!showType" class='triangle'></text>
						<u-input :custom-style="styleActive" v-show="showType" disabled placeholder-style="color:#FF9500;" placeholder="业务类型" @click="toggleType()" v-model="businesstypekey" /><text v-show="showType" class='triangleActive'></text>
						</u-form-item>
						<view @click="filter()" style="width: 100rpx;text-align: center;float: right;">更多</view>
					</u-form>
				</view>
			</view>
		</view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<load-refresh
		  style="margin-top: 100rpx;"
		  v-show="list.length"
		  :pageNo='pageNum'
		  :totalPageNo='total'
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
						<img style="width: 288rpx;height: 196rpx;" v-show="!item.photoUrl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif" alt="">
						<!-- <img style="width: 264rpx;height: 199rpx;" v-show="item.photoUrl" class="left" :src="item.photoUrl" alt=""> -->
		    			 <u-image v-show="item.photoUrl" class="left" width="288rpx" height="196rpx" :src="item.photoUrl"></u-image>
		    			<!--<u-image v-show="!item.photoUrl" class="left" width="264rpx" height="199rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image> -->
		    				<!-- <u-image class="left" width="264rpx" height="199rpx" :src="item.photoUrl"></u-image> -->
		    				<view class="right">
		    					<!-- <view class="tag">付费标签</view> -->
		    					<!-- <u-icon class="heart" name="heart-fill" color="#FCD03C" width="19" height="18"></u-icon> -->
		    					<view class="name u-line-2">高薪招聘{{item.texttitle}}</view>
								<view v-show="item.texttitle == '网约车司机'" class="type">网约车</view>
								<view v-show="item.texttitle == '出租车司机'" class="type">出租车</view>
								<view class="price"><text>{{item.pay}}元</text></view>
		    				</view>
		    				<view class="clear"></view>
							<view class="flex">
								<view class="company">{{item.comparyname}}</view>
								<view class="area">{{item.comparyarea}}</view>
								<view class="clear"></view>
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
	import listTags from '@/components/listTags.vue'
	export default {
		components: {
			loadRefresh,
			listTags
		},
		data() {
			return {
				showMask:false,
				show:false,
				showType:false,
				iconType: 'flower',
				current:-1,
				currentType:-1,
				style:{
					color:'#000'
				},
				styleActive:{
					color:'#40B26D'
				},
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
			hideMask(){
				this.showMask = false;
				this.show = false;
				this.showType = false;
			},
			toggle(){
				this.showMask = !this.show;
				this.show = !this.show;
				this.showType = false;
			},
			toggleType(){
				this.showMask = !this.showType;
				this.showType = !this.showType;
				this.show = false;
			},
			getData(index) {
				this.current = index;
				this.priceid = this.select[index].value;
				this.priceidkey = this.select[index].label;
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
				this.show = false;
				this.showMask = false;
				this.search()
			},
			getDataType(index) {
				this.currentType = index;
				this.businessType = this.selectType[index].value;
				this.showType = false;
				this.showMask = false;
				this.search()
			},
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
			top: 76rpx;
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
		.last .lists:last-child {
			margin-bottom: 10rpx;
		}
		.triangleActive{
			display: inline-block;
		    width: 0;
		    height: 0;
		    border: 10rpx solid;
		    border-color: transparent transparent #FF9500 transparent;
			margin-top: -8rpx;
		}
		.triangle{
			display: inline-block;
		    width: 0;
		    height: 0;
		    border: 10rpx solid;
		    border-color: #777 transparent transparent transparent;
			margin-top: 8rpx;
		}
		.wrap {
			padding: 40rpx;
		}
		.middle-content{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			background-color: #fff;
			padding-left: 34rpx;
			/deep/ .u-dropdown__content {
			    overflow: visible;
			}
		}
		.middle-content .u-form {
			width: 686rpx;
			height: 71rpx;
			border-radius: 40rpx;
			background-color: #fff;
			margin-top: 48rpx;
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
					width: 360rpx;
					height: 226rpx;
					background: #fff;
					float: left;
					padding-left: 30rpx;
					.price{
						margin-top: 28rpx;
					}
					.price text{
						font-size: 36rpx;
						font-weight: 900;
						color: #FF5200;
					}
				}
				.flex{
						padding-top: 22rpx;
						padding-bottom: 34rpx;
				        border-bottom: 2rpx solid #dedede;
						.company{
							font-size: 28rpx;
							font-weight: 400;
							color: #343434;
							float: left;
						}
						.area{
							font-size: 26rpx;
							font-weight: 400;
							color: #666666;
							float: right;
						}
					}
				.name {
					font-size: 34rpx;
					color: #333;
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
					width: 100rpx;
					height: 44rpx;
					text-align: center;
					line-height: 36rpx;
					border-radius: 8rpx 0 8rpx 0;
					border: 1rpx solid #FF9500;
					font-size: 24rpx;
					color: #FF9500;
					margin-top: 20rpx;
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
