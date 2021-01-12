<template>
	<view>
		<view class="top">
			<view>
				<view class="imgUrl">
						<view class="about" @click="toAboutUs">关于</view>
						<u-row style="padding:48pt 36rpx 5pt; ">
							<u-col span="3" v-show="!tokenFlag">
								<u-avatar src="../../static/notLogin.png" mode="circle" size="large" ></u-avatar>
							</u-col>
							<u-col span="3" v-show="tokenFlag" >
								<u-avatar :src="driverPub.headPhoto" mode="circle" size="large" ></u-avatar>
							</u-col>
							<u-col span="8" v-if="!tokenFlag">
								<view @click="toLogin" style="color: #fff;font-size: 36rpx;display: flex;font-weight: 700;">
								  <view>登录注册</view>
								  <u-image style="margin-top: 4rpx;" width="32" height="48" src="@/static/right.png"></u-image>
								</view>
							</u-col>
							<u-col span="8" v-show="tokenFlag" >
								<view style="margin-top: -40rpx;" @click="toMyInfo">
								<view style="color: #fff;font-size: 36rpx;">{{driverPub.name}}</view>
								<text style="color: #fff;font-size: 30rpx;">{{driverPub.telephone}}</text>
								</view>
							</u-col>
							<u-col span="1" @click="toMyInfo" v-show="tokenFlag">
								<u-image style="margin-top: 18rpx;" width="32" height="48" src="@/static/right.png"></u-image>
								<!-- <u-icon name="arrow-right" color="#fcbb30" size="30"></u-icon> -->
							</u-col>	
						</u-row>
						<view class="case" @click="toLicense">
							<view class="box">
								<view class="name">驾照认证</view>
								<view class="visible">{{driverPub.driverState | stateV}}</view>
							</view>
							<u-image style="margin-top: 36rpx;" width="54rpx" height="52rpx" src="@/static/license.png"></u-image>
						</view>
						<view class="cases" @click="toCard">
							<view class="box">
								<view style="width: 200rpx;" class="name">执业资格认证</view>
								<view class="visible">{{driverPub.postState | stateV}}</view>
							</view>
							<u-image style="margin-top: 36rpx;" width="58rpx" height="56rpx" src="@/static/qualification.png"></u-image>
						</view>
				</view>
				<view class="room"></view>
				<u-image width="682" height="120" src="@/static/account.png" @click="account" class="account"></u-image>
				<text v-show="tokenFlag" @click="account" class="text">余额：￥{{driverPub.account}}</text>
				<text v-show="!tokenFlag" @click="account" class="text">余额：￥0</text>
				<view @click="toInvite" class="invite">邀请好友</view>
				<view style="width: 100%;padding: 54rpx 20rpx 36rpx 72rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-size: 36rpx;color: #333;font-weight: 900;">我的发布</view>
					<!-- <view @click="toShopPage" style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">店铺首页</view>
						<u-image style="margin-right: 60rpx;" width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view> -->
				</view>
				<view @click="toMyPub(0)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 20rpx 20rpx 0 0;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/demandRenting.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">租车需求</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{driverPub.carNum == 0?'未发布':'已发布'}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toMyPub(1)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 0 0 20rpx 20rpx;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/demandSearch.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">求职需求</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{driverPub.carNum == 0?'未发布':'已发布'}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<!-- <view style="width: 100%;padding: 54rpx 20rpx 36rpx 72rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-size: 36rpx;color: #333;font-weight: 900;">我的业务</view>
				</view>
				<view @click="toMyPub(0)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 20rpx 20rpx 0 0;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/order.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">我的订单</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{driverPub.carNum == 0?'未发布':'已发布'}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toMyPub(1)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 0 0 20rpx 20rpx;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/together.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">我参加的拼租</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{driverPub.carNum == 0?'未发布':'已发布'}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view> -->
				<view style="width: 100%;padding: 54rpx 20rpx 36rpx 72rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-size: 36rpx;color: #333;font-weight: 900;">用户中心</view>
					<!-- <view @click="toShopPage" style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">店铺首页</view>
						<u-image style="margin-right: 60rpx;" width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view> -->
				</view>
				<view @click="toCustomer" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 20rpx 20rpx 0 0;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/ear.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">客户服务</view>
					</view>
					<view style="display: flex;">
						<!-- <view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{driverPub.carNum == 0?'未发布':'已发布'}}</view> -->
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="tohelps" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/help.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">使用帮助</view>
					</view>
					<view style="display: flex;">
						<!-- <view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{driverPub.carNum == 0?'未发布':'已发布'}}</view> -->
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toFeedback" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 0 0 20rpx 20rpx;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/feedback.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">意见反馈</view>
					</view>
					<view style="display: flex;">
						<!-- <view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{driverPub.carNum == 0?'未发布':'已发布'}}</view> -->
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view style="width: 100%;padding: 54rpx 20rpx 36rpx 72rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-size: 36rpx;color: #333;font-weight: 900;">其他</view>
					<!-- <view @click="toShopPage" style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">店铺首页</view>
						<u-image style="margin-right: 60rpx;" width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view> -->
				</view>
				<view @click="toCollect()" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 20rpx">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/favorites.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">收藏</view>
					</view>
					<view style="display: flex;">
						<view v-if="!tokenFlag" style="margin-right: 20rpx;font-size: 28rpx;color: #999;">不可见</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view style="width: 100%;height: 280rpx;"></view>
				<view class="publish" @click="toPublishPage">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTips:false,
				jzrzSrc:'../../static/jiazhao.png',
				zyzgSrc:'../../static/yingyezhizhao.png',
				zcxuSrc:'../../static/zuche.png',
				qzxuSrc:'../../static/qiuzhi-c.png',
				wdpdSrc:"../../static/pindan.png",
				scSrc:"../../static/shoucang.png",
				xxSrc:"../../static/xiaoxi.png",
				txlSrc:"../../static/tongxunlu.png",
				state:'',
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
				driverPub:{
					headPhoto:'../../static/driverSrc.png',
					name:'',
					telephone:'',
					driverState:9,
					postState:9,
					jobNum:0,
					carNum:0,
					certificationType:"",
					shareId:''
				},
				token:''
			}
		},
		filters: {
		  stateV: function (value) {
		    if (value === 2) {
				return '已认证'
			} else if (value === 0){
				return '未认证'
			} else if (value === 1){
				return '审核中'
			} else if (value === 3){
				return '认证未通过'
			}else {
				return '不可见'
			}
		  }
		},
		mounted() {
			this.token = uni.getStorageSync('token')
			this.getUser()  
		},
		props:["authFlag","tokenFlag"],
		methods: {
			toAboutUs(){
				this.$u.route('/pages/aboutUs/aboutUs');
			},
			toCustomer(){
				this.$u.route('/pages/mycenter/company/service');
			},
			getUser(){
			this.token = uni.getStorageSync('token')
              if (this.token){
				 this.$u.api.listUserMessage().then(res=>{
					if(res.code === 200){
						let data = res.object;
						// uni.setStorageSync('isauthencation',data.driverState)
						this.driverPub = data
						this.driverPub.jobNum = this.driverPub.jobNum.toString()
						this.driverPub.carNum = this.driverPub.carNum.toString()
					}else {
						 this.$u.toast(res.msg);
					}
				})
			  }
			},
			toFeedback(){
				this.$u.route('/pages/mycenter/driver/feedback');
			},
			tohelps(){
				this.$u.route('/pages/driver/helps/helps')
			},
			toLogin(){
				 this.$u.route('/pages/login/login');
			},
			tipsConfirm(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/taxiCar/taxiCar")
				} 
			},
			tipsCancel(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/onlineCar/onlineCar")
				}
			},
			toMyInfo(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/baseInfo/baseInfo")
				}else{
					this.toLogin()
				}
			},
			toInvite(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.driverPub.driverState === 2){
						this.$u.route("/pages/driver/inviteFriends/inviteFriends",{shareId:this.driverPub.shareId})
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toCollect(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.driverPub.driverState === 2){
						this.$u.route("/pages/mycollect/mycollect")
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toLicense(){
				   if (this.driverPub.driverState !==9){
					   	this.$u.route("/pages/driver/drivingLicense/drivingLicense")
				   }
			},
			toMyPub(index){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/myPub/myPub",{index:index})
				}else{
					this.toLogin()
				}
			},
			account(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.driverPub.driverState === 2){
						this.$u.route("/pages/driver/cashAccount/cashAccount",{money:this.driverPub.account})
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toCard(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.driverPub.driverState ===9 || this.driverPub.driverState === 0){
						this.$u.toast('请先认证驾照')
						return
					}
				   if(this.driverPub.postState === 0 || this.driverPub.postState === 9){
					     this.showTips = true
				     } else {
					  if(this.driverPub.certificationType === 1){
						this.$u.route("/pages/driver/onlineCar/onlineCar")
					  }
					   if(this.driverPub.certificationType === 2){
						this.$u.route("/pages/driver/taxiCar/taxiCar")
					  }
				  }
			   }
			},
			toPublishPage(){
				let token = uni.getStorageSync('token');
				   if (token){
					   let role = uni.getStorageSync('role');
						   uni.navigateTo({
							   url: '/pages/driver/release/release'
						   });
				   } else {
						uni.showToast({
							title:"请先登录，认证" 
						  })
				   }
			},
		}
	}
