<template>
	<view>
		<u-navbar back-icon-color="#111111" title="订单详情" :background="background" title-color="#111111">
			<view slot="" @click="refreshView()">
				<u-image width="30rpx" height="30rpx" src="@/static/order/reload2x.png"></u-image>
			</view>
			<view class="navbar-right" slot="right">
				<view class="message-box right-item" @click="invalidation()" v-if="detail.state !== 'WAITTING_DELIVERY_VEHICLE'||detail.state !== 'ORDER_FINISHED'">撤销</view>
			</view>
		</u-navbar>
		<view class="count_down" v-if="detail.state !== 'ORDER_FINISHED' || detail.state !== 'ORDER_FAILED'">
			<view v-if="detail.state === 'VALIDATE_CAR' || detail.state === 'DRIVER_SIGN_CONTRACT'  ">
				等待计时
			</view>
			<view v-else>
				剩余
				<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd">
				</u-count-down>
				{{detail.state !=='WAITTING_DELIVERY_VEHICLE' ?'失效':'自动确认'}}
			</view>
		</view>
		<view class="content" v-if="detail.state == 'WAITTING_UPLOADING_MESSAGE' || detail.state == 'VALIDATE_CAR'">
			<!-- <view class="count_down">剩余<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd"></u-count-down>
			</view> -->
			<view style="margin:16rpx 80rpx 0;display: flex;justify-content:center;width: 90%;">
				<u-time-line>
					<view>
						<u-time-line-item nodeTop="2" style="margin: 0;">
							<template v-slot:node>
								<view class="u-node">
									<u-image width="60rpx" height="60rpx" src="@/static/order/registerActive.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view style="color: #333;" class="u-order-desc">商品信息登记</view>
								</view>
							</template>
						</u-time-line-item>
					</view>
				</u-time-line>
			</view>
		</view>
		<view class="content" v-if="detail.state === 'WAITTING_SIGN_CONTRACT' || detail.state === 'COMPANY_SIGN_CONTRACT' || detail.state === 'REGISTER_CAR'">
			<!-- <view class="count_down">剩余<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd"></u-count-down>
			</view> -->
			<view style="margin:16rpx 330rpx 0;display: flex;justify-content:center;width: 90%;flex-direction: column;">
				<view style="width: 60%;;">
					<u-time-line-item nodeTop="2">
						<template v-slot:node>
							<view class="u-node">
								<u-image width="60rpx" height="60rpx" src="@/static/order/hetong2x_a.png"></u-image>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view style="color: #333;" v-if="detail.state=='WAITTING_SIGN_CONTRACT'||detail.state=='REGISTER_CAR'" class="u-order-desc">合同签署</view>
								<!-- <view v-else-if="detail.state=='DRIVER_SIGN_CONTRACT'" class="u-order-desc">合同签署（承租人未签）</view> -->
								<view v-if="detail.state=='COMPANY_SIGN_CONTRACT'" class="u-order-desc">合同签署（承租人已签）</view>
								<!-- <view v-else class="u-order-desc">合同签署（双方已签）</view> -->
							</view>
						</template>
					</u-time-line-item>
				</view>
					<view v-show="openFlag">
		                <view class="line"></view>
						<u-time-line-item nodeTop="2" style="margin: 0;">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.registerTime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/register.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">商品信息登记</view>
								</view>
							</template>
						</u-time-line-item>
					</view>
				</u-time-line>
		
			</view>
			<view style="text-align: center;width: 90%;padding: 30rpx 0 20rpx;" @click="openFlow">
				<text style="color: #333333;">{{openFlag?'收起':'展开'}}</text>
				<u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#C9C9C9"></u-icon>
			</view>
		</view>
		<view class="content" v-if="detail.state === 'DRIVER_SIGN_CONTRACT' || detail.state === 'NO_PAYMENT'">
			<!-- <view class="count_down">剩余<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd"></u-count-down>
			</view> -->
			<view style="margin:16rpx 330rpx 0;display: flex;justify-content:center;width: 90%;flex-direction: column;">
				<view style="width: 60%;;">
					<u-time-line-item nodeTop="2">
						<template v-slot:node>
							<view class="u-node">
								<u-image width="60rpx" height="60rpx" src="@/static/order/zhifu2x_a.png"></u-image>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view style="color: #333;" class="u-order-desc">支付租金</view>
								<!-- <view v-else-if="detail.state=='DRIVER_SIGN_CONTRACT'" class="u-order-desc">合同签署（承租人未签）</view> -->
								<!-- <view v-else-if="detail.state=='COMPANY_SIGN_CONTRACT'" class="u-order-desc">合同签署（承租人已签）</view> -->
								<!-- <view v-else class="u-order-desc">合同签署（双方已签）</view> -->
							</view>
						</template>
					</u-time-line-item>
				</view>
					<view v-show="openFlag">
						<view class="line"></view>
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.signcontracttime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/hetong2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">合同签署</view>
									<!-- <view v-else-if="detail.state=='DRIVER_SIGN_CONTRACT'" class="u-order-desc">合同签署（承租人未签）</view> -->
									<!-- <view v-else-if="detail.state=='COMPANY_SIGN_CONTRACT'" class="u-order-desc">合同签署（承租人已签）</view> -->
									<!-- <view v-else class="u-order-desc">合同签署（双方已签）</view> -->
								</view>
							</template>
						</u-time-line-item>
		                <view class="line"></view>
						<u-time-line-item nodeTop="2" style="margin: 0;">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.registerTime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/register.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">商品信息登记</view>
								</view>
							</template>
						</u-time-line-item>
					</view>
				</u-time-line>
		
			</view>
			<view style="text-align: center;width: 90%;padding: 30rpx 0 20rpx;" @click="openFlow">
				<text style="color: #333333;">{{openFlag?'收起':'展开'}}</text>
				<u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#C9C9C9"></u-icon>
			</view>
		</view>
		<view class="content" v-if="detail.state === 'WAITTING_DELIVERY_VEHICLE'">
			<!-- <view class="count_down">剩余<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd"></u-count-down>
			</view> -->
			<view style="margin:16rpx 330rpx 0;display: flex;justify-content:center;width: 90%;flex-direction: column;">
				<view style="width: 60%;;">
	                <u-time-line-item nodeTop="2">
	                	<template v-slot:node>
	                		<view class="u-node">
	                			<u-image width="60rpx" height="60rpx" src="@/static/order/tiche2x_a.png"></u-image>
	                		</view>
	                	</template>
	                	<template v-slot:content>
	                		<view>
	                			<view style="color: #333;" class="u-order-desc">提车（待确认）</view>
	                		</view>
	                	</template>
	                </u-time-line-item>
				</view>
					<view v-show="openFlag">
						<view class="line"></view>
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.paytime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/zhifu2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">支付租金</view>
								</view>
							</template>
						</u-time-line-item>
						<view class="line"></view>
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.signcontracttime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/hetong2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">合同签署</view>
								</view>
							</template>
						</u-time-line-item>
		                <view class="line"></view>
						<u-time-line-item nodeTop="2" style="margin: 0;">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.registerTime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/register.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">商品信息登记</view>
								</view>
							</template>
						</u-time-line-item>
					</view>
				</u-time-line>
		
			</view>
			<view style="text-align: center;width: 90%;padding: 30rpx 0 20rpx;" @click="openFlow">
				<text style="color: #333333;">{{openFlag?'收起':'展开'}}</text>
				<u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#C9C9C9"></u-icon>
			</view>
		</view>
		<view class="content" v-if="detail.state === 'ORDER_FINISHED'">
			<!-- <view class="count_down">剩余<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd"></u-count-down>
			</view> -->
			<view style="margin:16rpx 330rpx 0;display: flex;justify-content:center;width: 90%;flex-direction: column;">
				<view style="width: 60%;;">
		            <u-time-line-item nodeTop="2">
		            	<template v-slot:node>
		            		<view class="u-node">
		            			<view class="dot"></view>
		            		</view>
		            	</template>
		            	<template v-slot:content>
		            		<view>
		            			<view style="color: #333;" class="u-order-desc">完成</view>
		            		</view>
		            	</template>
		            </u-time-line-item>
				</view>
					<view v-show="openFlag">
						<view class="line"></view>
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.takethecartime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/tiche2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">提车</view>
								</view>
							</template>
						</u-time-line-item>
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.paytime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/zhifu2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">支付租金</view>
								</view>
							</template>
						</u-time-line-item>
						<view class="line"></view>
						<u-time-line-item nodeTop="2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.signcontracttime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/hetong2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">合同签署</view>
								</view>
							</template>
						</u-time-line-item>
		                <view class="line"></view>
						<u-time-line-item nodeTop="2" style="margin: 0;">
							<template v-slot:node>
								<view class="u-node">
									<view class="time">
										<view>{{detail.registerTime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/register.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">商品信息登记</view>
								</view>
							</template>
						</u-time-line-item>
					</view>
				</u-time-line>
		
			</view>
			<view style="text-align: center;width: 90%;padding: 30rpx 0 20rpx;" @click="openFlow">
				<text style="color: #333333;">{{openFlag?'收起':'展开'}}</text>
				<u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#C9C9C9"></u-icon>
			</view>
		</view>
		<view v-if="detail.state === 'ORDER_FAILED'" class="head_content">
			<u-image width="80rpx" height="80rpx" src="@/static/order/wancheng2x.png"></u-image>
			<view style="padding-left: 20rpx;">
				<view class="title">失效订单</view>
				<view class="time">{{detail.createTime}}</view>
			</view>
		</view>
		
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="middle_content">
			<view class="company_name">{{detail.rentername}}</view>
			<view class="company_model">{{detail.carname}}</view>
			<view class="content_item">
				<view class="item"><text class="title">租赁周期：</text><text>{{detail.leasetime}}个月（提车后开始计算）</text></view>
				<view class="item"><text class="title">每月租金：</text><text>{{detail.monthlyrent}}元</text></view>
				<view class="item"><text class="title">车辆押金：</text><text>{{detail.deposit}}元</text><text class="other">（另须线下支付）</text></view>
				<view style="padding: 8rpx 0;">
					<text style="color: #999999;font-size: 24rpx;">押金还车后退，规则说明</text>
					<u-icon name="question-circle" color="#999999" size="32"></u-icon>
				</view>
				<view class="item"><text class="title">订单时间：</text><text>{{detail.createTime}}</text></view>
				<view class="item"><text class="title">订单号：</text><text>{{detail.tradeid}}</text></view>
			</view>
			<!-- <view class="company_model">订单支付费用明细</view> -->
			<view class="content_item" v-if="detail.state=='WAITTING_DELIVERY_VEHICLE'||detail.state=='ORDER_FINISHED'">
				<view class="item"><text class="title">实付租金: </text><text>{{detail.monthlyrent}}元</text></view>
				<!-- <view class="item"><text class="title">实付押金：</text><text>{{detail.deposit}}元</text></view> -->
				<!-- <view class="item"><text class="title">实际支付总和：</text><text>{{detail.totalprice}}元</text></view> -->
				<view class="item"><text class="title">支付时间：</text><text>{{detail.paytime}}</text></view>
			</view>
		</view>
		<view v-if="detail.state === 'ORDER_FAILED'" class="bottom_content" @click="dial()">
			<view class="button contact">联系平台</view>
		</view>
		<view v-else>
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<view class="tips_content">
						<view style="font-size: 32rpx;">订单提示</view>
						<view style="padding: 8rpx 20rpx 0 0;color: #555;font-size: 28rpx;line-height: 42rpx;">通过纽车APP-我的订单签署合同，并在24小时内完成支付，否则合同将自动解除。签约过程中，涉及签约、押金支付，需要通过纽车APP-我的订单线上完成。
			注意：平台杜绝签署任何形式的线下组合合同和禁止线下签署定金等任何费用，在签约过程中，如发现要求线下签署合同和收取定金的行为，请联系客服热线：0571-87815287</view>
					</view>
					<view class="chat_btn">
						<u-row>
							<u-col span="6" style="border-right: 1px solid #E0E0E0;">
								<view class="btn" @click="toRoom(detail.userid)">
									<u-image width="52" height="52" src="@/static/order/lianxichuzufang2x.png"></u-image>
									<view class="text">联系承租人</view>
								</view>
							</u-col>
							<u-col span="6">
								<view class="btn" @click="dial()">
									<u-image width="52" height="52" src="@/static/order/lianxipingtai2x.png"></u-image>
									<view class="text">联系平台</view>
								</view>
							</u-col>
						</u-row>
					</view>
					<view v-if="detail.state=='WAITTING_UPLOADING_MESSAGE'||detail.state=='REGISTER_CAR'" class="view_cared">查看验车信息</view>
					<view v-else @click="view()" class="view_car">查看验车信息</view>
					<!-- <view v-if="detail.state=='WAITTING_UPLOADING_MESSAGE'||detail.state=='REGISTER_CAR'" style="color: #24ce8d;width: 100%;padding: 24rpx 0;text-align: center;">
						<text style="padding: 6rpx;border-bottom: 2rpx solid #24ce8d;">查看合同范文</text>
					</view> -->
					<u-gap height="20" bg-color="#F5F5F5"></u-gap>
					<!-- <view class="bottom_content" style="padding: 40rpx 60rpx;">
						<view class="btn orange">《汽车租赁合同》锁定</view>
					</view> -->
					<view style="width: 100%;height: 130rpx;"></view>
					<view class="bottom">
						<!-- <view>
							<view v-if="detail.state=='WAITTING_UPLOADING_MESSAGE'||detail.state=='REGISTER_CAR'" class="check">查看验车信息</view>
							<view v-else @click="view()" class="checkActive">查看验车信息</view>
						</view> -->
						<view>
							<view v-if="detail.state=='WAITTING_UPLOADING_MESSAGE'||detail.state=='VALIDATE_CAR'" @click="shopMessage()" class="signActive">登记商品信息</view>
							<!-- <view v-if="detail.state=='REGISTER_CAR'" class="sign">登记商品信息</view> -->
						</view>
						<view>
							<view v-if="detail.state=='WAITTING_SIGN_CONTRACT'||detail.state=='COMPANY_SIGN_CONTRACT'" @click="signContact()" class="signActive">签署汽车租赁合同</view>
							<view v-if="detail.state=='DRIVER_SIGN_CONTRACT'||detail.state=='REGISTER_CAR'" class="sign">签署汽车租赁合同</view>
						</view>
						<view>
							<view v-if="detail.state=='NO_PAYMENT'||detail.state=='WAITTING_DELIVERY_VEHICLE'||detail.state=='ORDER_FINISHED'" @click="viewContract()" class="signActive">《汽车租赁合同》查看</view>
						</view>
					</view>
					<view v-if="!detail.state=='NO_PAYMENT'||detail.state=='WAITTING_DELIVERY_VEHICLE'||detail.state=='ORDER_FINISHED'" class="tip">*验车信息由承租人填写完成后才能查看</view>
		</view>
		<view v-show="showMask" class="mask"></view>
		<view v-show="showModal" class="modal">
			<view class="prompt">是否撤销？</view>
			<view class="box">
				<view class="cancel" @click="cancel()">取消</view>
				<view class="confirm" @click="confirm()">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				showMask:false,
				showModal:false,
				timestamp: 0,//倒计时
				status: true, //状态
				openFlag: false, //展开 收起
				detail:{},
				id: '',
				carname: ''
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.id = id;
			 this.getDetail(id)
			}
			this.initChat();
		},
		computed:{
			soureNum() {
				let value = this.form.state;
				if (value === 'WAITTING_UPLOADING_MESSAGE' || value === 'VALIDATE_CAR') {
					return 1
				} else if (value === 'WAITTING_SIGN_CONTRACT' || value === 'DRIVER_SIGN_CONTRACT' || value === 'VALIDATE_CAR') {
					return 2
				} else if (value === 'NO_PAYMENT' || value === 'COMPANY_SIGN_CONTRACT') {
					return 3
				} else if (value === 'WAITTING_DELIVERY_VEHICLE') {
					return 4
				} else if (value === 'ORDER_FINISHED') {
					return 5
				} else {
					return ''
				}
			},
		},
		filters: {
			soureText: function(value) {
				if (value === 'WAITTING_UPLOADING_MESSAGE' || value === 'VALIDATE_CAR') {
					return '商品登记'
				} else if (value === 'WAITTING_SIGN_CONTRACT' || value === 'COMPANY_SIGN_CONTRACT' || value === 'REGISTER_CAR') {
					return '待签约'
				} else if (value === 'NO_PAYMENT' || value === 'DRIVER_SIGN_CONTRACT') {
					return '待支付'
				} else if (value === 'WAITTING_DELIVERY_VEHICLE') {
					return '待提车'
				} else if (value === 'ORDER_FINISHED') {
					return '完成'
				} else if (value === 'ORDER_FAILED') {
					return '失效'
				} else {
					return ''
				}
			}
		},
		methods: {
			refreshView() {
				this.getDetail(this.id)
				this.$u.toast('刷新成功')
			},
			invalidation(){
				this.showMask = true;
				this.showModal = true;
			},
			cancel(){
				this.showMask = false;
				this.showModal = false;
			},
			confirm(){
				this.showMask = false;
				this.showModal = false;
				this.$u.api.orderEfficacy({
					orderId:this.detail.tradeid
				}).then(res=>{
					if(res.code === 200){
						 this.$u.toast(撤销成功);
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			initChat() {
				let isLogin = this.$store.state.isLogin;
				if (isLogin) {
					return
				}
				this.initLogin()
			},
			// 登录tim
			initLogin() {
				let token = uni.getStorageSync('token');
				if (!token) {
					return false
				}
				this.$u.api.getSing().then(res => {
					if (res.code === 200) {
						let userInfo = res.object;
						let promise = this.tim.login({
							userID: userInfo.userId,
							userSig: userInfo.singer
						});
						promise.then((res) => {
							//登录成功后 更新登录状态
							this.$store.commit("toggleIsLogin", true);
							//自己平台的用户基础信息
							uni.setStorageSync('userInfo', JSON.stringify(userInfo))
							//tim 返回的用户信息
							uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
						}).catch((err) => {
							console.warn('login error:', err); // 登录失败的相关信息
						});
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			toRoom(userID) {
				let promise = this.tim.getUserProfile({
					userIDList: [userID]
				});
				promise.then((imResponse) => {
					console.log(imResponse)
					if (imResponse.data[0]) {
						let obj = {
							conversation: {}
						};
						obj.conversation.conversationID = 'C2C' + userID;
						obj.conversation.userProfile = imResponse.data[0];
						this.$store.commit('updateConversationActive', obj)
						this.$u.route('/pages/tim/room')
					} else {
						this.$u.toast('对方未开通聊天')
					}
				})
			},
			signContact() {
				if (this.detail.state === 'VALIDATE_CAR'||this.detail.state === 'WAITTING_UPLOADING_MESSAGE'){
					this.$u.toast('商品未登记');
					return 
				}
				this.$u.route('/pages/company/order/contractSign',{id:this.id,userId:this.detail.companyid})
			},
			//查看合同
			viewContract() {
				this.$u.route('/pages/company/order/contractPreview',{id:this.id,userId:this.detail.companyid})
			},
			orderEfficacy(){
				this.$u.api.orderEfficacy({
					orderId:this.detail.tradeid
				}).then(res=>{
					if(res.code === 200){

					}else {
						
					}
				})
			},
			//倒计时
			countEnd() {
				if (this.form.state !== 'WAITTING_DELIVERY_VEHICLE'){
					this.orderEfficacy()
				}
			},
			dial(){
				uni.makePhoneCall({
				    phoneNumber: '0571-87815287' 
				});
			},
			view(){
				this.$u.route('/pages/company/order/checkMessage', {
					id: this.detail.tradeid
				})
			},
			shopMessage(){
				const detail = JSON.stringify(this.detail)
				this.$u.route('/pages/company/order/registerMessage', {
					detail: detail
				})
			},
			getDetail(id){
				let token = uni.getStorageSync('token');
				if(token){
					this.$u.api.orderDetail({
						orderId:id
					}).then(res=>{
						if(res.code === 200){
							 this.detail = res.object;
							 this.carname = this.detail.carname;
							 if (this.detail.state === 'WAITTING_UPLOADING_MESSAGE' || this.detail.state === 'VALIDATE_CAR' ){
							 	this.timeE(this.detail.createTime)
							 } else if (this.detail.state === 'WAITTING_SIGN_CONTRACT' || this.detail.state === 'COMPANY_SIGN_CONTRACT' ){
							 	let registerTime = this.detail.registerTime.replace(new RegExp("-", "gm"), "/");
							 	let registerTimeM = (new Date(registerTime)).getTime();
							 	let validatecartime = this.detail.validatecartime.replace(new RegExp("-", "gm"), "/");
							 	let validatecartimeM = (new Date(validatecartime)).getTime();
							 	if (registerTimeM>validatecartimeM){
							 		this.timeE(this.detail.registerTime)
							 	} else {
							 		this.timeE(this.detail.validatecartime)
							 	}
							 } else if (this.detail.state === 'NO_PAYMENT'){
							 	this.timeE(this.detail.signcontracttime)
							 } else if (this.detail.state === 'WAITTING_DELIVERY_VEHICLE'){
							 	this.timeE(this.detail.paytime)
							 } else {
							 	
							 }
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
			timeE(times){
				let date = new Date();
				let startDate = times.replace(new RegExp("-", "gm"), "/");
				let startDateM = (new Date(startDate)).getTime();
				let Days = 86400000;
				let yesDay = (startDateM + Days) - date.getTime();
				let timestamp =  parseInt(yesDay / 1000);
				if (timestamp<=0){
					this.orderEfficacy()
				} else{
					this.timestamp = timestamp
				}
			},
			chargeback() {
				console.log('退单')
			},
			countEnd() {
				console.log(2221)
			},
			openFlow() {
				this.openFlag = !this.openFlag
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #333333;
		display: flex;
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
	.modal{
		width: 660rpx;
		border-radius: 12rpx;
		background: #fff;
		font-size: 36rpx;
		color: #333;
		font-weight: 900;
		position: fixed;
		top: 600rpx;
		left: 50rpx;
		z-index: 1000;
		.prompt{
			margin: 72rpx 40rpx 48rpx 40rpx;
			text-align: center;
		}
		.box{
			width: 660rpx;
			height: 160rpx;
			border-top: 4rpx solid #E0E0E0;
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
				width: 264rpx;
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
	
	.head_content {
		padding: 40rpx 30rpx;
		display: flex;
		align-items: center;
	
		.title {
			color: #111111;
			font-size: 30rpx;
			font-weight: 600;
			padding-bottom: 10rpx;
		}
	
		.time {
			font-size: 26rpx;
			color: #C7C7C7;
		}
	}
	
	.count_down {
		width: 100%;
		text-align: center;
		padding: 40rpx 0 20rpx;
		color: #FE5B00;
	}
	
	.content {
        padding-bottom: 40rpx;

		.u-node {
			width: 60rpx;
			height: 60rpx;
			border-radius: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.time {
				position: absolute;
				left: -100px;
				color: #000000;
				font-size: 28rpx;

				.hour {
					font-size: 24rpx;
					text-align: center;
				}
			}
		}

		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
			line-height: 30px;
			height: 30px;
		}

		.u-order-desc {
			color: #C9C9C9;
			font-size: 28rpx;
			line-height: 30px;
			height: 30px;
		}

		.u-order-time {
			color: rgb(200, 200, 200);
			font-size: 26rpx;
		}
	}

	.middle_content {
		padding: 40rpx 30rpx;

		.company_name {
			font-size: 30rpx;
		}

		.company_model {
			font-size: 30rpx;
			padding: 16rpx 0 40rpx;
		}

		.content_item {
			padding: 30rpx 0;
			border-top: 1px solid #E0E0E0;

			.item {
				padding: 14rpx 0;

				.title {
					display: inline-block;
					color: #939393;
					font-size: 28rpx;
					width: 230rpx;
				}

				.value {
					color: #333333;
				}
			}
		}
	}

	.tips_content {
		padding: 40rpx 30rpx 20rpx;
		color: #333;
	}

	.chat_btn {
		border-top: 1px solid #E0E0E0;
		border-bottom: 1px solid #E0E0E0;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 110rpx;
			.text{
				color: #555555;padding-left: 10rpx;
			}
		}
	}
	.view_car{
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #252825;
	}
	.view_cared{
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #939393;
	}
	.bottom_content{
		padding: 20rpx 20rpx 30rpx;
		.btn{
			width: 600rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
		}
		.padding30{
			padding: 30rpx;
		}
		.defult{
			background: #F2F2F2;
			color: #252825;
		}
		.orange{
			background: linear-gradient(270deg, #61CF92 0%, #41B26E 100%);
			color: #FFFFFF;
		}
		.tips{
			font-size: 24rpx;
			color: #FE3B31;
		}
		.money{
			font-size: 36rpx;
			color: #FE3B31;
		}
		.money_abs{
			color: #E8541E;
			background: #FCEEE9;
			position: absolute;
			padding: 10rpx 6rpx;
			top: 2rpx;
			z-index: 20;
			left: 60rpx;
		}
		.view_contract{
			text-align: center;padding-top: 20rpx;font-size: 24rpx;
			.label{
				color:#C7C7C7
			}
			.contract{
				color: #FF9500;
			}
		}
	}
	.bottom{
		padding: 20rpx 76rpx;
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		border-top: 2rpx solid rgba(0,0,0,0.1);
		.checkActive{
			width: 232rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: #F2F2F2;
			border-radius: 8rpx;
			font-size: 28rpx;
			color: #252825;
		}
		.check{
			width: 232rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: #E0E0E0;
			border-radius: 8rpx;
			font-size: 28rpx;
			color: #252825;
		}
		.signActive{
			width: 600rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: linear-gradient(270deg, #62CF93 0%, #57C584 47%, #3CAE69 100%);
			border-radius: 8rpx;
			font-size: 36rpx;
			color: #fff;
		}
		.sign{
			width: 600rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: #E0E0E0;
			border-radius: 8rpx;
			font-size: 36rpx;
			color: #939393;
		}
	}
	.tip{
		margin: 0 34rpx 18rpx 34rpx;
		font-size: 22rpx;
		color: #FE3B31;
		text-align: center;
	}
	.text{
		color: #24ce8d;
	}
	.dot{
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background: #ddd;
	}
	.other{
		color: #FE3B31;
	}
	.line{
		width: 4rpx;
		height: 120rpx;
		background: #c9c9c9;
	}
	.bottom_content {
		position: fixed;
		bottom: 10rpx;
		width: 100%;
		border-top: 1px solid #E0E0E0;
		padding: 40rpx 60rpx;
	
		.button {
			padding: 24rpx 28rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
		}
	
		.contact {
			background: linear-gradient(270deg, #61CF92 0%, #41B26E 100%);
			color: #FFFFFF;
		}
	}
</style>
