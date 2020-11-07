<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="购车需求详情" :background="backgroundCom" :back-text-style="backTextStyle" title-width="300" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon>
				</view>
			</view>
		 </u-navbar>
		 <view class="list">
		 	<u-image class="left" width="152rpx" height="152rpx"  shape="circle" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="right">
				<u-icon class="reload" name="reload" color="#ffffff" size="50" @click="shared"></u-icon>
		 		<view class="name">吴司机</view>
				<view class="clear"></view>
				<u-icon class="car" name="car" width="42" height="37"></u-icon>
		 		<view class="year">网约车运营</view>
				<view class="clear"></view>
				<u-icon class="car" name="car" width="42" height="37"></u-icon>
		 		<view class="type">出租车运营</view>
		 		<view class="clear"></view>
				<view class="box">
				    <view>准驾类型</view>
				    <view>C1</view>	
				</view>
		 	</view>
			<view class="clear"></view>
			<view class="time">刷新时间：{{detail.comparyRefreshTime}}</view>
		 </view>
		 <view class="content">
			 <u-form label-width="150" label-align="right" :model="detail" ref="uForm">
			 		<u-form-item label="打包价:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.packprice" /></u-form-item>
					<u-form-item label="意向品牌:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.intenitonBrand" /></u-form-item>
					<u-form-item label="行驶里程:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.driveKm" /></u-form-item>
					<u-form-item label="动力类型:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="detail.power" /></u-form-item>
			 	</u-form>
		 </view>
		 <view class="bottom" @click="recommend()">
			 <view>向他推荐本公司卖车信息</view>
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
				detail: {}
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
			getDetail(){
					this.$u.api.detailBuying({id: this.driverDemandId}).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
							 if(this.detail.intenitonBrand) {
								this.detail.intenitonBrand.forEach(item=>{
									item = item.join('/')
																
								}) 
							 }
							 if(this.detail.power) {
							    this.detail.power.forEach(item=>{
							    	item = item.join('/')
							    								
							    }) 
							 }
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
		    recommend() {
				this.$u.route("/pages/mymessage/company/components/index/buyingRecommend")
			},
			shared(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
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
		.list{
			width: 670rpx;
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
				margin-top: 10rpx;
			}
			.time {
				margin-top: 19rpx;
			}
			.box {
				float: right;
				margin-top: -32rpx;
				font-size: 32rpx;
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
		}
	}
</style>