</script>

<style lang="scss" scoped>
.company-content{
	.bg{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC),
	}
}
	.imgUrl{
		width: 100%;
		height: calc(var(--status-bar-height) + 304rpx);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		background: linear-gradient(270deg, #FFC700 0%, #FF9000 100%);
	}
	.room{
		width: 100%;
		height: calc(var(--status-bar-height) + 304rpx);
	}
	.colorF{
		color: $common-FFF;
	}
	/deep/ .bgf{
		background: $common-FFF;
	}
	.font-10pt{
		font-size: 10pt;
	}
	.font-14pt{
		font-weight: bold;
		font-size: 12pt;
	}
	.top{
		// height: calc(var(--status-bar-height) + 260rpx);
		// background: linear-gradient(270deg, #64D095 0%, #51C07C 47%, #3AAD68 100%);
	}
	.about{
		float: right;
		margin-top: calc(var(--status-bar-height) + 20rpx);
		font-size: 32rpx;
		margin-right: 28rpx;
		color: #fff;
	}
	.case{
		width: 328rpx;
		height: 120rpx;
		padding: 20rpx 24rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		display: flex;
		position: fixed;
		top: calc(var(--status-bar-height) + 244rpx);
		left: 36rpx;
	}
	.cases{
		width: 328rpx;
		height: 120rpx;
		padding: 20rpx 24rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		display: flex;
		position: fixed;
		top: calc(var(--status-bar-height) + 244rpx);
		right: 36rpx;
	}
	.box{
		width: 120rpx;
		margin-right: 104rpx;
		.name{
			font-size: 30rpx;
			font-weight: 900;
			color: #333333;
		}
		.visible{
			font-size: 24rpx;
			color: #666666;
			margin-top: 12rpx;
		}
	}
	.account{
		margin-top: 110rpx;
		margin-left: 36rpx;
		position: absolute;
		z-index: 100;
	}
	.text{
		font-size: 32rpx;
		color: #FFB100;
		position: relative;
		top: 146rpx;
		right: 100rpx;
		z-index: 100;
		float: right;
	}
	.invite{
		width: 678rpx;
		height: 128rpx;
		background-image: url(@/static/inviteBg.png);
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 280rpx;
		margin-left: 36rpx;
		font-size: 32rpx;
		color: #AE5F04;
		padding-left: 102rpx;
		padding-top: 40rpx;
	}
	.publish{
		width: 148rpx;
		height: 192rpx;
		background-image: url(@/static/publish.png);
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 56rpx;
		position: fixed;
		bottom: 20rpx;
		left: 304rpx;
	}
</style>
