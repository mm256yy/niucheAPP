<template>
	<view class="buying">
		<view class="middle-content">
			<u-mask z-index="2" :show="show" @click="hideMask">
			</u-mask>
			<list-tags v-show="showKm" :list="selectKm" :active="current" @onClick="getDataKm"></list-tags>
			<list-tags v-show="showPrice" :list="selectPrice" :active="current" @onClick="getDataPrice"></list-tags>
			<view class="middle-content active">
				<view style="width: 100%;height: 100rpx;">
					<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
						<u-form-item style="padding: 0 16rpx;margin-top: -18rpx;float: left;
					background: #F8F9FB;border-radius: 4px;width: 124rpx;display: flex;" label="">
						<view style="float: left;">杭州</view>
						<u-image style="float: left;margin-top: -50rpx;margin-left: 14rpx;" width="18rpx" height="22rpx" src="@/static/city.png"></u-image>
						</u-form-item>
						<u-form-item style="padding: 0 16rpx;margin-left:24rpx;margin-top: -18rpx;float: left;
				    background: #F8F9FB;border-radius: 4px;width: 112rpx;" label="">
						<u-input :custom-style="style" v-show="!showKm" disabled placeholder-style="color:#000;" placeholder="里程" @click="toggleKm()" v-model="kmkey" /><text v-show="!showKm" class='triangle'></text>
						<u-input :custom-style="styleActive" style="color: #40B26D;" v-show="showKm" disabled placeholder-style="color:#40B26D;" placeholder="里程" @click="toggleKm()" v-model="kmkey" /><text v-show="showKm" class='triangleActive'></text>
						</u-form-item>
						<u-form-item style="padding: 0 16rpx;margin-left:24rpx;margin-top: -18rpx;float: left;
				    background: #F8F9FB;border-radius: 4px;width: 150rpx;" label="">
						<u-input :custom-style="style" v-show="!showPrice" disabled placeholder-style="color:#000;" placeholder="打包价" @click="togglePrice()" v-model="packpricekey" /><text v-show="!showPrice" class='triangle'></text>
						<u-input :custom-style="styleActive" v-show="showPrice" disabled placeholder-style="color:#40B26D;" placeholder="打包价" @click="togglePrice()" v-model="packpricekey" /><text v-show="showPrice" class='triangleActive'></text>
						</u-form-item>
					</u-form>
				</view>
				<!-- <view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view> -->
				<!-- <view style="position: fixed;top: 100rpx;left:0;background-color: #fff;" v-show="show">
					<text style="width: 206rpx;height: 76rpx;border: 1px solid #D9DEDF;line-height: 76rpx;text-align: center;display: inline-block;color: #666;margin-left: 32rpx;" v-for="(item, index) in select" :key="index">{{item.label}}</text>
				</view> -->
				<!-- <u-dropdown style="width: 50rpx;">
					<u-dropdown-item @change="change()" v-model="form.km" title="行驶里程" :options="select"></u-dropdown-item>
					<u-dropdown-item @change="changePrice()" v-model="form.packprice" title="打包价" :options="selectPrice"></u-dropdown-item>
				</u-dropdown> -->
			</view>
			<!-- <u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:280rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="行驶里程" @click="show = true" v-model="kmkey" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:240rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="打包价" @click="showPrice = true" v-model="packpricekey" type="select" /></u-form-item>
			</u-form>
			<view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select value-name='id' v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select value-name='value' v-model="showPrice" mode="single-column" :list="selectPrice" @confirm="confirmPrice"></u-select> -->
			<!-- <u-dropdown style="width: 50rpx;">
				<u-dropdown-item @change="change()" v-model="form.km" title="行驶里程" :options="select"></u-dropdown-item>
				<u-dropdown-item @change="changePrice()" v-model="form.packprice" title="打包价" :options="selectPrice"></u-dropdown-item>
			</u-dropdown> -->
		</view>
		<!-- <view class="tagBox">
			<view v-show="kmkey" class="selectTag">{{kmkey}}</view>
			<view v-show="packpricekey" class="selectTag">{{packpricekey}}</view>
			<view v-show="kmkey||packpricekey" class="clearNull" @click="clear()">清空</view>
			<view class="clear"></view>
		</view>
		<view v-show="kmkey||packpricekey" style="width: 100%;height: 50rpx;"></view> -->
		<!-- <view class="wrap">
			<u-swiper width="672" height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<load-refresh
		  style="margin-top: 132rpx;"
		  v-show="list.length"
		  ref="loadRefresh"
		  :pageNo='pageNum'
		  :totalPageNo='total'
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
		    			<view class="year">刷新时间：{{item.refreshtimeStr}}</view>
		    			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    			<view class="clear"></view>
						<img style="width: 125rpx;height: 125rpx;border-radius: 50%;" v-show="!item.photoUrl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif" alt="">
						<img style="width: 125rpx;height: 125rpx;border-radius: 50%;" v-show="item.photoUrl" class="left" :src="item.photoUrl" alt="">
		    			<!-- <u-image v-show="item.photoUrl" shape="circle" class="left" width="125rpx" height="125rpx" :src="item.photoUrl"></u-image>
		    			<u-image v-show="!item.photoUrl" shape="circle" class="left" width="125rpx" height="125rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image> -->
		    			<!-- <u-image shape="circle" class="left" width="125rpx" height="125rpx" :src="item.photoUrl"></u-image> -->
		    			<view class="right">
		    				<view class="name u-line-1">求购:{{item.intentioncarbrandnum}}辆&nbsp;{{item.teXtTile}}</view>
		    				<view class="type">{{item.comparyName}}<text>{{item.comparyArea}}</text></view>
		    				<view class="price">打包价:<text>{{item.packprice}}</text></view>
		    				<!-- <u-image class="chat" width="38rpx" height="32rpx" src="@/static/chat.png"></u-image> -->
		    			</view>
		    			<view class="clear"></view>
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
	import listTags from '@/components/listTags.vue'
	export default {
		components: {
			loadRefresh,
			listTags
		},
		data() {
			return {
				showKm:false,
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
				  packprice: ''
				},
				kmkey: '',
				packpricekey: '',
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				total: 0,
				// select: [
				// 	{
				// 		label: '0-2万公里',
				// 		value: '1'
				// 	},
				// 	{
				// 		label: '2-5万公里',
				// 		value: '2'
				// 	},
				// 	{
				// 		label: '5-10万公里',
				// 		value: '3'
				// 	},
				// 	{
				// 		label: '10-20万公里',
				// 		value: '4'
				// 	},
				// 	{
				// 		label: '20-30万公里',
				// 		value: '5'
				// 	},
				// 	{
				// 		label: '30-50万公里',
				// 		value: '6'
				// 	},
				// 	{
				// 		label: '50-70万公里',
				// 		value: '7'
				// 	},
				// 	{
				// 		label: '70万公里以上',
				// 		value: '8'
				// 	},
				// 	{
				// 		label: '不限',
				// 		value: '9'
				// 	}
				// ],
				// selectPrice: [
				// 	{
				// 		label: '3万以内',
				// 		value: '1'
				// 	},
				// 	{
				// 		label: '3万-5万',
				// 		value: '2'
				// 	},
				// 	{
				// 		label: '5万以上',
				// 		value: '3'
				// 	},
				// 	{
				// 		label: '不限',
				// 		value: '4'
				// 	}
				// ],
				selectKm: [
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
						value: '0'
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
				selectAge: [
					{
						label: '1年内',
						value: '0'
					},
					{
						label: '1年-3年',
						value: '1'
					},
					{
						label: '3年-5年',
						value: '2'
					},
					{
						label: '5年以上',
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
				pageNum: 1,
				current:-1,
				style:{
					color:'#000'
				},
				styleActive:{
					color:'#40B26D'
				},
				show: false
			}
		},
		mounted() {
			this.pageNum = 1;
			this.search()
		},
		methods: {
			hideMask(){
				this.show = false;
				this.showPrice = false;
				this.showKm = false;
				this.showAge = false;
			},
			toggleKm(){
				this.show = !this.showKm;
				this.showKm = !this.showKm;
				this.showPrice = false;
				this.showAge = false;
			},
			togglePrice(){
				this.show = !this.showPrice;
				this.showPrice = !this.showPrice;
				this.showKm = false;
				this.showAge = false;
			},
			getDataKm(index) {
				this.current = index;
				this.kmkey = this.selectKm[index].label;
				this.form.km = this.selectKm[index].value;
				this.showKm = false;
				this.show = false;
				this.search()
			},
			getDataPrice(index) {
				this.current = index;
				this.packpricekey = this.selectPrice[index].label;
				this.form.packprice = this.selectPrice[index].value;
				this.showPrice = false;
				this.show = false;
				this.search()
			},
			getDataAge(index) {
				this.current = index;
				this.agekey = this.selectAge[index].label;
				this.form.age = this.selectAge[index].value;
				if(this.form.age == '0') {
					this.form.startCarAge = '0';
				    this.form.endCarAge = '1';
					this.caragekey = '1年内';
				}
				if(this.form.age == '1') {
					this.form.startCarAge = '1';
				    this.form.endCarAge = '3';
					this.caragekey = '1年-3年';
				}
				if(this.form.age == '2') {
					this.form.startCarAge = '3';
				    this.form.endCarAge = '5';
					this.caragekey = '3年-5年';
				}
				if(this.carage == '3') {
					this.form.startCarAge = '5';
				    this.form.endCarAge = '';
				}
				if(this.form.age == '4') {
					this.form.startCarAge = '';
				    this.form.endCarAge = '';
				}
				this.showAge = false;
				this.show = false;
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
			// 		collectionstate: 4,
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
			// 		collectionstate: 4,
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
					orderByColumn: 'a.refreshtime',
					isAsc: 'desc'
			    });
					this.$u.api.buying(params).then(res=>{
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
							 	if (item.refreshtime){
							 		let date = new Date(item.refreshtime)
							 		item.refreshtimeStr = this.timeZ(date.getTime())
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
						orderByColumn: 'a.refreshtime',
						isAsc: 'desc'
                    });
					this.$u.api.buying(params).then(res=>{
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
							 	if (item.refreshtime){
							 		let date = new Date(item.refreshtime)
							 		item.refreshtimeStr = this.timeZ(date.getTime())
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
				this.form.km = arr[0].value;
				this.kmkey = arr[0].label;
				this.search()
		    },
			confirmPrice(arr){
				this.form.packprice = arr[0].value;
				this.packpricekey = arr[0].label;
				this.search()
			},
			detail(id) {
				this.$u.route("/pages/mymessage/company/components/index/buyingDetail",{id:id})
			},
			pull() {
				let len = this.list.length;
				 if (len < this.total){
					 this.getList()
				 }else{
					this.status = 'nomore'
				}
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
	.buying {
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
		.active{
			border-bottom: 1rpx solid rgba(0,0,0,0.08);
		}
		.null{
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.wrap {
			padding: 40rpx;
			background-color: #fff;
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
			// background-color: #CDE5E3;
			margin-top: 48rpx;
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
				top: 24rpx;
			    right: 0rpx;
			}
			.list {
				width: 702rpx;
				height: 286rpx;
				padding: 58rpx 38rpx;
				margin-left: 24rpx;
				font-size: 20rpx;
				background-image: url(@/static/bgrentcar.png);
				background-repeat: no-repeat;
				background-size: cover;
				.left {
					margin-top: 10rpx;
				}
				.left, .right {
					float: left;
				}
				.right {
					width: 494rpx;
					padding-left: 34rpx;
					.chat {
						float: right;
						margin-top: 6rpx;
					}
				}
				.city {
					width: 96rpx;
					height: 40rpx;
					line-height: 32rpx;
					text-align: center;
					font-size: 20rpx;
					border-radius: 26rpx;
					border: 1rpx solid rgba(0,0,0,0.3);
					margin-top: 16rpx;
					margin-right: 16rpx;
					float: right;
				}
				.name {
					font-size: 28rpx;
					font-weight: 900;
					margin-top: 8rpx;
				}
				.type {
					font-size: 24rpx;
					color: #7f7f7f;
					margin-top: 8rpx;
				}
				.type text {
					margin-left: 22rpx;
				}
				.price{
					font-size: 24rpx;
				}
				.price text {
					font-size: 36rpx;
					font-weight: 900;
					color: #40B36C;
					margin-left: 8rpx;
				}
				.year {
					float: left;
					font-size: 24rpx;
				}
			}
		}
		.triangleActive{
			display: inline-block;
		    width: 0;
		    height: 0;
		    border: 10rpx solid;
		    border-color: transparent transparent #40B26D transparent;
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
	}
</style>
