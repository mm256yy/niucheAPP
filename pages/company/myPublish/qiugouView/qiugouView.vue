<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="购车需求详情" :background="backgroundCom" :back-text-style="backTextStyle" title-width="300" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<!-- <u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon> -->
				</view>
			</view>
		 </u-navbar>
		 <view class="list">
		 	<u-image class="left" width="152rpx" height="152rpx"  shape="circle" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="right">
				<!-- <u-icon class="reload" name="reload" color="#ffffff" size="50" @click="shared"></u-icon> -->
		 		<view class="name u-line-1" style="width: 100%;">{{detail.comparyname}}</view>
				<view class="clear"></view>
				<view>
					<u-image class="car" width="29rpx" height="26rpx" src="@/static/car.png"></u-image>
					<view class="year">{{detail.comparytag === '1'?'网约车运营':'出租车运营' }}</view>
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
			 		<u-form-item label="打包价:"><u-input style="padding-top: 60rpx;" :disabled="true"
					 height="100" type="textarea" input-align="right" placeholder="" v-model="detail.packprice" /></u-form-item>
					<u-form-item label="意向品牌:"><u-input style="padding-top: 60rpx;" placeholder=""
					 :disabled="true" height="100" type="textarea" input-align="right" v-model="detail.intenitonBrand" /></u-form-item>
					<u-form-item label="行驶里程:"><u-input style="padding-top: 60rpx;" placeholder=""
					:disabled="true" height="100" type="textarea" input-align="right" v-model="detail.driveKm" /></u-form-item>
					<u-form-item label="动力类型:"><u-input style="padding-top: 60rpx;" :disabled="true" placeholder=""
					 height="100" type="textarea" input-align="right" v-model="detail.power" /></u-form-item>
			 </u-form>
		 </view>
		 <PubBottom :isopen="detail.isopen" :id="AskToShopId" :type="4"></PubBottom>
	</view>
</template>

<script>
	import PubBottom from '@/components/pubBottom.vue'
	export default {
		components: {
			PubBottom
		  },
		data() {
			return {
				
				backTextStyle:{
					'color':'#ffffff'
				},
				AskToShopId: '',
				detail: {},
				comparyRefreshTimeStr: '',
				isopen:0,
				type:4
			}
		},
		onLoad(option) {
			let id = option.id;
			this.AskToShopId = id;
		},
		mounted() {
			this.getDetail()
		},
		methods: {
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
					this.$u.api.ComparyMyAskToShopForOne({AskToShopId:this.AskToShopId}).then(res=>{
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
				font-size: 12pt;
				float: left;
			}
			.clock,.year,.car,.type {
				float: left;
				margin-top: 6rpx;
			}
			.clock {
				font-size: 40rpx;
			}
			.car {
				font-size: 36rpx;
			}
			.year,.type {
				margin-left: 10rpx;
				margin-top: 12rpx;
			}
			.time {
				margin-top: 19rpx;
			}
			.box {
				width: 180rpx;
				height: 125rpx;
				padding: 6rpx;
				float: right;
				margin-top: -82rpx;
				margin-right: -76rpx;
				font-size: 32rpx;
				background: #fff;
				color: #37AB63;
				.num {
					font-size: 16pt;
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
			margin-top: 40rpx;
		}
	}
</style>


