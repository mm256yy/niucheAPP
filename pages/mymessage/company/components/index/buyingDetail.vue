<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="购车需求详情" :background="backgroundCom" :back-text-style="backTextStyle" title-width="300" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon>
				</view>
			</view>
		 </u-navbar>
		 <view class="list">
		 	<u-image class="left" width="152rpx" height="152rpx"  shape="circle" :src="detail.comparyPhotoUrl"></u-image>
		 	<view class="right">
				<!-- <u-icon class="reload" name="reload" color="#ffffff" size="50" @click="shared"></u-icon> -->
		 		<view class="name u-line-2">{{detail.comparyname}}</view>
				<view class="clear"></view>
				<view>
					<u-image class="car" width="29rpx" height="26rpx" src="@/static/car.png"></u-image>
					<view class="year">{{detail.comparytag === 1?'网约车运营':'出租车运营' }}</view>
					<view class="clear"></view>
				</view>
				<view class="box">
				    <view>求购</view>
				    <text class="num">{{detail.comparyAskShopNum}}</text>辆
				</view>
		 	</view>
			<view class="clear"></view>
			<view class="time">刷新时间：{{comparyRefreshTimeStr}}</view>
		 </view>
		 <view class="content">
			 <u-form label-width="150" label-align="right" :model="detail" ref="uForm">
			 		<u-form-item label="打包价:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.packprice" /></u-form-item>
					<u-form-item label="意向品牌:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.intenitonBrand" /></u-form-item>
					<u-form-item label="行驶里程:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.driveKm" /></u-form-item>
					<u-form-item label="动力类型:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.power" /></u-form-item>
			 </u-form>
		 </view>
         <view style="width: 100%;height: 124rpx;"></view>
		 <view class="bottom" @click="phone()">
		 	<view>拨打电话</view>
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
				driverDemandId: '',
				detail: {},
				comparyRefreshTimeStr: '',
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.driverDemandId = id;
			}
		},
		mounted() {
			this.getDetail()
		},
		methods: {
			phone() {
				uni.makePhoneCall({ phoneNumber: '18748412671' });
			},
		    format(time, format) {
			            var t = new Date(time);
			            var tf = function(i) {
			                return (i < 10 ? '0' : '') + i
			            };
			            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
			                switch (a) {
			                case 'yyyy':
			                    return tf(t.getFullYear());
			                    break;
			                case 'MM':
			                    return tf(t.getMonth() + 1);
			                    break;
			                case 'mm':
			                    return tf(t.getMinutes());
			                    break;
			                case 'dd':
			                    return tf(t.getDate());
			                    break;
			                case 'HH':
			                    return tf(t.getHours());
			                    break;
			                case 'ss':
			                    return tf(t.getSeconds());
			                    break;
			                }
			            });
			        },
			getDetail(){
					this.$u.api.detailBuying({id: this.driverDemandId}).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
							 this.comparyRefreshTimeStr = this.format(this.detail.comparyRefreshTime, 'yyyy-MM-dd HH:mm:ss');
							 if(this.detail.intenitonBrand) {
								this.detail.intenitonBrand = this.detail.intenitonBrand.join('/') 
							 }
							 if(this.detail.power) {
							    this.detail.power = this.detail.power.join('/') 
							 }
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
		    recommend() {
				this.$u.route("/pages/mymessage/company/components/index/buyingRecommend")
			}
			
		}
	}
</script>
<style lang="scss" scoped>
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
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	.detail {
		background-color: #F5F5F8;
		.list{
			width: 671rpx;
			height: 257rpx;
			border-radius: 60rpx 0 60rpx 60rpx;
			padding: 40rpx;
			color: #fff;
			font-size: 20rpx;
			margin-left: 40rpx;
			margin-top: 40rpx;
			background: linear-gradient(115deg,#6DD99C, #37AB63);
			.clear {
				clear: both;
			}
			.left, .right{
				float: left;
			}
			.right {
				width: 432rpx;
				height: 152rpx;
				padding: 0 30rpx;
			}
			.name {
				font-weight: 900;
				font-size: 36rpx;
				margin-bottom: 4rpx;
				float: left;
			}
			.clock,.year,.car,.type {
				float: left;
			}
			.clock {
				font-size: 40rpx;
			}
			.year,.type {
				margin-left: 10rpx;
			}
			.time {
				margin-top: 19rpx;
			}
			.box {
				// width: 160rpx;
				// height: 135rpx;
				padding: 4rpx;
				float: right;
				margin-top: -80rpx;
				margin-right: -80rpx;
				font-size: 20rpx;
				background: #fff;
				color: #37AB63;
				.num {
					font-size: 36rpx;
					font-weight: 900;
				}
			}
			.reload {
				float: right;
				margin-right: 10rpx;
				margin-top: -20rpx;
				margin-right: -60rpx;
			}
		}
		.content {
			font-size: 28rpx;
			font-weight: 900;
			padding: 40rpx;
			.u-form-item{
				border-bottom: 1rpx solid rgba(0,0,0,0.06);
			}
		}
		.bottom {
			width: 750rpx;
			height: 125rpx;
			line-height: 125rpx;
			text-align: center;
			color: #fff;
			font-size: 40rpx;
			font-weight: 900;
			background: linear-gradient(115deg,#6DD99C, #37AB63);
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>


