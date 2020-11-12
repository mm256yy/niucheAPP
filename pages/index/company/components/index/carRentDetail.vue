<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="司机租车需求详情" :background="backgroundCom" :back-text-style="backTextStyle" title-width="300" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon>
				</view>
			</view>
		 </u-navbar>
		 <view class="list">
		 	<u-image class="left" width="152rpx" height="152rpx"  shape="circle" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="right">
		 		<view class="name">{{form.userName}}</view>
				<!-- <view class="special">加急</view> -->
				<view class="clear"></view>
				<u-icon width="42" height="37" class="clock" name="clock"></u-icon>
		 		<view class="year">驾龄{{form.drivingYear}}年</view>
				<view class="clear"></view>
				<u-image class="img" width="42" height="37" src="@/static/cert.png"></u-image>
				<view v-show="form.ifAuthentication == 0" class="type">未认证</view>
				<view v-show="form.ifAuthentication == 1"  class="type">网约车认证</view>
				<view v-show="form.ifAuthentication == 2"  class="type">出租车认证</view>
		 		<view class="clear"></view>
				<view class="box">
				    <view class="typePermit">准驾类型</view>
				    <view class="grade">{{form.carType}}</view>
				</view>
		 	</view>
			<view class="clear"></view>
			<view class="time">刷新时间：{{form.updateTime}}</view>
		 </view>
		 <view class="content">
			 <u-form label-width="150" label-align="left" :model="form" ref="uForm">
			 			<u-form-item label="租车城市:">
			 				<u-input :disabled="true" height="80" input-align="right" placeholder="" v-model="form.workCity" />
			 			</u-form-item>
			 			<u-form-item label="业务类型:"><u-input :disabled="true" height="80" placeholder="" input-align="right"
			 			 v-model="form.businessType===0?'网约车':'出租车'" /></u-form-item>
			 			<u-form-item label="意向品牌:"><u-input :disabled="true" height="80" placeholder="" 
			 			type="textarea" input-align="right" v-model="form.carCard" /></u-form-item>
			 			<u-form-item label="月租:"><u-input :disabled="true" height="80" type="textarea" placeholder="" input-align="right"
			 			 v-model="form.monthlyRent===0?'3000以内(含3000)':'3000以上'" /></u-form-item>
			 			<u-form-item label="行驶里程:"><u-input :disabled="true" height="80" type="textarea" placeholder=""
			 			 input-align="right" v-model="form.kmStr" /></u-form-item>
			 			<u-form-item label="动力类型:"><u-input :disabled="true" height="80" type="textarea" placeholder="" 
			 			input-align="right" v-model="form.power" /></u-form-item>
			  </u-form>
		 </view>
		 <view class="bottom" @click="recommend()">
			 <view>向他推荐本公司租车信息</view>
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
				driverDemandId:'',
				form: {
					kmStr:'',
					userName:'',
					userAge:'',
					userAvatar:'',
					drivingYear:'',
					ifAuthentication:'',
					carType:'',
					updateTime:'',
					workCity:'',
					businessType:'',
					city:'',
					carCard:'',
					carModel:'',
					power:'',
					monthlyRent:'',
					carAge:'',
					km:'',
				},
				xslc:[{name: 0,text:'0-2万公里' },{name: 1,text:'2万公里-5万公里' },
					  {name: 2,text:'5万公里-10万公里' },{name: 3,text:'10万公里-20万公里' },{name: 4,text:'20万公里-30万公里' },
					  {name: 5,text:'30万公里-50万公里' },{name: 6,text:'50万公里-70万公里' },{name: 7,text:'70万公里以上'},{name: 8,text:'30万公里以上'},]
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.driverDemandId = id;
			}
		},
		mounted() {
			this.getDetail();
		},
		methods: {
		    recommend() {
				this.$u.route("/pages/index/company/components/index/carRentRecommend")
			},
			getDetail(){
				this.$u.api.getUserWanted({driverDemandId:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						 this.form = res.object
						 this.xslc.forEach(item=>{
							 if(item.name === this.form.km){
								 this.form.kmStr = item.text;
							 }
						 })
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
	    },
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
			.special {
				width: 73rpx;
				height: 34rpx;
				line-height: 34rpx;
				text-align: center;
				border-radius: 16rpx;
				background: orange;
				font-size: 10rpx;
				float: left;
				margin-left: 16rpx;
				margin-top: 8rpx;
			}
			.clock,.year,.type {
				float: left;
				margin-top: 6rpx;
			}
			.year {
				margin-left: 10rpx;
				margin-top: 14rpx;
				font-size: 20rpx;
			}
			.type {
				margin-left: 10rpx;
				margin-top: -2rpx;
				font-size: 20rpx;
			}
			.img,.type {
				float: left;
			}
			.time {
				margin-top: 19rpx;
				font-size: 20rpx;
			}
			.box {
				padding: 8rpx;
				background: #fff;
				float: right;
				margin-top: -40rpx;
				margin-right: -76rpx;
				font-size: 36rpx;
				font-weight: 900;
				color: #37AB63;
				.typePermit {
					font-size: 20rpx;
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
		}
	}
</style>


