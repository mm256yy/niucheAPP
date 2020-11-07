<template>
	<view class="buying">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:280rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="行驶里程" @click="show = true" v-model="kmkey" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:180rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="打包价" @click="showPrice = true" v-model="packpricekey" type="select" /></u-form-item>
			</u-form>
			<view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select value-name='id' v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select value-name='value' v-model="showPrice" mode="single-column" :list="selectPrice" @confirm="confirmPrice"></u-select>
		</view>
		<!-- <view class="wrap">
			<u-swiper width="672" height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view v-for="(item, index) in list" :key="index">
			<view class="list" @click="detail(item.demandid)">
				<view class="year">刷新时间：{{item.refreshtimeStr}}</view>
				<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
				<view class="clear"></view>
				<u-image class="left" width="125rpx" height="125rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
				<view class="right">
					<view class="name u-line-1">{{item.teXtTile}}</view>
					<view class="type">{{item.comparyName}}<span>{{item.comparyArea}}</span></view>
					<view class="price">打包价:<span>{{item.packprice}}</span></view>
				</view>
				<view class="clear"></view>
			</view>
			<u-icon v-show="item.iscollection === 1" @click="cancel(item.id)" class="heart" name="heart-fill" color="#FFA032" size="28"></u-icon>
			<u-icon v-show="item.iscollection === 2" @click="favorites(item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				showPrice:false,
				change: false,
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
				list: []
			}
		},
		mounted() {
			this.search()
		},
		methods: {
			favorites(id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 1 
				};
			    this.$u.api.collect(params).then(res=>{
			    	if(res.code === 200){
			    		 this.$u.toast('收藏成功');
			    	}else {
			    		 this.$u.toast(res.msg);
			    	}
			    })
			},
			cancel(id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 1 
				};
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
			    	pageSize: 10
			    });
					this.$u.api.buying(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total= res.total;
							 this.list.forEach(item=>{
							 	if (item.refreshtime){
							 		item.refreshtimeStr = this.timeZ(item.refreshtime)
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
					this.$u.api.buying(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total= res.total;
							 this.list.forEach(item=>{
							 	if (item.refreshtime){
							 		item.refreshtimeStr = this.timeZ(item.refreshtime)
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
		    },
			confirmPrice(arr){
				this.form.packprice = arr[0].value;
				this.packpricekey = arr[0].label;
			},
			detail(id) {
				this.$u.route("/pages/mymessage/company/components/index/buyingDetail",{id:id})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.buying {
		.wrap {
			padding: 40rpx;
		}
		.middle-content .u-form {
			width: 621rpx;
			height: 71rpx;
			border-radius: 40rpx 0 0 40rpx;
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
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 144rpx;
		    right: 34rpx;
		}
		.list {
			width: 702rpx;
			height: 308rpx;
			padding: 38rpx;
			margin-left: 24rpx;
			margin-top: 24rpx;
			font-size: 20rpx;
			background-image: url(@/static/bgbuying.png);
			background-repeat: no-repeat;
			background-size: cover;
			.clear {
				clear: both;
			}
			.left {
				margin-top: 19rpx;
			}
			.left, .right {
				float: left;
			}
			.right {
				width: 494rpx;
				padding-left: 34rpx;
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
				margin-top: 20rpx;
			}
			.type {
				font-size: 20rpx;
				color: #7f7f7f;
				margin-top: 8rpx;
			}
			.type span {
				margin-left: 22rpx;
			}
			.price {
				margin-top: 9rpx;
			}
			.price span {
				font-size: 36rpx;
				font-weight: 900;
				color: #40B36C;
				margin-left: 8rpx;
			}
			.year {
				float: left;
			}
		}
	}
</style>
