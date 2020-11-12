<template>
	<view class="result">
		<view class="wrap">
			<u-navbar back-text="返回" back-icon-size="0" :title="title" :background="backgroundDri" :back-text-style="backTextStyle" title-width="400" title-size="36" height='44' title-color="#FFFFFF">
				<view @click="clear()" class="navbar-right" slot="right">清除
				</view>
			 </u-navbar>
			 <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			 	<view class="last">
			 		<view class="lists" v-for="(item, index) in list" :key="index">
			 			<view class="list" @click="detail(item.id)">
			 				<view class="right">
			 					<view class="name u-line-2">{{item.texttitle}}</view>
			 					<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
			 					<view class="year">车龄<3个月{{item.carage}}</view>
			 					<view class="clear"></view>
			 					<u-image class="car" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
			 					<view class="distance">{{item.km}}</view>
			 					<view class="clear"></view>
			 				</view>
			 				<view v-show="item.businesstypetag == 1" class="label">网约车</view>
			 				<view v-show="item.businesstypetag == 2" class="label">出租车</view>
			 				<u-image class="left" width="306rpx" height="180rpx" :src="item.photourl"></u-image>
			 				<view class="clear"></view>
			 				<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
			 				<view class="box">
			 					<view><text>￥{{item.rentprice}}</text>元/月起租</view>
			 							<view>
			 								<view v-show="items.length<8" v-for="(items, index) in item.systemtag" :key="index" class="case">{{items}}</view>
			 							</view>
			 				</view>
			 			</view>
			 			<u-icon v-show="item.iscollect === 1" @click="cancel(item,item.id)" class="heart" name="heart-fill" color="#FCD03C" size="28"></u-icon>
			 			<u-icon v-show="item.iscollect === 2" @click="favorites(item,item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
			 		</view>
			 	</view>
				<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
			 </scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				pagination: {
				  pageNum: 0, 
				  pageSize: 10
				},
				list: [],
				total: 0,
				form: {},
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				iconType: 'flower',
				title: ''
			}
		},
		onLoad(option) {
			let form = JSON.parse(option.form);
			if(form){
			 this.form = form;
			}
			let title = option.title;
			if(title){
			 this.title = title;
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
		mounted() {
			this.getList()
		},
		methods: {
		  favorites(item,id) {
		  	const params = {
		  		BeCollectedId: id,
		  		isDriveAndCompary: 1,
		  		collectionstate: 1,
		  		iscollection: 1
		  	};
		  	item.iscollect = 1;
		      this.$u.api.collect(params).then(res=>{
		      	if(res.code === 200){
		      		 this.$u.toast('收藏成功');
		      	}else {
		      		 this.$u.toast(res.msg);
		      	}
		      })
		  },
		  cancel(item,id) {
		  	const params = {
		  		BeCollectedId: id,
		  		isDriveAndCompary: 1,
		  		collectionstate: 1,
		  		iscollection: 0
		  	};
		  	item.iscollect = 2;
		      this.$u.api.collect(params).then(res=>{
		      	if(res.code === 200){
		      		 this.$u.toast('取消收藏成功');
		      	}else {
		      		 this.$u.toast(res.msg);
		      	}
		      })
		  },
		  getList(){
		      const params = Object.assign(this.form, {
		      	pageNum: this.pagination.pageNum + 1,
		      	pageSize: 10,
		  		isCount: 0
		      });
		  		this.$u.api.homeRent(params).then(res=>{
		  			if(res.code === 200){
		  				 this.list = res.rows;
		  				 this.total= res.total;
		  				 this.list.forEach(item=>{
		  				 	if(item.systemtag.length > 2) {
		  				 		item.systemtag = item.systemtag.slice(0,2); 
		  				 	}else if(item.systemtag.length <= 2){
		  				 		if(item.usertag.length) {
		  				 			const arr = item.systemtag.concat(item.usertag);
		  				 			if(arr.length > 2) {
		  				 				item.systemtag = arr.slice(0,2);
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
		  		pageSize: 10,
		  		isCount: 0
		  	});
		  		this.$u.api.homeRent(params).then(res=>{
		  			if(res.code === 200){
		  				 this.list = res.rows;
		  				 this.total = res.total;
		  				 this.list.forEach(item=>{
		  				 	if(item.systemtag.length > 2) {
		  				 		item.systemtag = item.systemtag.slice(0,2); 
		  				 	}else if(item.systemtag.length <= 2){
		  				 		if(item.usertag.length) {
		  				 			const arr = item.systemtag.concat(item.usertag);
		  				 			if(arr.length > 2) {
		  				 				item.systemtag = arr.slice(0,2);
		  				 			}						 											 
		  				 		}
		  				 	}
		  				 								
		  				 })
		  			}else {
		  				 this.$u.toast(res.msg);
		  			}
		  		})
		  },
		  pull() {
		  	let len = this.list.length;
		  	 if (len < this.total){
		  		 this.getList()
		  	 }else{
		  		this.status = 'nomore'
		  	}
		  },
		  onreachBottom() {
		  	this.pull()
		  },
		  clear() {
				this.$u.route({url:'/pages/index/index',type:'switchTab'});
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
		margin-bottom: 120rpx;
	}
page{
	// background-image: url(@/static/lease.png);
	// background-repeat: no-repeat;
	height: 100%;
	background-size: cover;
	// background-position: 50% 50%;
}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
		color: #fff;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	.result {
		.clear {
			clear: both;
		}
		.lists {
			width: 679rpx;
			// height: 285rpx;
			position: relative;
			.heart {
				position: absolute;
				margin-top: 14rpx;
				margin-right: 20rpx;
				position: absolute;
				top: 2rpx;
			    right: -36rpx;
			}
			.list{
				width: 679rpx;
				// height: 285rpx;
				color: #000;
				font-size: 20rpx;
				margin-left: 36rpx;
				margin-top: 40rpx;
				background: #fff;
				.left {
					float: right;
					margin-top: 20rpx;
					margin-right: 10rpx;
				}
				.right{
					width: 363rpx;
					height: 226rpx;
					padding: 0 30rpx;
					background: #fff;
					float: left;
				}
				.label {
					width: 86rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					background: rgba(0,0,0,0.1);
					font-size: 20rpx;
					float: right;
					margin-top: 10rpx;
					margin-right: 70rpx;
				}
				.name {
					font-weight: 900;
					font-size: 34rpx;
					margin-top: 63rpx;
				}
				.clock,.year {
					float: left;
					margin-top: 6rpx;
				}
				.clock {
					margin-top: 18rpx;
					color: #7f7f7f;
				}
				.car {
					float: left;
				}
				.year {
					margin-left: 6rpx;
					margin-top: 12rpx;
					color: #7f7f7f;
				}
				.distance {
					margin-left: 6rpx;
					color: #7f7f7f;
					float: left;
				}
				.box {
					width: 679rpx;
					height: 59rpx;
					background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
					padding: 0 0 0 18rpx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view {
						font-size: 20rpx;
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
						margin-right: 10rpx;
						float: left;
					}
				}
			}
		}
	}
</style>


