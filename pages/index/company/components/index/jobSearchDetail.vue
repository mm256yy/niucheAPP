<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="司机求职需求详情" :background="backgroundCom" :back-text-style="backTextStyle" title-width="300" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<!-- <u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon> -->
				</view>
			</view>
		 </u-navbar>
		 <view class="list">
		 	<u-image class="left" width="152rpx" height="152rpx"  shape="circle" :src="form.userAvatar"></u-image>
		 	<view class="right">
		 		<view class="name">{{form.userName}}</view>
		 			<!-- <view class="special">加急</view> -->
		 			<view class="clear"></view>
		 			<u-icon width="39" height="39" class="clock" name="clock"></u-icon>
		 			<view class="year">驾龄{{form.drivingYear}}年</view>
		 			<view class="clear"></view>
		 			<u-image class="img" width="36rpx" height="32rpx" src="@/static/cert.png"></u-image>
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
			 <u-form label-width="300" label-align="left" :model="form" ref="uForm">
			 			<u-form-item label="工作城市:">
			 				{{form.workCity}}
			 			</u-form-item>
			 			<u-form-item label="业务类型:">
			 			    <text v-show="form.businessType==1">网约车</text>
			 				<text v-show="form.businessType==2">出租车</text>
			 			</u-form-item>
			 			<u-form-item label="月薪:">{{form.monthprice}}</u-form-item>
			 			<!-- <u-form-item label="押金:">{{form.myok}}</u-form-item> -->
						<u-form-item label="能接受的工作时长:">{{form.worktime}}</u-form-item>
						<u-form-item label="福利要求:">{{form.welfare||'未填写'}}</u-form-item>
						<u-form-item v-show="form.workingExperience" label="从业经验:">{{form.workingExperience}}年</u-form-item>
						<u-form-item v-show="!form.workingExperience" label="从业经验:">未填写</u-form-item>
						<u-form-item label="我的优势:">{{form.myok||'未填写'}}</u-form-item>
			 </u-form>
		 </view>
		 <view style="width: 100%;height: 124rpx;"></view>
		 <view class="bottom" @click="dial()">
			 <view>在线沟通</view>
		 </view>
		 <phone-auth ref="phone" :phone="form.phone" :adverseUsermainId="form.adverseUsermainId" :status="status"></phone-auth>
	</view>
</template>

<script>
	import phoneAuth from '@/components/phoneAuth.vue'
	export default {
		components: {
			phoneAuth
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				status: 2,
				token:'',
				hailing:'网约车',
				taxi:'出租车',
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
					myok:'',
				},
				salaryList:[{name: 0,text:'6000以内' },{name: 1,text:'6000-8000' },{name: 2,text:'8000-10000' },{name: 3,text:'10000以上' }],
				hoursList:[{name: 0,text:'8小时' },{name: 1,text:'8-10小时' },{name: 2,text:'10小时以上' },{name: 3,text:'不限' }],
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
			this.token = uni.getStorageSync('token');
		},
		methods: {
			getDetail(){
				this.$u.api.getUserJobWanted({driverDemandId:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						 this.form = res.object;
						 this.salaryList.forEach(item=>{
							 if(item.name == this.form.monthprice){
								 this.form.monthprice = item.text;
							 }
						 })
						 this.hoursList.forEach(item=>{
							 if(item.name == this.form.worktime){
							 		this.form.worktime = item.text;
							 }
						 })
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
		    recommend() {
				this.$u.route("/pages/index/company/components/index/jobSearchRecommend")
			},
			dial() {
				this.status = 1;
				this.$refs.phone.getStatus()
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
			.clock{
				margin-top: 16rpx;
			}
			.year {
				margin-left: 10rpx;
				margin-top: 14rpx;
				font-size: 20rpx;
			}
			.type {
				margin-left: 8rpx;
				margin-top: -2rpx;
				font-size: 20rpx;
				float: left;
			}
			.img{
				float: left;
				margin-left: -6rpx;
			}
			.time {
				margin-top: 19rpx;
				font-size: 20rpx;
			}
			.box {
				width: 180rpx;
				padding: 8rpx;
				background: #fff;
				float: right;
				margin-top: -40rpx;
				margin-right: -70rpx;
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
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>


