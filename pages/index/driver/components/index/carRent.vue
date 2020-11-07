<template>
	<view class="carRent">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item style="width:160rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="租金" @click="show = true" v-model="priceid" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:150rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="showPrice = true" v-model="businesstype" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:60rpx;margin-left:40rpx;margin-top: -20rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="筛选" @click="filter()" type="text" :disabled="true" /></u-form-item>
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
		<view v-for="(item, index) in list" :key="index">
			<view v-show="list.length" class="list" @click="detail()">
				<view class="right">
					<view class="name">520520款运动版{{list.texttitle}}</view>
					<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
					<view class="year">车龄<3个月{{item.carage}}</view>
					<view class="clear"></view>
					<u-image class="car" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
					<view class="distance">20万公里-30万公里{{item.carkm}}</view>
					<view class="clear"></view>
				</view>
				<view class="label">网约车{{list.businesstypetag}}</view>
				<u-image class="left" width="300rpx" height="153rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
				<view class="clear"></view>
				<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
				<view class="box">
					<view><text>￥{{list.rentprice}}</text>元/月起租</view>
					<view v-for="(item, index) in item.systemtag" :key="index" class="case">自动挡</view>
					<view v-for="(item, index) in item.usertag" :key="index" class="case">SUV</view>
				</view>
			</view>
			<u-icon v-show="item.iscollect&&list.length" @click="cancel(item.id)" class="heart" name="heart-fill" color="#FFA032" size="28"></u-icon>
			<u-icon v-show="!item.iscollect&&list.length" @click="favorites(item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
		</view>
		<view class="null" v-show="!list.length">
			<u-image width="371rpx" height="171rpx" src="@/static/empty.png"></u-image>
			<view class="tip">很抱歉，没有找到符合条件的内容。请修改条件后再试。</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				showType:false,
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
				  priceid: '',
				  businesstype: ''
				},
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				priceid: '',
				businesstype: '',
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
				list: [0]
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
		    		this.$u.api.homeRent(params).then(res=>{
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
		    		pageNum: 1,
		    		pageSize: 10
		    	});
		    		this.$u.api.homeRent(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
							 this.total = res.total;
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    confirm(arr){
		    	this.priceid = arr[0].label;
				this.form.priceid = arr[0].value;
		    },
		    confirmType(arr){
		    	this.businesstype = arr[0].label;
		    	this.form.businesstype = arr[0].value;
			},
			detail(id) {
				this.$u.route("/pages/index/driver/components/index/carRentDetail",{id:id})
			},
			filter() {
				this.$u.route("/pages/index/driver/components/index/filterRent")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carRent {
		.null {
			margin-left: 198rpx;
			margin-top: 229rpx;
			.tip {
				width: 384rpx;
				height: 49rpx;
				line-height: 49rpx;
				text-align: center;
				margin-top: 60rpx;
				font-size: 20rpx;
			}
		}
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
			top: 140rpx;
		    right: 34rpx;
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
				margin-top: 20rpx;
			}
			.right{
				width: 373rpx;
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
</style>
