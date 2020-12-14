<template>
	<view class="carSell">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item style="padding: 6rpx 18rpx;margin-top: -18rpx;float: left;
				background: #F8F9FB;border-radius: 4px;width: 130rpx;" label="">
				<view style="float: left;">杭州</view>
				<u-image style="float: left;margin-top: -50rpx;margin-left: 14rpx;" width="18rpx" height="22rpx" src="@/static/city.png"></u-image>
				</u-form-item>
				<u-form-item style="padding: 6rpx 18rpx;margin-top: -18rpx;float: left;
			    background: #F8F9FB;border-radius: 4px;width: 128rpx;" label=""><u-input placeholder-style="color:#000;" placeholder="车龄" @click="show = true"  v-model="packpricekey" type="select" /></u-form-item>
				<u-form-item style="padding: 6rpx 18rpx;margin-left:20rpx;margin-top: -18rpx;float: left;
			    background: #F8F9FB;border-radius: 4px;width: 128rpx;" label=""><u-input placeholder-style="color:#000;" placeholder="里程" @click="showType = true" v-model="kmkey" type="select" /></u-form-item>
				<u-form-item style="padding: 6rpx 18rpx;margin-left:20rpx;margin-top: -18rpx;float: left;
				background: #F8F9FB;border-radius: 4px;width: 154rpx;" label=""><u-input placeholder-style="color:#000;" placeholder="打包价" @click="showType = true" v-model="packpricekey" type="select" /></u-form-item>
			</u-form>
			<!-- <view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view> -->
			<view style="position: fixed;top: 100rpx;left:0;background-color: #fff;" v-show="show">
				<text style="width: 206rpx;height: 76rpx;border: 1px solid #D9DEDF;line-height: 76rpx;text-align: center;display: inline-block;color: #666;margin-left: 32rpx;" v-for="(item, index) in select" :key="index">{{item.label}}</text>
			</view>
			<!-- <u-dropdown style="width: 50rpx;">
				<u-dropdown-item @change="change()" v-model="form.km" title="行驶里程" :options="select"></u-dropdown-item>
				<u-dropdown-item @change="changePrice()" v-model="form.packprice" title="打包价" :options="selectPrice"></u-dropdown-item>
			</u-dropdown> -->
			<view @click="filter()" style="width: 100rpx;text-align: center;margin-right: 40rpx;">更多</view>
		</view>
		<view class="tagBox">
			<view v-show="kmkey" class="selectTag">{{kmkey}}</view>
			<view v-show="packpricekey" class="selectTag">{{packpricekey}}</view>
			<view v-show="kmkey||packpricekey" class="clearNull" @click="clear()">清空</view>
			<view class="clear"></view>
		</view>
		<view v-show="kmkey||packpricekey" style="width: 100%;height: 50rpx;"></view>
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
		    <view class="last">
		    	<view class="lists" v-for="(item, index) in list" :key="index">
		    		<view class="list" @click="detail(item.demandid)">
						<img style="width: 288rpx;height: 196rpx;border-radius: 12rpx;" v-show="!item.photoUrl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif" alt="">
						<img style="width: 288rpx;height: 196rpx;border-radius: 12rpx;" v-show="item.photoUrl" class="left" :src="item.photoUrl" alt="">
		    			<!-- <u-image v-show="item.photoUrl" class="left" width="312rpx" height="231rpx" :src="item.photoUrl"></u-image>
		    			<u-image v-show="!item.photoUrl" class="left" width="312rpx" height="231rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image> -->
		    			<!-- <u-image class="left" width="312rpx" height="231rpx" :src="item.photoUrl"></u-image> -->
		    			<view class="right">
		    				<view class="clear"></view>
		    				<view class="name u-line-2">{{item.carBrand}}{{item.carText}}</view>
							<view class="tag">{{item.carAge}}/{{item.km}}</view>
		    				<view class="price">{{item.packPrice}}元</view>
							<view style="width: 136rpx;height: 48rpx;line-height: 40rpx;text-align: center;border-radius: 8rpx;border: 2rpx solid #4aba75;color: #4aba75;float: left;margin-top: 30rpx;margin-left: 34rpx;">在售200辆</view>
		    			</view>
		    			<view class="clear"></view>
		    			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    		</view>
		    		<!-- <u-icon v-show="item.iscollection === 1" @click="cancel(item,item.demandid)" class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    		<!-- <u-icon v-show="item.iscollection === 2" @click="favorites(item,item.demandid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
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
				showPrice:false,
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
				  km: '',
				  packprice: '',
				  businessType:0,
				  carbrand:'',
				  cartype:'',
				  km: 100,
				  power:'',
				  packprice:'',
				  startCarAge:'',
				  endCarAge:''
				},
				kmkey: '',
				packpricekey: '',
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				total: 0,
				select: [
					{
						label: '0-2万公里',
						value: '1'
					},
					{
						label: '2-5万公里',
						value: '2'
					},
					{
						label: '5-10万公里',
						value: '3'
					},
					{
						label: '10-20万公里',
						value: '4'
					},
					{
						label: '20-30万公里',
						value: '5'
					},
					{
						label: '30-50万公里',
						value: '6'
					},
					{
						label: '50-70万公里',
						value: '7'
					},
					{
						label: '70万公里以上',
						value: '8'
					},
					{
						label: '不限',
						value: '9'
					}
				],
				selectPrice: [
					{
						label: '3万以内',
						value: '1'
					},
					{
						label: '3万-5万',
						value: '2'
					},
					{
						label: '5万以上',
						value: '3'
					},
					{
						label: '不限',
						value: '4'
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
			changePrice(){
				this.search()
				this.add()
			},
			add(){
				this.select.forEach(item=>{
					if(item.value === this.form.km){
					    this.kmkey = item.label;
					}
				})
				this.selectPrice.forEach(item=>{
					if(item.value === this.form.packprice){
					    this.packpricekey = item.label;
					}
				})
			},
			// favorites(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 2,
			// 		collectionstate: 3,
			// 		iscollection: 1
			// 	};
			// 	item.iscollection = 1;
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
			// 		isDriveAndCompary: 2,
			// 		collectionstate: 3,
			// 		iscollection: 0
			// 	};
			// 	item.iscollection = 2;
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
		        const params = Object.assign(this.form, {
		        	pageNum: this.pageNum,
		        	pageSize: 10,
					orderByColumn: 'tag.refreshtime',
					isAsc: 'desc'
		        });
		    		this.$u.api.sellCar(params).then(res=>{
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
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
		        const params = Object.assign(this.form, {
		    		pageNum: 1,
		    		pageSize: 10,
					orderByColumn: 'tag.refreshtime',
					isAsc: 'desc'
		    	});
		    		this.$u.api.sellCar(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total= res.total;
							 let len = this.list.length;
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
		    confirm(arr){
		    	this.form.km = arr[0].value;
		    	this.kmkey = arr[0].label;
				this.search()
		    },
		    confirmPrice(arr){
		    	this.form.packprice = arr[0].value;
		    	this.packpricekey = arr[0].label;
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
				this.$u.route("/pages/mymessage/company/components/index/carSellDetail",{id:id})
			},
			filter() {
				this.$u.route("/pages/mymessage/company/components/index/filter")
			},
			clear(){
				this.kmkey='';
				this.packpricekey='',
				this.form.km='';
				this.form.packprice='';
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carSell {
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
			background-color: #fff;
			/deep/ .u-dropdown__content {
			    overflow: visible;
			}
		}
		.middle-content .u-form {
			width: 686rpx;
			height: 71rpx;
			border-radius: 40rpx;
			margin-left: 39rpx;
			background-color: #fff;
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
			margin-left: 40rpx;
			background: rgba(0,0,0,0.2);
		}
		.clear {
			clear: both;
		}
		.last{
			background-color: #fff;
		}
		.lists {
			width: 702rpx;
			// height: 308rpx;
			position: relative;
			.heart {
				margin-top: 14rpx;
				margin-right: 20rpx;
				position: absolute;
				top: 250rpx;
			    right: 0rpx;
			}
			.list {
				width: 702rpx;
				// height: 308rpx;
				padding: 18rpx 15rpx;
				margin-left: 24rpx;
				font-size: 20rpx;
				// background-image: url(@/static/bgcarsell.png);
				background-repeat: no-repeat;
				background-size: cover;
				.left, .right {
					float: left;
				}
				.right {
					width: 360rpx;
					padding-left: 34rpx;
				}
				.name {
					font-size: 30rpx;
					line-height: 48rpx;
					font-weight: 900;
					color: #333;
					margin-top: 6rpx;
				}
				.tag {
					font-size: 26rpx;
					font-weight: 400;
					color: #777777;
					line-height: 36rpx;
					margin-top: 8rpx;
				}
				.price{
					font-size: 18px;
					font-family: SourceHanSansCN-Bold, SourceHanSansCN;
					font-weight: bold;
					color: #FF5200;
			        margin-top: 30rpx;
					float: left;
				}
			}
		}
	}
</style>
