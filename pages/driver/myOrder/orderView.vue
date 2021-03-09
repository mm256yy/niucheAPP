<template>
	<view>
		<u-navbar back-icon-color="#111111" title="订单详情" :background="background" title-color="#111111">
			<view slot="" @click="refreshView" v-if="chargeFlag" style="padding-left: 6px;">
				<u-image width="30rpx" height="30rpx" src="@/static/order/reload2x.png"></u-image>
			</view>
			<view class="navbar-right" slot="right" v-if="form.state !=='ORDER_FAILED' && chargeFlag">
				<view class="message-box right-item" @click="chargeback"
					v-if="form.state !== 'WAITTING_DELIVERY_VEHICLE' || form.state !== 'ORDER_FINISHED'">退单</view>
			</view>
		</u-navbar>
		<view class="head_content" v-if="!chargeFlag">
			<u-image width="80rpx" height="80rpx" src="@/static/order/wancheng2x.png"></u-image>
			<view style="padding-left: 20rpx;">
				<view class="title">{{form.state === 'ORDER_FAILED' ?'失效订单':'退单成功'}}</view>
				<view class="time">{{form.updateTime}}</view>
			</view>
		</view>
		<view class="content" style="padding-bottom: 20rpx;" v-if="form.state !== 'ORDER_FAILED' && chargeFlag">
			<view class="count_down" v-if="form.state !== 'ORDER_FINISHED' || form.state !== 'ORDER_FAILED'">
				<view v-if="form.state === 'VALIDATE_CAR' || form.state === 'COMPANY_SIGN_CONTRACT'  ">
					等待计时
				</view>
				<view v-else>
					剩余
					<u-count-down :timestamp="timestamp" color="#FE5B00" separator-color="#FE5B00" @end="countEnd">
					</u-count-down>
					{{form.state !=='WAITTING_DELIVERY_VEHICLE' ?'失效':'自动确认'}}
				</view>
			</view>
			<view style="margin:16rpx 80rpx 0;display: flex;justify-content:center;width: 90%;">
				<u-time-line>
					<u-time-line-item nodeTop="2">
						<template v-slot:node>
							<view class="u-node">
								<view class="time" v-if="soureNum === 5">
									<view>{{form.finishedtime}}</view>
								</view>
								<view v-if="soureNum === 1">
									<u-image width="60rpx" height="60rpx" src="@/static/order/yanche2x_a.png"></u-image>
								</view>
								<view v-if="soureNum === 2">
									<u-image width="60rpx" height="60rpx" src="@/static/order/hetong2x_a.png"></u-image>
								</view>
								<view v-if="soureNum === 3">
									<u-image width="60rpx" height="60rpx" src="@/static/order/zhifu2x_a.png"></u-image>
								</view>
								<view v-if="soureNum === 4">
									<u-image width="60rpx" height="60rpx" src="@/static/order/tiche2x_a.png"></u-image>
								</view>
								<view v-if="soureNum === 5">
									<u-image width="60rpx" height="60rpx" src="@/static/order/wancheng2x.png"></u-image>
								</view>

							</view>
						</template>
						<template v-slot:content>
							<view style="height: 60px;">
								<view class="u-order-title">{{form.state | soureText}}</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item v-show="!openFlag">

					</u-time-line-item>
					<view v-show="openFlag">
						<u-time-line-item nodeTop="2" v-if="soureNum>4">
							<template v-slot:node>
								<view class="u-node">
									<view class="time" v-if="soureNum === 5">
										<view>{{form.takethecartime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/tiche2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view style="height: 60px;">
									<view class="u-order-desc">提车</view>
								</view>
							</template>
						</u-time-line-item>
						<u-time-line-item nodeTop="2" v-if="soureNum>3">
							<template v-slot:node>
								<view class="u-node">
									<view class="time" v-if="soureNum === 5">
										<view>{{form.paytime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/zhifu2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view style="height: 60px;">
									<view class="u-order-desc">支付租金和押金</view>
								</view>
							</template>
						</u-time-line-item>

						<u-time-line-item nodeTop="2" v-if="soureNum>2">
							<template v-slot:node>
								<view class="u-node">
									<view class="time" v-if="soureNum === 5">
										<view>{{form.signcontracttime}}</view>
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/hetong2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view style="height: 60px;">
									<view class="u-order-desc">合同签署</view>
								</view>
							</template>
						</u-time-line-item>
						<u-time-line-item nodeTop="2" style="margin: 0;" v-if="soureNum>1">
							<template v-slot:node>
								<view class="u-node">
									<view class="time" v-if="soureNum === 5">
										<view>{{form.validatecartime}}</view>
										<!-- <view class="hour">11:15:33</view> -->
									</view>
									<u-image width="60rpx" height="60rpx" src="@/static/order/yanche2x.png"></u-image>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-desc">验车</view>
								</view>
							</template>
						</u-time-line-item>
					</view>
				</u-time-line>

			</view>
			<view style="text-align: center;width: 90%;padding: 30rpx 0 20rpx;" @click="openFlow" v-if="soureNum !==1">
				<text style="color: #333333;">{{openFlag?'收起':'展开'}}</text>
				<u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#C9C9C9"></u-icon>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="middle_content">
			<view class="company_name">{{form.companyname}}</view>
			<view class="company_model">{{form.carname}}</view>
			<view class="content_item">
				<view class="item"><text class="title">租赁周期：</text><text>{{form.leasetime}}个月（提车后开始计算）</text></view>
				<view class="item"><text class="title">每月租金：</text><text>{{form.monthlyrent}}元</text></view>
				<view class="item"><text class="title">车辆押金：</text><text>{{form.deposit}}元</text> <text>（另须线下支付）</text>
				</view>
				<view style="padding: 8rpx 0;" @click="showTips = true">
					<text style="color: #999999;font-size: 24rpx;">押金退还规则说明</text>
					<u-icon name="question-circle" color="#999999" size="32"></u-icon>
				</view>
				<view class="item"><text class="title">订单时间：</text><text>{{form.createTime}}</text></view>
				<view class="item"><text class="title">订单号：</text><text>{{form.tradeid}}</text></view>
			</view>
			<view class="content_item" v-if="soureNum>3">
				<view class="item"><text class="title">首月租金: </text><text>{{form.monthlyrent}}元</text></view>
				<view class="item"><text class="title">账户抵扣：</text><text>{{form.reducePrice}}元</text></view>
				<view class="item"><text class="title">实付：</text><text>{{form.realPrice}}元</text></view>
				<view class="item"><text class="title">支付时间：</text><text>{{form.paytime}}</text></view>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="tips_content" v-if="chargeFlag">
			<view style="font-size: 30rpx;">订单提示</view>
			<view style="padding: 8rpx 20rpx 0 0;">
				通过纽车APP-我的订单签署合同，并在24小时内完成支付，否则合同将自动解除。签约过程中，涉及签约、押金支付，需要通过纽车APP-我的订单线上完成。<br />注意：平台杜绝签署任何形式的线下组合合同和禁止线下签署定金等任何费用，在签约过程中，如发现要求线下签署合同和收取定金的行为，请联系客服热线：0571-87815287
			</view>
		</view>
		<view class="chat_btn" v-if="chargeFlag">
			<u-row>
				<u-col span="6" style="border-right: 1px solid #E0E0E0;">
					<view class="btn" @click="toRoom(form.companyid)">
						<u-image width="52" height="52" src="@/static/order/lianxichuzufang2x.png"></u-image>
						<view class="text">联系出租方</view>
					</view>
				</u-col>
				<u-col span="6">
					<view class="btn" @click="callPhone">
						<u-image width="52" height="52" src="@/static/order/lianxipingtai2x.png"></u-image>
						<view class="text">联系平台</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="view_car" @click="viewCar(form.id)" v-if="soureNum>1 && chargeFlag">查看车辆信息</view>
		<u-gap height="20" bg-color="#F5F5F5" v-if="chargeFlag"></u-gap>
		<!-- 1 -->
		<view class="bottom_content" style="padding: 40rpx 60rpx;" v-if="soureNum === 1 && chargeFlag">
			<view class="btn orange" @click="uploadCar">确认验车和上传车辆信息</view>
		</view>
		<!-- 2 -->
		<view class="bottom_content" style="padding: 40rpx 60rpx;" v-if="soureNum === 2 && chargeFlag" @click="signContact">
			<view :class="['btn',form.state === 'VALIDATE_CAR'?'defult':'orange']">签署《汽车租赁合同》</view>
		</view>
		<!-- 3 -->
		<view class="bottom_content" style="position: relative;" v-if="soureNum === 3 && chargeFlag">
			<u-row>
				<u-col span="7">
					<view class="tips">*须商家签署合同才可支付</view>
					<view class="">
						月租金：<text class="money">{{form.monthlyrent |toMoney}}</text><text style="color:#FE3B31 ;">元（首月）</text>
					</view>
					<view style="color:#FE3B31 ;font-size: 24rpx;">仅支持租金线上支付，押金另须线下支付</view>
				</u-col>
				<u-col span="5">
					<view @click="payBefore" :class="['btn',form.state === 'NO_PAYMENT'?'orange':'defult']">支付</view>
				</u-col>
			</u-row>
			<view class="view_contract" @click="viewContract">
				<text class="label">查阅</text><text class="contract">《汽车租赁合同》</text>
			</view>
		</view>
		<!-- 4 -->
		<view class="bottom_content" style="padding: 40rpx 60rpx;" v-if="soureNum === 4 && chargeFlag">
			<view class="btn orange padding30" @click="pickCar">确认提车</view>
			<view class="view_contract" @click="viewContract">
				<text class="label">查阅</text><text class="contract">《汽车租赁合同》</text>
			</view>
		</view>
		<!-- 5 -->
		<view class="bottom_content" style="padding: 60rpx 0;" v-if="soureNum === 5 && chargeFlag">
			<view class="view_contract" @click="viewContract">
				<text class="label">查阅</text><text class="contract">《汽车租赁合同》</text>
			</view>
		</view>
		
		<view class="bottom_content" style="padding: 40rpx 60rpx;" v-if="!chargeFlag">
			<view class="btn orange" @click="callPhone">联系平台</view>
		</view>
		<!-- 取消订单 -->
		<u-popup v-model="cancelOrder" mode="bottom" :closeable="true" close-icon-color="#333333" border-radius="14">
			<view class="cancel_content">
				<view class="title">订单取消</view>
				<view class="item_list">
					<view style="color: #999999;">请选择订单取消原因</view>
					<view>
						<view class="radio_list" v-for="(item,index) in reasonList" :key="index">
							<view class="radio_label">{{item.text}}</view>
							<view @click="checkOr(index)">
								<view class="radio_defult" v-show="item.flag"></view>
								<u-icon name="checkmark-circle" color="#FF9F31" size="50" v-show="!item.flag"></u-icon>
							</view>
						</view>
					</view>
					<view style="padding-top: 30rpx;" v-show="otherFlag">
						<u-input v-model="cancelForm.cancelReason" type="textarea" maxlength="200" :border="true" height="140" />
					</view>
					<view class="btn_orange" @click="orderCancel">
						确定取消
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="payOrder" mode="bottom" :closeable="true" close-icon-pos="top-left" close-icon-color="#333333"
			border-radius="14">
			<view class="cancel_content">
				<view class="money_item">
					<view><text style="font-size: 60rpx;color: #333333;">{{form.monthlyrent | toMoney}}</text><text
							style="padding-left: 6rpx;">元</text></view>
					<view style="color: #999999;">支付总计</view>
				</view>
				<view class="total_item">
					<u-checkbox-group active-color="#FF9F31" shape="circle">
						<u-checkbox v-model="type" shape="circle" @change="checkboxGroupChange"></u-checkbox>
						<view style="margin-left: -20rpx;">
							使用帐户余额抵扣 本次可用金额{{payForm.reducePrice}}元
						</view>
					</u-checkbox-group>
					<view style="padding-top: 16rpx;">
						帐户余额已抵<text>{{payForm.reducePrice}}</text>元，仍须支付<text>{{payForm.realPrice}}</text>元:</view>
				</view>
				<view class="item_list">
					<view>
						<view class="radio_list">
							<view class="radio_label" style="display: flex;align-items: center;">
								<u-image width="52rpx" height="52rpx" src="@/static/order/zhifubao2x.png"></u-image>
								<view style="color: #111111;padding-left: 20rpx;">支付宝</view>
							</view>
							<view @click="openPayFlag">
								<view class="radio_defult" v-show="payCheckFlag"></view>
								<u-icon name="checkmark-circle" color="#FF9F31" size="50" v-show="!payCheckFlag">
								</u-icon>
							</view>
						</view>
					</view>
					<view class="btn_orange" @click="pay()">
						立即支付
					</view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="showTips" :show-confirm-button="false" title="">
			<view class="slot_content">
				<view class="slot_tips" style="padding:0 20rpx 30rpx;">
					<view>1. 押金会全额退还吗？什么情况下扣押金?</view>
					<view class="tips_text">租赁过程中，若您有未缴纳的费用或者违约金，租赁公司会在还车后结算时从押金中扣除，剩余费用全额退还。</view>
					<view>2. 押金什么时候退还?</view>
					<view class="tips_text">还车后，押金将会有租赁公司根据实际结算情况在30个工作日内退还，具体的到账时间因支付渠道不同存在差异，预计1-7个工作日到账。</view>
					<view>3. 押金是由谁收取和退还?</view>
					<view class="tips_text">押金是租赁公司收取和退还，平台提供线上支付和退还的能力。</view>
				</view>
				<view style="padding: 15px 20px 0;text-align: center;">
					<u-button type="warning" shape='circle' class="btn_orange" @click="showTips=false">好的</u-button>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				id: '',
				cancelOrder: false, //取消订单
				payOrder: false, //支付弹窗
				timestamp: 0, //倒计时
				status: true, //状态
				openFlag: false, //展开 收起
				reason: '',
				reasonList: [{
						text: '1. 车辆发生重大问题',
						flag: true
					},
					{
						text: '2. 不想开了',
						flag: true
					},
					{
						text: '3. 想换其他车开',
						flag: true
					},
					{
						text: '4. 其他原因',
						flag: true
					}
				],
				form: {
					companyname: '',
				},
				otherFlag: false,
				type: false,
				showTips: false,
				payCheckFlag: false,
				payForm: {
					reducePrice: 0,
					realPrice: 0,
				},
				chargeFlag:true,
				cancelForm:{
					orderId:'',
					cancelSort:'1',
					cancelReason:'',
				}
			}
		},
		onLoad(option) {
			let id = option.id;
			if (id) {
				this.id = id;
			}
		},
		onShow() {
			this.getInfo();
			this.initChat();
		},
		computed: {
			soureNum() {
				let value = this.form.state;
				if (value === 'WAITTING_UPLOADING_MESSAGE' || value === 'REGISTER_CAR') {
					return 1
				} else if (value === 'WAITTING_SIGN_CONTRACT' || value === 'DRIVER_SIGN_CONTRACT' || value ===
					'VALIDATE_CAR') {
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
				if (value === 'WAITTING_UPLOADING_MESSAGE' || value === 'REGISTER_CAR') {
					return '待验车'
				} else if (value === 'WAITTING_SIGN_CONTRACT' || value === 'DRIVER_SIGN_CONTRACT' || value ===
					'VALIDATE_CAR') {
					return '待签约'
				} else if (value === 'NO_PAYMENT' || value === 'COMPANY_SIGN_CONTRACT') {
					return '待支付'
				} else if (value === 'WAITTING_DELIVERY_VEHICLE') {
					return '待提车'
				} else if (value === 'ORDER_FINISHED') {
					return '完成'
				} else {
					return ''
				}
			},
			toMoney:function(s,type){
				    if (/[^0-9\.]/.test(s)) return "0";
				    if (s == null || s == "") return "0";
				    s = s.toString().replace(/^(\d*)$/, "$1.");
				    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
				    s = s.replace(".", ",");
				    var re = /(\d)(\d{3},)/;
				    while (re.test(s))
				        s = s.replace(re, "$1,$2");
				    s = s.replace(/,(\d\d)$/, ".$1");
				    if (type == 0) {// 不带小数位(默认是有小数位)
				        var a = s.split(".");
				        if (a[1] == "00") {
				            s = a[0];
				        }
				    }
				    return s;
			}

		},
		onBackPress(event) {
			this.$u.route("/pages/driver/myOrder/myOrder")
		},
		methods: {
			initChat() {
				let isLogin = this.$store.state.isLogin;
				if (isLogin) {
					return
				}
				this.initLogin()
			},
			signContact() {
				if (this.form.state === 'VALIDATE_CAR') {
					this.$u.toast('出租方商品未登记,请联系出租方');
					return
				}
				this.$u.route('/pages/driver/myOrder/signContract', {
					id: this.id,
					userId: this.form.userid
				})
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
			refreshView() {
				this.getInfo()
			},
			//提车
			pickCar() {
				this.$u.api.orderDeliveryOfVehicle({
					orderId: this.id
				}).then(res => {
					if (res.code === 200) {
						this.refreshView()
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			//聊天
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
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: '0571-87815287'
				});
			},
			//验车单
			viewCar(id) {
				this.$u.route('/pages/company/order/checkMessage', {
					id: id
				})
			},
			//筛选退单条件
			checkOr(index) {
				this.cancelForm.cancelSort = index+1;
				if (index === 3) {
					console.log(this.reasonList[3].flag)
					this.otherFlag = this.reasonList[3].flag
				} else {
					this.otherFlag = false;
				}
				this.reasonList.forEach((item, i) => {
					if (index === i) {
						this.reasonList[i].flag = !this.reasonList[i].flag;
					} else {
						this.reasonList[i].flag = true
					}
				})
			},
			
			//查看合同
			viewContract() {
				this.$u.route('/pages/driver/myOrder/contractPreview',{id:this.id,userId:this.form.userid})
			},
			//获取数据
			getInfo() {
				//获取页面数据
				this.$u.api.driverOrderView({
					id: this.id
				}).then(res => {
					if (res.code === 200) {
						let data = res.object;
						this.form = data;
						if (data.state === 'WAITTING_UPLOADING_MESSAGE' || data.state === 'REGISTER_CAR' ){
							this.timeE(data.createTime)
						} else if (data.state === 'WAITTING_SIGN_CONTRACT' || data.state === 'DRIVER_SIGN_CONTRACT' ){
							let registerTime = data.registerTime.replace(new RegExp("-", "gm"), "/");
							let registerTimeM = (new Date(registerTime)).getTime();
							let validatecartime = data.validatecartime.replace(new RegExp("-", "gm"), "/");
							let validatecartimeM = (new Date(validatecartime)).getTime();
							if (registerTimeM>validatecartimeM){
								this.timeE(data.registerTime)
							} else {
								this.timeE(data.validatecartime)
							}
						} else if (data.state === 'NO_PAYMENT'){
							this.timeE(data.signcontracttime)
						} else if (data.state === 'WAITTING_DELIVERY_VEHICLE'){
							this.timeE(data.paytime)
						} else {
							
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
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
			//退单
			chargeback() {
				this.cancelForm = {
					orderId:'',
					cancelSort:'',
					cancelReason:'',
				};
				this.cancelOrder = true;
			},
			//倒计时
			countEnd() {
				if (this.form.state !== 'WAITTING_DELIVERY_VEHICLE'){
					this.orderEfficacy()
				} else {
					this.pickCar()
				}
			},
			orderCancel(){
				let data = this.cancelForm;
				if (data.cancelSort === ''){
					this.$u.toast('请选择退单原因');
					return
				}
				if (data.cancelReason === '' && data.cancelSort == 4){
					this.$u.toast("请填写退单原因");
					return
				}
				data.orderId = this.form.id;
				this.$u.api.orderCancel(data).then(res => {
					if (res.code === 200) {
						this.cancelOrder = false;
						this.chargeFlag = false;
					} else{
						this.$u.toast(rees.msg)
					}
				})

			},
			orderEfficacy(){
				this.$u.api.orderEfficacy({
					orderId: this.form.id
				}).then(res => {
					if (res.code === 200) {
						this.chargeFlag = false;
					} else{
						this.$u.toast(rees.msg)
					}
				})
			},
			//上传验车单
			uploadCar() {
				this.$u.route('/pages/driver/myOrder/checkCar', {
					orderId: this.form.id
				})
			},
			//支付
			payBefore() {
				let state = this.form.state;
				if (state === 'NO_PAYMENT') {
					this.payOrder = true;
					this.type = false;
					this.computedPrice(0)
				} else {
					this.$u.toast('待商家签署合同')
				}
			},
			checkboxGroupChange(e) {
				if (e.value) {
					this.computedPrice(1)
				} else {
					this.computedPrice(0)
				}
			},
			computedPrice(type) {
				this.$u.api.orderPrice({
					orderId: this.id,
					type: type
				}).then(res => {
					if (res.code === 200) {
						this.payForm = res.object
					} else {
						this.$u.toast(res.msg)
					}
				})
			},
			openPayFlag() {
				this.payCheckFlag = !this.payCheckFlag
			},
			openFlow() {
				this.openFlag = !this.openFlag
			},
			//支付
			pay() {
				// let data = {
				// 	orderId: this.form.id,
				// 	realPrice: this.form.realPrice,
				// 	reducePrice: this.form.reducePrice,
				// 	type: this.type ? 1 : 0
				// };
				this.$u.toast('测试环境，支付时金额为1分线')
				let data = {
					orderId: this.form.id,
					realPrice: 0.01,
					reducePrice: 0,
					type: 0
				};
				this.$u.api.getOrderInfo(data).then(res => {
					if (res.code === 200) {
						let that = this;
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res.object, //微信、支付宝订单数据
							success: function(res) {
								that.payOrder = false;
								that.getInfo()
								let obj = JSON.parse(obj.rawdata);
								if (obj.resultStatus == '9000') {
									this.$u.toast('支付成功')
								}
							},
							fail: function(err) {
								alert('fail:' + JSON.stringify(err));
							}
						});
					} else {
						this.$u.toast(res.msg);
					}
				})
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
	.content {

		.count_down {
			text-align: center;
			padding: 40rpx 0 20rpx;
			color: #FE5B00;
		}

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
	}

	.chat_btn {
		border-top: 1px solid #E0E0E0;
		border-bottom: 1px solid #E0E0E0;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 110rpx;

			.text {
				color: #555555;
				padding-left: 10rpx;
			}
		}
	}

	.view_car {
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #252825;
	}

	.bottom_content {
		padding: 20rpx 20rpx 30rpx;

		.btn {
			padding: 24rpx 28rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
		}

		.padding30 {
			padding: 30rpx;
		}

		.defult {
			background: #F2F2F2;
			color: #252825;
		}

		.orange {
			background: linear-gradient(270deg, #FFC600 0%, #FFA900 47%, #FF9100 100%);
			color: #FFFFFF;
		}

		.tips {
			font-size: 24rpx;
			color: #FE3B31;
		}

		.money {
			font-size: 36rpx;
			color: #FE3B31;
		}

		.money_abs {
			color: #E8541E;
			background: #FCEEE9;
			position: absolute;
			padding: 10rpx 6rpx;
			top: 2rpx;
			z-index: 20;
			left: 60rpx;
		}

		.view_contract {
			text-align: center;
			padding-top: 20rpx;
			font-size: 24rpx;

			.label {
				color: #C7C7C7
			}

			.contract {
				color: #FF9500;
			}
		}
	}

	.cancel_content {
		min-height: 300rpx;

		.title {
			padding: 30rpx 0;
			text-align: center;
			color: #333333;
			font-weight: 700;
		}

		.money_item {
			margin-top: 60rpx;
			padding: 40rpx 0 30rpx;
			border-bottom: 1px solid #E0E0E0;
			text-align: center;
		}

		.total_item {
			padding: 36rpx 30rpx 0;
			color: #999999;
		}

		.item_list {
			padding: 26rpx 30rpx;

			.radio_list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1px solid #E0E0E0;
			}

			.radio_label {
				color: #333330;
				font-size: 30rpx;
			}

			.radio_defult {
				width: 48rpx;
				height: 48rpx;
				border: 1px solid #E0E0E0;
				border-radius: 50%;
			}
		}

		.btn_orange {
			margin-top: 30rpx;
			background: linear-gradient(270deg, #FFC500 0%, #FFB600 44%, #FF9700 100%);
			color: #FFFFFF;
			font-size: 32rpx;
			border-radius: 22px;
			text-align: center;
			line-height: 80rpx;
			height: 80rpx;
		}
	}

	.slot_content {
		padding: 15px 0;

		.slot_tips {
			color: #333333;
			font-size: 28rpx;
			border-bottom: 1rpx solid #E0E0E0;

			.tips_text {
				padding: 10rpx 0;
				text-indent: 20rpx;
			}
		}
	}
</style>
