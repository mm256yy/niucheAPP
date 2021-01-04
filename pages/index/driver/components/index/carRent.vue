<template>
	<view class="carRent">
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
			<view style="margin-top: 42rpx;display: flex;">
				<scroll-view style="width: 572rpx;display: inline-block;" class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view @click="close(index)" class="scroll-view-item_H" v-for="(item, index) in filterData" :key="index">{{item}}</view>
				</scroll-view>
				<view style="width: 90rpx;margin-left: 30rpx;display: inline-block;margin-top: 8rpx;">清空</view>
			</view>
		</view>
		<view v-show="priceidkey||businesstypekey" class="tagBox">
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
		  ref="loadRefresh"
		  :pageNo='pageNum'
		  :totalPageNo='total'
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
		    		<view class="list" @click="detail(item.id)">
		    			<view class="right">
		    				<view class="name u-line-2">
		    				  <text v-show="item.businesstypetag == 1">[网约车]</text>
		    				  <text v-show="item.businesstypetag == 2">[出租车]</text>
		    				{{item.texttitle}}</view>
		    				<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
		    				<view class="year">车龄≤{{item.carAge}}年
		    				</view>
		    				<view class="clear"></view>
		    				<u-image class="car" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
		    				<view class="distance">{{item.km}}万公里</view>
		    				<view class="clear"></view>
		    			</view>
						<img style="width: 306rpx;height: 226rpx;" v-show="!item.photourl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif" alt="">
						<img style="width: 306rpx;height: 226rpx;" v-show="item.photourl" class="left" :src="item.photourl" alt="">
		    			<!-- <u-image v-show="!item.photourl" class="left" width="306rpx" height="226rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image> -->
		    			<!-- <u-image class="left" width="306rpx" height="226rpx" :src="item.photourl"></u-image> -->
		    			<view class="clear"></view>
		    			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    			<view class="box">
		    				<view><text>￥{{item.rentprice}}</text>元/月起租</view>
		    				<view>
		    					<view v-show="items?items.length<6:items" v-for="(items, index) in item.systemtag" :key="index" class="case">{{items}}</view>
		    				</view>
		    			</view>
		    		</view>
		    		<!-- <u-icon v-show="item.iscollect === 1" @click="cancel(item,item.id)" class="heart" name="heart-fill" color="#FCD03C" size="28"></u-icon> -->
		    		<!-- <u-icon v-show="item.iscollect === 2" @click="favorites(item,item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
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
				  businesstype: '',
				  carbrand: '',
				  cartype: '',
				  city: '杭州',
				  startCarAge: '',
				  endCarAge: '',
				  startPriceid: '',
				  endPriceid: '',
				  km: '',
				  power: '',
				  islogin: ''
				},
				businesstype: 100,
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				priceid: '',
				priceidkey: '',
				businesstypekey: '',
				total: 0,
				select: [
					{
						label: '不限',
						value: '1'
					},
					{
						label: '2000以内',
						value: '2'
					},
					{
						label: '2000-3000',
						value: '3'
					},
					{
						label: '3000-4000',
						value: '4'
					},
					{
						label: '4000及以上',
						value: '5'
					}
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
				pageNum: 1,
				current:-1,
				currentType:-1,
				style:{
					color:'#000'
				},
				styleActive:{
					color:'#FF9500'
				},
				filterData:[]
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
			this.transform()
		},
		methods: {
			close(index){
				this.filterData.splice(index, 1);
			},
			transform(){
				var cartype = [];
				var power = [];
				var businessType = '';
				var caragekey = '';
				var kmkey = '';
				this.filterData = [];
				if(uni.getStorageSync('businesstype')){
					businessType = uni.getStorageSync('businesstype');
					this.filterData.push(businessType);
				}
				if(uni.getStorageSync('cartypeDriver')){
					cartype = uni.getStorageSync('cartypeDriver').split(',');
					this.filterData = this.filterData.concat(cartype);
				}
				if(uni.getStorageSync('powerDriver')){
					power = uni.getStorageSync('powerDriver').split(',');
					this.filterData = this.filterData.concat(power);
				}
				if(uni.getStorageSync('caragekey')){
					caragekey = uni.getStorageSync('caragekey');
					this.filterData.push(caragekey);
				}
				if(uni.getStorageSync('kmkey')){
					kmkey = uni.getStorageSync('kmkey');
					this.filterData.push(kmkey);
				}
			},
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
					this.form.endPriceid = '';
				}
				if(this.priceid == 2) {
					this.form.startPriceid = '0';
					this.form.endPriceid = '2000';
				}
				if(this.priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if(this.priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if(this.priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '-1';
				}
				this.show = false;
				this.showMask = false;
				this.search()
			},
			getDataType(index) {
				this.currentType = index;
				this.businesstypekey = this.selectType[index].label;
				this.businesstype = this.selectType[index].value;
				this.showType = false;
				this.showMask = false;
				this.search()
			},
			page() {
			    this.pageNum = 1;
			},
			// 上划加载更多
			      loadMore() {
					  const token = uni.getStorageSync('token');
					  if(token) {
					  	this.form.islogin = 1
					  }else{
					  	this.form.islogin = 0
					  }
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
					this.form.endPriceid = '';
				}
				if(this.priceid == 2) {
					this.form.startPriceid = '0';
					this.form.endPriceid = '2000';
				}
				if(this.priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if(this.priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if(this.priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '-1';
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
					if(item.value === this.businesstype){
					    this.businesstypekey = item.label;
					}
				})
			},
			// favorites(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 1,
			// 		collectionstate: 1,
			// 		iscollection: 1
			// 	};
			// 	item.iscollect = 1;
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
			// 		collectionstate: 1,
			// 		iscollection: 0
			// 	};
			// 	item.iscollect = 2;
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
				this.form.businesstype=this.businesstype==100?'':this.businesstype;
		        const params = Object.assign(this.form, {
		        	pageNum: this.pageNum,
		        	pageSize: 10,
					isCount: 0,
					orderByColumn: 'm.refreshtime',
					isAsc: 'desc'
		        });
		    		this.$u.api.homeRent(params).then(res=>{
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
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
				this.form.businesstype=this.businesstype==100?'':this.businesstype;
		        const params = Object.assign(this.form, {
		    		pageNum: 1,
		    		pageSize: 10,
					isCount: 0,
					orderByColumn: 'm.refreshtime',
					isAsc: 'desc'
		    	});
		    		this.$u.api.homeRent(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
							 this.total = Math.ceil(res.total/10);
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
		    	this.priceid = arr[0].label;
				const priceid = arr[0].value;
				if(priceid == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				if(priceid == 2) {
					this.form.startPriceid = '';
					this.form.endPriceid = '2000';
				}
				if(priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if(priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if(priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '';
				}
				this.search()
		    },
		    confirmType(arr){
		    	this.businesstype = arr[0].label;
		    	this.form.businesstype = arr[0].value;
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
				this.$u.route("/pages/index/driver/components/index/carRentDetail",{id:id})
			},
			filter() {
				this.$u.route("/pages/index/driver/components/index/filterRent")
			},
			clear(){
				this.priceidkey='';
				this.businesstypekey='',
				this.priceid='';
				this.businesstype=100;
				this.form.startPriceid='';
				this.form.endPriceid='';
				this.form.businesstype='';
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
	.carRent {
		background: #fff;
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
		.last{
			background-color: #fff;
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
				margin-bottom: 20rpx;
				background: #fff;
				.left {
					float: right;
					margin-top: 20rpx;
					margin-bottom: 6rpx;
				}
				.right{
					width: 363rpx;
					height: 226rpx;
					padding: 0 30rpx;
					background: #fff;
					float: left;
				}
				.name {
					font-weight: 900;
					font-size: 34rpx;
					margin-top: 14rpx;
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
					margin-top: 14rpx;
				}
				.year {
					margin-left: 6rpx;
					margin-top: 12rpx;
					color: #7f7f7f;
				}
				.distance {
					margin-left: 6rpx;
					margin-top: 12rpx;
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
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
		}
		.scroll-view-item_H {
			display: inline-block;
			width: 140rpx;
			height: 56rpx;
			margin-right: 28rpx;
			line-height: 56rpx;
			text-align: center;
			background-image: url(@/static/shut.png);
			background-repeat: no-repeat;
			height: 100%;
			background-size: cover;
		}
	}
</style>
