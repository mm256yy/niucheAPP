<template>
	<view class="carSell">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:220rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="行驶里程" @click="show = true" v-model="kmkey" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:150rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="打包价" @click="showPrice = true" v-model="packpricekey" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:100rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="筛选" @click="filter" type="text" :disabled="true" /></u-form-item>
			</u-form>
			<!-- <view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view> -->
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select v-model="showPrice" mode="single-column" :list="selectPrice" @confirm="confirmPrice"></u-select>
		</view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view class="last" v-show="list.length">
			<view class="lists" v-for="(item, index) in list" :key="index">
				<view class="list" @click="detail(item.demandid)">
					<u-image class="left" width="312rpx" height="231rpx" :src="item.photoUrl"></u-image>
					<view class="right">
						<!-- <view class="city">{{item.comparyarea}}</view> -->
						<view class="clear"></view>
						<view class="name u-line-2">{{item.carBrand}}{{item.carText}}</view>
						<view class="price">打包价<text>￥{{item.packPrice}}</text></view>
						<view  v-for="(items, index) in item.carSystemTag" :key="index" class="case">{{items}}</view>
					</view>
					<view class="clear"></view>
					<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
					<view class="year">{{item.carAge}}</view>
					<u-image class="img" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
					<view class="year">{{item.km}}</view>
					<view class="clear"></view>
					<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
				</view>
				<!-- <u-icon v-show="item.iscollection === 1" @click="cancel(item,item.demandid)" class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
				<!-- <u-icon v-show="item.iscollection === 2" @click="favorites(item,item.demandid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
			</view>
		</view>
		<view class="null" v-show="!list.length">
			<view>亲，当前空空如也</view>
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				showPrice:false,
				change: false,
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
						label: '0万公里-2万公里',
						value: '1'
					},
					{
						label: '2万公里-5万公里',
						value: '2'
					},
					{
						label: '5万公里-10万公里',
						value: '3'
					},
					{
						label: '10万公里-20万公里',
						value: '4'
					},
					{
						label: '20万公里-30万公里',
						value: '5'
					},
					{
						label: '30万公里-50万公里',
						value: '6'
					},
					{
						label: '50万公里-70万公里',
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
				status: '',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				}
			}
		},
		mounted() {
			this.search()
		},
		methods: {
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
		        const params = Object.assign(this.form, {
		        	pageNum: this.pagination.pageNum + 1,
		        	pageSize: 10
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
							 this.list.forEach(item=>{
							 	if(item.carSystemTag){
							 		if(item.carSystemTag){
							 			if(item.carSystemTag.length > 2) {
							 				item.carSystemTag = item.carSystemTag.slice(0,2); 
							 			}else if(item.carSystemTag.length <= 2){
							 			    if(item.carUserTag) {
							 			    	const arr = item.carSystemTag.concat(item.carUserTag);
							 			    	if(arr.length > 2) {
							 			    		item.carSystemTag = arr.slice(0,2);
							 			    	} 
							 			    }
							 			} 
							 		}
								}
							 })
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
		        const params = Object.assign(this.form, {
		    		pageNum: 1,
		    		pageSize: 10
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
							 this.list.forEach(item=>{
								 if(item.carSystemTag){
									if(item.carSystemTag.length > 2) {
										item.carSystemTag = item.carSystemTag.slice(0,2); 
									}else if(item.carSystemTag.length <= 2){
								        if(item.carUserTag) {
								        	const arr = item.carSystemTag.concat(item.carUserTag);
								        	if(arr.length > 2) {
								        		item.carSystemTag = arr.slice(0,2);
								        	} 
								        }
									} 
								 }							
							 })
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carSell {
		.null{
			height: calc(86vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.wrap {
			padding: 40rpx;
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
			margin-left: 40rpx;
			background: rgba(0,0,0,0.2);
		}
		.clear {
			clear: both;
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
				margin-top: 24rpx;
				font-size: 20rpx;
				background-image: url(@/static/bgcarsell.png);
				background-repeat: no-repeat;
				background-size: cover;
				.left, .right {
					float: left;
				}
				.right {
					width: 360rpx;
					padding-left: 34rpx;
				}
				.city {
					padding: 4rpx 14rpx;
					font-size: 20rpx;
					border-radius: 22rpx;
					border: 1rpx solid rgba(0,0,0,0.3);
					margin-top: 16rpx;
					margin-right: 16rpx;
					float: right;
				}
				.name {
					font-size: 28rpx;
					line-height: 34rpx;
					font-weight: 900;
					margin-top: 6rpx;
				}
				.price text {
					font-size: 36rpx;
					font-weight: 900;
					color: #40B36C;
					margin-left: 8rpx;
				}
				.case {
					padding: 6rpx 14rpx;
					border-radius: 30rpx;
					background: #40B36C;
					color: #fff;
					float: left;
					margin-right: 10rpx;
					margin-top: 6rpx;
				}
				.clock {
					margin-left: 30rpx;
					margin-top: 18rpx;
					margin-right: 4rpx;
					float: left;
				}
				.img {
					float: left;
					margin-top: 16rpx;
					margin-right: 4rpx;
				}
				.year {
					margin-top: 14rpx;
					margin-right: 50rpx;
					float: left;
				}
			}
		}
	}
</style>
