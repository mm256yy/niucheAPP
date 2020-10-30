<template>
	<view class="carRent">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:160rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="租金" @click="show = true" v-model="form.ageDriver" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:150rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="showPrice = true" v-model="form.price" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:60rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="筛选" @click="filter" type="text" :disabled="true" /></u-form-item>
				<view class="clear"></view>
			</u-form>
			<view class="icon"><u-icon name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select v-model="showPrice" mode="single-column" :list="selectType" @confirm="confirmType"></u-select>
		</view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view class="list" @click="detail()">
			<view class="right">
				<view class="name">520520款运动版</view>
				<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
				<view class="year">车龄<3个月</view>
				<view class="clear"></view>
				<u-icon class="car" name="car" width="22" height="22"></u-icon>
				<view class="distance">20万公里-30万公里</view>
				<view class="clear"></view>
			</view>
			<u-image class="left" width="306rpx" height="226rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="clear"></view>
			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
			<view class="box">
				<view><span>28000</span>元/月起租</view>
				<view class="case">自动挡</view>
				<view class="case">SUV</view>
				<view class="case">纯电动</view>
			</view>
		</view>
		<view class="list" @click="detail()">
			<view class="right">
				<view class="name">520520款运动版</view>
				<u-icon class="clock" name="clock"></u-icon>
				<view class="year">车龄<3个月</view>
				<view class="clear"></view>
				<u-icon class="car" name="car" width="42" height="37"></u-icon>
				<view class="distance">20万公里-30万公里</view>
				<view class="clear"></view>
			</view>
			<u-image class="left" width="306rpx" height="226rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="clear"></view>
			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
			<view class="box">
				<view><span>28000</span>元/月起租</view>
				<view class="case">自动挡</view>
				<view class="case">SUV</view>
				<view class="case">纯电动</view>
			</view>
		</view>
		<view class="list" @click="detail()">
			<view class="right">
				<view class="name">520520款运动版</view>
				<u-icon class="clock" name="clock"></u-icon>
				<view class="year">车龄<3个月</view>
				<view class="clear"></view>
				<u-icon class="car" name="car" width="42" height="37"></u-icon>
				<view class="distance">20万公里-30万公里</view>
				<view class="clear"></view>
			</view>
			<u-image class="left" width="306rpx" height="226rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="clear"></view>
			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
			<view class="box">
				<view><span>28000</span>元/月起租</view>
				<view class="case">自动挡</view>
				<view class="case">SUV</view>
				<view class="case">纯电动</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				showPrice:false,
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
				  ageDriver: '',
				  price: ''
				},
				pagination: {
				  pageIndex: 0, 
				  pageSize: 10
				},
				total: 0,
				select: [
					{
						label: '不限',
						value: '0'
					},
					{
						label: '2000以内',
						value: '1'
					},
					{
						label: '2000-3000',
						value: '2'
					},
					{
						label: '3000-4000',
						value: '3'
					},
					{
						label: '4000及以上',
						value: '4'
					}
				],
				selectType: [
					{
						label: '不限',
						value: '0'
					},
					{
						label: '网约车',
						value: '1'
					},
					{
						label: '出租车',
						value: '2'
					}
				],
				list: []
			}
		},
		onReady() {
		    
		},
		mounted() {
			
		},
		methods: {
		    getSelectFirst(){
		    		this.$u.api.getCarSystem().then(res=>{
		    			if(res.code === 200){
		    				 this.select = res.alibabaCarModelVoList;
		    			}else {
		    				 this.$u.toast(res.message);
		    			}
		    		})
		    },
		    getList(){
		        const params = Object.assign(this.form, {
		        	pageIndex: this.pageIndex + 1,
		        	pageSize: 10
		        });
		    		this.$u.api.getCarSystem(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.alibabaCarModelVoList;
		    				 this.total= res.total;
		    			}else {
		    				 this.$u.toast(res.message);
		    			}
		    		})
		    },
		    search(){
		        const params = Object.assign(this.form, {
		    		pageIndex: 0,
		    		pageSize: 10
		    	});
		    		this.$u.api.getCarSystem(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.alibabaCarModelVoList;
		    			}else {
		    				 this.$u.toast(res.message);
		    			}
		    		})
		    },
		    confirm(arr){
		    	this.form.ageDriver = arr[0].label;
		    },
		    confirmType(arr){
		    	this.form.price = arr[0].label;
			},
			detail() {
				this.$u.route("/pages/index/driver/components/index/carRentDetail")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carRent {
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
		.list{
			width: 679rpx;
			height: 285rpx;
			color: #000;
			font-size: 20rpx;
			margin-left: 36rpx;
			margin-top: 40rpx;
			.clear {
				clear: both;
			}
			.left {
				float: right;
			}
			.right{
				width: 373rpx;
				height: 226rpx;
				padding: 0 30rpx;
				background: #fff;
				float: left;
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
				color: #7f7f7f;
				margin-top: 4rpx;
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
				view {
					font-size: 20rpx;
					float: left;
				}
				view span {
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
</style>
