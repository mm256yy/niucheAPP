<template>
	<view class="carRent">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:160rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="月薪区间" @click="show = true" v-model="form.ageDriver" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:150rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="showPrice = true" v-model="form.price" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:60rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="筛选" @click="filter" type="text" :disabled="true" /></u-form-item>
				<view class="clear"></view>
			</u-form>
			<view class="icon"><u-icon name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select v-model="showType" mode="single-column" :list="selectType" @confirm="confirmType"></u-select>
		</view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view class="list" @click="detail()">
			<u-image class="left" width="264rpx" height="199rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="tag">付费标签</view>
				<view class="type">网约车</view>
				<!-- <u-icon class="heart" name="heart-fill" color="#FCD03C" width="19" height="18"></u-icon> -->
				<view class="clear"></view>
				<view class="name">高薪招聘高薪招聘高薪招聘...</view>
				<u-icon class="car" name="car" width="22" height="22"></u-icon>
				<view class="distance">荣威\吉利\比亚迪...</view>
				<view class="clear"></view>
			</view>
			<view class="clear"></view>
			<view class="box">
				<view><span>28000</span>元/月起租</view>
				<view class="case">自动挡</view>
				<view class="case">SUV</view>
				<view class="case">纯电动</view>
			</view>
		</view>
		<u-icon v-show="change" @click="favorites()" class="heart" name="heart-fill" color="#FFA032" size="28"></u-icon>
		<u-icon v-show="!change" @click="favorites()" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
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
				  ageDriver: '',
				  price: ''
				},
				pagination: {
				  pageNum: 0, 
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
						value: '1'
					},
					{
						label: '出租车',
						value: '2'
					},
					{
						label: '不限',
						value: '3'
					}
				],
				list: []
			}
		},
		mounted() {
			this.search()
		},
		methods: {
			favorites() {
			    this.change = !this.change;	
			},
		    getList(){
		        const params = Object.assign(this.form, {
		        	pageNum: this.pageNum + 1,
		        	pageSize: 10
		        });
		    		this.$u.api.getCarSystem(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total= res.total;
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
		        const params = Object.assign(this.form, {
		    		pageNum: 0,
		    		pageSize: 10
		    	});
		    		this.$u.api.getCarSystem(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    			}else {
		    				 this.$u.toast(res.msg);
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
				this.$u.route("/pages/index/driver/components/index/jobSearchDetail")
			},
			filter() {
				this.$u.route("/pages/index/driver/components/index/filterSearch")
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
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 154rpx;
		    right: 34rpx;
		}
		.list{
			width: 679rpx;
			height: 295rpx;
			color: #000;
			font-size: 20rpx;
			margin-left: 36rpx;
			margin-top: 40rpx;
			.clear {
				clear: both;
			}
			.left {
				float: left;
				margin-left: 19rpx;
				margin-top: 20rpx;
			}
			.right{
				width: 396rpx;
				height: 226rpx;
				padding: 0 30rpx;
				background: #fff;
				float: left;
			}
			.name {
				font-weight: 900;
				font-size: 28rpx;
				margin-top: 18rpx;
			}
			.car {
				float: left;
				color: #7f7f7f;
				margin-top: 23rpx;
			}
			.distance {
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
				width: 86rpx;
				height: 28rpx;
				line-height: 28rpx;
				text-align: center;
				background: rgba(0,0,0,0.1);
				font-size: 20rpx;
				float: left;
				margin-left: 33rpx;
				margin-top: 28rpx;
				margin-right: 20rpx;
			}
			.heart {
				float: right;
				margin-top: -24rpx;
			}
			.box {
				width: 679rpx;
				height: 59rpx;
				background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
				padding: 0 0 0 18rpx;
				color: #fff;
				margin-top: 10rpx;
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
