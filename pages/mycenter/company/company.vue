<template>
	<view>
		<view class="top">
			<view>
				<view class="imgUrl">
					<view class="about" @click="toAboutUs">关于</view>
					<u-row style="padding:140rpx 36rpx 5pt; ">
						<u-col span="3" v-show="!tokenFlag">
							<u-avatar src="../../static/notLogin.png" mode="circle" size="large" ></u-avatar>
						</u-col>
						<u-col span="3" v-show="tokenFlag">
							<u-avatar :src="comnpanySrc" mode="circle" size="120" ></u-avatar>
						</u-col>
						<u-col span="8" v-if="!tokenFlag">
							<view @click="toLogin" style="color: #fff;font-size: 36rpx;display: flex;font-weight: 700;">
							  <view>登录注册</view>
							  <!-- <u-image style="margin-top: 4rpx;" width="32" height="48" src="@/static/right.png"></u-image> -->
							</view>
						</u-col>
						<u-col span="8" v-else @click="toAuth">
							<view style="height: 120rpx;display: flex;align-items: center;width: 500rpx;">
								<view style="height: 120rpx;display: flex;flex-direction: column;justify-content: center;">
									<view @click="toAuth" style="color: #fff;font-size: 36rpx;margin-top: -10rpx;" class="u-line-1">{{companyName}}</view>
									<view style="display: flex;align-items: center;">
										<view class="signNo">
											<u-image width="22" height="26" src="@/static/mycenter/right.png"></u-image>
											<view style="height: 26rpx;margin-left: 10rpx;">{{companyStatus | state}}</view>
										</view>
										<view class="signNo" v-show="show&&state==0">
											<u-image width="22" height="26" src="@/static/mycenter/right.png"></u-image>
											<view style="height: 26rpx;margin-left: 10rpx;">未授权</view>
										</view>
										<view class="signNo" v-show="show&&state==1">
											<u-image width="22" height="26" src="@/static/mycenter/right.png"></u-image>
											<view style="height: 26rpx;margin-left: 10rpx;">已授权</view>
										</view>
									</view>
									<view style="color: #fff;font-size: 30rpx;" class="colorF u-line-1" v-if="companyStatus === 3">原因 :{{reson}}</view>
								</view>
								<view style="height: 120rpx;display: flex;align-items: center;margin-left: auto;">
									<u-image width="32" height="48" src="@/static/right.png"></u-image>
								</view>
							</view>
						</u-col>
						
						
					</u-row>
					<view @click="checkAccount" class="checkAccount">对账中心</view>
				</view>
				<view class="room"></view>
				<view style="width: 678rpx;margin: 60rpx 20rpx 18rpx 52rpx;padding: 0 60rpx 0 20rpx;display: flex;justify-content: space-between;">
					<view style="font-size: 36rpx;color: #333;font-weight: 900;">我的订单</view>
					<view class="new" @click="toNew()">
						<u-image width="26rpx" height="26rpx" src="@/static/mycenter/add.png"></u-image>
						<view style="margin-left: 6rpx;">新建订单</view>
					</view>
				</view>
				<view style="width: 678rpx;height: 168rpx;margin-left: 36rpx;background: #fff;padding: 0 38rpx;border-radius: 20rpx;display: flex;justify-content: space-between;align-items: center;">
					<view @click="toList(1)" style="display: flex;justify-content: space-between;align-items: center;flex-direction: column;position: relative;">
						<u-image width="52rpx" height="52rpx" src="@/static/mycenter/zhifu@2x.png"></u-image>
						<view style="font-size: 24rpx;color: #333;margin-top: 10rpx;">商品登记</view>
						<view class="tip" v-show="order.waitCarMessageNum">{{order.waitCarMessageNum}}</view>
					</view>
					<view @click="toList(2)" style="display: flex;justify-content: space-between;align-items: center;flex-direction: column;position: relative;">
						<u-image width="52rpx" height="52rpx" src="@/static/mycenter/qianyue@2x.png"></u-image>
						<view style="font-size: 24rpx;color: #333;margin-top: 10rpx;">待签约</view>
						<view class="prompt" v-show="order.waitSignContractNum">{{order.waitSignContractNum}}</view>
					</view>
					<view @click="toList(3)" style="display: flex;justify-content: space-between;align-items: center;flex-direction: column;position: relative;">
						<u-image width="52rpx" height="52rpx" src="@/static/mycenter/zhifu@2x.png"></u-image>
						<view style="font-size: 24rpx;color: #333;margin-top: 10rpx;">待支付</view>
						<view class="tip" v-show="order.waitPayNum">{{order.waitPayNum}}</view>
					</view>
					<view @click="toList(4)" style="display: flex;justify-content: space-between;align-items: center;flex-direction: column;position: relative;">
						<u-image width="52rpx" height="52rpx" src="@/static/mycenter/tiche@2x.png"></u-image>
						<view style="font-size: 24rpx;color: #333;margin-top: 10rpx;">待提车</view>
						<view class="prompt" v-show="order.waitDeliveryVehicleNum">{{order.waitDeliveryVehicleNum}}</view>
					</view>
					<view @click="toList(0)" style="display: flex;justify-content: space-between;align-items: center;flex-direction: column;">
						<u-image width="52rpx" height="52rpx" src="@/static/mycenter/order.png"></u-image>
						<view style="font-size: 24rpx;color: #333;margin-top: 10rpx;">全部订单</view>
					</view>
				</view>
				<view style="width: 100%;padding: 60rpx 20rpx 18rpx 72rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-size: 36rpx;color: #333;font-weight: 900;">我的发布</view>
					<!-- <view @click="toShopPage" style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">店铺首页</view>
						<u-image style="margin-right: 60rpx;" width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view> -->
				</view>
				<view @click="toPub(0)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 20rpx 20rpx 0 0;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/rentIcon.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">租车信息</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{myPublishObj.zcxx}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toPub(2)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/selling.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">车辆转卖</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{myPublishObj.clzm}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toPub(3)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/buy.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">求购信息</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{myPublishObj.qgxx}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toPub(1)" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 0 0 20rpx 20rpx;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/search.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">招聘信息</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{myPublishObj.zpxx}}</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toShopPage" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 0 0 20rpx 20rpx;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/shopCom.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">我的店铺</view>
					</view>
					<view style="display: flex;">
						<view v-show="!tokenFlag" style="margin-right: 20rpx;font-size: 28rpx;color: #999;">不可见</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view style="width: 100%;padding: 60rpx 20rpx 18rpx 72rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-size: 36rpx;color: #333;font-weight: 900;">用户中心</view>
				</view>
				<view @click="toCustomer" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 20rpx 20rpx 0 0;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/earCom.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">客户服务</view>
					</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;"></view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="tohelps" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/helpCom.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">使用帮助</view>
					</view>
					<view style="display: flex;">
						<!-- <view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{myPublishObj.clzm}}</view> -->
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view @click="toFeedback" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/feedCom.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">意见反馈</view>
					</view>
					<view style="display: flex;">
						<!-- <view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">{{myPublishObj.zpxx}}</view> -->
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view>
				<view style="width: 100%;padding: 54rpx 20rpx 36rpx 72rpx;display: flex;justify-content: space-between;align-items: center;">
					<!-- <view style="font-size: 36rpx;color: #333;font-weight: 900;">其他</view> -->
					<!-- <view @click="toShopPage" style="display: flex;">
						<view style="margin-right: 20rpx;font-size: 28rpx;color: #999;">店铺首页</view>
						<u-image style="margin-right: 60rpx;" width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view> -->
				</view>
				<!-- <view @click="toCollect()" style="width: 678rpx;height: 120rpx;margin-left: 36rpx;display: flex;align-items: center;background: #fff;padding: 0 38rpx;justify-content: space-between;border-radius: 20rpx">
					<view style="display: flex;">
						<u-image width="48" height="48" src="@/static/collectCom.png"></u-image>
						<view style="margin-left: 26rpx;font-size: 32rpx;color: #666;">收藏</view>
					</view>
					<view style="display: flex;">
						<view v-if="!tokenFlag" style="margin-right: 20rpx;font-size: 28rpx;color: #999;">不可见</view>
						<u-image width="12" height="24" src="@/static/rightIcon.png"></u-image>
					</view>
				</view> -->
				<view style="width: 100%;height: 280rpx;"></view>
				<view class="publish" @click="toPublishPage">
				</view>
			</view>
		</view>
		<view @click="close()" v-show="showMask" class="mask"></view>
		<u-image v-show="showClose" @click="close()" class="close" width="58" height="58" src="@/static/mycenter/close.png"></u-image>
		<view v-show="showModal" class="modal">
			<view style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
				<u-image width="76" height="90" src="@/static/mycenter/icon.png"></u-image>
				<view class="warn">《汽车租赁合同》签约未授权，请你授权！</view>
			</view>
			<view class="box">
				<view class="confirm" @click="confirm()">开始授权</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				showMask:false,
				showModal:false,
				showClose:false,
				userId: '',
				state:0,
				companyName:'',
				companyStatus:'',
				reson:'',
				imageURL:'../../static/gongsi@2x.png',
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
				comnpanySrc: '../../static/touxx.png',
				zcxxsrc:'../../static/sign104@2x.png',
				zlzmsrc:'../../static/iconfontzhizuobiaozhun023120@2x.png',
				qgxxsrc:'../../static/xuqiuguanli@2x.png',
				zpxxsrc:'../../static/chezhuzhaomu@2x.png',
				myPublishObj:{
					zcxx:'不可见',clzm:'不可见',qgxx:'不可见',zpxx:'不可见'
				},
				otherObj:{
					sc:'不可见',xx:'不可见',qz:'不可见'
				},
				token:'',
				order: {
					waitCarMessageNum: 0,
					waitDeliveryVehicleNum: 0,
					waitPayNum: 0,
					waitSignContractNum: 0,
					failedNum: 0
				}
			}
		},
		props:["authFlag","tokenFlag"],
		mounted() {
			this.token = uni.getStorageSync('token')
			this.getUser();
		},
		onShow() {
			this.token = uni.getStorageSync('token')
		},
		filters: {
		  state: function (value) {
		    if (value === 2) {
				return '已认证'
			} else if (value === 0){
				return '未认证'
			} else if (value === 1){
				return '审核中'
			} else if (value === 3){
				return '认证未通过'
			}else {
				return ''
			}
		  }
		},
		methods: {
			toRight(){
				this.showMask = true;
				this.showModal = true;
				this.showClose = true;
			},
			close(){
				this.showMask = false;
				this.showModal = false;
				this.showClose = false;
			},
			confirm(){
				this.$u.route('/pages/company/order/right',{
					userId: this.userId
				});
			},
			getOrder(){
				let token =  uni.getStorageSync('token')
				if (token) {
					this.$u.api.getCompanyOrder({}).then(res=>{
						if(res.code === 200){
							this.order = res.object;
						}else {
							this.$u.toast(res.msg);
						}
					})
				}
			},
			toAboutUs(){
				this.$u.route('/pages/aboutUs/aboutUs');
			},
			getUser(){
				let token =  uni.getStorageSync('token')
				if (token) {
					this.$u.api.getUserInfo({}).then(res=>{
						if(res.code === 200){
							let data = res.personalVo;
							this.comnpanySrc =data.comparylogophoto;
							if (data.comparynickname){
								this.companyName = data.comparynickname;
							} else {
								let phone = uni.getStorageSync('telephone')
								this.companyName = phone
							}
							this.companyStatus = data.state;
							if(this.companyStatus === 2){
								this.show = true;
							}
							this.reson = data.nostate;
							this.userId = data.userMainId;
							this.$u.api.stateRight({
								userId:this.userId
							}).then(res=>{
								if(res.code === 200){
									this.state = res.object;
									if(this.companyStatus === 2&&this.state === 0){
										this.showMask = true;
										this.showModal = true;
										this.showClose = true;
									}
									if(this.companyStatus === 2&&this.state === 1){
										this.showMask = false;
										this.showModal = false;
										this.showClose = false;
									}
								}else {
									this.$u.toast(res.msg);
								}
							})
							let strF ='已发布';
							let strE = '条'
							this.myPublishObj.zcxx =strF+data.zunum+strE;
							this.myPublishObj.clzm =strF+data.zhuannum+strE;
							this.myPublishObj.qgxx =strF+data.qiushoppingnum+strE;
							this.myPublishObj.zpxx =strF+data.invitenum+strE;
							this.otherObj.sc = data.collectnum+strE;
							this.otherObj.xx = data.messagenum;
							this.otherObj.qz = data.groupmessagenum;
							// uni.setStorageSync('isauthencation',1)
						}else {
							let phone = uni.getStorageSync('telephone')
							this.companyName = phone
							this.myPublishObj ={
								zcxx:'不可见',clzm:'不可见',qgxx:'不可见',zpxx:'不可见'
							};
							this.otherObj ={
								sc:'不可见',xx:'不可见',qz:'不可见'
							};
							this.companyStatus='';
							this.reson='';
							this.comnpanySrc='../../static/notLogin.png';
							// uni.setStorageSync('isauthencation',0)
							 // this.$u.toast(res.message);
							 console.log(this.authFlag)
						}
					})
					this.getOrder();
				}
			},
			toAuth(){
				let authFlag = this.authFlag;
				if (authFlag === 0){
					this.$u.route('/pages/company/identityAuth/identityAuth')
				} else{
					this.$u.route('/pages/company/information/information',{
						state: this.state,
						userId: this.userId
					})
					
				}
				
			},
			toFeedback(){
				this.$u.route('/pages/mycenter/company/feedback');
			},
			tohelps(){
				this.$u.route('/pages/company/helps/helps')
			},
			toCustomer(){
				this.$u.route('/pages/mycenter/company/service');
			},
			toLogin(){
				 this.$u.route('/pages/login/login');
			},
			toShopPage(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.companyStatus === 2){
						this.$u.route('/pages/company/shop/shop');
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toList(index){
				let token = uni.getStorageSync('token')
				const obj = JSON.stringify(this.order)
				if (token){
					if(this.companyStatus === 2){
						if(this.state === 0){
							this.$u.toast('请先授权')	
						}
						if(this.state === 1){
							this.$u.route('/pages/company/order/order', {
								index: index,
								obj: obj
							});	
						}
					} else {
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toNew(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.companyStatus === 2){
						if(this.state === 0){
							this.$u.toast('请先授权')	
						}
						if(this.state === 1){
							this.$u.route('/pages/company/order/newOrder');	
						}
					} else {
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toPub(index){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.companyStatus === 2){
						this.$u.route('/pages/company/myPublish/myPublish', {
							index: index
						});
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			checkAccount(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.companyStatus === 2){
						if(this.state === 0){
							this.$u.toast('请先授权')	
						}
						if(this.state === 1){
							this.$u.route('/pages/company/order/checkAccount');	
						}
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toPublishPage(){
				let token = uni.getStorageSync('token');
				   if (token){
					   let role = uni.getStorageSync('role');
						   uni.navigateTo({
							   url: '/pages/company/release/release'
						   });
				   } else {
						uni.showToast({
							title:"请先登录，认证" 
						  })
				   }
			},
			toCollect(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/mycollect/mycollect")
				}else{
					this.toLogin()
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
		height: calc(var(--status-bar-height) + 354rpx);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		background: linear-gradient(270deg, #64D095 0%, #51C07C 47%, #3AAD68 100%);
	}
	.room{
		width: 100%;
		height: calc(var(--status-bar-height) + 354rpx);
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
		// position: fixed;
	}
	.publish{
		width: 148rpx;
		height: 192rpx;
		background-image: url(@/static/publishCom.png);
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 56rpx;
		position: fixed;
		bottom: 20rpx;
		left: 304rpx;
	}
	.new{
		padding: 16rpx;
		background: linear-gradient(270deg, #64D094 0%, #52C17D 41%, #3DAF6A 100%);
		border-radius: 4px;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.signNo{
		height: 46rpx;
		line-height: 46rpx;
		background: #ffe74a;
		border-radius: 30rpx;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		color: #333;
		padding: 0 20rpx;
		margin-right: 20rpx;
		margin-top: 10rpx;
	}
	.checkAccount{
		width: 682rpx;
		height: 120rpx;
		background-image: url(@/static/mycenter/bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 32rpx;
		color: #FFDB00;
		padding-left: 102rpx;
		padding-top: 40rpx;
		position: fixed;
		top: calc(var(--status-bar-height) + 236rpx);
		left: 34rpx;
	}
	.tip{
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		border-radius: 50%;
		background: #FF3B30;
		font-size: 24rpx;
		color: #fff;
		position: absolute;
		top: -10rpx;
		left: 54rpx;
	}
	.prompt{
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		border-radius: 50%;
		background: #FF3B30;
		font-size: 24rpx;
		color: #fff;
		position: absolute;
		top: -10rpx;
		left: 42rpx;
	}
	.mask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.36);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	.close{
		position: fixed;
		top: 400rpx;
		right: 48rpx;
		z-index: 1001;
	}
	.modal{
		width: 654rpx;
		border-radius: 12rpx;
		background: #fff;
		font-size: 36rpx;
		color: #333;
		font-weight: 900;
		position: fixed;
		top: 520rpx;
		left: 50rpx;
		z-index: 1000;
		padding-top: 54rpx;
		.warn{
			width: 552rpx;
			text-align: center;
			margin: 44rpx 40rpx 48rpx 40rpx;
		}
		.box{
			width: 654rpx;
			height: 160rpx;
			border-top: 4rpx solid rgba(0,0,0,0.05);
			display: flex;
			padding: 40rpx 48rpx;
			justify-content: space-between;
			align-items: center;
			.cancel{
				width: 264rpx;
				height: 76rpx;
				line-height: 76rpx;
				text-align: center;
				background: #F2F2F2;
				border-radius: 8rpx;
				font-size: 32rpx;
				color: #5F5E5F;
			}
			.confirm{
				width: 558rpx;
				height: 76rpx;
				line-height: 76rpx;
				text-align: center;
				background: linear-gradient(270deg, #63D094 0%, #5FCD8F 41%, #3FB16C 100%);
				border-radius: 8rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
